<template>
    <div>
        <div class="form-style-6" v-for="(quiz,index) in quizzes"  v-bind:key="`${quiz.id}+${index}`">
            <h1>{{quiz.id}}</h1>
            <div :class="`${(showedQR == index)?'shown':'hidden'} canvas` ">
                <div  id="qrholder" ref ="quizhoder"></div><br>
                <button @click="print(index,quiz.id)"> Imprimer </button>
            </div>
            <br>
            <button @click="makeCode(index,quiz.id)"> Voir le QR code</button><br>
            <div v-for="question in quiz.questions" :key ="`${question.question}+${quiz.id}`">
                <h3 class="questionStyle">{{question.question}}</h3>
                <ul  class="listAnswers">
                    <li v-for="(pAnswer,indexA) in question.choices" :key ="`${pAnswer}+${indexA}`">{{pAnswer}} </li>
                </ul>
            </div>
            <button type="button" v-if="index != idDivEdited" @click="selectToAddQuestion(index)">Ajouter une question</button>

            <div v-if="index == selectedQuiz">
                <label>Question :</label><br>
                <input type="text" v-model="tempQuestion.question">
                <form action="" >
                    <label>Réponses :</label><br>
                    <label>(cocher la bonne réponse)</label><br>
                    <div v-for="(answer,indexT) in tempQuestion.choices" :key="`${indexT}+${answer}`">
                        <input  type="radio" name="answer" :value="indexT" v-model="tempQuestion.goodAnswer" >{{answer}} <br>
                    </div>
                    
                </form>
                <input type="text" v-model="tempOption"><br><br>
                <button @click="addOptionToTemp(tempOption)">Ajouter la réponse</button>
                <br>
                <button type="button" @click="pushTempTo(index)">Ajouter</button>
            </div>
        </div>
    </div>
</template>
<script>
const QRCode = require('../Js/qrcode.js').default
import firebase,{ functions } from "firebase";

export default {
        name: 'ListQuestion',
        data () {
            return {
                quizzes:[],
                qrCodes:[],
                showedQR:-1,
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
           print:function (ref,quizid) {
                
                console.log(this.$refs.quizhoder[ref].innerHTML);
                var newWindow = window.open();
                newWindow.document.write('<html><head><title>Print it!</title><style>img{border:60px white double; background:black; margin: 50% 50% 0 50%;width: 400px;display: block;transform: translateX(-50%)translateY(-50%);}h1{text-align: center;font-size: 70px;}</style></head><body>');
                newWindow.document.write(this.$refs.quizhoder[ref].innerHTML);

                newWindow.document.write(`<h1>${quizid}</h1>`);
                newWindow.document.write('</body></html>');
              
                newWindow.print();
                newWindow.close();
            },
            //good
            refreshList: function(){
                var db = firebase.firestore();
                this.quizzes = [];
              
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
                var cb =('multi');
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
                      this.$forceUpdate();
                    querySnapshot.docs.forEach(element => {
                        var toPush = element.data();
                        toPush.id = element.id;
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
            makeCode(ref,text){
               
                if(this.qrCodes[ref]== null){
                    var qrcode = new QRCode(this.$refs.quizhoder[ref], {
                            width : 150,
                            height : 150 
                        });
                    qrcode.makeCode(text); 
                    this.qrCodes[ref] = true; 
                     
                } 
                 this.setSelectedCode(ref); 
                
            },
            setSelectedCode:function( ind){
                this.showedQR = (ind == this.showedQR)?(-1):(ind);  
                this.$forceUpdate();
            }
        },
        mounted(){
            this.refreshList();   
            
            
                    
        },
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.canvas div{
    padding: 0px 50%;
    margin-left: -75px;
    /* transform: translateX(-10vh); */
    
}   
.shown{

}
.hidden{
visibility: hidden;
height: 0px;
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

.listAnswers{
    text-align: center;
    list-style: none;
    padding-inline-start: 0px;
    margin-top: 0px
}

.questionStyle{
    margin-bottom: 2px;
}

</style>

