<template>
  <div id="app">
    <div class="horizontal">
      <div class="main">
        <router-view>
          
        </router-view>
      </div>
    </div>
    <img alt="Vue logo" src="./assets/logo.png">
    <Team></Team>
  

  </div>
</template>

<script>
import Team from'./components/Team/Team.vue'

var firebaseController = require('./Js/firebaseController.js').default;

export default {
  name: 'app',
  components: {
    Team,
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
