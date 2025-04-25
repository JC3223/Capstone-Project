<template>
  <!-- v-app: Provides the basic app layout -->
  <v-app>
    <!-- NewNav: Navigation bar component -->
    <NewNav />
    <!-- v-container: Centers content and provides padding -->
    <v-container fluid style="height: calc(100vh - 64px)">
      <!-- v-row: Creates a horizontal row -->
      <v-row no-gutters style="height: 100%">
        <v-col
          v-if="$vuetify.display.mdAndUp"
          cols="12"
          md="6"
          style="background-color: #00bfa5; position: relative"
        >
          <QuotationAnimation />
        </v-col>
        <!-- v-col: Creates a column for the green background -->
        <!-- v-col: Creates a column for the signup form -->
        <v-col cols="12" md="6" class="d-flex align-center justify-center">
          <!-- v-container: Centers content within the form column -->
          <v-container>
            <!-- v-row: Creates a horizontal row for the form -->
            <v-row justify="center">
              <!-- v-col: Creates a column for the form card -->
              <v-col cols="12" sm="8" md="12">
                <!-- v-card: Wraps the form in a card -->
                <v-card
                  style="
                    border: 2px solid;
                    border-image: linear-gradient(
                      to bottom right,
                      #00bfa5,
                      #f15622
                    );
                    border-image-slice: 1;
                    border-radius: 10px;
                  "
                >
                  <!-- v-card-title: Title of the card -->
                  <v-card-title>Sign Up</v-card-title>
                  <!-- v-card-text: Contains the form elements -->
                  <v-card-text>
                    <!-- v-form: Handles form submission and validation -->
                    <v-form
                      @submit.prevent="submitForm"
                      ref="form"
                      v-model="valid"
                    >
                      <!-- v-text-field: Input field for first name -->
                      <v-text-field
                        v-model="userStore.firstName"
                        label="First Name"
                        :rules="firstNameRules"
                        required
                      ></v-text-field>
                      <!-- v-text-field: Input field for last name -->
                      <v-text-field
                        v-model="userStore.lastName"
                        label="Last Name"
                        :rules="lastNameRules"
                        required
                      ></v-text-field>
                      <!-- v-text-field: Input field for email -->
                      <v-text-field
                        v-model="userStore.email"
                        label="Email"
                        type="email"
                        :rules="emailRules"
                        required
                      ></v-text-field>
                      <!-- v-text-field: Input field for phone number -->
                      <v-text-field
                        v-model="userStore.phoneNumber"
                        label="Phone Number"
                        type="tel"
                        :rules="phoneNumberRules"
                        required
                      ></v-text-field>
                      <!-- v-btn: Submit button -->
                      <v-row justify="center" class="mb-0">
                        <v-btn
                          variant="outlined"
                          type="submit"
                          color="#00bfa5"
                          :loading="userStore.loading"
                          :disabled="userStore.loading || !valid"
                          >Sign Up</v-btn
                        >
                      </v-row>
                    </v-form>
                    <!-- v-alert: Displays error messages -->
                    <v-alert v-if="userStore.error" type="error" prominent>
                      {{ userStore.error }}
                    </v-alert>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script setup>
import { ref, computed, watch, onMounted } from "vue";
import NewNav from "../components/CommonComponents/NavigationBar.vue";
import QuotationAnimation from "../components/SignInComponents/QuotationAnimation.vue";
import { useUserStore } from "../stores/userStore";
import { useRouter } from "vue-router";

const userStore = useUserStore();
const form = ref(null);
const valid = ref(false);
const router = useRouter();

// firstNameRules: Rules for validating the first name field
const firstNameRules = [
  (v) => !!v || "First Name is required",
  (v) => /^[a-zA-Z]+$/.test(v) || "No numbers or special characters allowed",
];

// lastNameRules: Rules for validating the last name field
const lastNameRules = [
  (v) => !!v || "Last Name is required",
  (v) => /^[a-zA-Z]+$/.test(v) || "No numbers or special characters allowed",
];

// emailRules: Rules for validating the email field
const emailRules = [
  (v) => !!v || "E-mail is required",
  (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
];

// phoneNumberRules: Rules for validating the phone number field
const phoneNumberRules = [
  (v) => !!v || "Phone number is required",
  (v) =>
    /^\d{10}$/.test(v) || "Phone number must be 10 digits and numbers only",
];

// generateAccessToken: Generates a random 10-character access token
function generateAccessToken() {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let token = "";
  for (let i = 0; i < 10; i++) {
    token += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return token;
}

// submitForm: Handles form submission and user creation
const submitForm = () => {
  if (form.value) {
    form.value.validate();
    const accessToken = generateAccessToken();
    localStorage.setItem("accessToken", accessToken);
    userStore.createUser(accessToken, router);
  }
};
</script>

<style scoped>
/* Add any component-specific styles here */
</style>
