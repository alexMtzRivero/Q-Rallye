<template>
  <div>
    <button @click ="test()">test</button>
    <div v-for="(team,index) in teams" v-bind:key="team.id">
        <h1>{{team.id}}</h1>
        <p>Couleur : {{team.data().color}} <br>
        Mot de passe : {{team.data().password}}</p>
        <div v-for="runner in runners[index]" v-bind:key="runner.id">
          <!-- Vérifié affich ge -->
          <p>Nom : {{runner.lastName}} <br>
          Prénom : {{runner.firstName}}</p>
        </div>
        <button type="button" v-if="index != idDivEdited" @click="showRunner(index)" >Ajouter un membre</button>


        <div v-if="index == idDivEdited" >
          <input type="checkbox" id="multi" checked v-model="tempCb">Ajout multiple<br>
          <label for="lastName">Nom :</label>
          <input id="name" type="text" v-model="tempLastName" />
          <br>
          <label for="firstName">Prénom :</label>
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
        show:false
    }
  },
  methods:{
    test(){
      console.log(this.runners);
      
    },
    refreshList: function(){
      var db = firebase.firestore();
      db.collection('Groups').get().then((querySnapshot) => {
          this.teams=querySnapshot.docs
          this.teams.forEach(team => {            
            this.getRunnerFromTeam(team);
          });
          
      })      
      this.test();
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
      this.refreshList();
    },
    resetField: function(){
        this.tempFirstName = "";
        this.tempLastName = "";
        this.runner = {
            "firstName":"",
            "lastName":""
        }
    },
    getRunnerFromTeam(team){
      var db = firebase.firestore();
      db.collection('Groups/'+team.id+'/Runners').get().then((querySnapshot) => {
           var index = this.runners.push([])-1
          querySnapshot.forEach(snapshot => {
            this.runners[index].push(snapshot.data())
          });
         
      })
    },
   
    // Ajout d'un runner
    pushRunner(team) {
        var db = firebase.firestore();        
        db.collection("Groups/"+team.id+"/Runners").add(this.runner)
        .then(function(docRef) {
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



</style>
