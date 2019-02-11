<template>
  <div class="">
      <h1>{{teams.name}}</h1>
      
  </div>
</template>

<script>

import firebase from "firebase";
export default {
  name: 'ListTeam',
  components:{

  },
  props: {
      

  },
  data(){
    return{
        teams:[],
    }
  },
  methods:{

  },
  // onCreate
  mounted(){
        let db = firebase.firestore();
        let rules = db.collection("Groups");
        db.collection('Groups').get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                console.log(doc.id, ' => ', doc.data().color)
                this.teams[doc.id]=doc.data();
                console.log(this.teams)
            })
        })
  },
  
 
}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
