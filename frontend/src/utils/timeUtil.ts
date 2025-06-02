export const shiftResolve = (shift) => {
    switch (shift) {
        case 'morning':   return 'Manhã'
        case 'afternoon': return 'Tarde'
        default:          return 'Noite';
    }
}