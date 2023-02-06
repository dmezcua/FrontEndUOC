import {fetchPkmn, getRandomPkmn, filterPkmn} from "./pokemon.js";

const maxPkmnFetch = 10;
let themeStatus = window.localStorage.getItem('theme');

var params = new URLSearchParams(document.location.search);
var pokeID = params.get("pokeID");
var pokemonList = [];
var info = document.querySelector('.info');
var deck = document.querySelector('#deck');
var searchbar = document.getElementById('searchPkmn');
var themeSwitch = document.querySelectorAll('input[name="themeMode"');

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

if(themeStatus) document.documentElement.setAttribute('data-theme', themeStatus);
updateRadio(themeStatus);

//Website main code
if(pokeID){
    var pokemon = await fetchPkmn(pokeID);
    pokemonList.push(pokemon);
    printPkmn(pokemon);
} else {
    pokemonList = await getRandomPkmn(maxPkmnFetch)
    for(let i = 0; i < pokemonList.length; i++) printPkmn(pokemonList[i]);
}

searchbar.addEventListener('input', function(){
    let filteredList = filterPkmn(pokemonList, searchbar.value);
    while(deck.lastChild){
        deck.removeChild(deck.lastChild);
    }
    for(let i = 0; i< filteredList.length; i++) {
        printPkmn(filteredList[i]);
    }
})

themeSwitch.forEach(x => {
    x.addEventListener('change', function(){
        if(this.value == 'dark'){
            document.documentElement.setAttribute('data-theme', 'dark');
        }else{
            document.documentElement.setAttribute('data-theme', 'light');
        }

        window.localStorage.setItem('theme', this.value);
    })
})



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
    pkmnWeight.innerHTML = pokemon.weight + "kg";
    pkmnHeight.innerHTML = pokemon.height + "m";
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
    while(pkmnArt.lastChild){
        pkmnArt.removeChild(pkmnArt.lastChild)
    }

    while(pkmnFront.lastChild){
        pkmnFront.removeChild(pkmnFront.lastChild);
    }

    while(pkmnBack.lastChild){
        pkmnBack.removeChild(pkmnBack.lastChild);
    }

    pkmnBack.setAttribute('src', "");
    while (infoTyping.lastChild) {
        infoTyping.removeChild(infoTyping.lastChild);
    }

    while (pkmnAbilities.lastChild) {
        pkmnAbilities.removeChild(pkmnAbilities.lastChild);
    }
}

function adjustPkmnNumber(number){
    let pokemonNum = '#' + number.toString().padStart(4,'0');
    return pokemonNum;
}

function updateRadio(value){
    if(value == 'light'){
        document.getElementById('themeLight').checked = true;
        document.getElementById('themeDark').checked = false;
    }else if (value == 'dark'){
        document.getElementById('themeLight').checked = false;
        document.getElementById('themeDark').checked = true;
    }else{
        document.getElementById('themeLight').checked = true;
        document.getElementById('themeDark').checked = false;
    }
}
