
'use server';

import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().min(2, { message: "El nombre es requerido." }),
  phone: z.string().min(8, { message: "El teléfono es requerido." }),
  email: z.string().email({ message: "El correo no es válido." }),
  subject: z.string().min(5, { message: "El asunto es requerido." }),
  message: z.string().min(10, { message: "El mensaje es demasiado corto." }),
});

type ContactFormState = {
  success: boolean;
  message: string;
};

export async function sendContactEmail(
  prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  
  const validatedFields = contactSchema.safeParse({
    name: formData.get('name'),
    phone: formData.get('phone'),
    email: formData.get('email'),
    subject: formData.get('subject'),
    message: formData.get('message'),
  });

  if (!validatedFields.success) {
    return {
      success: false,
      message: "Por favor, corrige los errores en el formulario.",
    };
  }

  const { name, email, phone, subject, message } = validatedFields.data;
  const to = 'clientes@evol-vance.es';

  // **Simulación de envío de correo**
  // En una aplicación real, aquí integrarías un servicio de envío de correos
  // como SendGrid, Resend, o Nodemailer.
  console.log('--- SIMULACIÓN DE ENVÍO DE CORREO ---');
  console.log(`De: ${name} <${email}>`);
  console.log(`Teléfono: ${phone}`);
  console.log(`Para: ${to}`);
  console.log(`Asunto: ${subject}`);
  console.log('--- Mensaje ---');
  console.log(message);
  console.log('------------------------------------');
  
  // Asumimos que el envío siempre es exitoso en esta simulación.
  return {
    success: true,
    message: 'Tu mensaje ha sido enviado con éxito. Te contactaremos pronto.',
  };
}
