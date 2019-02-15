<template>
  <div>

    <h1>Liste des équipes :</h1>
    <div v-for="(team,index) in teams" v-bind:key="team.id" class="form-style-6">
        <h2>{{team.id}}</h2>
        <img src="../../assets/bin.png" @click="deleteTeam(index, team.id)"/>
        <p><b class="champ">Couleur : </b>{{team.color}} <br>
        <b class="champ">Mot de passe : </b>{{team.password}}</p>
        <div v-for="runner in runners[index]" v-bind:key="runner.id" class="Runner">
          <p><b class="champ">Nom : </b>{{runner.lastName}} <br>
          <b class="champ">Prénom : </b>{{runner.firstName}}</p>
          <button type="button" @click="delRunner(runner,team.id)">Supprimer le membre</button>
        </div>
        <button type="button" v-if="index != idDivEdited" @click="showRunner(index)" >Ajouter un membre</button>
        <div v-if="index == idDivEdited" >
          <input type="checkbox" id="multi" checked v-model="tempCb">Ajout multiple<br><br>
          <label for="lastName"><b class="champ">Nom : </b></label><br>
          <input id="lastName" type="text" v-model="tempLastName" />

          <br>
          <label for="firstName"><b class="champ">Prénom : </b></label><br>
          <input id="firstName" type="text" v-model="tempFirstName" />
          <br>
          <button type="button" @click="addRunner(team)">Ajouter</button>
          <button type="button" v-if="tempCb" @click="showRunner(-1)">Terminer</button>
        </div>

    </div>
   
  </div>
</template>

<script>

import firebase from "firebase";

export default {
  name: 'ListTeam',

  data(){
    return{
        teams:[],
        tests:"",
        runners:[],
        idRunner:"",
        idDivEdited:-1,
        runner: {
            firstName:"",
            lastName:""
        },
        tempFirstName:"",
        tempLastName:"",
        tempCb:true,
        show:false,
    }
  },
  methods:{
    
    test(){
      console.log(this.teams);
      
    },
    refreshList: function(){
      var db = firebase.firestore();
      db.collection('Groups').get().then((querySnapshot) => {
         this.teams =[];
         this.runners = [];
         querySnapshot.docs.forEach(element => {
           var toPush = element.data();
           toPush.id = element.id;
           const idx = this.teams.push(toPush)-1;
           this.getRunnerFromTeam(this.teams[idx]);
          });          
      })      
      
    },
    getRunnerFromTeam(team){
      var db = firebase.firestore();
      db.collection('Groups/'+team.id+'/Runners').get().then((querySnapshot) => {
        this.runners[team] = [];
          var index = this.runners.push([])-1
          querySnapshot.docs.forEach(snapshot => {
            var toPush = snapshot.data()
            toPush.id=snapshot.id
            this.runners[index].push(toPush)
          });
          this.$forceUpdate();   

      })
    },
    showRunner: function(id){
      this.show = !this.show;
      this.idDivEdited = id;
    },
    
    addRunner: function(team){
      var cb = document.getElementById('multi');
      if(!cb.checked){
        this.idDivEdited = -1;
         this.show = !this.show;
      }
      this.runner.firstName = this.tempFirstName;
      this.runner.lastName = this.tempLastName;
      this.pushRunner(team);
      this.resetField();
    },
    delRunner: function (runner,team){
      var db = firebase.firestore();
      db.collection('Groups/'+team+'/Runners').doc(runner.id).delete().then(refresh =>{
        console.log("deleted");
        
        this.refreshList();
      });
    },deleteTeam: function (index,ref){
      var db = firebase.firestore();
      db.collection('Groups').doc(ref).delete().then(refresh =>{
        console.log("deleted");
      });
      this.teams.splice(index, 1);
    },
    resetField: function(){
        this.tempFirstName = "";
        this.tempLastName = "";
        this.runner = {
            "firstName":"",
            "lastName":""
        }
    },
    
   
    // Ajout d'un runner
    pushRunner(team) {
        var db = firebase.firestore();        
        db.collection("Groups/"+team.id+"/Runners").add(this.runner)
        .then(docRef => {
          this.refreshList();
            console.log("Document written with ID: ", docRef.id);
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
        });
    },


  },
  // onCreate
  mounted(){
      this.refreshList();        
  },
  
 
}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.champ{
  color: #28a487;
}

.Runner{
  background: #ceeee6;
  margin-bottom: 10px;
}

h1{
	background: #43D1AF;
	padding: 20px 0;
	font-size: 140%;
	font-weight: 300;
	text-align: center;
	color: #fff;
	margin: -16px -16px 16px -16px;
	max-width: 60%;
	margin: 10px auto;
	padding: 16px;
}

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
.form-style-6 button[type="button"]{
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
.form-style-6 button[type="button"]:hover{
	background: #2EBC99;
}



</style>
