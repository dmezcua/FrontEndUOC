<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import {ref} from 'vue'

const themeMode =ref(window.localStorage.getItem('theme'))

const saveData = (e) =>{
  window.localStorage.setItem('theme', e.target.value)
}
</script>

<template>
  <main class="main" :class="themeMode">
    <header>
    <img alt="Vue logo" class="logo" src="@/assets/img/pokeball_icon.png" width="125" height="125" />

      <div class="wrapper">
        <HelloWorld msg="VueDex" />

        <nav>
            <RouterLink to="/">Home</RouterLink>
            <RouterLink to="/list">List</RouterLink>
            <div class="settings">
              <label for="dark">Dark:</label>
              <input type="radio" name="theme" id="dark" value="dark" v-model="themeMode" @change="saveData" checked>
              <label for="light">Light:</label>
              <input type="radio" name="theme" id="light" value ="light" v-model="themeMode" @change="saveData">
            </div>
        </nav>
      </div>
    </header>

    <RouterView />
  </main>
</template>

<style scoped>
:root{
  --bg-color: #101010;
  --text-color: #FCFCFC;
  --bg-card: linear-gradient(180deg, rgb(119, 119, 119) 0%, 
        rgba(119, 119, 119,1) 35%, rgb(25, 25, 25, 1) 100%);
  --bg-header: #3f3fa7;
}

.main.dark{
  --bg-color: #101010;
  --text-color: #FCFCFC;
  --bg-card: linear-gradient(180deg, rgb(119, 119, 119) 0%, 
        rgba(119, 119, 119,1) 35%, rgb(25, 25, 25, 1) 100%);
  --bg-header: #3f3fa7;
}

.main.light{
  --bg-color: #FCFCFC;
  --text-color: #101010;
  --bg-card: linear-gradient(180deg, rgb(190, 190, 190) 0%, 
        rgba(190, 190, 190,1) 35%, rgb(25, 25, 25, 1) 100%);
  --bg-header: #da1818;
}

main{
  background-color: var(--bg-color);
  color: var(--text-color);
  display: flex;
  flex-direction: column;
  width: 100%;
}

header {
  line-height: 1.5;
  max-height: 100vh;
  background-color: var(--bg-header)
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  display: flex;
  flex-direction: row;
  width: 100%;
  font-size: 12px;
  text-align: center;
}

nav a.router-link-exact-active {
  font-weight: 900;
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
  color: var(--text-color);
}

nav a:first-of-type {
  border: 0;
}

nav a:hover{
  background-color: #AAAAAA;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    flex-direction: row;
    place-items: flex-start;  
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;
  }
}
</style>
