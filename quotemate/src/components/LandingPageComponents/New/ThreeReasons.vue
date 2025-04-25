<template>
  <v-container class="why-choose-us-container">
    <div class="image-container">
      <img src="@/assets/landing/thinking-person.svg" alt="Thinking Person" />
    </div>

    <v-card class="card card-left" color="#5b78b1">
      <img src="@/assets/icons/easy.png" alt="Easy" class="card-image" />
      <div class="card-text">Intuitive and Simple</div>
    </v-card>
    <v-card class="card card-bottom" color="#00BFA5">
      <img
        src="@/assets/icons/coins.png"
        alt="Free To Use"
        class="card-image"
      />
      <div class="card-text">Free To Use</div>
    </v-card>
    <v-card class="card card-right" color="#FF7F50">
      <img
        src="@/assets/icons/data.png"
        alt="Based on Real Data"
        class="card-image"
      />
      <div class="card-text">Based on Real Data</div>
    </v-card>
  </v-container>
</template>

<script setup></script>

<style scoped>
.why-choose-us-container {
  background-color: white;
  height: 100vh;
  position: relative;
}

.image-container {
  position: absolute;
  top: 38%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.card {
  position: absolute;
  width: 264px;
  height: 264px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  border-radius: 20px;
  transition: transform 0.3s ease;
}

.card:hover {
  transform: translateY(-30px);
}

.card-image {
  width: 92.4px;
  margin-bottom: 10px;
}

.card-text {
  text-align: center;
  font-size: 23.76px;
}

.card-left {
  top: 40%;
  left: 90px;
}

.card-bottom {
  bottom: 5%;
  left: 50%;
  margin-left: -132px;
}

.card-right {
  top: 40%;
  right: 90px;
}
</style>
