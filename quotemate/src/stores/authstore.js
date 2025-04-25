import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "./userStore";
import axios from "axios";

export const useAuthStore = defineStore("auth", () => {
  const router = useRouter();
  const userStore = useUserStore();

  const isLoggedIn = computed(() => {
    return localStorage.getItem("accessToken") ? true : false;
  });

  const logout = async () => {
    const accessToken = localStorage.getItem("accessToken");
    try {
      await axios.delete(`http://localhost:8000/users/${accessToken}`);
      console.log("User deleted successfully from the database");
    } catch (error) {
      console.error("Error deleting user:", error);
      // Handle error appropriately, e.g., display an error message
    } finally {
      localStorage.removeItem("accessToken");
      router.push("/user-signup");
    }
  };

  return { isLoggedIn, logout };
});
