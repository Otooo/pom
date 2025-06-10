import { Router } from 'express';
import { LocationController } from '../controllers/LocationController';

export const locationRoutes = Router();

const prefix = '/locations';

locationRoutes.get(`${prefix}/`, LocationController.getAllLocations);
locationRoutes.get(`${prefix}/:id`, LocationController.getLocationById);
locationRoutes.put(`${prefix}/:id`, LocationController.updateLocation);
locationRoutes.post(`${prefix}/`, LocationController.createLocation);
locationRoutes.delete(`${prefix}/:id`, LocationController.deleteLocation);