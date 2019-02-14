<template>
  <div :class="shown?'holder-hide':'holder-show'">
        <button @mousedown="change">hide</button>

      <div>
        <ul>
          <router-link to ="/teams">
            <li>
              <img src="https://static.thenounproject.com/png/8501-200.png" 
              alt="" class="icon"> 
              <label v-if="shown" >Teams</label>
            </li>
          </router-link>
          <router-link to ="/rules">
            <li >
              <img src="https://cdn4.iconfinder.com/data/icons/files-13/100/circle-things-41-512.png" alt="" class="icon">
              <label v-if="shown">Rules</label>
            </li>
          </router-link>
          <router-link to ="/quizz">
            <li ><img src="https://cdn2.iconfinder.com/data/icons/basic-office-snippets/170/Basic_Office-7-512.png" alt="" class="icon"><label v-if="shown">Questions</label></li>
          </router-link>
          <li ><img src="" alt="" class="icon"><label v-if="shown">Teams</label></li>
          <router-link to ="/rallyeManager">
            <li >
              <img src="https://cdn2.iconfinder.com/data/icons/font-awesome/1792/map-256.png" alt="" class="icon">
              <label v-if="shown">Rallye</label>
            </li>
          </router-link>
        </ul>
      </div>
        <a  v-if="fb.auth().currentUser" @click="logOut()">Logout</a>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  name: 'sideBar',
  components:{

  },
  props: {


  },
  data(){
    return{
          fb : firebase,
          shown : false
    }
  },
  methods:{
        change(){
          
          this.shown = !this.shown
        },
        logOut: function(){
          firebase.auth().signOut().then(function() {
              // Sign-out successful.
            }).catch(function(error) {
              // An error happened.
            });
        }
        
  },
  // on create
  mounted(){

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.holder-hide{
position: absolute;
  transition: 0.5s;
  width: 200px;
  height: 100vh;
  background-color: #19212b;
}
.holder-show{
position: absolute;

transition: 0.5s;
  width: 60px;
  height: 100vh;
  background-color: #19212b;
}
li{
  display: flex;
    color: white;
    margin: 16px 20%;
    
}
ul{
  width: 100%;
  padding:0px;
}
.icon{
  width: 32px;
  height: 32px;
}
label{
  text-align: center;
  padding-left: 16px;
display: inline-block;
  vertical-align: middle;
  line-height: normal;
}

</style>
