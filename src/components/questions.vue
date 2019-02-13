<template>
    <div>
        <button @click="log()">show array</button>
        <div v-for="(quiz,index) in quizzes" v-bind:key="quiz.id">
            <h1>{{quiz.id}}</h1>
            <div v-for="question in quiz.questions" :key ="question.question+quiz.id">
                <h3>{{question.question}}</h3>
                <ol >
                    <li v-for="pAnswer in question.choices" :key ="pAnswer">{{pAnswer}} </li>
                </ol>
            </div>
            <button type="button" v-if="index != idDivEdited" @click="selectToAddQuestion(index)">Ajouter une question</button>

            <div v-if="index == selectedQuiz">
                
                <input type="text" placeholder="question" v-model="tempQuestion.question">
                <form action="" >
                    <div v-for="(answer,indexT) in tempQuestion.choices" :key="`${indexT}+${answer}`">
                        <input  type="radio" name="answer" :value="indexT" v-model="tempQuestion.goodAnswer" >{{answer}} <br>
                    </div>
                    
                </form>
                <input type="text" v-model="tempOption">
                <button @click="addOptionToTemp(tempOption)">add Option</button>
                <br>
                <button type="button" @click="pushTempTo(index)">Ajouter</button>
            </div>
        </div>
    </div>
</template>

<script>
import firebase from "firebase";

export default {
        name: 'ListQuestion',
        data () {
            return {
                quizzes:[],
                idQuestion:"",
                idDivEdited:-1,//?????
                tempCb:true,
                tempOption : "",
                tempQuestion:[],
                selectedQuiz:-1,
                show:false
            }
        },
        methods: {
            log:function(){
                console.log(this.quizzes);
                
            },
            selectToAddQuestion(quizzIndex){
                this.tempQuestion = {}
                this.selectedQuiz =  (quizzIndex == this.selectedQuiz)? -1: quizzIndex;
                
            },
            addOptionToTemp(option){
                this.tempOption ="";
                
               if( !this.tempQuestion.choices)this.tempQuestion.choices = []
               this.tempQuestion.choices.push(option); 
               this.$forceUpdate();
            },
          
            //good
            refreshList: function(){
                var db = firebase.firestore();
                db.collection('Quizzes').get().then((querySnapshot) => {
                    querySnapshot.docs.forEach(element => {
                        var toPush = element.data();
                        toPush.id = element.id;
                        const ind = this.quizzes.push(toPush)-1
                        this.getQuestionFromQuiz(this.quizzes[ind])
                    });
                    
                })
            },
            
            addQuestion: function(quiz){
                var cb = document.getElementById('multi');
                this.idDivEdited = quiz;
                if(!cb.checked){
                    this.show = !this.show;
                }
               
                this.getQuestionFromQuiz(quiz);
                this.resetField;
            },
            //good
            getQuestionFromQuiz(quiz){
                var db = firebase.firestore();
                db.collection('Quizzes/'+quiz.id+'/Questions').get().then((querySnapshot) => {
                    quiz.questions = []
                    querySnapshot.docs.forEach(element => {
                        var toPush = element.data();
                        toPush.id = element.id;
                        console.log(toPush);
                        quiz.questions.push(toPush);
                        
                    });
                    this.$forceUpdate();
                })
            },
            //good
            pushTempTo(quizzIndex) {
                var db = firebase.firestore();        
                var ind = (this.quizzes[quizzIndex].questions.length)?  this.quizzes[quizzIndex].questions.length:0;
                var id = this.quizzes[quizzIndex].id
                db.collection("Quizzes/"+id+"/Questions").doc("question"+ind).set(this.tempQuestion)
                .then((docRef) => {
                    this.refreshList();
                    console.log("Document written with ID: ", docRef.id);
                })
                .catch(function(error) {
                    console.error("Error adding document: ", error);
                });
                this.tempQuestion = {}
                this.$forceUpdate();
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

