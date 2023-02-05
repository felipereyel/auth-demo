<template>
  <div></div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import router from "../router";
import { logoutCallback } from "../services/auth";

onMounted(async () => {
  try {
    await logoutCallback();
  } finally {
    router.push("/");
  }
});
</script>
