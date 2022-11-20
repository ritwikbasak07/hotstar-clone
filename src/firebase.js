import firebase from "firebase/compat/app";
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import 'firebase/compat/storage';


const firebaseConfig = {
    apiKey: "AIzaSyA20rNaE4OmRfyPT0FKAdB8gmDTF7YTBhM",
    authDomain: "hotstar-clone-db081.firebaseapp.com",
    projectId: "hotstar-clone-db081",
    storageBucket: "hotstar-clone-db081.appspot.com",
    messagingSenderId: "260918288354",
    appId: "1:260918288354:web:9baad87bf2f4d5c29623bb",
    measurementId: "G-VDFLMM7R75"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();

export { auth, provider, storage };
export default db;
