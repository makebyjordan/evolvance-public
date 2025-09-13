
import { z } from 'zod';

export const ScheduleMeetingInputSchema = z.object({
  name: z.string().describe('The name of the person.'),
  email: z.string().email().describe('The email of the person.'),
  phone: z.string().describe('The phone number of the person.'),
  meetingTime: z
    .string()
    .datetime()
    .describe('The time for the meeting in ISO 8601 format.'),
  serviceInterest: z.string().optional().describe('The service the person is interested in.'),
});
export type ScheduleMeetingInput = z.infer<typeof ScheduleMeetingInputSchema>;

export const ScheduleMeetingOutputSchema = z.object({
  success: z.boolean().describe('Whether the meeting was scheduled successfully.'),
  message: z.string().describe('A message to the user.'),
});
export type ScheduleMeetingOutput = z.infer<
  typeof ScheduleMeetingOutputSchema
>;
