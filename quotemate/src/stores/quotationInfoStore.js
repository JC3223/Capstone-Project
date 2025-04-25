import { defineStore } from "pinia";
import axios from "axios";

export const useQuotationInfoStore = defineStore("quotationInfo", {
  state: () => ({
    quotations: [],
    loading: false,
    error: null,
    selectedQuotation: null,
  }),
  actions: {
    async fetchQuotations() {
      this.loading = true;
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/QuotationInfo/"
        );
        this.quotations = response.data;
        this.error = null;
      } catch (error) {
        console.error("Error fetching quotations:", error);
        this.error = "Something seems wrong. Failed to fetch your quotations";
      } finally {
        this.loading = false;
      }
    },

    async deleteQuotation(id) {
      this.loading = true;
      try {
        await axios.delete(`http://127.0.0.1:8000/QuotationInfo/${id}/`);
        this.quotations = this.quotations.filter(
          (quotation) => quotation.id !== id
        );
        this.fetchQuotations();
        this.error = null;
      } catch (error) {
        console.error("Error deleting quotation:", error);
        this.error = "Failed to delete the quotation";
      } finally {
        this.loading = false;
      }
    },
  },
});
