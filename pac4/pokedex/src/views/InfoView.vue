<script setup>
  import {ref} from 'vue'
  import pokeAPI from '../services/pkmnAPI.js';

  const props = defineProps(['pkmnID'])
  const pokemon =ref({})

  fetchPokemon(props.pkmnID)

function fetchPokemon(id){

  pokeAPI.getPokemon(id).then((response) => {
    pokemon.value = {
      id: response.data.id,
      number: adjustPkmnNumber(response.data.id),
      name: capitalize(response.data.species.name),
      types: convertTypes(response.data.types),
      spriteFront: response.data.sprites.front_default,
      spriteBack: response.data.sprites.back_default,
      height: response.data.height,
      weight: response.data.weight,
      abilities:convertAbilities(response.data.abilities),
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

function convertTypes(typesJson){
    let types = [];
    for(let i = 0; i < typesJson.length; i++){
        types.push(capitalize(typesJson[i].type.name));
    }

    return types;
}

function convertAbilities(abilitiesJson){
    let abilities =[];
    for(let i = 0; i < abilitiesJson.length; i++){
        if(abilitiesJson[i].is_hidden){
            abilities.push(capitalize((abilitiesJson[i].ability.name)).replace("-"," ") + " (Hidden)");

        } else {
            abilities.push(capitalize((abilitiesJson[i].ability.name)).replace("-"," "));
        }
    }

    return abilities;
}

function adjustPkmnNumber(number){
    let pokemonNum = '#' + number.toString().padStart(4,'0');
    return pokemonNum;
}
</script>

<template>
  <div class="info">
    <section class="header">
      <h4>{{ pokemon.number }}</h4>
      <h2>{{ pokemon.name }}</h2>
    </section>
    <img src="" alt="">
    <section class="images">
      <img :src=pokemon.spriteFront alt="">
      <img :src=pokemon.spriteBack alt="">
    </section>
    <section class="typing">
      <span v-for="type in pokemon.types">
        {{ type }}
      </span>
    </section>
    <section class="bio">
      <article>
        <h3>Weight</h3>
        {{ pokemon.weight }}
      </article>
      <article>
        <h3>Height</h3>
        {{ pokemon.height }}
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
         {{ pokemon.hp }}
      </article>
      <article>
        <h3>Attack</h3>
        {{ pokemon.attack }}
      </article>
      <article>
        <h3>Defense</h3>
        {{ pokemon.defense }}
      </article>
      <article>
        <h3>Special Attack</h3>
        {{ pokemon.spAttack }}
      </article>
      <article>
        <h3>Special Defense</h3>
        {{ pokemon.spDefense }}
      </article>
      <article>
        <h3>Speed</h3>
        {{ pokemon.speed }}
      </article>
    </section>
  </div>
</template>

<style scoped>
@media (min-width: 1024px) {
  .info {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-content: center;
    align-items: center;
  }

  .header{
    display: flex;
    flex-direction: row;
  }

  .bio{
    display: flex;
    flex-direction: row;
  }

  .images{
    display: flex;
    flex-direction: row;
  }
  
  .stats{
    display: flex;
    flex-direction: row;
  }
}
</style>
