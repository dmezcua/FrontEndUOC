<script setup>
  const props = defineProps(['pkmnID'])
</script>

<template>
  <div class="info">
    <h1>This is the info page for pokemon number: {{props.pkmnID}} </h1>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .info {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
