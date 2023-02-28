const knownPkmn = 1008;

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

export {capitalize, getRandomIdexes, adjustPkmnNumber, convertTypes}