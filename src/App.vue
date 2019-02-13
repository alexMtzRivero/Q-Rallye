<template>
  <div id="app">
    <div class="hoizontal">
      <div class="main"></div>
    </div>
    <img alt="Vue logo" src="./assets/logo.png">
    <CreateTeam></CreateTeam>
    <ListTeam ref="refreshList"></ListTeam>
  
  </div>
</template>

<script>
import CreateTeam from'./components/Team/CreateTeam.vue'
import ListTeam from'./components/Team/ListTeam.vue'



var firebaseController = require('./Js/firebaseController.js').default;

export default {
  name: 'app',
  components: {
    CreateTeam,
    ListTeam
  
  },
  methods: {
    
  },
  mounted(){    
    //firebaseController.pushToDatabase();
  
    
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
