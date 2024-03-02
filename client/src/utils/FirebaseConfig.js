import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyCu6yKtsDxxuVNp9J5OwK64gSrfwGEtEYI",
    authDomain: "whatsapp-clone-a0e05.firebaseapp.com",
    projectId: "whatsapp-clone-a0e05",
    storageBucket: "whatsapp-clone-a0e05.appspot.com",
    messagingSenderId: "90964115971",
    appId: "1:90964115971:web:9d7ace325e5784cc244436",
    measurementId: "G-JR3YHQQB8R"
  };


  // Initialize Firebase
const app = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(app) 