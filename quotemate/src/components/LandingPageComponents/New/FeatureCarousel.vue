<template>
  <section style="height: 100vh">
    <v-row no-gutters>
      <v-col
        cols="4"
        :style="getColumnStyle('developer')"
        @click="selectImage('developer')"
      >
        <img
          src="@/assets/icons/easy.png"
          alt="Easy"
          style="width: 50px; height: 50px"
          :class="{ bounce: currentImage === 'developer' }"
        />
      </v-col>
      <v-col
        cols="4"
        :style="getColumnStyle('phone')"
        @click="selectImage('phone')"
      >
        <img
          src="@/assets/icons/coins.png"
          alt="Free To Use"
          style="width: 50px; height: 50px"
          :class="{ bounce: currentImage === 'phone' }"
        />
      </v-col>
      <v-col
        cols="4"
        :style="getColumnStyle('analytics')"
        @click="selectImage('analytics')"
      >
        <img
          src="@/assets/icons/data.png"
          alt="Based on Real Data"
          style="width: 50px; height: 50px"
          :class="{ bounce: currentImage === 'analytics' }"
        />
      </v-col>
    </v-row>
    <v-row :style="{ backgroundColor: getImageBackgroundColor() }" class="mt-0">
      <v-col
        cols="12"
        style="
          display: flex;
          justify-content: center;
          align-items: center;
          height: calc(100vh - 100px);
        "
      >
        <img
          v-if="currentImage === 'developer'"
          src="@/assets/landing/developer.svg"
          alt="Developer"
          style="max-width: 50%; max-height: 50%"
        />
        <img
          v-if="currentImage === 'phone'"
          src="@/assets/landing/phone.svg"
          alt="Phone"
          style="max-width: 50%; max-height: 50%"
        />
        <img
          v-if="currentImage === 'analytics'"
          src="@/assets/landing/analytics.svg"
          alt="Analytics"
          style="max-width: 50%; max-height: 50%"
        />
      </v-col>
    </v-row>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const currentImage = ref("developer");
const transitionOut = ref("");
const transitionIn = ref("");
let timer = null;

const selectImage = (image) => {
  transitionOut.value = currentImage.value;
  transitionIn.value = image;
  currentImage.value = image;

  setTimeout(() => {
    transitionOut.value = "";
    transitionIn.value = "";
  }, 500);

  resetTimer();
};

const startTimer = () => {
  timer = setInterval(() => {
    let nextImage;
    if (currentImage.value === "developer") {
      nextImage = "phone";
    } else if (currentImage.value === "phone") {
      nextImage = "analytics";
    } else {
      nextImage = "developer";
    }
    selectImage(nextImage);
  }, 8000);
};

const resetTimer = () => {
  clearInterval(timer);
  startTimer();
};

onMounted(() => {
  startTimer();
});

onUnmounted(() => {
  clearInterval(timer);
});

const getColumnStyle = (column) => {
  let style = {
    height: "100px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    backgroundColor: "",
    filter: "grayscale(1)",
    transition: "filter 0.5s linear",
  };

  if (column === "developer") {
    style.backgroundColor = "#5b78b1";
  } else if (column === "phone") {
    style.backgroundColor = "#00BFA5";
  } else if (column === "analytics") {
    style.backgroundColor = "#FF7F50";
  }

  if (currentImage.value === column) {
    style.filter = "none";
  }

  return style;
};

const getImageBackgroundColor = () => {
  if (currentImage.value === "developer") {
    return "#5b78b1";
  } else if (currentImage.value === "phone") {
    return "#00BFA5";
  } else {
    return "#FF7F50";
  }
};
</script>

<style scoped>
.bounce {
  animation: bounce 0.5s linear;
}

@keyframes bounce {
  0% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-10px);
  }

  100% {
    transform: translateY(0);
  }
}

.desaturating {
  filter: grayscale(1);
  transition: filter 0.5s linear;
}

.saturating {
  filter: grayscale(0);
  transition: filter 0.5s linear;
}
</style>
