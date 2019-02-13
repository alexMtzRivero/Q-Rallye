<template>
  <div class="">
    <button @click="logPlayers()"> refresh</button>
    <h1>{{teams.length}} palyers</h1>
    <div v-for="(team,indexT) in teams" v-bind:key="team.name">
      <div>
           <h1 @click="changeDisplay(indexT)">{{team.name}}</h1>
      </div>
     
      <div v-if="team.displayed" >
        <div v-for="(answer,index) in team.answers" v-bind:key="team.name+index" class="horizontal">
           <h2 class = "listSection">{{answer.id}}</h2>
           <h2 class = "listSection">time</h2>
           <table>
             <tr>
                <th v-for="n in answer.choices" :key ="n"> response id </th>
             </tr>
             <tr>
                <th v-for="n in answer.choices" :key ="n"> team answer </th>
             </tr>
           </table>
        </div>
      </div>
    </div>
    
    <div id="mapid" class="mapid"> </div>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  name: 'RallyeManager',
  components: {

  },
  props: {


  },
  data() {
    return {
      teams: [],
      quizzes: []
    }
  },
  methods: {
    changeDisplay:function (index) {
      this.teams[index].displayed = !this.teams[index].displayed;
    },
    logPlayers: function () {
      this.$forceUpdate();

    },
    updatePaths: function(){
        for (let i = 0; i < this.teams.length; i++) {
          const team = this.teams[i];
          var path =[]
          for (let i = 0; i < team.answers.length; i++) {
            const answer = team.answers[i].id;
            // TODO put all the location of the answers in a dictionary called an
            const latLong = this.answers[answer];
            path.push([latLong.lat,latLong.long]);


          }
         
        var polyline = L.polyline(path, {color: `${team.color}`}).addTo(map);
                  
        }
    },
    getAnswersOf: function (teamList) {
      var db = firebase.firestore();

      for (let i = 0; i < teamList.length; i++) {
        const team = teamList[i];

        db.collection(`Groups/${team.name}/Answers`).orderBy("startQuiz").get().then((querySnapshot) => {

          querySnapshot.docs.forEach(element => {
            if (!team.Answers) {
              team.answers = [];
            }
            var toPush = element.data();
            toPush.id = element.id;
            team.answers.push(toPush)
          });
        })
      }

    },
    getPlayers: function () {
      var db = firebase.firestore();
      var teams = [];
      db.collection('Groups').get().then((querySnapshot) => {

        querySnapshot.docs.forEach(element => {
          // the same but reactive this.teams[element.id] = element.data();
          var toPush = element.data();
          toPush.name = element.id;
          toPush.displayed = false;
          this.teams.push(toPush);
        });

        this.getAnswersOf(this.teams);
      })
    },
    getQuestions: function () {
      var db = firebase.firestore();

      db.collection('Quizzes').get().then((querySnapshot) => {

        querySnapshot.docs.forEach(element => {
          this.quizzes[element.id] = element.data()

        });

      })

    },
    mapInit: function () {
      var mymap = L.map('mapid', {
        center: [51.505, -0.09],
        zoom: 13
      })
      // conects the map with the open street maps data
      this.tileLayer = L.tileLayer(
        'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 18,
          attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        }
      );
      this.tileLayer.addTo(mymap);

      var marker = L.marker([51.5, -0.09]).addTo(mymap);

      var circle = L.circle([51.508, -0.11], {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius: 500
      }).addTo(mymap);

      
    }


  },
  // on create
  mounted() {

    this.mapInit()

    // gets the data of the teams
    this.getPlayers();
    this.getQuestions();

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#mapid { 
  display: -webkit-inline-box;
  height: 70vw;
  width: 70vw;

}
.horizontal{
  display: -webkit-inline-box;
      width: -webkit-fill-available;
}
.listSection{
  width: 15%;
}
table{
      width: 70%;
}

</style>
