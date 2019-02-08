import firebase from "firebase";
export default {
  getFirebase(){
      return firebase;
  },
  createNewUser(user,email) {
    firebase.auth().createUserWithEmailAndPassword( user,email).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
    });
  },

  pushToDatabase() {
      var db = firebase.firestore();
  
      db.collection("users").add({
        first: "Ada",
        last: "Lovelace",
        born: 1815
    })
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
  
  }
  

};



