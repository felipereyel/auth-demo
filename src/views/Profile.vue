<script setup lang="ts">
import Header from '../components/Header.vue';
import { getUser, logout } from '../services/auth';
import { User } from 'oidc-client-ts';
import { ref } from 'vue';

const user = ref<User| null>(null);
getUser().then((u) => user.value = u);

</script>

<template>
  <Header></Header>
  <h2>Profile</h2>
  <div v-if="user">
    <p>Name: {{ user?.profile?.name }}</p>
    <p>Email: {{ user?.profile?.email }}</p>
    <button @click="logout">Logout</button>
  </div>
</template>
