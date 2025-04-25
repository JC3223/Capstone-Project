<template>
  <div class="quotation-animation">
    <div class="logo-container" v-if="isAnimating">
      <img src="../../assets/logo.png" alt="Logo" class="logo" />
      <div
        class="ripple"
        :class="{ 'is-rippling': isRippling }"
        v-for="n in 2"
        :key="'ripple-' + n"
      ></div>
    </div>
    <div class="table">
      <div class="row header">
        <div class="cell">Description</div>
        <div class="cell">Quantity</div>
        <div class="cell">Price (RM)</div>
      </div>
      <div class="row" v-for="(row, index) in rows" :key="index">
        <div class="cell description">
          <div class="typing" :class="{ 'typing-done': row.done }">
            {{ row.description }}
          </div>
        </div>
        <div class="cell quantity">
          <div class="typing" :class="{ 'typing-done': row.done }">
            {{ row.quantity }}
          </div>
        </div>
        <div class="cell price">
          <div class="typing" :class="{ 'typing-done': row.done }">
            {{ row.price }}
          </div>
        </div>
      </div>
      <div class="row total">
        <div class="cell description">Total Costs</div>
        <div class="cell quantity"></div>
        <div class="cell price">{{ totalCost }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";

const rows = ref([]);
const totalCost = computed(() => {
  return rows.value.reduce((sum, row) => sum + row.price, 0);
});
const isAnimating = ref(false);
const isRippling = ref(false);

onMounted(() => {
  const initialRows = [
    { description: "Plumbing Repair", quantity: 1, price: 150 },
    { description: "Electrical Wiring", quantity: 2, price: 200 },
    { description: "Labour Charge", quantity: 1, price: 100 },
    { description: "Transportation Costs", quantity: 1, price: 50 },
  ];

  let i = 0;
  const addRow = () => {
    if (i < initialRows.length) {
      rows.value.push({ ...initialRows[i], done: false });
      setTimeout(() => {
        rows.value[i].done = true;
        i++;
        addRow();
      }, 1500);
    } else {
      setTimeout(() => {
        let j = initialRows.length - 1;
        const deleteRow = () => {
          if (j >= 0) {
            rows.value.pop();
            j--;
            setTimeout(deleteRow, 250);
          } else {
            setTimeout(() => {
              rows.value = [];
              i = 0;
              isRippling.value = false; // Stop rippling
              startAnimation(); // Restart animation
            }, 4000); // Delay after deleting
          }
        };
        deleteRow();
      }, 2000);
    }
  };

  const startAnimation = () => {
    isAnimating.value = true; // Start animation
    isRippling.value = true; // Start rippling
    addRow();
  };

  const stopAnimation = () => {
    isAnimating.value = false;
    isRippling.value = false;
  };

  setTimeout(() => {
    startAnimation();
  }, 2000); // Delay on page load
});
</script>

<style scoped>
.quotation-animation {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: sans-serif;
}

.logo-container {
  position: absolute;
  top: 50px;
  left: 50%;
  transform: translateX(-50%);
  width: 100px;
  height: 100px;
  margin-bottom: 20px;
}

.logo {
  width: 100%;
  position: relative;
  z-index: 1;
}

.ripple {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 4px solid rgba(255, 255, 255, 0.7);
  transform: scale(0);
  opacity: 0;
  animation: ripple-effect 2s linear infinite; /* Infinite ripple, 50% slower */
}

.ripple:nth-child(1) {
  animation-delay: 0.2s;
}

.ripple:nth-child(2) {
  animation-delay: 0.4s;
}

@keyframes ripple-effect {
  0% {
    transform: scale(0);
    opacity: 1;
  }
  100% {
    transform: scale(1.5);
    opacity: 0;
  }
}

.table {
  width: 90%;
  border-collapse: separate;
  border-spacing: 0;
  margin: 180px 20px 20px 20px; /* Add margin-top to push the table down */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
}

.row {
  display: flex;
  background-color: #fff;
}

.header {
  font-weight: 600;
  background-color: #f8f9fa;
  color: #333;
}

.cell {
  border: none;
  padding: 12px 16px;
  text-align: left;
  flex: 1;
  color: #555;
}

.row:not(:last-child) {
  border-bottom: 1px solid #eee;
}

.typing {
  overflow: hidden;
  white-space: nowrap;
  animation: typing 1.5s steps(20, end) forwards;
}

.typing-done {
  animation: none;
}

@keyframes typing {
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
}

.total {
  font-weight: bold;
  background-color: #e9ecef;
}

.is-rippling .ripple {
  animation-play-state: running;
}
</style>
