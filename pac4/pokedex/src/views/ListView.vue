<script setup>
import {onMounted, ref, computed} from 'vue'
import PkmnCard from '../components/PkmnCard.vue';
import pokeAPI from '../services/pkmnAPI.js';
import {capitalize, getRandomIdexes, convertTypes, adjustPkmnNumber} from '../utils/utils.js'

const defaultMaxPkmn = ref(10);
const pkmnList = ref([]);
const search = ref("");

onMounted(() => {
  fetchRandomPkmn(defaultMaxPkmn.value);
})

const filteredPkmn = computed(()=>{
  return pkmnList.value.filter((pkmn) =>{
    return pkmn.name.toLowerCase().includes(search.value.toLowerCase())
  })
})

function fetchPokemon(id){

  let pokemon = {}
  pokeAPI.getPokemon(id).then((response) => {
    pokemon = {
      id: response.data.id,
      number: adjustPkmnNumber(response.data.id),
      name: capitalize(response.data.species.name),
      types: convertTypes(response.data.types),
      spriteFront: response.data.sprites.front_default
    }
    pkmnList.value.push(pokemon);
  });
}

function fetchRandomPkmn(amount){
  let indexes = getRandomIdexes(amount)
  for(let i = 0; i < amount; i++){
    fetchPokemon(indexes[i])
  }
}


</script>

<template>
  <section>
    <article class="submenu">
      <input v-model="search" type="text" placeholder="Search a Pokémon">
    </article>
  </section>
  <section class="list">
    <h2 v-if="pkmnList.length == 0">No cards match your search criteria :(</h2>
    <PkmnCard v-for="pkmn in filteredPkmn" :v-key="pkmn.id" :data="pkmn"/>
  </section>
</template>

<style>
@media (min-width: 1024px) {
  .list {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center ;
    flex-wrap: wrap;
    gap: 0.5rem;
    padding: 0 20%;
  }

  .submenu{
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin: 1rem;
  }
}
</style>
