import firebase from 'firebase/app'
import "firebase/firestore"

    var firebaseConfig = {
        apiKey: "AIzaSyDw8Hev8Fazii26E0b-4PgseGbooLQqZlk",
        authDomain: "biblioteca-todo-2021.firebaseapp.com",
        projectId: "biblioteca-todo-2021",
        storageBucket: "biblioteca-todo-2021.appspot.com",
        messagingSenderId: "764735777343",
        appId: "1:764735777343:web:9506216910d2d61c4e268a"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore()