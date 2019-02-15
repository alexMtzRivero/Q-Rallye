<template>
    <div class="form-style-6">
        <h1>Ajouter un quiz :</h1>
        <input v-model="tempQuiz" v-bind:style="{'border-color': inputBorder}" type="text" id="nomQuiz"/>
        <br/><br/>
        <button v-on:click="addQuiz">Ajouter</button>
        
        <!--<h2>Liste des quiz :</h2>
        <ul>
            <li v-for="quiz in quizzes" v-bind:key="quiz.id">{{quiz.data().nomQuiz}}</li>
        </ul>-->
            

    </div>
</template>

<script>
import firebase from "firebase";

export default {
        name: 'CreateQuiz',
        data () {
            return {
                quiz: {
                    nomQuiz: ''
                },
                tempQuiz:'',
                quizzes:[],
                inputBorder:''
            }
        },
        methods: {
            addQuiz: function(){
                if(this.tempQuiz.length != 0){
                    this.quiz.nomQuiz = this.tempQuiz
                    this.pushToDatabase();
                    this.resetQuiz();
                    this.resetField();
                    this.retrieveQuizzes();
                    this.inputBorder = '#ccc'
                }else{
                    this.inputBorder = '#ff0000';
                }
            },
            resetQuiz: function(){
                this.quiz = {
                    "nomQuiz":""
                }  
            },  
            resetField: function(){
                this.tempQuiz = "";
            },
            pushToDatabase(){
                 let db = firebase.firestore();
                 var tempQuiz = {}
                 tempQuiz.nomQuiz = this.tempQuiz
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

            },
            
        },
        mounted(){
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
	background: #43D1AF;
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
.form-style-6 button
{
	box-sizing: border-box;
	-webkit-box-sizing: border-box;
	-moz-box-sizing: border-box;
	width: 40%;
	padding: 5px;
	background: #43D1AF;
	border: 2px solid #30C29E;
	color: #fff;
    padding: 10px;
    margin-bottom: 10px;
}
.form-style-6 button[type="submit"]:hover,
.form-style-6 button[type="button"]:hover,
.form-style-6 button:hover
{
	background: #2EBC99;
}

</style>

