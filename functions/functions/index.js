// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');
const firebase_tools = require('./node_modules/firebase-tools');

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp();


// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

// Take the text parameter passed to this HTTP endpoint and insert it into the
// Realtime Database under the path /messages/:pushId/original
exports.addMessage = functions.https.onRequest((req, res) => {
    // Grab the text parameter.
    const original = req.query.text;
    // Push the new message into the Realtime Database using the Firebase Admin SDK.
    return admin.database().ref('/messages').push({original: original}).then((snapshot) => {
      // Redirect with 303 SEE OTHER to the URL of the pushed object in the Firebase console.
      return res.redirect(303, snapshot.ref.toString());
    });
  });

  exports.recursiveDelete = functions
  .runWith({
    timeoutSeconds: 540,
    memory: '2GB'
  })
  .https.onCall((data, context) => {    
    // Only allow admin users to execute this function.
    if (!(context.auth && context.auth.token)) {
      throw new functions.https.HttpsError(
        'permission-denied',
        'Must be an administrative user to initiate delete.'
      );
    }

    const path = data.path;
    console.log(
      `User ${context.auth.uid} has requested to delete path ${path}`
    );
    console.log('config() : '+functions.config());
    console.log('config : '+functions.config);
    console.log('config().fb : '+functions.config().fb);
    console.log('config.fb : '+functions.config.fb);
    console.log('config().firebase : '+functions.config().firebase);
    console.log('config.firebase : '+functions.config.firebase);
    

    // Run a recursive delete on the given document or collection path.
    // The 'token' must be set in the functions config, and can be generated
    // at the command line by running 'firebase login:ci'.
    return firebase_tools.firestore
      .delete(path, {
        project: process.env.GCLOUD_PROJECT,
        recursive: true,
        yes: true,
        token: functions.config().fb.token
      })
      .then(() => {
        return {
          path: path
        };
      });
  });


  