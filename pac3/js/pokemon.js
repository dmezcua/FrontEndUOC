const apiURL = "https://pokeapi.co/api/v2/pokemon/"

var pokemon = {
    id: 0,
    name: "NoName",
    imgRoute: "none",
    types: [],
    abilities: [],
    height: 0,
    weight: 0,
    hp: 0,
    attack: 0,
    defense: 0,
    spAttack: 0,
    spDefense: 0,
    speed: 0,

    fetchPkmn: function(id){
        fetch(apiURL + id)
        .then(x => x.json())
        .then(y =>{
            this.id = y.id;
            this.name = y.name;
            this.height = y.height;
            this.weight = y.weight;
            this.hp = y.stats[0].base_stat;
            this.attack = y.stats[1].base_stat;
            this.defense = y.stats[2].base_stat;
            this.spAttack = y.stats[3].base_stat;
            this.spDefense = y.stats[4].base_stat;
            this.speed = y.stats[5].base_stat;

            console.log("Des de fetch: " + pokemon.toString());
        });
    },

    toString: function(id){
        return "pkmnNum: " + this.id + ", pkmnName: " + this.name +
        ", pkmnHeight: " + this.height + ", pkmnWeight: " + this.weight;
    }
}

export {pokemon};