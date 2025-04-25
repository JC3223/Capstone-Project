<template>
  <div class="position-wrapper">
    <!--Header-->
    <section>
      <NavBar></NavBar>
    </section>

    <!--Body-->
    <section>
      <!-- Decorative Squares -->
      <div class="funky-square-one"></div>
      <div class="funky-square-two"></div>
      <div class="funky-square-three"></div>
      <v-container>
        <!-- Title Card -->
        <v-card class="data-table-card">
          <v-card-title>
            <h2 class="title-card">
              Your Quotations
              <v-icon
                icon="mdi-refresh"
                @click="refreshQuotations"
                class="refresh-icon"
              ></v-icon>
            </h2>
            <v-spacer></v-spacer>

            <!--Search Field-->

            <div class="search-border">
              <div class="search-field">
                <v-text-field
                  v-model="search"
                  label="Search"
                  variant="flat"
                  single-line
                  hide-details
                  :disabled="quotationStore.quotations.length === 0"
                  @click="onSearchFocused"
                  @blur="onSearchBlurred"
                ></v-text-field>
              </div>
            </div>

            <!-- append-icon="mdi-magnify" -->
          </v-card-title>

          <!--Date Table to Display Created Quotations-->
          <v-data-table
            :headers="headers"
            :items="quotationStore.quotations"
            :search="search"
            :loading="quotationStore.loading"
            :items-per-page="10"
            :sort-desc="false"
            class="elevation-1 data-table data-table-header"
            v-if="quotationStore.quotations.length > 0"
          >
            <!--Actions Column with 'View' and 'Delete' Buttons-->
            <template v-slot:item.actions="{ item }">
              <!--View Button-->
              <v-btn
                @click="viewQuotation(item)"
                class="view-btn"
                variant="text"
                >View</v-btn
              >

              <!--Delete Button-->
              <v-btn
                @click="openDeletionDialog(item)"
                class="delete-btn"
                variant="text"
                >Delete</v-btn
              >
              <v-dialog v-model="item.dialog" max-width="500">
                <v-card>
                  <v-card-title class="headline">Confirm Deletion</v-card-title>
                  <v-card-text
                    >Are you sure you want to delete this
                    quotation?</v-card-text
                  >
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="green darken-1"
                      text
                      @click="item.dialog = false"
                      >Cancel</v-btn
                    >
                    <v-btn
                      color="red darken-1"
                      text
                      @click="confirmDeletion(item)"
                      >Delete</v-btn
                    >
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </template>
          </v-data-table>

          <!--Displays Message when No Quotations Exist-->
          <v-card v-else>
            <v-card-title primary-title class="text-center pa-8">
              Looks like you don't have any quotations made.<br />
              Let's make one together.
            </v-card-title>
            <div class="text-center">
              <v-btn
                variant="text"
                color="#00BFA5"
                class="mb-3"
                @click="goToQuotationPage"
              >
                <strong>Generate New Quotation</strong>
              </v-btn>
            </div>
          </v-card>

          <!--Error Alert-->
          <v-alert v-if="quotationStore.error" type="error">
            {{ quotationStore.error }}
          </v-alert>
        </v-card>

        <!-- Image Card -->
        <v-card v-if="selectedImage" class="image-card">
          <v-img
            aspect-ratio="16/9"
            cover
            :src="selectedImage"
            class="quotation-img"
          ></v-img>
          <v-card class="quotation-img-opt">
            <v-btn variant="text" class="download-btn">Download</v-btn>
            <v-btn variant="text" class="edit-btn">Edit</v-btn>
            <v-btn
              v-if="$vuetify.display.smAndDown"
              variant="text"
              class="cancel-btn"
              @click="clearSelectedImage"
              >Cancel</v-btn
            >
          </v-card>
        </v-card>
      </v-container>
    </section>
  </div>
</template>

<script setup>
//Import Section
import NavBar from "@/components/CommonComponents/NavigationBar.vue";
import { useQuotationInfoStore } from "@/stores/quotationInfoStore";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

//Variables Section
const search = ref("");
const quotationStore = useQuotationInfoStore();
const router = useRouter();
const headers = [
  { title: "Quotation ID", key: "qID" },
  { title: "Title", key: "qTitle" },
  {
    title: "Date Created",
    key: "qDate",
  },
  { title: " ", key: "actions", sortable: false },
];
const selectedImage = ref(null);

//Fetches Quotation from the Database on Page Load
onMounted(() => {
  funkySquareOne();
  funkySquareTwo();
  funkySquareThree();
  quotationStore.fetchQuotations();
  console.log(quotationStore.fetchQuotations());
});

//Linked to 'View' Button
const viewQuotation = (item) => {
  console.log("View", item);
  if (selectedImage.value === item.qImgLink) {
    selectedImage.value = null; // Hide the image if it's already visible
  } else {
    selectedImage.value = item.qImgLink; // Show the image if it's hidden
  }

  // Toggle the 'side-card' class on the data table's v-card
  const dataTableCard = document.querySelector(".data-table-card");
  if (dataTableCard) {
    if (selectedImage.value) {
      dataTableCard.classList.add("side-card");
    } else {
      dataTableCard.classList.remove("side-card");
    }
  }
};
//Linked to 'Delete' Button to Toggle the Confirm Deletion Dialog
const openDeletionDialog = (item) => {
  item.dialog = true;
  quotationStore.selectedQuotation = item;
  console.log("Open Deletion Dialog for", item.qID);
};

//Calls on quotationInfoStore to Delete Quotation from Database
const deleteQuotation = (item) => {
  console.log("Delete", item.qID);
  quotationStore.deleteQuotation(item.qID);
};

//Confirms Deletion
const confirmDeletion = () => {
  quotationStore.selectedQuotation.dialog = false;
  deleteQuotation(quotationStore.selectedQuotation);
};

const onSearchFocused = () => {
  setTimeout(() => {
    const searchBorder = document.querySelector(".search-border");
    if (searchBorder) {
      searchBorder.style.borderWidth = "5px";
    }
  }, 200); // Adjust the timeout duration to match the animation duration
};

const onSearchBlurred = () => {
  const searchBorder = document.querySelector(".search-border");
  if (searchBorder) {
    searchBorder.style.borderWidth = "3px";
  }
};

const funkySquareOne = () => {
  const randomPosX = Math.floor(Math.random() * (40 - -20 + 1)) + -20;
  const randomPosY = Math.floor(Math.random() * 431);
  const randomRot = Math.floor(Math.random() * 360);
  const squarePos = document.querySelector(".funky-square-one");
  if (squarePos) {
    squarePos.style.left = `${randomPosX}px`;
    squarePos.style.top = `${randomPosY}px`;
    squarePos.style.rotate = `${randomRot}deg`;
  }
};

const funkySquareTwo = () => {
  const randomPosX = Math.floor(Math.random() * (40 - -20 + 1)) + -20;
  const randomPosY = Math.floor(Math.random() * 431);
  const randomRot = Math.floor(Math.random() * 360);
  const randomTiming = Math.floor(Math.random() * 4);
  const squarePos = document.querySelector(".funky-square-two");
  if (squarePos) {
    squarePos.style.right = `${randomPosX}px`;
    squarePos.style.top = `${randomPosY}px`;
    squarePos.style.rotate = `${randomRot}deg`;
  }
};

const funkySquareThree = () => {
  const randomPosX = Math.floor(Math.random() * (1550 - 1080 + 1)) + 500;
  const randomPosY = Math.floor(Math.random() * 431);
  const randomRot = Math.floor(Math.random() * 360);
  const squarePos = document.querySelector(".funky-square-three");
  if (squarePos) {
    squarePos.style.left = `${randomPosX}px`;
    squarePos.style.top = `${randomPosY}px`;
    squarePos.style.rotate = `${randomRot}deg`;
  }
};

const goToQuotationPage = () => {
  router.push("/quotation");
};

const clearSelectedImage = () => {
  selectedImage.value = null;
  const dataTableCard = document.querySelector(".data-table-card");
  if (dataTableCard) {
    dataTableCard.classList.remove("side-card");
  }
};

const refreshQuotations = () => {
  quotationStore.fetchQuotations();
};
</script>

<style scoped>
/* Style for side card */
.v-overlay__content[data-item-id] .v-card.side-card {
  width: 50% !important;
  position: absolute !important;
  left: 0 !important;
}

/* Body Section Styling */
/* Body Section Styling */
.position-wrapper {
  position: relative;
  z-index: 0;
}

/* Title Card Styling */
.title-card {
  color: black;
  font-family: "Courier Prime", serif;
}

/* Search Field Styling */
.search-field {
  font-family: "Inter", serif;
  z-index: 1;
}

.search-border {
  width: inherit;
  height: inherit;
  border: solid 3px transparent;
  border-radius: 10px;
  background-image: linear-gradient(white, white),
    linear-gradient(to right, #00bfa5, #5b78b1);
  background-origin: border-box;
  background-clip: content-box, border-box;
  z-index: 2;
}

.search-border:hover {
  animation: 0.2s focus-search forwards;
}

@keyframes focus-search {
  0% {
    border-width: 2px;
  }

  25% {
    border-width: 4px;
  }

  50% {
    border-width: 5px;
  }

  75% {
    border-width: 6px;
  }

  100% {
    border-width: 5px;
  }
}

@keyframes unfocus-search {
  0% {
    border-width: 5px;
  }

  25% {
    border-width: 6px;
  }

  50% {
    border-width: 5px;
  }

  75% {
    border-width: 4px;
  }

  100% {
    border-width: 3px;
  }
}

/* Quotation Actions Styling */

.view-btn {
  font-family: "Inter", serif;
  margin-right: 2em;
  color: #00bfa5;
}

.delete-btn {
  font-family: "Inter", serif;
  color: #f15622;
}

.download-btn {
  font-family: "Inter", serif;
  margin-right: 2em;
  margin-top: 0.5em;
  margin-bottom: 0.5em;
  color: #00bfa5;
}

.edit-btn {
  font-family: "Inter", serif;
  margin-top: 0.5em;
  margin-bottom: 0.5em;
  color: #5b78b1;
}
.cancel-btn {
  font-family: "Inter", serif;
  color: #f15622;
}

/* Image Overlay Styling */

.quotation-img {
  margin-top: 2em;
  width: 330px;
  height: 501px;
}
.quotation-img-opt {
  margin: 1em;
  display: flex;
  justify-content: center;
  align-items: center;
}
/* Decorative Squares Styling */

.funky-square-one {
  position: absolute;
  z-index: -1;
  width: 320px;
  height: 480px;
  border-radius: 20px;
  background: linear-gradient(to bottom, #00bfa5, #5b78b1);
  opacity: 40%;
  animation: idle-anim 5s infinite;
}

.funky-square-two {
  position: absolute;
  z-index: -1;
  width: 320px;
  height: 480px;
  border-radius: 20px;
  background: linear-gradient(to bottom, #00bfa5, #5b78b1);
  opacity: 40%;
  animation: idle-anim 5s infinite;
}

.funky-square-three {
  position: absolute;
  z-index: -1;
  width: 320px;
  height: 480px;
  border-radius: 20px;
  background: linear-gradient(to bottom, #00bfa5, #5b78b1);
  opacity: 40%;
  animation: idle-anim 5s infinite;
}
@keyframes idle-anim {
  0% {
    transform: translateX(0) translateY(0);
  }
  50% {
    transform: translateX(10px) translateY(-10px);
  }
  100% {
    transform: translateX(0) translateY(0);
  }
}
/* Data Table Styling */
.data-table {
  z-index: 0;
}

.data-table-header {
  font-family: "Inter", serif;
}

.v-container {
  display: flex;
}

.image-card {
  width: 50%;
  min-width: 50%;
  margin-left: 2em;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.quotation-img {
  margin-top: 2em;
  width: 330px;
  height: 501px;
  margin-left: auto;
  margin-right: auto;
}

.quotation-img-opt {
  margin: 1em;
  display: flex;
  justify-content: center;
  align-items: center;
}

.data-table-card {
  width: 100%; /* Make the data table card 100% width by default */
  transition: width 0.3s ease-in-out; /* Add a transition for the width property */
}

.data-table-card.side-card {
  width: 50%; /* Make the data table card 50% width when side-card is applied */
}

@media (max-width: 768px) {
  .v-container {
    flex-direction: column;
  }

  .image-card {
    width: 100%;
    min-width: 100%;
    margin-left: 0;
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10;
  }

  .quotation-img {
    width: 80%;
    height: auto;
  }

  .data-table-card.side-card {
    width: 100%;
  }
}
.refresh-icon:hover {
  color: #5b78b1;
  animation: rotate 0.3s linear forwards;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
