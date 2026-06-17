import { Router } from 'express';
import Contact from '../models/Contact.js';

const router = Router();

router.post('/', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const contact = await Contact.create({ name, email, subject, message });
    res.status(201).json({ message: 'Message sent successfully', contact });
  } catch (err) {
    console.error('Contact save error:', err);
    res.status(500).json({ error: 'Failed to send message' });
  }
});

export default router;