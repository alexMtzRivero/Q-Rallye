<template>
  <div id="app">
    <div class="hoizontal">
      <div class="main"></div>
    </div>
    <img alt="Vue logo" src="./assets/logo.png">
  
  </div>
</template>

<script>



var firebaseController = require('./Js/firebaseController.js').default;

export default {
  name: 'app',
  components: {
  
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
  margin-top: 60px;
}
</style>
