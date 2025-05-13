
export const executeActionService = async (action) => {
    try {
        const { data }  = await action();

        return data;
    } catch (error) {
        // TODO: talvez usar um toast
        throw error;
    }
}