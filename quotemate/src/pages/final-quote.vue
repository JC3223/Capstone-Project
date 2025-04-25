<template>
  <section>
    <NavBar />
  </section>

  <section>
    <v-app>
      <v-navigation-drawer
        v-model="drawer"
        app
        :permanent="isHovered"
        @mouseover="isHovered = true"
        @mouseleave="isHovered = false"
        :width="isHovered ? 250 : 70"
        class="custom-drawer"
      >
        <v-list density="comfortable" color="white">
          <v-list-item
            prepend-icon="mdi-file-plus"
            title="New Quote"
          ></v-list-item>
          <v-list-item
            prepend-icon="mdi-pencil"
            title="Edit Details"
          ></v-list-item>
          <v-list-item
            prepend-icon="mdi-check-circle"
            title="Confirm Order"
          ></v-list-item>
          <v-list-item
            prepend-icon="mdi-account-question"
            title="Contact Us"
          ></v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-main>
        <v-container justify="center" class="fill-height d-flex align-center">
          <v-row class="d-flex flex-column align-center justify-center">
            <v-col cols="auto" class="d-flex flex-column align-center">
              <v-btn
                rounded="xl"
                size="large"
                color="#E15D2B"
                elevation="8"
                class="mb-4"
              >
                QUOTATION IS READY!
              </v-btn>
              <v-sheet class="d-flex justify-center" width="80%">
                <v-img
                  class="bg-grey-lighten-2 pa-3 mb-4"
                  :max-width="600"
                  aspect-ratio="16/9"
                  cover
                  src="../assets/finalQuotation/INVOICE.png"
                  style="border: 2px solid #000; border-radius: 8px"
                />
              </v-sheet>
              <div class="d-flex justify-center">
                <v-btn
                  class="text-lg mx-12"
                  height="50"
                  min-width="160"
                  density="comfortable"
                  rounded="xl"
                  color="#E15D2B"
                  elevation="8"
                  ripple
                >
                  Share
                </v-btn>
                <v-btn
                  class="text-lg mx-12"
                  height="50"
                  min-width="160"
                  density="comfortable"
                  rounded="xl"
                  color="#E15D2B"
                  elevation="8"
                  ripple
                >
                  Download
                </v-btn>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-main>
    </v-app>
    <Footer />
  </section>
</template>

<script setup>
import NavBar from "@/components/CommonComponents/NavigationBar.vue";
import Footer from "@/components/CommonComponents/Footer.vue";
import { ref } from "vue";

const drawer = ref(true);
const isHovered = ref(false);
</script>

<style scoped>
.custom-drawer {
  background: #3db0ae;
  color: black;
  transition: width 0.3s ease;
}

.custom-drawer:not(:hover) {
  overflow: hidden;
}

.v-list-item {
  padding: 16px;
  transition: background-color 0.3s ease;
}

.v-list-item:hover {
  background-color: rgba(255, 255, 255, 0.2);
  cursor: pointer;
}

.v-list-item--active {
  background-color: rgba(255, 255, 255, 0.3);
  font-weight: bold;
}

/*Crucial change: Add z-index to the icons*/
.v-list-item .v-icon {
  margin-right: 12px;
  color: white !important;
  z-index: 1 !important; /* Adjust this value if needed */
}

.v-list-item-title {
  font-size: 16px;
}
</style>
