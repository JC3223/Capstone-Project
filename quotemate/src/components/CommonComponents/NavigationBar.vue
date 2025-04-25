<template>
  <nav class="navbar">
    <div class="nav-section">
      <div class="logo-container">
        <img src="../../assets/icons/logo.png" alt="Logo" class="logo-image" />
      </div>

      <ul class="nav-links">
        <li><router-link to="/quotation-history">Home</router-link></li>
        <li><router-link to="/quotation">Quotation Generation</router-link></li>
        <li><router-link to="/">About Us</router-link></li>
      </ul>
    </div>
    <div
      class="menu-icon"
      @click="toggleMenu"
      :class="{ 'rotate-icon': showMenu }"
    >
      <v-icon>mdi-menu</v-icon>
    </div>
    <router-link
      v-if="!authStore.isLoggedIn"
      to="/user-signup"
      class="login-icon"
    >
      <v-icon>mdi-account-circle</v-icon>
    </router-link>
    <v-icon
      v-else
      aria-label="Logout"
      class="login-icon"
      @click="showLogoutConfirmation = true"
      >mdi-logout</v-icon
    >
    <ul class="mobile-nav-links" :class="{ 'show-mobile-nav': showMenu }">
      <li><router-link to="/">Home</router-link></li>
      <li><router-link to="/quotation">Quotation Generation</router-link></li>
      <li><router-link to="/">About Us</router-link></li>
    </ul>
  </nav>
  <v-dialog v-model="showLogoutConfirmation" width="500">
    <v-card>
      <v-card-title class="text-h5"> Confirm Logout </v-card-title>
      <v-card-text>
        QuoteMate stores user data with a unique token. Logging out will result
        in the deletion of your token and associated account, quotations created
        and chat history.<br />
        <strong>Are you sure you want to proceed?</strong>
      </v-card-text>
      <v-text-field
        v-model="confirmText"
        label="Type CONFIRM to proceed"
        placeholder="CONFIRM"
      ></v-text-field>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="#ff7f50" text @click="showLogoutConfirmation = false">
          Cancel
        </v-btn>
        <v-btn
          color="#00bfa5"
          text
          @click="handleLogout"
          :disabled="confirmText !== 'CONFIRM'"
        >
          Confirm
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useAuthStore } from "@/stores/authStore";

const showMenu = ref(false);
const authStore = useAuthStore();
const showLogoutConfirmation = ref(false);
const confirmText = ref("");

const toggleMenu = () => {
  showMenu.value = !showMenu.value;
};

const handleResize = () => {
  if (window.innerWidth > 768) {
    showMenu.value = false;
  }
};

const handleLogout = () => {
  authStore.logout();
  showLogoutConfirmation.value = false;
};

onMounted(() => {
  window.addEventListener("resize", handleResize);
  handleResize(); // Initial check
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", handleResize);
});
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background: linear-gradient(to bottom, #00bfa5, #5b78b1);
  position: sticky;
  top: 0;
  z-index: 100; /* Ensure it stays on top of other elements */
}

.nav-section {
  display: flex;
  align-items: center;
  gap: 20px; /* Add spacing between logo and nav links */
}

.nav-links {
  list-style: none;
  display: flex;
  gap: 30px;
}

.nav-links a {
  text-decoration: none;
  color: white;
  position: relative;
  /* Remove hyperlink styling */
  font-family: "Inter", sans-serif; /* Change font family */
}

.nav-links a::after {
  content: "";
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 8px;
  height: 8px;
  background-color: #00bfa5;
  border-radius: 50%;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.nav-links a:hover::after {
  opacity: 1;
  transform: translateX(-50%) scale(1.2); /* Slightly larger on hover */
  transition: opacity 0.3s ease, transform 0.3s ease; /* Add transform transition */
}

.nav-links a::after {
  transform: translateX(-50%) scale(0); /* Start with scale 0 */
  transition: opacity 0.3s ease, transform 0.3s ease; /* Add transform transition */
}

.logo-container {
  position: relative;
  width: 50px;
  height: 50px;
}

.logo-image {
  width: 50px;
  height: 50px;
  position: relative; /* Ensure logo is above the circle */
  mix-blend-mode: screen;
}

.login-icon {
  font-size: 24px;
  color: #333;
  cursor: pointer;
  transition: color 0.3s ease;
}

.login-icon:hover {
  color: #00bfa5;
}

.menu-icon {
  display: none;
  font-size: 24px;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.rotate-icon {
  transform: rotate(90deg);
}

.mobile-nav-links {
  list-style: none;
  padding: 0;
  margin: 0;
  position: absolute;
  top: 60px;
  left: 0;
  width: 100%;
  background-color: #5b78b1; /* Change dropdown menu color */
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  height: 0;
  overflow: hidden;
  transition: height 0.3s ease;
  font-family: "Inter", sans-serif; /* Change font family */
  color: white; /* Change text color */
  z-index: 100;
}

.show-mobile-nav {
  height: auto; /* Let the content define the height */
}

.mobile-nav-links a {
  position: relative;
  padding-left: 15px; /* Space for the dot */
  text-decoration: none;
  color: white;
  /* Remove hyperlink styling */
}

.mobile-nav-links a::before {
  content: "";
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%) scale(0);
  width: 8px;
  height: 8px;
  background-color: #00bfa5;
  border-radius: 50%;
  transition: transform 0.3s ease;
}

.mobile-nav-links a:hover::before {
  transform: translateY(-50%) scale(1.2);
}

@media (max-width: 768px) {
  .nav-links {
    display: none;
  }

  .menu-icon {
    display: block;
  }
}
</style>
