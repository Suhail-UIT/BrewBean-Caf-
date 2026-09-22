import { Request, Response } from 'express';
import { db } from '../models/dbStorage';

export const createReservation = (req: Request, res: Response): void => {
  try {
    const { name, phone, email, date, time, guests, specialRequest } = req.body;

    if (!name || !phone || !email || !date || !time || !guests) {
      res.status(400).json({ message: 'Name, phone, email, date, time, and number of guests are required.' });
      return;
    }

    const reservation = db.createReservation({
      name,
      phone,
      email,
      date,
      time,
      guests: Number(guests),
      specialRequest: specialRequest || '',
    });

    res.status(201).json({
      message: 'Your table reservation request has been received.',
      reservation,
    });
  } catch (error) {
    console.error('Error creating reservation:', error);
    res.status(500).json({ message: 'Error booking table. Please try again.' });
  }
};

export const getReservations = (req: Request, res: Response): void => {
  try {
    const reservations = db.getReservations();
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving reservations' });
  }
};

export const deleteReservation = (req: Request, res: Response): void => {
  try {
    const success = db.deleteReservation(req.params.id);
    if (!success) {
      res.status(404).json({ message: 'Reservation not found' });
      return;
    }
    res.json({ message: 'Reservation removed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting reservation' });
  }
};
