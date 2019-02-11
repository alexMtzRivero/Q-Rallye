<template>
  <div class="name">

    <li>
      <ul v-for="rule in rules" class="rule" :key="rule.id">
        <h1>{{rule.data().title}}</h1>
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
      rules: ""
    }
  },
  methods:{
    
  },
  // on create
  mounted(){
    let db = firebase.firestore();
    db.collection('Rules').get().then((querySnapshot) => {
      this.rules = querySnapshot.docs;
      console.log(this.rules);
      
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
