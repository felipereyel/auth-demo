<script setup lang="ts">
import Header from '../components/Header.vue';
import { getUser } from '../services/auth';
import { User } from 'oidc-client-ts';
import { ref } from 'vue';

const user = ref<User| null>(null);
getUser().then((u) => user.value = u);

</script>

<template>
  <Header></Header>

  <h1>Home</h1>

  <p v-if="user">Welcome {{ user?.profile?.name }}!</p>
  <p v-else>You are not logged in.</p>
</template>
