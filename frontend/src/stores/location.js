import { defineStore } from 'pinia';

export const useLocationStore = defineStore('location', {
    state: () => ({
        locations: [],
    }),
  
    actions: {
        saveLocations(locations) {
            this.locations = locations;
        },
    
        clearLocations() {
            this.locations = [];
        },

        getLocationById(id) {
            return this.locations.find(location => location.id === id) || null;
        }
    }
});