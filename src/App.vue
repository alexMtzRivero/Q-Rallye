<template>
  <div id="app">
    <div class="horizontal">
     
     <sideBar></sideBar>
     
      <div class="main">
        <Login></Login>
      </div>
    
    </div>
  
  </div>
</template>

<script>


import  sideBar from './components/sideBar.vue'
import CreateAccount from "./components/Login/CreateAccount.vue"
import Login from "./components/Login/Login.vue"
export default {
  name: 'app',
  components: {
  sideBar,
  CreateAccount,
  Login
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
.horizontal{
  display: flex;
}
.main{
  width: -webkit-fill-available;
}
</style>
