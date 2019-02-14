<template>
  <div class="form-style-6">
    <h1>Ajouter une équipe :</h1>
    <label for="teamName">Nom d'équipe :</label><br>
    <input id="teamName" type="text" v-model="tempName" />
    <br>
    <ColorPicker :width="150" :height="150" :disabled="false" startColor=tempColor @colorChange="onColorChange" v-model="tempColor"></ColorPicker>
    <label for="color">Couleur :</label><br>
    <input id="color" type="text" v-model="tempColor" />
    <br>
    <button type="button" @click="addTeam()">Ajouter l'équipe</button>
  </div>
</template>

<script>
import firebase from "firebase";

import ColorPicker from 'vue-color-picker-wheel';


export default {
  name: 'CreateTeam',
   components: {
    ColorPicker,
  },
  data(){
    return{
        team:{ 
            color:"",
            password:"",  
            position:{
                lat:"0",
                lon:"0"
            } 
        },
        name:"",
        tempName:"",
        tempColor:"#ff0000",
    }
  },
  methods:{
        addTeam: function() {
            this.name = this.tempName;
            this.team.color = this.tempColor;
            this.generatePassword();
            this.pushToDatabase();
            this.$parent.$refs.refreshList.refreshList();
            this.resetField();
            this.resetTeam();
        },
        resetTeam: function(){
            this.team = {
                "color":"",
                "password":""
            };
            this.name="";
        },
        resetField: function(){
            this.tempName = "";
            this.tempColor = "";
        },

        // Ajout d'une équipe (sans les collections)
        pushToDatabase() {
            var db = firebase.firestore();
            db.collection("Groups").doc(this.name).set(this.team)
            .then(function(docRef) {
                console.log("Document written with ID: ", docRef.id);
            })
            .catch(function(error) {
                console.error("Error adding document: ", error);
            });
        },

        generatePassword(){
            do{
                this.team.password = Math.floor(Math.random()*999999);
                console.log(this.team.password);
            }while(this.team.password.length < 5);
        },
        onColorChange(color) {
            //console.log('Color has changed to: ', color);
        }

  },
  //Equivalent au OnCreate
  mounted(){

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.form-style-6{
	font: 95% Arial, Helvetica, sans-serif;
	max-width: 60%;
	margin: 10px auto;
	padding: 16px;
	background: #F7F7F7;
}
.form-style-6 h1{
	background: #43D1AF;
	padding: 20px 0;
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
	width: 70%;
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
	border: 1px solid #43D1AF;
}

.form-style-6 button[type="submit"],
.form-style-6 button[type="button"]{
	box-sizing: border-box;
	-webkit-box-sizing: border-box;
	-moz-box-sizing: border-box;
	width: 40%;
	background: #43D1AF;
	border: 2px solid #30C29E;
	color: #fff;
    padding: 10px;
}
.form-style-6 button[type="submit"]:hover,
.form-style-6 button[type="button"]:hover{
	background: #2EBC99;
}

</style>
