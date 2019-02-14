<template>
  <div class="form-style-6">
    <button @click="logPlayers()"> Refresh</button>
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
                <td v-for="n in answer.choices" :key ="n"> team answer </td>
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
    this.$parent.testLogin();
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
  height: 50vw;
  width: 90%;

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
  border-spacing: 0px;
  border-collapse: collapse;
}
th{
  border: solid 1px;
  background: #f2f2f2;
}

td{
  border: solid 1px;
  background: #f2f2f2;

}





.form-style-6{
	font: 95% Arial, Helvetica, sans-serif;
	max-width: 60%;
	margin: 10px auto;
	padding: 16px;
	background: #F7F7F7;
}
.form-style-6 h1{
	background: #43D1AF;
	padding: 20px 0;
	font-size: 140%;
	font-weight: 300;
	text-align: center;
	color: #fff;
	margin: 0px 0px 3px 0px;
}
.form-style-6 input[type="text"],
.form-style-6 input[type="date"],
.form-style-6 input[type="datetime"],
.form-style-6 input[type="email"],
.form-style-6 input[type="number"],
.form-style-6 input[type="search"],
.form-style-6 input[type="time"],
.form-style-6 input[type="url"],
.form-style-6 textarea,
.form-style-6 select 
{
	-webkit-transition: all 0.30s ease-in-out;
	-moz-transition: all 0.30s ease-in-out;
	-ms-transition: all 0.30s ease-in-out;
	-o-transition: all 0.30s ease-in-out;
	outline: none;
	box-sizing: border-box;
	-webkit-box-sizing: border-box;
	-moz-box-sizing: border-box;
	width: 70%;
	background: #fff;
	margin-bottom: 4%;
	border: 1px solid #ccc;
	padding: 5px;
	color: #555;
	font: 95% Arial, Helvetica, sans-serif;
}
.form-style-6 input[type="text"]:focus,
.form-style-6 input[type="date"]:focus,
.form-style-6 input[type="datetime"]:focus,
.form-style-6 input[type="email"]:focus,
.form-style-6 input[type="number"]:focus,
.form-style-6 input[type="search"]:focus,
.form-style-6 input[type="time"]:focus,
.form-style-6 input[type="url"]:focus,
.form-style-6 textarea:focus,
.form-style-6 select:focus
{
	box-shadow: 0 0 5px #43D1AF;
	border: 1px solid #43D1AF;
}

.form-style-6 button[type="submit"],
.form-style-6 button[type="button"],
.form-style-6 button{
	box-sizing: border-box;
	-webkit-box-sizing: border-box;
	-moz-box-sizing: border-box;
	width: 40%;
	background: #43D1AF;
	border: 2px solid #30C29E;
	color: #fff;
  padding: 10px;
  margin: 0px 0px 3px 0px;
}
.form-style-6 button[type="submit"]:hover,
.form-style-6 button[type="button"]:hover,
.form-style-6 button{
	background: #2EBC99;
}

</style>
