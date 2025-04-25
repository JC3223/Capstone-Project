<template>
  <div class="quick-start-section">
    <h2>Let's Get Started!</h2>
    <router-link to="/quotation-history" class="home-button"
      >Go to Home</router-link
    >
    <div class="floating-rectangle rect-1"></div>
    <div class="floating-rectangle rect-2"></div>
    <div class="floating-rectangle rect-3"></div>
    <div class="floating-rectangle rect-4"></div>
  </div>
</template>

<script setup>
import { defineOptions } from "vue";

defineOptions({
  name: "QuickStart",
});
</script>

<style scoped>
.quick-start-section {
  height: 40vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #2b407e;
  position: relative;
  overflow: hidden;
}

h2 {
  z-index: 1;
  position: relative;
  color: white;
  font-size: 2em;
  margin-bottom: 20px;
}

.home-button {
  z-index: 1;
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  text-decoration: none;
}

.floating-rectangle {
  position: absolute;
  width: 330px;
  height: 198px;
  border-radius: 50px;
  background: linear-gradient(45deg, #5b78b1, #00bfa5);
  opacity: 0.5;
  animation: float 22s infinite ease-in-out;
  z-index: 0;
}

.rect-1 {
  top: 10%;
  left: 10%;
  animation-delay: 0s;
}

.rect-2 {
  top: 30%;
  right: 15%;
  width: 275px;
  height: 165px;
  animation-delay: 3s;
  transform: rotate(45deg);
}

.rect-3 {
  bottom: 15%;
  left: 20%;
  width: 220px;
  height: 132px;
  animation-delay: 6s;
  transform: rotate(-30deg);
}

.rect-4 {
  top: -5%;
  right: 25%;
  width: 385px;
  height: 231px;
  animation-delay: 9s;
}

@keyframes float {
  0%,
  100% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(15px, 15px);
  }
}
</style>
