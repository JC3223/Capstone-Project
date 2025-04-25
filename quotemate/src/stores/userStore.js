import { defineStore } from "pinia";
import axios from "axios";

// useUserStore: Defines the user store using Pinia
export const useUserStore = defineStore("user", {
  state: () => ({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    fullName: "",
    accessToken: "",
    loading: false,
    error: null,
  }),
  actions: {
    // createUser: Creates a new user and posts data to the backend
    async createUser(accessToken, router) {
      this.fullName = `${this.firstName} ${this.lastName}`;
      this.accessToken = accessToken;
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.post("http://localhost:8000/users/", {
          full_name: this.fullName,
          email: this.email,
          phone_number: this.phoneNumber,
          access_token: this.accessToken,
        });
        console.log("User created:", response.data);
        // Reset the form after successful submission
        this.firstName = "";
        this.lastName = "";
        this.email = "";
        this.phoneNumber = "";
        this.fullName = "";
        this.accessToken = "";
        // router.push: Navigates to the quotation history page
        router.push("/quotation-history");
      } catch (error) {
        console.error("Error creating user:", error);
        this.error = error.message || "An unexpected error occurred";
      } finally {
        this.loading = false;
      }
    },
  },
});
