<template>
  <div>
    <div v-for="team in teams" v-bind:key="team.color">
        <h1>{{team.id}}</h1>
        
    </div>
   <input type="text" @change="print()" name="azerty" id="">
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
    print(){
      console.log(this.teams.length);
    }

  },
  // onCreate
  mounted(){
      var db = firebase.firestore();
        var teams=[];
        db.collection('Groups').get().then((querySnapshot) => {
            this.teams=querySnapshot.docs
          
        })        
      console.log(this.teams);
        
  },
  
 
}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
