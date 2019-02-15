<template>
  <div class="LoginContainer">
    <div class="form-style-6">
      <h1>Création de compte</h1>
      <div class="section">
        <label>Mail :</label><br>
        <input type="text" v-model="mail"><br><label >{{comentsMail}}</label>
      </div>
      <div class="section"> 
        <label>Mot de passe :</label><br>
        <input type="password" v-model="pass1"><br><label >{{comentsPass1}}</label>
      </div>
      <div class="section">
        <label>Confirmation mot de passe :</label><br>
        <input type="password" v-model="pass2"><br><label >{{comentsPass2}}</label>
      </div>
      
      <button @click="createUser()"> Créer compte</button><br><br>
      <button @click="retour()"> Retour </button>
     </div>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  name: 'CreateAccount',
  components:{

  },
  props: {


  },
  data(){
    return{
        mail:"",
        pass1:"",
        pass2:"",
        comentsPass1:"",
        comentsPass2:"",
        comentsMail:""
    }
  },
  methods:{
     validateEmail:function(email) {
       var re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

       return re.test(String(email).toLowerCase());
    },
     validatePass1:function() {
       
        return ( 5<this.pass1.toString().length);
    },
    validatePass2:function () {
      return ( this.pass1 == this.pass2);
    },
    validate:function(){
      console.log(this.validateEmail(this.mail) ,this.validatePass1() , this.validatePass2());
      
      return this.validateEmail(this.mail) && this.validatePass1() && this.validatePass2();
    },
    createUser: function(){
    
      if(this.validate()){
         firebase.auth().createUserWithEmailAndPassword( this.mail,this.pass1).then(
           function(){
             console.log("created succesfuly");
             
           }
         ).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
           this.comentsPass2 = (error.message);
            
            // ...
          });
      }else{
        console.log("campos no validos");
        
      }
     
    },
    retour: function(){
        this.$router.push('/login');
    }

  },
  // on create
  mounted(){
    console.log(firebase);
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.LoginContainer{
  margin: 25%;

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
.form-style-6 input[type="password"],
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
	width: 85%;
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
.form-style-6 input[type="password"]:focus,
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

</style>
