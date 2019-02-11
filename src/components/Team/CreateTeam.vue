<template>
  <div >
    <label for="name">Nom d'équipe :</label>
    <input id="name" type="text" v-model="tempName" />
    <br>
    <label for="color">Couleur :</label>
    <input id="URL" type="text" v-model="tempColor" />
    <br>
    <button type="button" @click="addTeam()">Ajouter l'équipe</button>
  </div>
</template>

<script>
import firebase from "firebase";


export default {
  name: 'CreateTeam',
  data(){
    return{
        team:{ 
            color:"",
            password:"",   
        },
        name:"",
        tempName:"",
        tempColor:"",

    }
  },
  methods:{
        addTeam: function() {
            this.name = this.tempName;
            this.team.color = this.tempColor;
            this.generatePassword();
            this.pushToDatabase();
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
        }

  },
  //Equivalent au OnCreate
  mounted(){

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
