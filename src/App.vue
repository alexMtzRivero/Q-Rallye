<template>
  <div id="app">
    <div class="hoizontal">
     <sideBar></sideBar>
      <div class="main">

      </div>
    
    </div>
  
  </div>
</template>

<script>


import  sideBar from './components/sideBar.vue'
var firebaseController = require('./Js/firebaseController.js').default;

export default {
  name: 'app',
  components: {
  sideBar
  },
  mounted(){
   
    firebaseController.pushToDatabase();
  
    
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
