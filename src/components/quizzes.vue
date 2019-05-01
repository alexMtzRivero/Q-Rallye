<template>
    <div class="form-style-6">
        <h1>Ajouter un quiz :</h1>
        <label for="teamName">Nom du quiz :</label><br>
        <input v-model="tempQuiz" v-bind:style="{'border-color': inputBorder}" type="text"   id="nomQuiz"/>
        <br/>
        <br/>
        <label for="teamName">Position du quiz :</label><br>
        
            <div id="mapid" class="mapid" v-bind:style="{'border': mapBorder}"> </div>
            <br/><label class="erreur">{{generalComents}}</label>
        <br/><br/>
        <button v-on:click="addQuiz">Ajouter</button>
    </div>
</template>

<script>
import firebase from "firebase";

export default {
        name: 'CreateQuiz',
        components: {

        },
        props: {


        },
        data () {
            return {
                quiz: {
                    nomQuiz: '',
                    geoPoint: ''
                },
                tempQuiz:'',
                quizzes:[],
                inputBorder:'',
                mapBorder:'',
                mymap:"",
                myMarker: "",
                location: "",
                generalComents:""
            }
        },
        methods: {
            changeDisplay:function () {
                this.zoomInTeam();
            },
            addQuiz: function(){
                if(this.tempQuiz.length != 0 && this.location.length != 0){
                    this.quiz.nomQuiz = this.tempQuiz
                    this.quiz.geoPoint = this.location
                    this.pushToDatabase();
                    this.resetQuiz();
                    this.resetField();
                    this.retrieveQuizzes();
                    this.inputBorder = '#ccc';
                    this.mapBorder = '#ccc';
                }else if(this.tempQuiz.length == 0 && this.location.length == 0){
                    this.inputBorder = '#ff0000';
                    this.mapBorder = '2px solid red';
                    this.generalComents = "Veuillez localiser le lieu du quiz";
                }else if(this.tempQuiz.length == 0){
                    this.inputBorder = '#ff0000';
                }else{
                    this.mapBorder = '#ff0000';
                }
            },
            resetQuiz: function(){
                this.quiz = {
                    "nomQuiz":"",
                    "geoPoint":""
                }
            },  
            resetField: function(){
                this.tempQuiz = "";
                this.location = "";
            },
            pushToDatabase(){
                 let db = firebase.firestore();
                 var tempQuiz = {}
                 tempQuiz.nomQuiz = this.tempQuiz;
                 var GeoPoint = require('geopoint');
                 tempQuiz.position = new firebase.firestore.GeoPoint(this.quiz.geoPoint.lat, this.quiz.geoPoint.lng);
                 let n = this.quizzes.length
              
                console.log(this.quizzes.length,this.quizzes);
                
                db.collection('Quizzes').doc("Quiz" + (n+1)).set(tempQuiz)
                    .then((docRef)=> {
                    console.log("Document written with ID: ", docRef);
                    this.$parent.$refs.questions.refreshList()
                    })
                    .catch((error) => {
                        console.error("Error adding document: ", error);
                    });
            },
            retrieveQuizzes(){
                 var db = firebase.firestore();
                 var quizzes=[];
                 db.collection('Quizzes').get().then((querySnapshot) => {
                    this.quizzes=querySnapshot.docs
                })

            },zoomInTeam: function () {
                this.mymap.fitBounds([[45.188096, 5.718452],[45.199096, 5.818452]]);
            },
            mapInit: function () {
                      console.log("xxx")

            this.mymap = L.map('mapid', {
                center: [45.188096, 5.718452],
                zoom: 13
            });
            console.log("mapp",this.mymap);
            
            // conects the map with the open street maps data
            this.tileLayer = L.tileLayer(
                'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 17,
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
                }
            );
            console.log("layer",this.titleLayer);
            this.tileLayer.addTo(this.mymap);

            this.mymap.on('click', this.onMapClick);
            let db = firebase.firestore();
            db.collection('Quizzes').get().then((querySnapshot) => {
                    querySnapshot.docs.forEach(element => {
                        
                        var longitude = element.data().position.longitude;
                        var latitude = element.data().position.latitude;
                        console.log(longitude,latitude);
                        var marker = L.marker([latitude, longitude]).addTo(this.mymap);
                    });
                });
            },
            onMapClick: function (e) {
                if(this.myMarker != ""){
                    this.mymap.removeLayer(this.myMarker)
                }
                this.myMarker = L.marker(e.latlng);
                this.mymap.addLayer(this.myMarker);
                this.location = e.latlng;
            }
            
            },
            mounted(){
                this.mapInit();
                this.retrieveQuizzes();
                let db = firebase.firestore();
                
                    var nom_quiz = this.quiz.nomQuiz;
                    db.collection('Quizzes').get().then(snap => {
                        this.quizzes = snap.docs
                        
                    }).catch(
                        error => {
                            console.log("erreur");
                            
                        }

                    );
                
            }
        
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#mapid { 
  margin-top: 5px;
  display: -webkit-inline-box;
  height: 50vw;
  width: 90%;
  z-index: 1;
}
h1{
	background: #43D1AF;
	padding: 20px 0;
	font-size: 140%;
	font-weight: 300;
	text-align: center;
	color: #fff;
	margin: 10px auto;
	padding: 16px;
}

.form-style-6{
	font: 95% Arial, Helvetica, sans-serif;
	max-width: 70%;
	margin: 10px auto;
	background: #F7F7F7;
}
.form-style-6 h1{
	background: linear-gradient(90deg, rgba(255,221,88,1) 0%,rgba(100,205,129,1) 33%, rgba(16,174,161,1) 67%,rgba(1,136,168,1) 100%);	font-size: 140%;
	font-size: 140%;
	font-weight: 300;
	text-align: center;
	color: #fff;
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
	width: 60%;
	background: #fff;
	border: 1px solid #ccc;
	padding: 5px;
	color: #555;
	font: 95% Arial, Helvetica, sans-serif;
    margin-top: 5px;
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
	padding: 5px;
	border: 1px solid #43D1AF;
}

.form-style-6 button[type="submit"],
.form-style-6 button[type="button"],
.form-style-6 button {
	width: 35%;
	padding: 5px;
	background: rgba(16,174,161,1) 33%;
	color: #fff;
  padding: 10px;
  border:none;
  border-radius: 3px;
  margin: 1px;
}
.form-style-6 button[type="submit"]:hover,
.form-style-6 button[type="button"]:hover,
.form-style-6 button:hover{
  background: #0E988D;
  cursor: pointer;
}

.erreur{
  color:red;
  font-weight: bold;
}

@media screen and (min-width: 200px) and (max-width: 640px) {
  h1{
    background: linear-gradient(90deg, rgba(255,221,88,1) 0%,rgba(100,205,129,1) 33%, rgba(16,174,161,1) 67%,rgba(1,136,168,1) 100%);	font-size: 140%;
    padding: 20px 0;
    font-size: 140%;
    font-weight: 300;
    text-align: center;
    color: #fff;
    margin: -16px -16px 16px -16px;
    max-width: 60vh;
    margin: 10px auto;
    padding: 16px;
  }
  .form-style-6{
	font: 95% Arial, Helvetica, sans-serif;
	max-width: 60vh;
	margin: 10px auto;
	background: #F7F7F7;
  margin-left: 65px;
  margin-right: 5px;
  }
}

</style>

