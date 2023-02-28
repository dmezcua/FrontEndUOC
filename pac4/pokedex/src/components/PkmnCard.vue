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

    .Normal{
    background-color: #b8d494;
    color: #000000;
    }

    .Grass{
        background-color: #44FF44;
        color: #000000;
    }

    .Fire{
        background-color: #ff3300;
        color: #FFFFFF;
    }

    .Water{
        background-color: #4444FF;
        color: #FFFFFF;
    }

    .Flying{
        background: linear-gradient(180deg, #3dc7ef 50%, #bdb9b8 50%);
        background-color: #3dc7ef;
    
        color: #000000;
    }

    .Fighting{
        background-color: #c24d22;
        color: #FFFFFF;
    }

    .Poison{
        background-color: #550055;
        color: #FFFFFF;
    }

    .Electric{
        background-color: #AAAA00;
        color: #000000;
    }

    .Ground{
        background: linear-gradient(180deg, #a0a061 50%, #69471d 50%);
        background-color: #69471d;
        color: #000000;
    }

    .Rock{
        background-color: #776b24;
        color: #FFFFFF;
    }

    .Psychic{
        background: linear-gradient(180deg, #f329f3 50%, #631663  50%);
        background-color: #631663;
        color: #FFFFFF;
    }

    .Ice{
        background-color: #69c2c2;
        color: #000000;
    }

    .Bug{
        background-color: #96fa24;
        color: #000000;
    }

    .Ghost{
        background-color: #aa00FF;
        color: #FFFFFF;
    }

    .Steel{
        background: linear-gradient(180deg, #999999 50%, #444444 50%);
        color: #000000;
    }

    .Dragon{
        background: linear-gradient(180deg, #4e86ff 50%, #5d1566 50%);
        background-color: #4e86ff ;
        color: #FFFFFF;
    }

    .Dark{
        background-color: #222222;
        color: #FFFFFF;
    }

    .Fairy{
        background-color: #f798a8;
        color: #000000;
    }
</style>