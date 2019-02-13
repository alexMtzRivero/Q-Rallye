<template>
  <div id="app">
    <div class="horizontal">
      <div class="main">
        <Rules>
          
        </Rules>
      </div>
    </div>
  </div>
</template>

<script>



//var firebaseController = require('./Js/firebaseController.js').default;
import Rules from './components/rules.vue';

export default {
  name: 'app',
  components: {
    Rules
  },
  methods:{
    
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
  margin-top: 60px;
}
</style>
