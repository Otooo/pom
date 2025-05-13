import { Router } from 'express';
import { LocationController } from '../controllers/LocationController';

export const locationRoutes = Router();

locationRoutes.get('/', LocationController.getAllLocations);
locationRoutes.get('/:id', LocationController.getLocationById);
locationRoutes.post('/', LocationController.createLocation);
locationRoutes.put('/:id', LocationController.updateLocation);
locationRoutes.delete('/:id', LocationController.deleteLocation);