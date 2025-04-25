<template>
  <div>
    <!-- Navigation Bar -->
    <NavBar />

    <!-- Main Content -->
    <v-container fluid class="py-8">
      <v-row>
        <!-- Left Side: Quotation Preview -->
        <v-col cols="12" md="">
          <v-card class="quotation-container pa-4">
            <!-- Header with Quotation Preview text -->
            <v-row class="mb-4 justify-center">
              <v-col cols="12" class="text-center">
                <h2 class="header-title">Quotation Preview</h2>
              </v-col>
            </v-row>

            <!-- Services Table -->
            <div class="services-table-container">
              <v-table class="mb-4">
                <thead>
                  <tr>
                    <th>Service Description</th>
                    <th class="text-center">Quantity</th>
                    <th class="text-right">Unit Price (RM)</th>
                    <th class="text-right">Total (RM)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(service, index) in services" :key="index">
                    <td>{{ service.description }}</td>
                    <td class="text-center">{{ service.quantity }}</td>
                    <td class="text-right">{{ service.price.toFixed(2) }}</td>
                    <td class="text-right">
                      {{ (service.price * service.quantity).toFixed(2) }}
                    </td>
                  </tr>
                </tbody>
              </v-table>

              <!-- Summary -->
              <v-divider class="mb-4"></v-divider>
              <v-row dense>
                <v-col cols="8" class="text-right">Subtotal:</v-col>
                <v-col cols="4" class="text-right"
                  >RM {{ calculateSubtotal().toFixed(2) }}</v-col
                >
              </v-row>
              <v-row dense>
                <v-col cols="8" class="text-right">Tax (6%):</v-col>
                <v-col cols="4" class="text-right"
                  >RM {{ calculateTax().toFixed(2) }}</v-col
                >
              </v-row>
              <v-row dense>
                <v-col cols="8" class="text-right font-weight-bold"
                  >Total:</v-col
                >
                <v-col cols="4" class="text-right font-weight-bold"
                  >RM {{ calculateTotal().toFixed(2) }}</v-col
                >
              </v-row>
            </div>
          </v-card>
        </v-col>

        <!-- Right Side: AI Chatbot -->
        <v-col cols="12" md="6">
          <AIChatbot @price-estimated="handlePriceEstimation" />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-row justify="center">
            <v-btn
              class="mt-3 small gradient-button"
              @click="startQuotationConfirmation"
              :loading="isLoading"
              :disabled="isLoading"
            >
              <v-icon left>mdi-check</v-icon>
              Confirm the Quotation
            </v-btn>
          </v-row>
        </v-col>
      </v-row>
    </v-container>

    <!-- loading indicator -->
    <v-overlay
      v-model="isLoading"
      :scrim="scrim"
      class="align-center justify-center"
    >
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </v-overlay>

    <v-spacer></v-spacer>

    <div v-if="showFinalisedQuotation" class="finalised-quotation">
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
            <v-sheet width="80%">
              <v-row>
                <v-col cols="8">
                  <v-img
                    class="bg-grey-lighten-2 pa-3 mb-4"
                    :max-width="600"
                    aspect-ratio="16/9"
                    cover
                    src="../assets/finalQuotation/INVOICE.png"
                    style="border: 2px solid #000; border-radius: 8px"
                  />
                </v-col>
                <v-col cols="4">
                  <v-card
                    v-if="isDisclaimerVisible"
                    class="pa-3 transition-slide-x"
                    style="float: right"
                  >
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.
                    </p>
                  </v-card>
                </v-col>
              </v-row>
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
                @mouseover="isDisclaimerVisible = true"
                @mouseleave="isDisclaimerVisible = false"
              >
                Download
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const isDisclaimerVisible = ref(false);
import NavBar from "@/components/CommonComponents/NavigationBar.vue";
import AIChatbot from "@/components/ChatbotComponents/AIChatbot.vue";
import { useRouter } from "vue-router";

const router = useRouter();

// Services list
const services = ref([
  { description: "Air Conditioning Basic Service", price: 80.0, quantity: 1 },
  { description: "Chemical Cleaning", price: 150.0, quantity: 1 },
  { description: "Gas Top-up", price: 100.0, quantity: 1 },
]);

// Calculations
const calculateSubtotal = () =>
  services.value.reduce(
    (total, service) => total + service.price * service.quantity,
    0
  );
const calculateTax = () => calculateSubtotal() * 0.06;
const calculateTotal = () => calculateSubtotal() + calculateTax();

const showFinalisedQuotation = ref(false);
const isLoading = ref(false);
const scrim = ref(true);

const startQuotationConfirmation = async () => {
  isLoading.value = true; // Show loading indicator
  await new Promise((resolve) => setTimeout(resolve, 3000)); // Simulate 3-second loading
  confirmQuotation(); // Proceed to show the quotation
  isLoading.value = false; // hide indicator
};

const confirmQuotation = () => {
  showFinalisedQuotation.value = true;
};
</script>

<style scoped>
.v-container {
  max-width: 1400px;
}

.v-card {
  border: 1px solid #e0e0e0;
}

.text-right {
  text-align: right;
}

.v-table {
  border: 1px solid #e0e0e0;
}

.quotation-container {
  height: 600px; /* Match chatbox height */
  display: flex;
  flex-direction: column;
}

.services-table-container {
  flex-grow: 1;
  overflow-y: auto;
  padding-right: 8px;
}

/* Custom scrollbar for services table */
.services-table-container::-webkit-scrollbar {
  width: 6px;
}

.services-table-container::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.services-table-container::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 3px;
}

.services-table-container::-webkit-scrollbar-thumb:hover {
  background: #555;
}

/* Gradient button style */
.gradient-button {
  width: 250px;
  background: linear-gradient(to bottom, #00bfa5 9%, #2b4070 100%);
  color: white; /* Ensure text is white for contrast */
}

/* Header title style */
.header-title {
  font-size: 24px; /* Adjust font size as needed */
  font-weight: bold;
  margin: 0;
}
.finalised-quotation {
  display: flex;
}

/* Slide-in transition */
.transition-slide-x {
  transition: transform 0.3s ease-in-out;
  transform: translateX(100%); /* Start off-screen */
}

/* Show the card when visible */
.v-card[v-if="isDisclaimerVisible"] {
  transform: translateX(0); /* Slide in */
}
</style>
