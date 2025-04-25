<template>
  <section class="container first-container">
    <div class="floating-rectangle"></div>
    <div class="content">
      <div class="text-container">
        <div class="title">QuoteMate</div>
        <div class="subtitle">
          The future of home service estimates. AI-driven quotations, available
          24/7, providing transparent and instant pricing for your projects.
        </div>
      </div>
      <div class="image-content-container">
        <img
          src="@/assets/landing/hand-sign.png"
          alt="hand-sign"
          class="hand-sign"
        />
      </div>
    </div>
  </section>
</template>

<script setup></script>

<style scoped>
.main-container {
  width: 100%;
  margin: 0;
  padding: 0;
}

.container {
  width: 100%;
  height: 100vh;
  scroll-snap-align: start;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.content {
  width: 100%;
  padding: 20px;
  height: 100%;
  position: relative;
}

.text-container {
  position: absolute;
  top: 50%;
  left: 30%;
  transform: translate(-50%, -50%);
  z-index: 2;
}

.title {
  font-size: 90px;
  margin-bottom: 50px;
  font-family: "Courier Prime", serif;
  color: #ffffff;
}

.subtitle {
  max-width: 700px;
  width: 100%;
  font-size: 26px;
  font-family: "Inter", serif;
  color: #ffffff;
}

.first-container {
  position: relative;
  background-color: #2b407e;
  overflow: hidden;
}

.first-container::before,
.first-container::after {
  content: "";
  position: absolute;
  border-radius: 50px;
  opacity: 0.1;
  z-index: 0;
}

.first-container::before {
  width: 800px;
  height: 800px;
  top: -200px;
  right: -100px;
  background: linear-gradient(45deg, #5b78b1, #00bfa5);
  animation: float1 20s infinite ease-in-out;
  z-index: 0;
}

.first-container::after {
  width: 600px;
  height: 600px;
  bottom: -100px;
  left: -150px;
  background: linear-gradient(45deg, #5b78b1, #2b477e);
  animation: float2 15s infinite ease-in-out;
  z-index: 0;
}

.first-container .content::before {
  content: "";
  position: absolute;
  border-radius: 50px;
  opacity: 0.5;
  z-index: 0;
}

.first-container .content::before {
  width: 500px;
  height: 500px;
  top: 40%;
  left: 25%;
  background: linear-gradient(45deg, #5b78b1, #00bfa5);
  animation: float3 18s infinite ease-in-out;
  z-index: 0;
}

.first-container .content::after {
  width: 700px;
  height: 700px;
  bottom: 10%;
  right: 20%;
  background: linear-gradient(45deg, #5b78b1, #2b477e);
  animation: float4 25s infinite ease-in-out;
  z-index: 0;
}

.floating-rectangle {
  position: absolute;
  width: 500px;
  height: 300px;
  top: 0;
  left: 0;
  border-radius: 50px;
  background: linear-gradient(45deg, #5b78b1, #00bfa5);
  opacity: 0.5;
  animation: float5 22s infinite ease-in-out;
  z-index: 0;
}

@keyframes float1 {
  0%,
  100% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(20px, 20px);
  }
}

@keyframes float2 {
  0%,
  100% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(-20px, 20px);
  }
}

@keyframes float3 {
  0%,
  100% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(20px, -20px);
  }
}

@keyframes float4 {
  0%,
  100% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(-20px, -20px);
  }
}

@keyframes float5 {
  0%,
  100% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(15px, 15px);
  }
}

.first-container .content {
  position: relative;
  z-index: 1;
}

.hand-sign {
  position: absolute;
  bottom: -15px;
  right: 0;
  z-index: 2;
}

/* Responsive Design */
@media (max-width: 1344px) {
  .hand-sign {
    display: none;
  }

  .text-container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
