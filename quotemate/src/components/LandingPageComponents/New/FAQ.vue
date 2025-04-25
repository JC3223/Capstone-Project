<template>
  <h2
    style="
      text-align: center;
      font-family: 'Courier Prime', serif;
      margin-top: 20px;
      margin-bottom: 20px;
    "
  >
    Frequently Asked Questions
  </h2>
  <div class="faq">
    <div v-for="(item, index) in faqItems" :key="index" class="faq-item">
      <!-- Horizontal line container -->
      <div class="question-container">
        <div class="question" @click="toggleAnswer(index)">
          {{ item.question }}
          <span class="indicator">{{ item.isOpen ? "▲" : "▼" }}</span>
        </div>
      </div>
      <!-- Answer with transition -->
      <transition name="slideFAQ">
        <div class="answer" v-if="item.isOpen">
          {{ item.answer }}
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

// Define props to accept FAQ data from the parent
const props = defineProps({
  faqItems: {
    type: Array,
    required: true,
  },
});

// Function to toggle the answer visibility
const toggleAnswer = (index) => {
  props.faqItems[index].isOpen = !props.faqItems[index].isOpen;
};
</script>

<style scoped>
.faq {
  max-width: 600px;
  margin: 0 auto;
}

.faq-item {
  margin-bottom: 10px;
}

/* Horizontal line container */
.question-container {
  border-bottom: 1px solid #ccc; /* Horizontal line */
  padding-bottom: 10px; /* Spacing between line and question */
}

.question {
  font-family: "Courier Prime", serif;
  cursor: pointer;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0; /* Remove side padding for a cleaner look */
  transition: background-color 0.3s ease;
}

.question:hover {
  background-color: #f9f9f9; /* Light hover effect */
}

.indicator {
  font-size: 1.2em;
  margin-left: 10px;
}

.answer {
  padding: 10px 0; /* Remove side padding for a cleaner look */
  background-color: #fff;
}

/* Transition for the answer */
.slideFAQ-enter-active,
.slideFAQ-leave-active {
  transition: all 0.5s ease;
  max-height: 200px; /* Adjust based on the expected height of the answer */
  overflow: hidden;
}

.slideFAQ-enter-from,
.slideFAQ-leave-to {
  max-height: 0;
  opacity: 0;
  padding: 0;
}
</style>
