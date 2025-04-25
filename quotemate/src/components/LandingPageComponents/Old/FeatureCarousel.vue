<template>
  <section class="container third-container">
    <div class="carousel">
      <div
        class="carousel-inner"
        :style="{ transform: `translateX(-${currentSlide * 33.333}%)` }"
      >
        <div class="carousel-slide">
          <div class="slide-content slide-1">
            <div class="carousel-floating-rectangle"></div>
            <div class="image-content-container">
              <img src="../../assets/landing/developer.png" />
            </div>
            <div class="content-container">
              <div class="carousel-title">Intuitive and Simple</div>
              <div class="carousel-subtitle">
                QuoteMate is designed with simplicity in mind. Our intuitive
                interface guides you through the process, making it easy to
                input your project details. Even if you're not tech-savvy,
                you'll find QuoteMate straightforward and user-friendly,
                allowing you to get instant quotes without any hassle. We've
                removed the complexity from home service estimations.
              </div>
            </div>
          </div>
        </div>
        <div class="carousel-slide">
          <div class="slide-content slide-2">
            <div class="carousel-floating-rectangle"></div>
            <div class="content-container-two">
              <div class="carousel-title">Free To Use</div>
              <div class="carousel-subtitle">
                Access accurate, AI-powered home service quotations without
                spending a dime. QuoteMate is completely free to use, empowering
                you to explore pricing options and plan your projects without
                financial commitment. Get instant estimates based on your
                specific needs, all without any hidden fees or subscription
                costs. We believe transparency and accessibility are key.
              </div>
            </div>

            <div class="image-content-container">
              <img src="../../assets/landing/phone.png" />
            </div>
          </div>
        </div>
        <div class="carousel-slide">
          <div class="slide-content slide-3">
            <div class="carousel-floating-rectangle"></div>
            <div class="image-content-container">
              <img src="../../assets/landing/data.png" />
            </div>
            <div class="content-container-three">
              <div class="carousel-title">Based On Real Data</div>
              <div class="carousel-subtitle">
                QuoteMate's AI engine is trained on a vast dataset of real-world
                project costs and market trends. This means that the quotations
                you receive are not arbitrary guesses, but rather reliable
                estimates based on actual data. By analyzing past projects and
                current pricing, QuoteMate provides you with realistic and
                competitive quotations, helping you make informed decisions.
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="carousel-controls">
        <div class="carousel-indicators">
          <button
            v-for="(_, index) in 3"
            :key="index"
            :class="['carouselDots', { active: currentSlide === index }]"
            @click="goToSlide(index)"
          ></button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

// Refs
const currentSlide = ref(0);

// Function to go to a specific slide
const goToSlide = (index) => {
  currentSlide.value = index;
};

// Automatic sliding logic
let intervalId;

const startAutoSlide = () => {
  intervalId = setInterval(() => {
    console.log("Moved");
    currentSlide.value = (currentSlide.value + 1) % 3; // Loop back to the first slide after the last one
  }, 5000); // Change slide every 5 seconds (adjust as needed)
};

const stopAutoSlide = () => {
  console.log("Stopped");
  clearInterval(intervalId);
};

// Lifecycle hooks
onMounted(() => {
  startAutoSlide();
});

onUnmounted(() => {
  stopAutoSlide();
});
</script>
