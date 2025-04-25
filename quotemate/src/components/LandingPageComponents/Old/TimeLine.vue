<template>
  <section class="container fourth-container" id="fourth-container">
    <div class="timeline-container">
      <div class="timeline-line"></div>
      <div
        v-for="(event, index) in timelineEvents"
        :key="index"
        class="timeline-event"
        :class="{ even: index % 2 === 0 }"
      >
        <div class="timeline-title">
          <h3>{{ event.title }}</h3>
          <!-- <div class="date">{{ event.date }}</div>-->
          <div class="timeline-arrow"></div>
        </div>
        <div class="timeline-description">{{ event.description }}</div>
        <div class="timeline-dot"></div>
      </div>
    </div>
  </section>
</template>
<script setup>
const timelineEvents = [
  {
    title: "Step 1",
    description: "Sign-up for an account.",
  },
  {
    title: "Step 2",
    description: "Have a chat with your QuoteMate.",
  },
  {
    title: "Step 3",
    description: "Finalise your quotation.",
  },
  {
    title: "Step 4",
    description: "Save and view it anytime.",
  },
];
</script>
<style scoped>
.container {
  width: 100%;
  height: 100vh;
  scroll-snap-align: start;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}
.fourth-container {
  background-color: #f8f9fa;
  padding: 100px 0;
}
.timeline-header {
  text-align: center;
  margin-bottom: 60px;
  color: #2b407e;
}

.timeline-header h2 {
  font-family: "Courier Prime", serif;
  font-size: 50px;
  margin-bottom: 15px;
}

.timeline-header p {
  font-family: "Inter", serif;
  font-size: 20px;
  color: #5b78b1;
}

.timeline-line {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 4px;
  min-height: 100%; /* Use min-height instead of height */
  background: linear-gradient(to bottom, #5b78b1, #00bfa5);
  top: 0; /* Start from the top */
  bottom: 100;
  overflow: hidden;
  background-size: 100% 0%;
  background-repeat: no-repeat;
  animation: drawLine 2s ease-in-out forwards;
}

.timeline-event {
  position: relative;
  margin-bottom: 80px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 200px; /* Adjusted for larger screens */
}

.timeline-title {
  width: 250px;
  text-align: right;
  padding: 25px;
  background: linear-gradient(135deg, #2b407e, #5b78b1);
  color: white;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(43, 64, 126, 0.1);
  transition: transform 0.3s ease;
  position: relative;
}

.timeline-title h3 {
  font-family: "Courier Prime", serif;
  font-size: 26px;
}

.date {
  font-family: "Inter", serif;
  font-size: 16px;
  opacity: 0.9;
  color: #00bfa5;
}

.timeline-arrow {
  position: absolute;
  right: -150px;
  top: 50%;
  transform: translateY(-50%);
  width: 150px;
  height: 4px;
  background: linear-gradient(to right, #2b407e, #2b407e);
}

.timeline-arrow::after {
  content: "";
  position: absolute;
  right: -10px;
  top: 50%;
  transform: translateY(-50%);
  width: 0;
  height: 0;
  border-top: 8px solid transparent;
  border-bottom: 8px solid transparent;
  border-left: 12px solid #2b407e;
}

.timeline-description {
  width: 400px;
  padding: 25px;
  background: white;
  border: 2px solid #5b78b1;
  border-radius: 15px;
  font-family: "Inter", serif;
  font-size: 16px;
  line-height: 1.6;
  position: relative;
  box-shadow: 0 4px 15px rgba(91, 120, 177, 0.1);
  transition: transform 0.3s ease;
  color: #000;
}
.timeline-description:hover {
  transform: translateY(-5px);
}

.timeline-dot {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 20px;
  height: 20px;
  background: #ff7445;
  border: 4px solid white;
  border-radius: 50%;
  z-index: 0;
  box-shadow: 0 0 0 4px rgba(255, 116, 69, 0.2);
}
.timeline-event:nth-child(even) {
  flex-direction: row-reverse;
}

.timeline-event:nth-child(even) .timeline-title {
  text-align: left;
}

.timeline-event:nth-child(even) .timeline-arrow {
  left: -150px;
  right: auto;
  transform: translateY(-50%) scaleX(-1);
}
@keyframes drawLine {
  0% {
    background-size: 100% 0%;
  }
  100% {
    background-size: 100% 100%;
  }
}

.timeline-event:nth-child(1) {
  animation-delay: 0.2s;
}
.timeline-event:nth-child(2) {
  animation-delay: 0.4s;
}
.timeline-event:nth-child(3) {
  animation-delay: 0.6s;
}
.timeline-event:nth-child(4) {
  animation-delay: 0.8s;
}
.timeline-event:nth-child(5) {
  animation-delay: 1s;
}

@media (max-width: 1920px) {
  .timeline-event {
    margin-bottom: 20px; /* Reduced vertical spacing */
    gap: 200px; /* Reduced horizontal gap */
  }

  .timeline-title {
    width: 200px; /* Reduced title width */
    padding: 20px; /* Reduced padding */
  }

  .timeline-description {
    width: 350px; /* Reduced description width */
    padding: 20px; /* Reduced padding */
  }
}

/* Further adjustments for smaller screens */
@media (max-width: 1200px) {
  .timeline-event {
    margin-bottom: 30px; /* Further reduced vertical spacing */
    gap: 100px; /* Further reduced horizontal gap */
  }

  .timeline-title {
    width: 180px; /* Further reduced title width */
    padding: 15px; /* Further reduced padding */
  }

  .timeline-description {
    width: 250px; /* Further reduced description width */
    padding: 15px; /* Further reduced padding */
  }
}
</style>
