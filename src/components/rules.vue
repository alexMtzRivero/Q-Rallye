<template>
  <div class="name">

    <h1>Ajout de règles</h1>

    <h3>catégorie</h3>
    <input class="input" type="text" v-model="ruleTitle"/>
    <br>
    <h3>règle</h3>
    <textarea class="textArea" rows="10" v-model="ruleText"></textarea>
    <br>
    <button type="button" @click='addRule'>Ajouter</button>


    <br><br><br><br>
    <h1>Liste des règles</h1>
    <li>
      <ul v-for="(rule,index) in rules" class="rule" :key="rule.id">

        <div class="ruleDiv" @mousedown="onRuleMouseDown(index)" @mouseup="onRuleMouseUp(index)">

          <img id="editBtn" v-if="(editing!=index)" @click='editRule(index, rule.data().rule)' src="../assets/edit_icon.png"/>
          <h3 id="ruleTitle">{{rule.data().title}}</h3>

          <textarea class="textArea" rows="10" v-if="(editing==index)" v-model="updatedRule" type="text"/>
          <p v-else>{{rule.data().rule}}</p>

          <br>

          <button  v-if="(editing!=index)" type="button" @click='removeRule(rule.id, index)'>Supprimer</button>
          <button  v-else type="button" @click='saveModifiedRule(rule.id)'>Enregistrer</button>

        </div>

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
      clickedRule: -1,
      updatedRule: "",
    }
  },
  methods:{
    addRule: function(){
      this.db.collection('Rules').add({title: this.ruleTitle, rule: this.ruleText, position: this.rules.length})
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
    onRuleMouseDown: function(index){
      this.clickedRule = index;
    },
    onRuleMouseUp: function(index){
      if(this.clickedRule != -1 && this.clickedRule != index){
        this.shift(this.clickedRule, index);
        }
        this.clickedRule = -1;
    },
    shift: function(index1, index2){
      var temp = this.rules[index1];
      this.rules.splice(index1, 1, this.rules[index2]);
      this.rules.splice(index2, 1, temp);

      var tempPos = this.rules[index1].data().position;
      this.rules[index1].data().position = this.rules[index2].data().position;
      this.rules[index2].data().position = tempPos;

      console.log("index1 new position : "+this.rules[index1].data().position);
      console.log("index2 new position : "+this.rules[index2].data().position);

      this.db.collection('Rules').doc(this.rules[index1].id).update({position: this.rules[index1].data().position});
      this.db.collection('Rules').doc(this.rules[index2].id).update({position: this.rules[index2].data().position});

    },
    editRule: function(index, rule){
      this.editing = index;
      this.updatedRule = rule;
    },
    getRules: function(){
      this.db.collection('Rules').orderBy('position').get().then((querySnapshot) => {
        this.rules = querySnapshot.docs;
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
  float: right;
}

.ruleDiv {
  text-align: left;

  -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
     -khtml-user-select: none; /* Konqueror HTML */
       -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome and Opera */
}

.textArea {
  width: 75%;
  resize: both;
}

.input {
  width: 75%;
}

</style>
