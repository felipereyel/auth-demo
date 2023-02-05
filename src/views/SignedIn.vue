<template>
  <div v-if="error_message">
      <h1>Oops! Something went wrong</h1>
      <div>
        An unknown error ocurred.
        {{ error_message }}
      </div>
      <button @click="logout">Logout</button>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { loginCallback, logout } from "../services/auth";

const error_message = ref("");

onMounted(async () => {
  try {
    await loginCallback();
  } catch (e: any) {
    error_message.value = e.message;
  }
});
</script>
