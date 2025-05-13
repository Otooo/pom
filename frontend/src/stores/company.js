import { defineStore } from 'pinia';

export const useCompanyStore = defineStore('company', {
    state: () => ({
        companies: [],
    }),
  
    actions: {
        saveCompanies() {
            this.companies = data;
        },

        clearCompanies() {
            this.companies = [];
        },

        getCompanyById(id) {
            return this.companies.find(company => company.id === id) || null;
        }
    }
});