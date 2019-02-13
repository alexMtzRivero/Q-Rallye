<template>
  <div id="app">
    <div class="horizontal">
     
     <sideBar>
       
     </sideBar>
    
      <div class="main">
        <router-view>
        </router-view>
      </div>
    
    </div>
  </div>
  
</template>

<script>
import Team from'./components/Team/Team.vue'
import RallyeManager from "./components/RallyeManager.vue"
import  sideBar from './components/sideBar.vue'
import CreateAccount from "./components/Login/CreateAccount.vue"
import Login from "./components/Login/Login.vue"
import Rules from "./components/rules.vue"
export default {
  name: 'app',
  components: {
  RallyeManager,
  sideBar,
  CreateAccount,
  Login,
  Rules,
  RallyeManager,
  Team
  },

  methods: {
    
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
  width: 100%;
}
</style>
