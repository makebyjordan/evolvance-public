'use server';
/**
 * @fileOverview A flow to schedule a meeting.
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


// Dummy function to simulate adding an event to Google Calendar.
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
    console.log('Simulating adding event to Google Calendar:', input);
    // In a real application, you would implement the logic to interact with the Google Calendar API here.
    return {
      success: true,
      eventUrl: 'https://calendar.google.com/calendar/r/eventedit', // Dummy URL
    };
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
        attendees: [input.email],
     });

    if (calendarEvent.success) {
      return {
        success: true,
        message: '¡Tu sesión ha sido agendada! Recibirás una invitación por correo.',
      };
    } else {
      return {
        success: false,
        message: 'Lo sentimos, no pudimos agendar tu cita. Por favor, inténtalo de nuevo.',
      };
    }
  }
);

export async function scheduleMeeting(input: ScheduleMeetingInput): Promise<ScheduleMeetingOutput> {
    return await scheduleMeetingFlow(input);
}
