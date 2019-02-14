<template>
  <div class="LoginContainer">
    <h1>Login</h1>
    <div class="section">
      <input type="text" placeholder="mail" v-model="mail">
    </div>
    <div class="section">  
     <input type="text" placeholder="password" v-model="pass"><label >{{generalComents}}</label>
    </div>
    <button @click="login()"> Login </button>
    <br>
    <button @click="goToCreate();"> Create </button>
    <br>
    

  </div>
</template>

<script>
import firebase from "firebase";
export default {
  name: 'Login',
  components:{

  },
  props: {


  },
  data(){
    return{
        mail:"",
        pass:"",
        generalComents:""
    }
  },
  methods:{
    goToCreate: function () {
      this.$router.push('/createAccount');
    },
    login:function(){
      firebase.auth().signInWithEmailAndPassword(this.mail, this.pass).then(
        ()=>{
          //go to main 
          console.log("loged");
           this.$router.push('/rallyeManager');
        }
      ).catch((error) =>{
        // Handle Errors here.
        var errorCode = error.code;
        this.generalComents = error.message;
        // ...
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
.LoginContainer{
  margin: 20vh 25%;

}
.section{
    padding: 2vh 3vw;
}
input{
      width: -webkit-fill-available;
    border-radius: 10px;
    height: 3vh;
    border-style: solid;
    text-align: -webkit-center;
    border-width: 2px;
    border-color: #434444;
}

</style>
