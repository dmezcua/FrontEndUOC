<script setup>
    const props = defineProps(['data'])
</script>

<template>
    <article class="card" @click="$router.push({ name: 'info', params: { pkmnID: props.data.id } })">
        
        <div class="title">
          <h4>{{ props.data.number}}</h4>
          <h3>{{ props.data.name }}</h3>
        </div>
        <div class="imgframe">
            <img :src="props.data.spriteFront" alt="">
        </div>
        <div class="typing">
            <span v-for="type in props.data.types" class="type" :class=type>
                {{ type }}
            </span>
        </div>
    </article>
</template>

<style scoped>
    .card{
        display: flex;
        flex-direction: column;
        border: 10px solid #cccc22;
        border-radius: 5%;
        width: 140px;
        cursor: pointer;
        background: var(--bg-card)
    }
    

    .title{
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .title h4{
        font-style: italic;
    }

    img{
        width:75px;
        height: 75px;
    }

    .imgframe{
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: #ffffff;
        margin: 0 10px 5px 10px;
        border: 1px solid #222222
    }

    .typing{
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        font-size: 0.75rem;
        padding: 0.75rem 0;
    }

    .type{
        padding:0.2rem 0.4rem;
        border-radius:15%;
    }
</style>