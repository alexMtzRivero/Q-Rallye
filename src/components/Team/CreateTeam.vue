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
  components:{

  },
  props: {


  },
  data(){
    return{
        team:{
            name:"",
            color:"",
            password:"",
            position:{
                lat:"",
                lon:"",
            }
        },
        tempName:"",
        tempColor:"",

    }
  },
  methods:{
        addTeam: function() {
            this.team.name = this.tempName;
            this.team.color = this.tempColor;
            this.pushToDatabase();
            this.resetField();
            this.resetTeam();
        },
        resetTeam: function(){
            this.team = {
                "name":"",
                "color":"",
                "password":"",
                "position":{
                    "lat":"",
                    "lon":"",
                }
            };
        },
        resetField: function(){
            this.tempName = "";
            this.tempColor = "";
        },
        pushToDatabase() {
            var db = firebase.firestore();
            db.collection("Groups").doc(this.team.name).set(this.team)
            .then(function(docRef) {
                console.log("Document written with ID: ", docRef.id);
            })
            .catch(function(error) {
                console.error("Error adding document: ", error);
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

</style>
