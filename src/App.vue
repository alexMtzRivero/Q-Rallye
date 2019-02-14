<template>
  <div id="app">
    <div class="horizontal">
     
     <sideBar ref="sideBar">
       
     </sideBar>
    
      <div class="main">
        <router-view>
        </router-view>
      </div>
    
    </div>
  </div>
  
</template>

<script>
import quizzes from './components/quizzes.vue'
import questions from './components/questions.vue'
import Team from'./components/Team/Team.vue'
import RallyeManager from "./components/RallyeManager.vue"
import  sideBar from './components/sideBar.vue'
import CreateAccount from "./components/Login/CreateAccount.vue"
import Login from "./components/Login/Login.vue"
import Rules from "./components/rules.vue"


import firebase from "firebase";


export default {
  name: 'app',
  components: {
  quizzes,
  questions,
  RallyeManager,
  sideBar,
  CreateAccount,
  Login,
  Rules,
  RallyeManager,
  Team
  },

  methods: {
    addLoginListner:function () {


    firebase.auth().onAuthStateChanged((user)=> {
          if (user) {
            // User is signed in.
            this.$router.push('/rallyeManager');
          } else {
            // No user is signed in.
            this.$router.push('/login');
          }
          this.$refs.sideBar.$forceUpdate()
        });

 
     
    },
     testLogin:function () {
     var user = firebase.auth().currentUser;

        if (user) {
          // User is signed in.
        } else {
          // No user is signed in.
          this.$router.push('/login');
        }
     }
    
  },
  mounted(){
    this.addLoginListner();
    
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
