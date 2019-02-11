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
      ruleText:""
    }
  },
  methods:{
    addRule: function(){
      let db = firebase.firestore();
      db.collection('Rules').add({title: this.ruleTitle, rule: this.ruleText})
      db.collection('Rules').get().then((querySnapshot) => {
      this.rules = querySnapshot.docs;
    })
    }
  },
  // on create
  mounted(){
    let db = firebase.firestore();
    db.collection('Rules').get().then((querySnapshot) => {
      this.rules = querySnapshot.docs;      
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
