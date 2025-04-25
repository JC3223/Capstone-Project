<template>
  <v-card class="chatbot-container pa-4">
    <v-card-title class="d-flex justify-center">
      <h2 class="header-title">Ngam AI Quotation Assistant</h2>
    </v-card-title>

    <v-card-text class="chat-history my-3" ref="chatBox">
      <div
        v-for="(message, index) in messages"
        :key="index"
        class="message"
        :class="{
          'user-message': message.startsWith('You:'),
          'ai-message': message.startsWith('AI:'),
        }"
      >
        <div class="d-flex align-center">
          <v-icon
            v-if="message.startsWith('AI:')"
            color="primary"
            size="small"
            class="mr-2"
            >mdi-robot</v-icon
          >
          <v-icon v-else color="grey-darken-1" size="small" class="mr-2"
            >mdi-account-circle</v-icon
          >
          <span>{{ message }}</span>
        </div>
      </div>
    </v-card-text>

    <div class="input-container pa-3 d-flex align-center">
      <v-textarea
        v-model="userInput"
        label="text here"
        rows="3"
        :disabled="loading"
        @keyup.enter="sendMessage"
        hide-details
        class="flex-grow-10"
      >
        <template #append-inner>
          <div class="icon-wrapper">
            <v-icon
              class="gradient-text"
              @click="triggerFileInput"
              style="cursor: pointer; margin-bottom: 8px"
            >
              mdi-paperclip
            </v-icon>
            <v-icon
              class="gradient-text"
              @click="sendMessage"
              style="cursor: pointer; margin-bottom: 8px"
            >
              mdi-send
            </v-icon>
          </div>
        </template>
      </v-textarea>

      <div class="icon-column d-flex flex-column align-center">
        <input
          type="file"
          ref="fileInput"
          style="display: none"
          @change="handleFileUpload"
          accept="image/*,video/*"
        />
      </div>
    </div>
  </v-card>
</template>

<script setup>
import { ref, onMounted, defineEmits } from "vue";
import { processMessage } from "@/api.js";

const userInput = ref("");
const messages = ref([
  "AI: Welcome to Ngam AI. What service would you like to have today?",
]);
const loading = ref(false);
const fileInput = ref(null);

const emit = defineEmits(["price-estimated"]);

const sendMessage = async () => {
  if (!userInput.value.trim() || loading.value) return;

  const userMessage = userInput.value;
  messages.value.push(`You: ${userMessage}`);
  userInput.value = "";
  loading.value = true;

  let responseAdded = false;

  try {
    const response = await processMessage(userMessage);
    if (response && response.response) {
      messages.value.push(`AI: ${response.response}`);
      responseAdded = true;
      // Emit event with the response data
      emit("price-estimated", {
        description: userMessage,
        price: parseFloat(response.response.replace("RM", "").trim()),
        quantity: 1,
      });
    } else {
      messages.value.push("AI: Sorry, I did not understand that.");
      responseAdded = true;
    }
  } catch (error) {
    if (!responseAdded) {
      messages.value.push(
        "AI: Sorry, I encountered an error. Please try again."
      );
    }
    console.error("Chat error:", error);
  } finally {
    loading.value = false;
    scrollToBottom();
  }
};

const triggerFileInput = () => {
  fileInput.value.click();
};

const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (file && file.size <= 30 * 1024 * 1024) {
    // Handle file upload logic here
    console.log("File uploaded:", file);
  } else {
    alert("File size should be less than 30MB");
  }
};

const scrollToBottom = () => {
  setTimeout(() => {
    const chatBox = document.querySelector(".chat-history");
    if (chatBox) {
      chatBox.scrollTop = chatBox.scrollHeight;
    }
  }, 100);
};

onMounted(() => {
  scrollToBottom();
});
</script>

<style scoped>
.chatbot-container {
  height: 600px;
  display: flex;
  flex-direction: column;
}

.chat-history {
  flex-grow: 1;
  overflow-y: auto;
  background-color: #f8f9fa;
  border-radius: 4px;
  padding: 16px;
  width: 100%;
}

.message {
  margin: 8px 0;
  padding: 12px;
  border-radius: 8px;
  max-width: 80%;
}

.user-message {
  background-color: #e3f2fd;
  margin-left: auto;
}

.ai-message {
  background-color: #f5f5f5;
  margin-right: auto;
}

.input-container {
  margin-top: auto;
  background-color: white;
  border-top: 1px solid rgba(0, 0, 0, 0.12);
  display: flex;
  align-items: center;
  width: 100%;
}

.v-textarea {
  flex-grow: 1;
  width: 100%;
}

.flex-grow-10 {
  flex-grow: 10;
}

.icon-column {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.icon-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.gradient-button {
  background: linear-gradient(to bottom, #00bfa5 9%, #2b4070 100%);
  color: white;
  margin-left: 3px;
}

.gradient-text {
  background: linear-gradient(to bottom, #00bfa5 9%, #2b4070 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.white--text {
  color: linear-gradient(to bottom, #00bfa5 9%, #2b4070 100%);
}

/* Custom scrollbar */
.chat-history::-webkit-scrollbar {
  width: 6px;
}

.chat-history::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.chat-history::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 3px;
}

.chat-history::-webkit-scrollbar-thumb:hover {
  background: #555;
}

.header-title {
  font-size: 24px;
  font-weight: bold;
  margin: 0;
}
</style>
