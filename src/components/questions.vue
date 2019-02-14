<template>
    <div>
        <button @click="log()">show array</button>
        <div v-for="(quiz,index) in quizzes"  v-bind:key="quiz.id">
            <h1>{{quiz.id}}</h1>
            <div :class="`${(showedQR == index)?'shown':'hidden'} canvas` ">
                <div  id="qrholder" ref ="quizhoder"></div>
                 <button @click="print(index,quiz.id)"> print </button>
            </div>
            
            <button @click="makeCode(index,quiz.id)"> show QR</button>
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
                this.$forceUpdate();
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
.canvas{
    padding: 0px 50%;
    /* transform: translateX(-10vh); */
}   
.shown{

}
.hidden{
visibility: hidden;
height: 0px;
}


</style>

