
export const executeActionService = async (action, withMetadata = false) => {
    try {
        const response = await action();

        if (withMetadata) {
            return response;
        }
        
        return response.data;
    } catch (error) {
        // TODO: talvez usar um toast
        throw error;
    }
}