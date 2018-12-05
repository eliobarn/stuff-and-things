import firebase from 'firebase'
import firestore from 'firebase/firestore'


// Initialize Firebase
var config = {
  apiKey: "AIzaSyB50ZkvRvbbkn9KvxiM1ZgXlWH1AxaLvF4",
  authDomain: "movielog-41367.firebaseapp.com",
  databaseURL: "https://movielog-41367.firebaseio.com",
  projectId: "movielog-41367",
  storageBucket: "movielog-41367.appspot.com",
  messagingSenderId: "55451811565"
};
const firebaseApp = firebase.initializeApp(config);
firebaseApp.firestore().settings({ timestampsInSnapshots: true })
firebaseApp.auth().onAuthStateChanged(function(user) {
    if(!config) {
        config = new Vue ({
        el: '#app',
        template: '<App/>',
        components: { App },
        router
      })
    }
  })

//export firestore database
export default firebaseApp.firestore()


