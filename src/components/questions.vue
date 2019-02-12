<template>
    <div>
        <h1>Nom du quiz <!-- A changer -->:</h1>
        <h2>Ajouter une question :</h2>
    
        <p>Question :</p><input v-model="tempQuestions" type="text" id="question"/>
        <p>Bonne réponse :</p><input v-model="tempGoodAnswer" type="text" id="goodAnswer"/>
        <p>Mauvaise réponse 1 :</p><input v-model="tempBadAnswer1" type="text" id="badAnswer1"/>
        <p>Mauvaise réponse 2 :</p><input v-model="tempBadAnswer1" type="text" id="badAnswer2"/>
        <p>Mauvaise réponse 3 :</p><input v-model="tempBadAnswer1" type="text" id="badAnswer3"/>
        <br/><br/>
        <button v-on:click="addQuestion">Ajouter</button>

        <h2>Liste des questions :</h2>
        <ul>
            <li v-for="question in questions" v-bind:key="question.id">
                <p><b {{question.data().question}}></b></p><br/>
                <p>Bonne réponse : <b {{question.data().goodAnswer}}></b> </p><br/>
                <!-- A changer
                <p>Mauvaise réponse 1 : <b {{question.data().badAnswer1}}></b> </p><br/>
                <p>Mauvaise réponse 2 : <b {{question.data().badAnswer2}}></b> </p><br/>
                <p>Mauvaise réponse 3 : <b {{question.data().badAnswer3}}></b> </p><br/>-->
            </li>
        </ul>
    </div>
</template>

<script>
import firebase from "firebase";

export default {
        name: 'AddQuestion',
        data () {
            return {
                question: {
                    question: '',
                    goodAnswer: '',
                    choices:{
                        badAnswer1: '',
                        badAnswer2: '',
                        badAnswer3: '',
                    }
                },
                tempQuestion:'',
                tempGoodAnswer:'',
                tempBadAnswer1:'',
                tempBadAnswer2:'',
                tempBadAnswer3:'',
                questions:[],
            }
        },
        methods: {
            addQuestions: function(){
                this.question.question = this.tempQuestion
                this.question.goodAnswer = this.tempGoodAnswer
                this.question.badAnswer1 = this.tempBadAnswer1
                this.question.badAnswer2 = this.tempBadAnswer2
                this.question.badAnswer3 = this.tempBadAnswer3
                this.pushToDatabase();
                this.resetQuestion();
                this.resetField();
                this.retrieveQuestions();
            },
            resetQuestion: function(){
                this.question = {
                    "question":"",
                    "goodAnswer":"",
                    "choices":{
                        "badAnswer1":"",
                        "badAnswer2":"",
                        "badAnswer3":"",
                    }
                }
            },
            resetField: function()  {
                this.tempQuestion = "";
                this.tempGoodAnswer = "";
                this.tempBadAnswer1 = "";
                this.tempBadAnswer2 = "";
                this.tempBadAnswer3 = "";
            },
            pushToDatabase(){
                let db = firebase.firestore();
                var tempQuestion = {}
                tempQuestion.question = this.tempQuestion
                tempQuestion.goodAnswer= this.tempGoodAnswer
                //ajouter bad answer
                let n = this.questions.length
                db.collection('Questions').doc("Question" + (n+1)).set(tempQuestion)
                    .then((docRef)=> {
                    console.log("Document written with ID: ", docRef);
                    })
                    .catch((error) => {
                        console.error("Error adding document: ", error);
                    });
            },
            retrieveQuestions(){
                var db = firebase.firestore();
                 var questions=[];
                 db.collection('Questions').get().then((querySnapshot) => {
                    this.questions=querySnapshot.docs
                })
            }
        },
        mounted(){
            this.retrieveQuestions();
            let db = firebase.firestore();
               
            var question = this.question.question;
            db.collection('Questions').get().then(snap => {
                this.questions = snap.docs
                console.log(this.questions);      
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

