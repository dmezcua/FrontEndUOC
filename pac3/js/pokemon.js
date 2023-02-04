const knownPkmn = 1008;
const apiURL = "https://pokeapi.co/api/v2/pokemon/";
const artURL = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/"

/*Note about Pokemon.artRoute: Unlike the spriteFront attribute, which takes the sprite's URL from the fetch(), 
this one uses a more or less hardcoded solution to generate a URL to get the image, as the API creates problems
when trying to access the "original-artwork" object. This is meant as a temporary solution, as it could create
issues if the images have their host sites changed. */

class Pokemon{
    constructor(id, name, spriteFront,spriteBack, height, weight, 
        hp, attack, defense, spAttack, spDefense, speed){

            this.id = id;
            this.name = name;
            this.spriteFront = spriteFront;
            this.spriteBack = spriteBack;
            this.artRoute = "";
            this.types = [];
            this.abilities = [];
            this.height = height;
            this.weight = weight;
            this.hp = hp;
            this.attack = attack;
            this.defense = defense;
            this.spAttack = spAttack;
            this.spDefense = spDefense;
            this.speed = speed;
    }
}

async function fetchPkmn(pkmnNum){
    let y = await fetch(apiURL + pkmnNum).then(x => x.json());
    let pokemon =  new Pokemon(y.id, capitalize(y.species.name), y.sprites.front_default, 
        y.sprites.back_default, y.height, y.weight, y.stats[0].base_stat, 
        y.stats[1].base_stat, y.stats[2].base_stat, y.stats[3].base_stat, 
        y.stats[4].base_stat, y.stats[5].base_stat);

    pokemon.artRoute = artURL + pokemon.id + ".png";
    pokemon.types = convertTypes(y.types);
    pokemon.abilities = convertAbilities(y.abilities);
    return pokemon;
}


async function getRandomPkmn(max){
    let indexList = getRandomIdexes(max);
    let randomPkmn = [];

    for(let i = 0; i < indexList.length; i++){
        let pokemon = await fetchPkmn(indexList[i]);
        randomPkmn.push(pokemon);
    }

    return randomPkmn;
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

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

export {fetchPkmn, getRandomPkmn};