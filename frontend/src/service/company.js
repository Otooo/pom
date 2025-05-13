import axios from 'axios';
import { executeActionService } from './serviceBase';

/** VARs */
const API_PATH = '/companies';

/** METHODS */
export const fetchCompanies = async () => {
    return executeActionService(async () => axios.get(API_PATH));
}

export const getCompanyById = async (id) => {
    return executeActionService(async () => axios.get(`${API_PATH}/${id}`));
}
    
export const createCompany = async ({ id, ...company }) => {
    return executeActionService(async () => axios.post(API_PATH, company));
}
    
export const updateCompany = async (id, { _id, ...company }) => {
    return executeActionService(async () => axios.put(`${API_PATH}/${id}`, company))
}

export const deleteCompany = async (id) => {
    return executeActionService(async () => axios.delete(`${API_PATH}/${id}`))
}