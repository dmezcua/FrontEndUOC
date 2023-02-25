<script setup>
import {onMounted, ref} from 'vue'
import PkmnCard from '../components/PkmnCard.vue';
import pokeAPI from '../services/pkmnAPI.js';

const pkmnList = ref([])

onMounted(() => {
  const pokemon = ref({});
  pokemon.value = fetchPokemon(4);
  console.log("onMounted results:")
  console.log(pokemon.value);
})

function fetchPokemon(id){
  var pokemon = {}
  pokeAPI.getPokemon(id).then((response) => {
    pokemon = {
      id: response.data.id,
      name: response.data.name,
      spriteFront: response.data.sprites.front_default,
      spriteBack: response.data.sprites.back_default,
      height: response.data.height,
      weight: response.data.weight,
      hp: response.data.stats[0].base_stat,
      attack: response.data.stats[1].base_stat,
      deffense: response.data.stats[2].base_stat,
      spAttack: response.data.stats[3].base_stat,
      spDeffense: response.data.stats[4].base_stat,
      speed: response.data.stats[5].base_stat
    }
    console.log("fetchPokemon results:")
    console.log(pokemon);
    return pokemon;
  })
}

</script>

<template>
  <section class="list">
    <h2 v-if="pkmnList.length == 0">No cards match your search criteria :(</h2>
    <PkmnCard v-for="pkmn in pkmnList" :v-key="pkmn.id" :data="pkmn"/>

  </section>
</template>

<style>
@media (min-width: 1024px) {
  .list {
    background-color: red;
    display: flex;
    align-items: center;
    justify-content: space-around ;
  }
}
</style>
