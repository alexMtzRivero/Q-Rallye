<template>
  <div class="LoginContainer">
    <div class="section">
      <input type="text" placeholder="mail" v-model="mail"><br><label >{{comentsMail}}</label>
    </div>
    <div class="section">  
     <input type="text" placeholder="password" v-model="pass1"><br><label >{{comentsPass1}}</label>
    </div>
    <div class="section">
      <input type="text" placeholder="repeat password" v-model="pass2"><br><label >{{comentsPass2}}</label>
    </div>
     
    
     <button @click="createUser()"> Create </button>
     
  </div>
</template>

<script>
import firebase,{ functions } from "firebase";
export default {
  name: 'CreateAccount',
  components:{

  },
  props: {


  },
  data(){
    return{
        mail:"",
        pass1:"",
        pass2:"",
        comentsPass1:"",
        comentsPass2:"",
        comentsMail:""
    }
  },
  methods:{
     validateEmail:function(email) {
       var re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

       return re.test(String(email).toLowerCase());
    },
     validatePass1:function() {
       
        return ( 5<this.pass1.toString().length);
    },
    validatePass2:function () {
      return ( this.pass1 == this.pass2);
    },
    validate:function(){
      console.log(this.validateEmail(this.mail) ,this.validatePass1() , this.validatePass2());
      
      return this.validateEmail(this.mail) && this.validatePass1() && this.validatePass2();
    },
    createUser: function(){
    
      
      if(this.validate()){
         firebase.auth().createUserWithEmailAndPassword( this.mail,this.pass1).then(
           function(){
             console.log("created succesfuly");
             
           }
         ).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(error.message);
            
            // ...
          });
      }else{
        console.log("campos no validos");
        
      }
     
    }

  },
  // on create
  mounted(){
    console.log(firebase);
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.LoginContainer{
  margin: 25%;

}
.section{
    padding: 2vh 3vw;
}
input{
      width: -webkit-fill-available;
    border-radius: 10px;
    height: 3vh;
    border-style: solid;
    text-align: -webkit-center;
    border-width: 2px;
    border-color: #434444;
}
</style>
