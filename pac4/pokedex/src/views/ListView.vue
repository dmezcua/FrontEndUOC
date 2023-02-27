<script setup>
import {onMounted, ref, computed} from 'vue'
import PkmnCard from '../components/PkmnCard.vue';
import pokeAPI from '../services/pkmnAPI.js';

const defaultMaxPkmn = ref(10);
const knownPkmn = 1008;
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

function getRandomIdexes(maxIndex){
    let indexList = [];
    let rndmNum;
    let i = 0;

    while(i < maxIndex){
        rndmNum = Math.floor(Math.random(knownPkmn) * knownPkmn);
        if(!indexList.includes(rndmNum)){
            indexList.push(rndmNum);
            i++
        }
    }
    indexList.sort(function(a, b){return a-b});
    return indexList;
}

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function convertTypes(typesJson){
    let types = [];
    for(let i = 0; i < typesJson.length; i++){
        types.push(capitalize(typesJson[i].type.name));
    }

    return types;
}

function adjustPkmnNumber(number){
    let pokemonNum = '#' + number.toString().padStart(4,'0');
    return pokemonNum;
}

</script>

<template>
  <section>
    <input v-model="search" type="text" placeholder="Search a Pokémon">
    {{ search }}
  </section>
  <section class="list">
    <h2 v-if="pkmnList.length == 0">No cards match your search criteria :(</h2>
    <PkmnCard v-for="pkmn in filteredPkmn" :v-key="pkmn.id" :data="pkmn"/>

  </section>
</template>

<style>
@media (min-width: 1024px) {
  .list {
    width: 90vw;
    display: flex;
    align-items: center;
    justify-content: center ;
    flex-wrap: wrap;
  }
}
</style>
