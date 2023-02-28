<script setup>
import { onMounted } from 'vue';

onMounted(() => {
  if(window.localStorage.getItem('pkmns')){
    window.localStorage.removeItem('pkmns');
  }
})
</script>

<template>
  <main class="home">
    <img src="@/assets/img/welcome.jpg" alt="">
    <h2>Welcome to the Pokédex built with Vue</h2>
  </main>
</template>

<style scoped>
  .home{
    display: flex;
    height: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .home img{
    max-height: 70vh;
  }
</style>
