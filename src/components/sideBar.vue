<template>
  <div :class="shown?'holder-hide':'holder-show'">
      <div>
        <img v-if="shown" src="../assets/left_arrow.png" id="left_arrow" class="icon" @click="change"/>
        <img v-else src="../assets/burger.png" class="icon" @click="change"/>
        <ul>
          <router-link to ="/teams">
            <li>
              <img src="https://static.thenounproject.com/png/8501-200.png" 
              alt="" class="icon"> 
              <label v-if="shown" >Équipes</label>
            </li>
          </router-link>
          <router-link to ="/rules">
            <li >
              <img src="https://cdn4.iconfinder.com/data/icons/files-13/100/circle-things-41-512.png" alt="" class="icon">
              <label v-if="shown">Règles</label>
            </li>
          </router-link>
          <router-link to ="/quizz">
            <li ><img src="https://cdn2.iconfinder.com/data/icons/basic-office-snippets/170/Basic_Office-7-512.png" alt="" class="icon"><label v-if="shown">Questions</label></li>
          </router-link>
          <router-link to ="/rallyeManager">
            <li >
              <img src="https://cdn2.iconfinder.com/data/icons/font-awesome/1792/map-256.png" alt="" class="icon">
              <label v-if="shown">Rallye</label>
            </li>
          </router-link >
          <li @click="logOut()" v-if="fb.auth().currentUser">
            <img src="https://cdn4.iconfinder.com/data/icons/miu/24/common-logout-signout-exit-glyph-256.png" alt="" class="icon">
            <label v-if="shown">Déconnexion</label>
          </li>
        </ul>
      </div>
        
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
          shown : false,
          state: "ouvrir"
    }
  },
  methods:{
        change(){
          this.shown = !this.shown;
          if(this.shown) this.state = "fermer";
        },
        logOut: function(){
          firebase.auth().signOut().then(function() {
              // Sign-out successful.
              this.$parent.testLogin();
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
.holder-hide button[type="submit"],
.holder-hide button[type="button"],
.holder-hide button{
	background: #000000;
	border: 2px solid #30C29E;
	color: rgba(16,174,161,1) 33%;
  width: 200px;
  transition: 0.5s;
  
}
.holder-hide button[type="submit"]:hover,
.holder-hide button[type="button"]:hover,
.holder-hide button{
	background: #000000;
}

.holder-show button[type="submit"],
.holder-show button[type="button"],
.holder-show button{
	width: 60px;
	background: #000000;
	border: 2px solid #30C29E;
	color: rgba(16,174,161,1) 33%;
  transition: 0.5s;

}
.holder-show button[type="submit"]:hover,
.holder-show button[type="button"]:hover,
.holder-show button{
	background: #000000;
}

.holder-hide div{
  position: relative;
  transition: 0.5s;
  width: 200px;
  background: linear-gradient(180deg, rgba(255,221,88,1) 0%,rgba(100,205,129,1) 33%, rgba(16,174,161,1) 67%,rgba(1,136,168,1) 100%);
  height: 100%;
  min-height: 700px;
  
}
.holder-show div{
  position: fixed;
  transition: 0.5s;
  width: 60px;
  background: linear-gradient(180deg, rgba(255,221,88,1) 0%,rgba(100,205,129,1) 33%, rgba(16,174,161,1) 67%,rgba(1,136,168,1) 100%);
  height: 100%;
}

li{
  display: flex;
  color: #000000;
  margin: 16px 20%;
  margin-top: 0px;
  margin-block-end: 0px;
  padding-top: 16px;
}
ul{ 
  width: 100%;
  padding:0px;
  margin-top: 0px;
  margin-block-end: 0px;
}
.icon{
  width: 32px;
  height: 32px;
  padding-top: 2px;
}
.icon:hover
{
  cursor: pointer;
}
label{
  text-align: center;
  margin: 3px;
  display: inline-block;
  vertical-align: middle;
  line-height: normal;
  opacity: 1;
  transition: 0.5s;
}

a:hover, a:visited, a:link, a:active
{
    text-decoration: none;
}

#left_arrow {
  position: right;
}

@media screen and (min-width: 200px) and (max-width: 640px) {

.holder-hide div{
  position: fixed;
  transition: 0.5s;
  width: 200px;
  background: linear-gradient(180deg, rgba(255,221,88,1) 0%,rgba(100,205,129,1) 33%, rgba(16,174,161,1) 67%,rgba(1,136,168,1) 100%);
  height: 100%;
  
}
}

</style>
