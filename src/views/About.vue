<script setup lang="ts">
import { ref } from 'vue'

defineProps<{ msg: string }>()

const count = ref(0)
</script>

<template>
  <p class="read-more">This is about</p>
</template>

<style scoped>
.read-more {
  color: #888;
}
</style>
