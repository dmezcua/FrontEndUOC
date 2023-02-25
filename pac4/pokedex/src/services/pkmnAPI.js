import axios from 'axios'

const pokeAPI = axios.create({
    baseURL:'https://pokeapi.co/api/v2/',
    withCredentials: false,
    headers:{
        Accept:'application/json', "Content-Type": 'application/json'
    }
})

export default{
    getPokemon(id){
        return pokeAPI.get('/pokemon/' + id);
    }
}