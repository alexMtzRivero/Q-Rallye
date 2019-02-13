<template>
    <div>
        <div v-for="(quiz,index) in quizzes" v-bind:key="quiz.id" >
        <h1>{{quiz.id}}</h1>
        <button type="button" v-if="index != idDivEdited" @click="showQuestions(index)" >Ajouter une question</button>
        
        <div v-if="index == idDivEdited" >
          <!--tempCB--><input type="checkbox" id="multi" checked v-model="tempCb"/>Ajout multiple<br>
          <label for="question">Question :</label>
          <input id="question" type="text" v-model="tempQuestion" />
          <br>
          <label for="goodAnswer">Bonne réponse :</label>
          <input id="goodAnswer" type="text" v-model="tempGoodAnswer" />
          <br>
          <label for="badAnswer1">Mauvaise réponse 1 :</label>
          <input id="badAnswer1" type="text" v-model="tempBadAnswer1" />
          <br>
          <label for="badAnswer2">Mauvaise réponse 2 :</label>
          <input id="badAnswer2" type="text" v-model="tempBadAnswer2" />
          <br>
          <label for="badAnswer3">Mauvaise réponse 3 :</label>
          <input id="badAnswer3" type="text" v-model="tempBadAnswer3" />
          <br>
          <button type="button" @click="addQuestion(quiz)">Ajouter</button>
          <!--tempCB--><button type="button" v-if="tempCb" @click="showQuestions(-1)">Terminer</button>
        </div>
        </div>

        <!--Ancienne version
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
                <p>Bonne réponse : <b {{question.data().goodAnswer}}></b> </p><br/>-->
                <!-- A changer
                <p>Mauvaise réponse 1 : <b {{question.data().badAnswer1}}></b> </p><br/>
                <p>Mauvaise réponse 2 : <b {{question.data().badAnswer2}}></b> </p><br/>
                <p>Mauvaise réponse 3 : <b {{question.data().badAnswer3}}></b> </p><br/>
            </li>
        </ul>-->
    </div>
</template>

<script>
import firebase from "firebase";

export default {
        name: 'ListQuestion',
        data () {
            return {
                quizzes:[],
                questions:[],
                idQuestion:"",
                idDivEdited:-1,//?????
                question: {
                    question: '',
                    goodAnswer: '',
                    badAnswer1: '',
                    badAnswer2: '',
                    badAnswer3: '',
                },
                tempQuestion:'',
                tempGoodAnswer:'',
                tempBadAnswer1:'',
                tempBadAnswer2:'',
                tempBadAnswer3:'',
                tempCb:true,
                show:false
            }
        },
        methods: {
            refreshList: function(){
                var db = firebase.firestore();
                db.collection('Quizzes').get().then((querySnapshot) => {
                    this.quizzes=querySnapshot.docs
                })
            },
            showQuestions: function(id){
                this.show = !this.show;
                this.idDivEdited = id;
            },
            addQuestion: function(quiz){
                var cb = document.getElementById('multi');
                this.idDivEdited = quiz;
                if(!cb.checked){
                    this.show = !this.show;
                }
                this.question.question = this.tempQuestion
                this.question.goodAnswer = this.tempGoodAnswer
                this.question.badAnswer1 = this.tempBadAnswer1
                this.question.badAnswer2 = this.tempBadAnswer2
                this.question.badAnswer3 = this.tempBadAnswer3
                this.getQuestionFromQuiz(quiz);
                this.resetField;
            },
            resetField: function()  {
                this.tempQuestion = "";
                this.tempGoodAnswer = "";
                this.tempBadAnswer1 = "";
                this.tempBadAnswer2 = "";
                this.tempBadAnswer3 = "";
                this.question = {
                    "question":"",
                    "goodAnswer":"",
                    "badAnswer1":"",
                    "badAnswer2":"",
                    "badAnswer3":"",
                }
            },
            getQuestionFromQuiz(quiz){
                var db = firebase.firestore();
                db.collection('Quizzes/'+quiz.id+'/Questions').get().then((querySnapshot) => {
                    this.questions = querySnapshot.docs;
                    this.idQuestion = this.questions.length + 1;
                    console.log(this.idQuestion);
                    this.pushQuestion(quiz);
                })
            },
            pushQuestion(quiz) {
                var db = firebase.firestore();        
                db.collection("Quizzes/"+quiz.id+"/Questions").doc("question"+this.idQuestion).set(this.question)
                .then(function(docRef) {
                    console.log("Document written with ID: ", docRef.id);
                })
                .catch(function(error) {
                    console.error("Error adding document: ", error);
                });
            },
        },
        mounted(){
            this.refreshList();   
        },
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

