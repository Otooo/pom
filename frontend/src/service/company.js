import axios from '@/config/axios';
import { executeActionService } from './serviceBase';

/** VARs */
const API_PATH = '/companies';

/** METHODS */
export const fetchCompanies = async () => {
    return await executeActionService(async () => axios.get(API_PATH));
}

export const getCompanyById = async (id) => {
    return await executeActionService(async () => axios.get(`${API_PATH}/${id}`));
}
    
export const createCompany = async ({ id, ...company }) => {
    return await executeActionService(async () => axios.post(API_PATH, company));
}
    
export const updateCompany = async (id, { _id, ...company }) => {
    return await executeActionService(async () => axios.put(`${API_PATH}/${id}`, company))
}

export const deleteCompany = async (id) => {
    return await executeActionService(async () => axios.delete(`${API_PATH}/${id}`))
}