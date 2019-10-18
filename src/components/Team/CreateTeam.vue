<template>
<div>
  <div class="form-style-6">
    <h1>Ajouter une équipe :</h1>
    <label for="teamName">Nom d'équipe :</label><br>
    <p id="teamInputRules">Caractères interdits : accents, caractères spéciaux</p>
    <input id="teamName" :maxlength="30" @keydown.space.prevent type="text" v-model="tempName" />
    
    <br>
    <label class="erreur" v-if="error">Champ équipe incorrect</label>
    <br>
    
    
  </div>
  <div class="background-colorPicker" >
    <label for="color">Couleur :</label><br>
    <input id="color" class="colorPicker" type="text" v-model="tempColor" disabled />
    <span @click="showPicker()" class="input-group-addon" :style="`background-color: ${tempColor}`">
    </span>
    <div class="posColorPicker">
        <ColorPicker v-if="show" :width="200" :height="200" :disabled="false" startColor=tempColor @colorChange="onColorChange" v-model="tempColor"></ColorPicker>
    </div>
  </div>

<div class="form-style-6">
    <button type="button" @click="addTeam()">Ajouter l'équipe</button>
</div>
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
            position:new firebase.firestore.GeoPoint(0, 0)
        },
        name:"",
        tempName:"",
        tempColor:"#ff0000",
        show:false,
        error:false,
        regEx: /^[A-Za-z0-9]+$/
    }
  },
  methods:{
        showPicker: function(){
            this.show= !this.show;
        },
        checkTeamName: function(){
            if (this.tempName == "") {
                this.error = true;
                return false;
            }
            else{
                if(!this.tempName.match(this.regEx)){
                    this.error=true;
                    return false;
                }else{
                    this.error=false;
                    return true;
                }
                
            }
        },
        addTeam: function() {
            if (this.checkTeamName()) {
                this.name = this.tempName;
                this.team.color = this.tempColor;
                this.generatePassword();
                this.pushToDatabase();
                this.$parent.$refs.refreshList.refreshList();
                this.resetField();
                this.resetTeam();
            }
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
            this.tempColor = "#ff0000";
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
	background: linear-gradient(90deg, rgba(255,221,88,1) 0%,rgba(100,205,129,1) 33%, rgba(16,174,161,1) 67%,rgba(1,136,168,1) 100%);	font-size: 140%;
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
.form-style-6 button[type="button"],
.form-style-6 button {
	width: 35%;
	padding: 5px;
	background: rgba(16,174,161,1) ;
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
.background-colorPicker{
    max-width: 60%;
	margin: -10px auto;
	padding: 16px;
    background: #F7F7F7;
    font: 95% Arial, Helvetica, sans-serif;
}
.colorPicker{
    transition: 0.5s;
    width: 65%;
    padding: 5px;
    border: 1px solid #ccc;
}
.colorPicker input[type="text"]:focus {
    box-shadow: 0 0 5px #43D1AF;
	border: 1px solid #43D1AF;
}
.button-colorPicker{
    width: 15%;
}

.current-color {
    display: inline-block;
    width: 12px;
    height: 12px;
    background-color: #000;
    cursor: pointer;
}

.input-group-addon {
    padding-left: 15px;
    padding-right: 10px;
    padding-top: 3.3px;
    padding-bottom: 4.8px;
    color: #555;
    text-align: center;
    background-color: #eee;
    border: 1px solid #ccc;
    cursor: pointer;
}

.posColorPicker{
    margin-top: 5%;
    padding-left: 50%;
    margin-left: -100px;
}

.erreur{
  color:red;
}

#teamInputRules{
      color: #999;
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
    .background-colorPicker{
        max-width: 60vh;
        margin: -10px auto;
        padding: 16px;
        background: #F7F7F7;
        font: 95% Arial, Helvetica, sans-serif;
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
}

</style>
