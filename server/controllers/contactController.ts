import { Request, Response } from 'express';
import { db } from '../models/dbStorage';

export const createContact = (req: Request, res: Response): void => {
  try {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !message) {
      res.status(400).json({ message: 'Name, email, and message are required.' });
      return;
    }

    const contact = db.createContact({
      name,
      email,
      phone: phone || '',
      message,
    });

    res.status(201).json({
      message: 'Thank you! Your message has been sent to BrewBean Café.',
      contact,
    });
  } catch (error) {
    console.error('Error in contact API:', error);
    res.status(500).json({ message: 'Error submitting contact form' });
  }
};

export const getContacts = (req: Request, res: Response): void => {
  try {
    const contacts = db.getContacts();
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching contact messages' });
  }
};
