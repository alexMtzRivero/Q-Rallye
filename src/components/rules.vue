<template>
  <div class="name">

    <h1>Ajout de règles</h1>
    <h3>Malus :</h3>
    <label>Malus pour une mauvaise réponse :</label><br>
    <input v-model="malusReponse" type="text" id="malusReponse"/><br>
    <button @click="addMalusReponse(malusReponse)">Ajouter le malus</button><br><br>
    <label>Malus pour checkpoint manqué :</label><br>
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
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>



</style>
