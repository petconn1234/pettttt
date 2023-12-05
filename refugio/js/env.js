import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-analytics.js";
import { getAuth,createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, updateProfile} from "https://www.gstatic.com/firebasejs/9.21.0/firebase-auth.js";
import { getFirestore, collection, addDoc } from  "https://www.gstatic.com/firebasejs/9.21.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBiVELSaKhuhVZ4KAiq5StcPqhAayzxWlM",
  authDomain: "pets-9df20.firebaseapp.com",
  projectId: "pets-9df20",
  storageBucket: "pets-9df20.appspot.com",
  messagingSenderId: "846509275235",
  appId: "1:846509275235:web:48ce5423100ebb2f22a056",
  measurementId: "G-KY82DTFZ6R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
var db = getFirestore(app);

async function  guardarDatos(e) {
  e.preventDefault();
  
  const nombre = document.getElementById('nombre');
  const numero = document.getElementById('numero');
  const email = document.getElementById('email');
  const direccion = document.getElementById('direccion');

  try {
    const docRef = await addDoc(collection(db, "solicitudes"), {
      nombre: nombre.value,
      numero: numero.value,
      email: email.value,
      direccion: direccion.value
    });
    console.log("Document written with ID: ", docRef.id);

    
    nombre.value = "";
    numero.value = "";
    email.value = "";
    direccion.value = "";

  } catch (error) {
    console.error("Error adding document: ", error);
  }
}


const form = document.querySelector('#form');


form.addEventListener('submit', guardarDatos);
