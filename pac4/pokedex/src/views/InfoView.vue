<script setup>
import { ref } from 'vue'
import pokeAPI from '../services/pkmnAPI.js';

const artURL = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/"
const props = defineProps(['pkmnID'])
const pokemon = ref({})

fetchPokemon(props.pkmnID)

function fetchPokemon(id) {

  pokeAPI.getPokemon(id).then((response) => {
    pokemon.value = {
      id: response.data.id,
      number: adjustPkmnNumber(response.data.id),
      name: capitalize(response.data.species.name),
      types: convertTypes(response.data.types),
      artwork: artURL + id + '.png',
      spriteFront: response.data.sprites.front_default,
      spriteBack: response.data.sprites.back_default,
      height: response.data.height / 10,
      weight: response.data.weight / 10,
      abilities: convertAbilities(response.data.abilities),
      hp: response.data.stats[0].base_stat,
      attack: response.data.stats[1].base_stat,
      defense: response.data.stats[2].base_stat,
      spAttack: response.data.stats[3].base_stat,
      spDefense: response.data.stats[4].base_stat,
      speed: response.data.stats[5].base_stat
    }
  });
}

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function convertTypes(typesJson) {
  let types = [];
  for (let i = 0; i < typesJson.length; i++) {
    types.push(capitalize(typesJson[i].type.name));
  }

  return types;
}

function convertAbilities(abilitiesJson) {
  let abilities = [];
  for (let i = 0; i < abilitiesJson.length; i++) {
    if (abilitiesJson[i].is_hidden) {
      abilities.push(capitalize((abilitiesJson[i].ability.name)).replace("-", " ") + " (Hidden)");

    } else {
      abilities.push(capitalize((abilitiesJson[i].ability.name)).replace("-", " "));
    }
  }

  return abilities;
}

function adjustPkmnNumber(number) {
  let pokemonNum = '#' + number.toString().padStart(4, '0');
  return pokemonNum;
}
</script>

<template>
  <div class="info">
    <div class="intro">
      <section class="header">
        <h4>{{ pokemon.number }}</h4>
        <h3>{{ pokemon.name }}</h3>
      </section>
      <section class="images">
        <img :src=pokemon.artwork alt="">
        <div class="sprites">
          <img :src=pokemon.spriteFront alt="">
          <img :src=pokemon.spriteBack alt="">
        </div>
      </section>
      <section class="typing">
        <span v-for="type in pokemon.types" class="type" :class="type">
          {{ type }}
        </span>
      </section>
    </div>
    <div class="pkmndata">
      <section class="bio">
        <article>
          <h3>Weight</h3>
          <h4>{{ pokemon.weight }} kg</h4>
        </article>
        <article>
          <h3>Height</h3>
          <h4>{{ pokemon.height }} m</h4>
        </article>
        <article>
          <h3>Abilities</h3>
          <ul>
            <li v-for="ability in pokemon.abilities">
              {{ ability }}
            </li>
          </ul>
        </article>
      </section>
      <section class="stats">
        <article>
          <h3>HP</h3>
          <h4>{{ pokemon.hp }}</h4>
        </article>
        <article>
          <h3>Attack</h3>
          <h4>{{ pokemon.attack }}</h4>
        </article>
        <article>
          <h3>Defense</h3>
          <h4>{{ pokemon.defense }}</h4>
        </article>
        <article>
          <h3>Special Attack</h3>
          <h4>{{ pokemon.spAttack }}</h4>
        </article>
        <article>
          <h3>Special Defense</h3>
          <h4>{{ pokemon.spDefense }}</h4>
        </article>
        <article>
          <h3>Speed</h3>
          <h4>  {{ pokemon.speed }}</h4>
        </article>
      </section>
    </div>
  </div>
</template>

<style scoped>
@media (min-width: 1024px) {
  .info {
    display: flex;
    flex-direction: row;
    align-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }

  .intro {
    display: flex;
    flex-direction: column;
    padding-left: 2rem;
  }

  .header {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
  }

  .header h4 {
    font-style: italic;
    font-size: 1.50rem;
  }

  .header h3 {
    font-size: 3rem;
  }

  .pkmndata{
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    width: 100%;
    height: 100%;
  }

  .pkmndata h3{
    font-size: 1.5rem;
    font-weight: 600;
  }

  .pkmndata h4{
    font-size: 1.25rem;
  }

  .bio {
    display: flex;
    flex-direction: row;
  }

  .bio article{
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-left: 1px solid #555555; 
    padding-left: 0.75rem;  
    width: 13rem;
  }

  .images {
    display: flex;
    flex-direction: row;
    justify-content: center;
    max-height: 50vh;
  }

  .sprites {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .typing{
    display: flex;
    flex-direction: row;
    justify-content: space-evenly
  }

  .type{
        padding:0.5rem 2rem;
        border-radius:15px;
        font-size: 1.5rem;
    }

  .stats {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 1rem;
    padding: 0rem 2rem 0rem 0rem;
  }

  .stats article{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #555555;
    border-radius: 15px;
  }
}
</style>
