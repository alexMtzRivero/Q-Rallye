<template>
  <div id="app">
    <div class="horizontal">
      <div class="main">
        <router-view>
          
        </router-view>
      </div>
    </div>
<<<<<<< HEAD
    <img alt="Vue logo" src="./assets/logo.png">
    <CreateTeam></CreateTeam>
    <ListTeam ref="refreshList"></ListTeam>
  
=======
>>>>>>> 404daf3a06623e92b1c51a03ab250ffd862b6e7f
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
<<<<<<< HEAD
  methods: {
    
  },
  mounted(){    
    //firebaseController.pushToDatabase();
=======
  methods:{
    
  },
  mounted(){
   
    
>>>>>>> 404daf3a06623e92b1c51a03ab250ffd862b6e7f
  
    
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
