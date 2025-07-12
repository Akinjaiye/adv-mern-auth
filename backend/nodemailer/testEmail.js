import { sendWelcomeEmail } from './email.js';
import dotenv from 'dotenv';

dotenv.config();  // Make sure env variables load

sendWelcomeEmail('akindijiduro@gmail.com', 'Diji', '123456')
  .then(() => console.log('✅ Test email sent!'))
  .catch(err => console.error('❌ Failed to send test email:', err));
