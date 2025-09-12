
'use server';
/**
 * @fileOverview A flow to schedule a meeting in Google Calendar.
 *
 * - scheduleMeeting - A function that handles scheduling a meeting.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';
import { 
  ScheduleMeetingInputSchema, 
  type ScheduleMeetingInput, 
  ScheduleMeetingOutputSchema, 
  type ScheduleMeetingOutput 
} from '@/ai/schemas/schedule-meeting-schemas';
import { google } from 'googleapis';

const addEventToGoogleCalendar = ai.defineTool(
  {
    name: 'addEventToGoogleCalendar',
    description: 'Adds an event to the Google Calendar.',
    inputSchema: z.object({
      title: z.string(),
      description: z.string(),
      startTime: z.string().datetime(),
      endTime: z.string().datetime(),
      attendees: z.array(z.string().email()),
    }),
    outputSchema: z.object({
      success: z.boolean(),
      eventUrl: z.string().url(),
    }),
  },
  async (input) => {
    try {
      const oauth2Client = new google.auth.OAuth2(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET,
        'http://localhost:3000' // Redirect URI - can be anything for this script
      );

      oauth2Client.setCredentials({
        refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
      });

      const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

      const event = {
        summary: input.title,
        description: input.description,
        start: {
          dateTime: input.startTime,
          timeZone: 'Europe/Madrid',
        },
        end: {
          dateTime: input.endTime,
          timeZone: 'Europe/Madrid',
        },
        attendees: input.attendees.map(email => ({ email })),
        reminders: {
          useDefault: false,
          overrides: [
            { method: 'email', 'minutes': 24 * 60 },
            { method: 'popup', 'minutes': 10 },
          ],
        },
      };

      const res = await calendar.events.insert({
        calendarId: 'primary',
        requestBody: event,
      });

      return {
        success: true,
        eventUrl: res.data.htmlLink || 'https://calendar.google.com',
      };
    } catch (error) {
      console.error('Error creating Google Calendar event:', error);
      // Inform the user that auth is needed
      if (error instanceof Error && error.message.includes('No refresh token is set')) {
         throw new Error("El administrador necesita autorizar el acceso a Google Calendar. Por favor, contacta con soporte.");
      }
      return {
        success: false,
        eventUrl: 'https://calendar.google.com',
      };
    }
  }
);


const scheduleMeetingFlow = ai.defineFlow(
  {
    name: 'scheduleMeetingFlow',
    inputSchema: ScheduleMeetingInputSchema,
    outputSchema: ScheduleMeetingOutputSchema,
    tools: [addEventToGoogleCalendar]
  },
  async (input) => {
     const meetingEndTime = new Date(input.meetingTime);
     meetingEndTime.setHours(meetingEndTime.getHours() + 1);

     const calendarEvent = await addEventToGoogleCalendar({
        title: `Sesión Estratégica con ${input.name}`,
        description: `Detalles del cliente:\nNombre: ${input.name}\nEmail: ${input.email}\nTeléfono: ${input.phone}`,
        startTime: input.meetingTime,
        endTime: meetingEndTime.toISOString(),
        attendees: [input.email, 'clientes@evol-vance.es'], // Añade tu email para que también te llegue
     });

    if (calendarEvent.success) {
      return {
        success: true,
        message: '¡Tu sesión ha sido agendada! Recibirás una invitación de Google Calendar por correo.',
      };
    } else {
      return {
        success: false,
        message: 'Lo sentimos, no pudimos agendar tu cita. Por favor, inténtalo de nuevo más tarde.',
      };
    }
  }
);

export async function scheduleMeeting(input: ScheduleMeetingInput): Promise<ScheduleMeetingOutput> {
    return await scheduleMeetingFlow(input);
}
