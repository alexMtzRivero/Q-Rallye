<template>
  <div class="name">

    <h1>Ajout de règles</h1>

    <h3>catégorie</h3>
    <input type="text" v-model="ruleTitle"/>
    <br>
    <h3>règle</h3>
    <textarea class="textArea" rows="10" v-model="ruleText"></textarea>
    <br>
    <button type="button" @click='addRule'>Ajouter</button>


    <br><br><br><br>
    <h1>Liste des règles</h1>
    <li>
      <ul v-for="(rule,index) in rules" class="rule" :key="rule.id">
        <h3>{{rule.data().title}}</h3>
        <img id="editBtn" v-if="(editing!=index)" @click='editRule(index, rule.data().rule)' src="../assets/edit_icon.png"/>

        <textarea class="textArea" rows="10" v-if="(editing==index)" v-model="updatedRule" type="text"/>
        <p v-else>{{rule.data().rule}}</p>

        <br>

        <button  v-if="(editing!=index)" type="button" @click='removeRule(rule.id, index)'>Supprimer</button>
        <button  v-else type="button" @click='saveModifiedRule(rule.id)'>Enregistrer</button>
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
      db:firebase.firestore(),
      editing:-1,
      updatedRule: ""
    }
  },
  methods:{
    addRule: function(){
      this.db.collection('Rules').add({title: this.ruleTitle, rule: this.ruleText})
      this.getRules();
    },
    removeRule: function(ref, index){
      this.db.collection('Rules').doc(ref).delete();
      this.rules.splice(index, 1);
    },
    saveModifiedRule: function(ref){
      this.db.collection('Rules').doc(ref).update({rule: this.updatedRule});
      this.editing = -1;
      this.getRules();
    },
    editRule: function(index, rule){
      this.editing = index;
      this.updatedRule = rule;
    },
    getRules: function(){
      this.db.collection('Rules').get().then((querySnapshot) => {
        this.rules = querySnapshot.docs;
      console.log(this.rules);
      })
    }
  },
  // on create
  mounted(){
    this.getRules();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

#editBtn {
  width: 2%;
}
.textArea {
  width: 75%;
  resize: both;
}

</style>
