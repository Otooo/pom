export const enum HTTP_CODE {
    SUCCESS               = 200,  
    CREATED               = 201,  
    NO_CONTENT            = 204,
    BAD_REQUEST           = 400,
    UNAUTHORIZED          = 401,
    FORBIDDEN             = 403,
    NOT_FOUND             = 404,
    INTERNAL_SERVER_ERROR = 500,
}

export const HTTP_CODE_IS_VALID = (code: number): boolean => {
    const codes = [200,201,204,400,401,403,404,500];
    return codes.includes(code);
}