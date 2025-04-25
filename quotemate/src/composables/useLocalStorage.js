// src/composables/useAuth.js

useLocalStorage;
export function useLocalStorage(key, defaultValue) {
  const storedValue = localStorage.getItem(key);
  const value = ref(storedValue ? JSON.parse(storedValue) : defaultValue);
  watch(value, (newValue) => {
    localStorage.setItem(key, JSON.stringify(newValue));
  });
  return value;
}
