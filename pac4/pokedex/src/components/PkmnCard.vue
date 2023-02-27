<script setup>
    const props = defineProps(['data'])
</script>

<template>
    <article class="card" @click="$router.push({ name: 'info', params: { pkmnID: props.data.id } })">
        <div class="title">
          <h4>{{ props.data.number}}</h4>
          <h3>{{ props.data.name }}</h3>
        </div>
        <img :src="props.data.spriteFront" alt="">
        <div class="typing">
            <span v-for="type in props.data.types">
                {{ type }}
            </span>
        </div>
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
        width: 125px;
        height: 175px;
        cursor: pointer;
    }

    img{
        width:75px;
        height: 75px;
    }
</style>