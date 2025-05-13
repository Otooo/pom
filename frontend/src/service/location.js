import axios from 'axios';
import { executeActionService } from './serviceBase';

/** VARs */
const API_PATH = '/locations';

/** METHODS */
export const fetchLocations = async () => {
    return executeActionService(async () => axios.get(API_PATH));
}

export const getLocationById = async (id) => {
    return executeActionService(async () => axios.get(`${API_PATH}/${id}`));
}
  
export const createLocation = async ({ id, ...location }) => {
    return executeActionService(async () => axios.post(API_PATH, location));
}
  
export const updateLocation = async (id, { _id, ...location }) => {
    return executeActionService(async () => axios.put(`${API_PATH}/${id}`, location))
}

export const deleteLocation = async (id) => {
    return executeActionService(async () => axios.delete(`${API_PATH}/${id}`))
}