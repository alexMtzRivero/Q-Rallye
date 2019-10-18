<template>
  <div class="form-style-6">

    <h1>Ajout de règles</h1>
    <h3>Malus :</h3>
    <label>Malus pour une mauvaise réponse en secondes:</label><br>
    <input v-model="malusReponse" type="text" id="malusReponse"/><br>
    <button @click="addMalusReponse(malusReponse)">Ajouter le malus</button><br><br>
    <label>Malus pour un lieu manqué en secondes:</label><br>
    <input v-model="malusCheckpoint" type="text" id="malusCheckpoint"/><br>
    <button @click="addMalusCheckpoint(malusCheckpoint)">Ajouter le malus</button><br><br>

  </div>
</template>

<script>
import firebase from "firebase";

export default {
  name: 'name',
  components:{

  },
  props: {
    
  },
  data(){
    return{
      malusReponse:"",
      malusCheckpoint:""
    }
  },
  methods:{
    addMalusReponse: function(malusReponse){
      var db = firebase.firestore();
      db.collection("Rules").doc("Malus").update({malusReponse: this.malusReponse}).then().catch((err) => console.log(err))

    },
    addMalusCheckpoint: function(malusCheckpoint){
      var db = firebase.firestore();
      db.collection("Rules").doc("Malus").update({malusCheckpoint: this.malusCheckpoint}).then().catch((err) => console.log(err))
    }
  },
  // on create
  mounted(){
    this.$parent.testLogin();
    let db = firebase.firestore();
      db.collection('Rules').get().then((querySnapshot) => {
              querySnapshot.docs.forEach(element => {
                var malus = element.data().malusReponse;
                this.malusCheckpoint = Number(element.data().malusCheckpoint);
                this.malusReponse = Number(malus);
              });
          });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

h1{
	background: #43D1AF;
	padding: 20px 0;
	font-size: 140%;
	font-weight: 300;
	text-align: center;
	color: #fff;
	margin: 10px auto;
	padding: 16px;
}

.form-style-6{
	font: 95% Arial, Helvetica, sans-serif;
	max-width: 70%;
	margin: 10px auto;
	background: #F7F7F7;
}
.form-style-6 h1{
	background: linear-gradient(90deg, rgba(255,221,88,1) 0%,rgba(100,205,129,1) 33%, rgba(16,174,161,1) 67%,rgba(1,136,168,1) 100%);	font-size: 140%;
	font-size: 140%;
	font-weight: 300;
	text-align: center;
	color: #fff;
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
	border: 1px solid #ccc;
	padding: 5px;
	color: #555;
	font: 95% Arial, Helvetica, sans-serif;
    margin-top: 5px;
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
	width: 35%;
	padding: 5px;
	background: rgba(16,174,161,1) 33%;
	color: #fff;
  padding: 10px;
  border:none;
  border-radius: 3px;
  margin: 1px;
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
  }
  .form-style-6{
	font: 95% Arial, Helvetica, sans-serif;
	max-width: 60vh;
	margin: 10px auto;
	background: #F7F7F7;
  margin-left: 65px;
  margin-right: 5px;
  }
}

</style>
