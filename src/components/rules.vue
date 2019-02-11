<template>
  <div class="name">

    <label>categorie </label>
    <input type="text" v-model="ruleTitle"/>
    <br>
    <label>règle </label>
    <textarea v-model="ruleText"></textarea>
    <br>
    <button type="button" @click='addRule'>Ajouter</button>

    <h1>Liste des règles</h1>
    <li>
      <ul v-for="rule in rules" class="rule" :key="rule.id">
        <h3>{{rule.data().title}}</h3>
        <p>{{rule.data().rule}}</p>
        <button type="button" @click='removeRule(rule.id)'>Supprimer</button>
      </ul>
    </li>

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
      rules: "",
      ruleTitle: "",
      ruleText:"",
      db:firebase.firestore()
    }
  },
  methods:{
    addRule: function(){
      this.db.collection('Rules').add({title: this.ruleTitle, rule: this.ruleText})
      this.getRules();
    },
    removeRule: function(ref){
      this.db.collection('Rules').doc(ref).delete();
      this.getRules();
    },
    getRules: function(){
      this.db.collection('Rules').get().then((querySnapshot) => {
        this.rules = querySnapshot.docs;
      })
    }
  },
  // on create
  mounted(){
    this.db.collection('Rules').get().then((querySnapshot) => {
      this.rules = querySnapshot.docs;      
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
