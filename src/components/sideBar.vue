<template>
  <div :class="shown?'holder-show':'holder-hide'">
        <button @mousedown="change">hide</button>
        <ul>
          <li>Teams</li>
          <li>Rules</li>
          <li>Questions</li>
          <li></li>
          <li></li>
        </ul>
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
          shown : true
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
  width: 20%;
  height: 100vh;
  background-color: #19212b;
}
.holder-show{
position: absolute;

  transition: 0.5s;
  width: 5%;
  height: 100vh;
  background-color: #19212b;
}
</style>
