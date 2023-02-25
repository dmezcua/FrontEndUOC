<script setup>
    const props = defineProps(['data'])
    console.log("Rendering " + props.data.name + " card");
</script>

<template>
    <article class="card" @click="$router.push({ name: 'info', params: { pkmnID: props.data.id } })">
        <h2>{{ props.data.name }}</h2>
        <h4>#{{ props.data.id }}</h4>
        <h3>Typing:</h3>
        <p>{{ props.data.type }}</p>
    </article>
</template>

<style scoped>
    .card{
        display: flex;
        flex-direction: column;
        border: 2px solid black;
        border-radius: 5%;
        overflow: hidden;
        box-shadow: 0 0 5px 5px #eeeeee;
        width: 150px;
        height: 225px;
        cursor: pointer;
    }
</style>