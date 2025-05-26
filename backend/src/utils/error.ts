import { HTTP_CODE } from "../types/http_code";

export const DATA_NOT_FOUND_ERROR = (message = "Item não encontrado") => { 
    const error = new Error(message)
    error.name = '' + HTTP_CODE.NOT_FOUND;
    throw error;
}


export const DATA_REQUIRED_ERROR = (message = "Há alguns valores obrigatórios não informados") => { 
    const error = new Error(message)
    error.name = '' + HTTP_CODE.BAD_REQUEST;
    throw error;
}