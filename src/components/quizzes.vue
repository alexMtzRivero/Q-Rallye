<template>
    <div>
        <h2>Ajouter un quiz :</h2>
        <input v-model="tempQuiz" type="text" id="nomQuiz"/>
        <br/><br/>
        <button v-on:click="addQuiz">Ajouter</button>

        <h2>Liste des quiz :</h2>
        <ul>
            <li v-for="quiz in quizzes" v-bind:key="quiz.id">{{quiz.data().nomQuiz}}</li>
        </ul>
            

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
            }
        },
        methods: {
            addQuiz: function(){
                this.quiz.nomQuiz = this.tempQuiz
                this.pushToDatabase();
                this.resetQuiz();
                this.resetField();
                this.retrieveQuizzes();
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
                    console.log(this.quizzes);
                    
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

</style>

