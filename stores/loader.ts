import { defineStore } from 'pinia';

export const useLoaderStore = defineStore('loader', {
  state: () => ({
    loading: true
  }),
  actions: {
    setLoading(newVal: boolean) {
        this.loading = newVal; 
    },
  }
});