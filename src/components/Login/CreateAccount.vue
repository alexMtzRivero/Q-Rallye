<template>
  <div class="LoginContainer">
    <img class="logo" src="../../assets/logo.png" />
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
      <div class="section">
        <label>Numéro de téléphonne :</label><br>
        <input type="text" v-model="tel"><br><label >{{comentsTel}}</label>
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
        tel:"",
        comentsPass1:"",
        comentsPass2:"",
        comentsMail:"",
        comentsTel:"",
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
         firebase.auth().createUserWithEmailAndPassword( this.mail,this.pass1)
         .then( data => {
             var user = firebase.auth().currentUser;
             this.addPhone(user, this.tel)
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
    },
    addPhone(userObject, tel) {
      var db = firebase.firestore();
      const username = userObject.email.split('@')[0]
      console.log(username);
      db.collection("Administrators").doc(username).set({number: tel,username}).then().catch((err) => console.log(err))
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
  margin: 0vh 25%;
}
.logo {
  width: 40%;
}
.section{
    padding: 2vh 3vw;
}

.champ{
  color: #28a487;
}

h1{
  background: linear-gradient(180deg, rgba(255,221,88,1) 0%,rgba(100,205,129,1) 33%, rgba(16,174,161,1) 67%,rgba(1,136,168,1) 100%);
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
  background: linear-gradient(90deg, rgba(255,221,88,1) 0%,rgba(100,205,129,1) 33%, rgba(16,174,161,1) 67%,rgba(1,136,168,1) 100%);
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
	width: 40%;
	background: #fff;
	margin-bottom: 3%;
	border: 1px solid #ccc;
	padding: 5px;
	color: #555;
  font: 95% Arial, Helvetica, sans-serif;
  margin-top: 2%;
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
	width: 35%;
	padding: 5px;
	background: rgba(16,174,161,1) 33%;
	color: #fff;
  padding: 10px;
  border:none;
  border-radius: 3px;
}
.form-style-6 button[type="submit"]:hover,
.form-style-6 button[type="button"]:hover,
.form-style-6 button:hover{
  background: #0E988D;
  cursor: pointer;
}

@media screen and (min-width: 200px) and (max-width: 640px) {
  h1{
    background: linear-gradient(90deg, rgba(255,221,88,1) 0%,rgba(100,205,129,1) 33%, rgba(16,174,161,1) 67%,rgba(1,136,168,1) 100%);	font-size: 140%;
    padding: 20px 0;
    font-size: 140%;
    font-weight: 300;
    text-align: center;
    color: #fff;
    margin: -16px -16px 16px -16px;
    max-width: 60vh;
    margin: 10px auto;
    padding: 16px;
    margin-left: 65px;
    margin-right: 5px;
  }

  .form-style-6{
	font: 95% Arial, Helvetica, sans-serif;
	max-width: 60vh;
	margin: 10px auto;
	padding: 16px;
	background: #F7F7F7;
  margin-left: 65px;
  margin-right: 5px;
  }
  .LoginContainer{
  margin: 0vh;
  }
  .logo {
  width: 40%;
  margin-left: 65px;
  margin-right: 5px;
  }
  .form-style-6 button[type="submit"],
.form-style-6 button[type="button"],
.form-style-6 button {
	width: 50%;
	padding: 5px;
	background: rgba(16,174,161,1) 33%;
	color: #fff;
  padding: 10px;
  border:none;
  border-radius: 3px;
}
.form-style-6 button[type="submit"]:hover,
.form-style-6 button[type="button"]:hover,
.form-style-6 button:hover{
  background: #0E988D;
  cursor: pointer;
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
	width: 55%;
	background: #fff;
	margin-bottom: 3%;
	border: 1px solid #ccc;
	padding: 5px;
	color: #555;
	font: 95% Arial, Helvetica, sans-serif;
  margin-top: 2%;
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
}

</style>
