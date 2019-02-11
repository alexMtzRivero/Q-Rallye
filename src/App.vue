<template>
  <div id="app">
    <div class="hoizontal">
     
     <sideBar></sideBar>
     <CreateAccount></CreateAccount>
      <div class="main">

      </div>
    
    </div>
  
  </div>
</template>

<script>


import  sideBar from './components/sideBar.vue'
import CreateAccount from "./components/Login/CreateAccount.vue"

export default {
  name: 'app',
  components: {
  sideBar,
  CreateAccount,
  },
  mounted(){
   

  
    
  }
}
</script>

<style>

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
