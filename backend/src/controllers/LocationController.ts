import { Request, Response } from 'express';
import { DataService } from '../services/DataService';
import { Location } from '../models/Location';
import { v4 as uuidv4 } from 'uuid';

const locationService = new DataService<Location>('locations');

export const LocationController = {
  getAllLocations: (req: Request, res: Response) => {
    const locations = locationService.getAll();
    res.json(locations);
  },

  getLocationById: (req: Request, res: Response) => {
    const location = locationService.getById(req.params.id);
    
    if (!location) {
      return res.status(404).json({ message: 'Local não encontrado' });
    }
    
    res.json(location);
  },

  createLocation: (req: Request, res: Response) => {
    const { name, address } = req.body;
    
    if (!name || !address) {
      return res.status(400).json({ message: 'Nome e endereço são obrigatórios' });
    }
    
    const newLocation: Location = {
      id: uuidv4(),
      name,
      address
    };
    
    const location = locationService.create(newLocation);
    res.status(201).json(location);
  },

  updateLocation: (req: Request, res: Response) => {
    const updatedLocation = locationService.update(req.params.id, req.body);
    
    if (!updatedLocation) {
      return res.status(404).json({ message: 'Local não encontrado' });
    }
    
    res.json(updatedLocation);
  },

  deleteLocation: (req: Request, res: Response) => {
    const deleted = locationService.delete(req.params.id);
    
    if (!deleted) {
      return res.status(404).json({ message: 'Local não encontrado' });
    }
    
    res.status(204).send();
  }
};