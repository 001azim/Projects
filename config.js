
const firebase=require('firebase')
const firebaseConfig = {
  apiKey: "AIzaSyCE-R9_ZYnGH7C8LOomDKqm-n5r7njHdms",
  authDomain: "game-crud-b33c9.firebaseapp.com",
  projectId: "game-crud-b33c9",
  storageBucket: "game-crud-b33c9.appspot.com",
  messagingSenderId: "663463960343",
  appId: "1:663463960343:web:200fa2a39285742d982152"
};
firebase.initializeApp(firebaseConfig)
const db=firebase.firestore()
const players=db.collection("players")
module.exports = players