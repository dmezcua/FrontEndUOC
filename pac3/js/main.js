import {fetchPkmn, getRandomPkmn} from "./pokemon.js";

const maxPkmnFetch = 10;

var params = new URLSearchParams(document.location.search);
var pokeID = params.get("pokeID");
var pokemonList = [];
var info = document.querySelector('.info');
var deck = document.querySelector('#deck');

var pkmnName = document.querySelector('.infoName');
var pkmnNumber = document.querySelector('.infoNumber');
var pkmnArt = document.querySelector('.infoArt');
var pkmnWeight = document.getElementById('infoWeight');
var pkmnHeight = document.getElementById('infoHeight');
var pkmnAbilities = document.querySelector('.infoAbilities');
var pkmnHP = document.getElementById('infoHp');
var pkmnAtk = document.getElementById('infoAtk');
var pkmnDef = document.getElementById('infoDef');
var pkmnSpAtk = document.getElementById('infoSpAtk');
var pkmnSpDef = document.getElementById('infoSpDef');
var pkmnSpd = document.getElementById('infoSpd');
var pkmnFront = document.querySelector('.infoFront');
var pkmnBack = document.querySelector('.infoBack');
var infoTyping= document.querySelector('.infoTyping');


//Website main code
if(pokeID){
    var pokemon = await fetchPkmn(pokeID);
    pokemonList.push(pokemon);
    printPkmn(pokemon);
} else {
    pokemonList = await getRandomPkmn(maxPkmnFetch)
    for(let i = 0; i < pokemonList.length; i++) printPkmn(pokemonList[i]);
}


//Functions

function printPkmn(pokemon){
    const temp = document.getElementById('template');
    const cardTemplate = temp.content.cloneNode(true);

    let card = cardTemplate.querySelector('.card');
    let pkmnImg = cardTemplate.querySelector('.pkmnImg');
    let pkmnNumber = cardTemplate.querySelector('.pkmnNumber');
    let pkmnName = cardTemplate.querySelector('.pkmnName');
    let pkmnTyping = cardTemplate.querySelector('.pkmnTyping');

    card.setAttribute('id', pokemon.id);
    card.setAttribute('tabindex', '0');
    if(pokemon.spriteFront){
      pkmnImg.setAttribute('src', pokemon.spriteFront);
    } else{
        pkmnImg.setAttribute('src', pokemon.artRoute);
    }
    pkmnNumber.textContent = adjustPkmnNumber(pokemon.id);
    pkmnName.textContent = pokemon.name;

    for(let i = 0; i < pokemon.types.length; i++){
        let span = document.createElement("SPAN");
        span.innerHTML = pokemon.types[i];
        span.classList.add('type');
        span.classList.add(`type${pokemon.types[i]}`);
        pkmnTyping.appendChild(span);
    }

    card.addEventListener('focus', function(){
        let selectPkmn = pokemonList.find(x => x.id == pokemon.id);
        printInfo(selectPkmn);
        deck.style.gridColumn = '1 / 2';
        info.style.display = 'flex';
    })

    card.addEventListener('blur', function(){
        deck.style.gridColumn = '1 / 3';
        info.style.display = 'none';
        clearInfo();    
    })

    deck.appendChild(cardTemplate);
}

function printInfo(pokemon){
    pkmnNumber.innerHTML = adjustPkmnNumber(pokemon.id);
    pkmnName.innerHTML = pokemon.name;
    pkmnWeight.innerHTML = pokemon.weight;
    pkmnHeight.innerHTML = pokemon.height;
    pkmnHP.innerHTML = pokemon.hp;
    pkmnAtk.innerHTML = pokemon.attack;
    pkmnDef.innerHTML = pokemon.defense;
    pkmnSpAtk.innerHTML = pokemon.spAttack;
    pkmnSpDef.innerHTML = pokemon.spDefense;
    pkmnSpd.innerHTML = pokemon.speed;

    if(!pokemon.spriteFront && !pokemon.spriteBack){
        pkmnArt.style.gridColumn = '1 / 3';
        pkmnFront.style.display = 'none';
        pkmnBack.style.display = 'none'
    }else{
        pkmnArt.style.gridColumn = '1 / 2';
        if(pokemon.spriteFront){
            pkmnFront.style.display = 'flex';
            let img = document.createElement('IMG');
            img.setAttribute('src', pokemon.spriteFront);
            pkmnFront.appendChild(img);
        } else{
            pkmnFront.style.display = 'none';
        }
        if(pokemon.spriteBack){
            pkmnBack.style.display = 'flex';
            let img = document.createElement('IMG');
            img.setAttribute('src', pokemon.spriteBack);
            pkmnBack.appendChild(img);
        }else{
            pkmnBack.style.display = 'none';
        }
    }

    let img = document.createElement('IMG');
    img.setAttribute('src', pokemon.artRoute);
    pkmnArt.appendChild(img);
    
    for(let i = 0; i < pokemon.types.length; i++){
        let spanType = document.createElement("SPAN");
        spanType.innerHTML = pokemon.types[i];
        spanType.classList.add('type');
        spanType.classList.add(`type${pokemon.types[i]}`);
        infoTyping.appendChild(spanType);
    }

    for(let i =0; i < pokemon.abilities.length; i++){
        let ability = document.createElement("li");
        ability.innerHTML = pokemon.abilities[i];
        pkmnAbilities.appendChild(ability);
    }
}

function clearInfo(){
    pkmnNumber.innerHTML = "";
    pkmnName.innerHTML = "";
    pkmnWeight.innerHTML = "";
    pkmnHeight.innerHTML = "";
    pkmnHP.innerHTML = "";
    pkmnAtk.innerHTML = "";
    pkmnDef.innerHTML = "";
    pkmnSpAtk.innerHTML = "";
    pkmnSpDef.innerHTML = "";
    pkmnSpd.innerHTML = "";
    while(pkmnArt.firstChild){
        pkmnArt.removeChild(pkmnArt.firstChild)
    }

    while(pkmnFront.firstChild){
        pkmnFront.removeChild(pkmnFront.firstChild);
    }

    while(pkmnBack.firstChild){
        pkmnBack.removeChild(pkmnBack.firstChild);
    }

    pkmnBack.setAttribute('src', "");
    while (infoTyping.firstChild) {
        infoTyping.removeChild(infoTyping.firstChild);
    }

    while (pkmnAbilities.firstChild) {
        pkmnAbilities.removeChild(pkmnAbilities.firstChild);
    }
}

function adjustPkmnNumber(number){
    let pokemonNum = '#' + number.toString().padStart(4,'0');
    return pokemonNum;
}
