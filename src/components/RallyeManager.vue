<template>
  <div class="form-style-6">
    <img class="logo" src="../assets/logo_appli.png" />
    <button class="refresh_button" @click="logPlayers()"> Refresh</button>
    <br>
    <br>
    <br>
     <div id="mapid" class="mapid"> </div>
    <div v-for="(team,indexT) in teams" v-bind:key="team.name">
      <div>
           <h1 @click="changeDisplay(indexT)">{{team.name}}  {{team.timeText}}</h1>
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
      quizzes: [],
      mymap:""
    }
  },
  methods: {
 timeOfTeam: function (team) {
      var date = new Date(null);
      date.setSeconds(team.points); 
var result = date.toISOString().substr(11, 8);
      return  result//`${date.getDay()}:${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}` ;
    },
    changeDisplay:function (index) {
      this.zoomInTeam();
      this.teams[index].displayed = !this.teams[index].displayed;
    },
    logPlayers: function () {
      this.updatePoints();
      this.$forceUpdate();
    },
    updatePoints: function(){
      for (let i = 0; i < this.teams.length; i++) {
        this.teams[i].points = this.getPointsOf(this.teams[i]);
        this.teams[i].timeText = this.timeOfTeam(this.teams[i])
      }
      this.teams.sort((a,b)=>{return a.points-b.points});
       
       console.log(this.teams);
       
    },
    getPointsOf:function(team){
      var points = 0;
      const penaltyForBad = 30;
      if( team.answers!= null){
        // for all the quizz
        for (let i = 0; i < team.answers.length; i++) {
          const quiz = team.answers[i];
          // we check the bad choices
          if( quiz.choices != null){
            for (let i = 0; i < quiz.choices.length; i++) {
              // if its bad answer we add to the counter
              if(quiz.choices[i]!= this.quizzes[quiz.id].questions[i].goodAnswer)
                  points+= penaltyForBad;
             // console.log(quiz.choices[i],this.quizzes[quiz.id].questions[i].goodAnswer,quiz.choices[i]!= this.quizzes[quiz.id].questions[i].goodAnswer);
                  
            }
          }
            // we add the time they took to complet the quiz
          if(quiz.endQuiz!=null && quiz.startQuiz!=null){
              points += quiz.endQuiz.seconds - quiz.startQuiz.seconds;
          }
            // TODO transform to time
        }
      }

      return points;
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
         
        var polyline = L.polyline(path, {color: `${team.color}`}).addTo(this.mymap);
                  
        }
    },
    getAnswersOf: function (teamList) {
      var db = firebase.firestore();

      for (let i = 0; i < teamList.length; i++) {
        const team = teamList[i];

        db.collection(`Groups/${team.name}/Answers`).orderBy("startQuiz").get().then((querySnapshot) => {
        if (team.answers==null) {
              team.answers = [];
           }
          querySnapshot.docs.forEach(element => {
            
            var toPush = element.data();
            toPush.id = element.id;
            team.answers.push(toPush)
          });
          console.log("answers of: "+team.name,team,querySnapshot.docs);
          
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
    getGoodAnswers:function (list) {
      var db = firebase.firestore();

      var quizList = Object.keys(list);
      for (let i = 0; i < quizList.length; i++) {
        const quiz = quizList[i];

        db.collection(`Quizzes/${quiz}/Questions`).get().then((querySnapshot) => {
          if(!this.quizzes[quiz].questions){
            this.quizzes[quiz].questions = []
          }
          querySnapshot.docs.forEach(element => {
            var toPush = element.data();
            toPush.id = element.id;
            this.quizzes[quiz].questions.push(toPush);
          });
          //console.log("respuestas",this.quizzes[quiz]);
          
          
        })
      }

    },
    getQuestions: function () {
      var db = firebase.firestore();

      db.collection('Quizzes').get().then((querySnapshot) => {
        querySnapshot.docs.forEach(element => {
          this.quizzes[element.id] = element.data()
        });
        
        this.getGoodAnswers(this.quizzes);

        this.getPlayers();
      })
    },
    zoomInTeam: function () {
      this.mymap.fitBounds([[45.188096, 5.718452],[45.199096, 5.818452]]);
    },
    mapInit: function () {
      this.mymap = L.map('mapid', {
        center: [45.188096, 5.718452],
        zoom: 13
      })
      // conects the map with the open street maps data
      this.tileLayer = L.tileLayer(
        'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 18,
          attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        }
      );
      this.tileLayer.addTo(this.mymap);

      var marker = L.marker([45.188096, 5.718452]).addTo(this.mymap);

      var circle = L.circle([45.188096, 5.718452], {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius: 50
      }).addTo(this.mymap);

      
    }


  },
  // on create
  mounted() {
    this.$parent.testLogin();
    this.mapInit()

    // gets the data of the teams
    this.getQuestions();
    
    

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.logo {
  width: 5%;
  float: left;
}
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
  padding-right: 4%;
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
	max-width: 85%;
	margin: 10px auto;
	padding: 16px;
	background: #F7F7F7;
}
.form-style-6 h1{
background: linear-gradient(90deg, rgba(255,221,88,1) 0%,rgba(100,205,129,1) 33%, rgba(16,174,161,1) 67%,rgba(1,136,168,1) 100%);	padding: 20px 0;
	font-size: 140%;
	font-weight: 300;
	text-align: center;
	color: #fff;
	margin: 0px 0px 3px 0px;
}
.form-style-6 h1:hover{
  cursor: pointer;
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
.form-style-6 button {
	width: 20%;
	padding: 5px;
	background: rgba(16,174,161,1) 33%;
	color: #fff;
  padding: 10px;
  border:none;
  border-radius: 3px;
}
.form-style-6 button[type="submit"]:hover,
.form-style-6 button[type="button"]:hover,
.form-style-6 button:hover{
  background: #0E988D;
  cursor: pointer;
}
.refresh_button {
  float: right;
}

</style>
