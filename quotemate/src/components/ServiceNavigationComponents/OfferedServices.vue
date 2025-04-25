<template>
  <v-carousel-item>
    <v-row>
      <v-col>
        <img
          :src="services.imageSrc"
          :alt="services.altText"
          class="carousel-img"
        />
      </v-col>
      <v-col>
        <v-card class="service-card">
          <v-card-title class="service-title">{{
            services.title
          }}</v-card-title>
          <v-card-text class="service-description">
            {{ services.description }}
          </v-card-text>
          <v-btn variant="text">Let's Get Started!</v-btn>
        </v-card>
      </v-col>
    </v-row>
  </v-carousel-item>
</template>

<script setup>
const props = defineProps({
  services: {
    type: Array,
    required: true,
    default: () => [],
  },
});
</script>

<style scoped>
.carousel-img {
  width: 520px;
  height: 500px;
}
.service-card {
  height: inherit;
}

.service-title {
  font-family: "Courier Prime", serif;
}

.service-description {
  font-family: "Inter", serif;
}

.inherit-height {
  height: inherit;
}
</style>
