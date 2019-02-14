<template>
  <div class="LoginContainer">
    <div class="form-style-6">
    <h1>Se connecter</h1>
    <div class="section">
      <label>Mail :</label><br>
      <input type="text" v-model="mail">
    </div>
    <div class="section">  
      <label>Mot de passe :</label><br>
     <input type="text" v-model="pass"><br><label class="erreur">{{generalComents}}</label>
    </div>
    <button @click="login()"> Se connecter </button>
    <br>
    <br>
    <button @click="goToCreate();"> Créer compte </button>
    <br>
    </div>

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

.champ{
  color: #28a487;
}

h1{
	background: #43D1AF;
	font-size: 140%;
	font-weight: 300;
	text-align: center;
	color: #fff;
	margin: -16px -16px 16px -16px;
	max-width: 100%;
	margin: 10px auto;
	padding: 16px;
}

.form-style-6{
	font: 95% Arial, Helvetica, sans-serif;
	max-width: 100%;
	margin: 10px auto;
	padding: 16px;
	background: #F7F7F7;
}
.form-style-6 h1{
	background: #43D1AF;
	font-size: 140%;
	font-weight: 300;
	text-align: center;
	color: #fff;
	margin: -16px -16px 16px -16px;
}
.form-style-6 input[type="text"],
.form-style-6 input[type="date"],
.form-style-6 input[type="datetime"],
.form-style-6 input[type="email"],
.form-style-6 input[type="number"],
.form-style-6 input[type="search"],
.form-style-6 input[type="time"],
.form-style-6 input[type="url"],
.form-style-6 textarea,
.form-style-6 select 
{
	-webkit-transition: all 0.30s ease-in-out;
	-moz-transition: all 0.30s ease-in-out;
	-ms-transition: all 0.30s ease-in-out;
	-o-transition: all 0.30s ease-in-out;
	outline: none;
	box-sizing: border-box;
	-webkit-box-sizing: border-box;
	-moz-box-sizing: border-box;
	width: 60%;
	background: #fff;
	margin-bottom: 4%;
	border: 1px solid #ccc;
	padding: 5px;
	color: #555;
	font: 95% Arial, Helvetica, sans-serif;
}
.form-style-6 input[type="text"]:focus,
.form-style-6 input[type="date"]:focus,
.form-style-6 input[type="datetime"]:focus,
.form-style-6 input[type="email"]:focus,
.form-style-6 input[type="number"]:focus,
.form-style-6 input[type="search"]:focus,
.form-style-6 input[type="time"]:focus,
.form-style-6 input[type="url"]:focus,
.form-style-6 textarea:focus,
.form-style-6 select:focus
{
	box-shadow: 0 0 5px #43D1AF;
	padding: 5px;
	border: 1px solid #43D1AF;
}

.form-style-6 button[type="submit"],
.form-style-6 button[type="button"],
.form-style-6 button {
	box-sizing: border-box;
	-webkit-box-sizing: border-box;
	-moz-box-sizing: border-box;
	width: 40%;
	padding: 5px;
	background: #43D1AF;
	border: 2px solid #30C29E;
	color: #fff;
  padding: 10px;
}
.form-style-6 button[type="submit"]:hover,
.form-style-6 button[type="button"]:hover,
.form-style-6 button {
	background: #2EBC99;
}

.erreur{
  color:red;
}



</style>
