<template>
  <div id="app">
    <div class="hoizontal">
      <div class="main"></div>
    </div>
    <img alt="Vue logo" src="./assets/logo.png">
    <quizzes></quizzes>
    <questions ref="refreshList"></questions>
  </div>
</template>

<script>



//var firebaseController = require('./Js/firebaseController.js').default;
import quizzes from './components/quizzes.vue';
import questions from './components/questions.vue';

export default {
  name: 'app',
  components: {
      quizzes,
      questions
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
