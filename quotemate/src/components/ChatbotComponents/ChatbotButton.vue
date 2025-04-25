<template>
  <v-btn
    color="#00bfa5"
    class="robot-button"
    fab
    size="xx-large"
    @click="goToQuotation"
    id="robot-button"
  >

    <v-icon icon="mdi-robot-happy-outline" size="xx-large" color="white">
    </v-icon>
  </v-btn>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const goToQuotation = () => {
  router.push("/quotation");
};
</script>

<style scoped>
/* Robot Button Styles */
.robot-button {
  background-color: #00bfa5;
  position: fixed;
  bottom: 200px; /* Adjusted: More standard spacing from the bottom */
  right: 50px; /* Adjusted: More standard spacing from the right */
  z-index: 1000; /* Adjusted: Same z-index as the header, keeps it on top */
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease; /* Added: For a smooth hover effect */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Added: subtle shadow */
  animation: floatAnimation 3s ease-in-out infinite; /* Added: floating animation */
  padding: 12px; /* Increased padding around the icon */
}

.robot-icon {
  font-size: 3.5rem !important; /* Increased icon size */
  color: white;
}

.robot-button:hover {
  transform: translateY(-5px); /* Added: Slight lift on hover */
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3); /* Added: Increased shadow on hover */
}

@keyframes floatAnimation {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-18px); /* Adjust this value for the floating height */
  }
  100% {
    transform: translateY(0);
  }
}
</style>
