import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-auth.js";
import { getFirestore, collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBiVELSaKhuhVZ4KAiq5StcPqhAayzxWlM",
  authDomain: "pets-9df20.firebaseapp.com",
  projectId: "pets-9df20",
  storageBucket: "pets-9df20.appspot.com",
  messagingSenderId: "846509275235",
  appId: "1:846509275235:web:48ce5423100ebb2f22a056",
  measurementId: "G-KY82DTFZ6R"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);

const btn = document.createElement('button');
btn.textContent = 'Añadir';
btn.classList.add('btn', 'btn-primary');
btn.style.position = 'fixed';
btn.style.bottom = '20px';
btn.style.right = '20px';
btn.style.display = 'none';
document.body.appendChild(btn);

btn.addEventListener('click', () => {
  window.location.href = '/welcome/perros/registro.html';
});

onAuthStateChanged(auth, async (user) => {
  if (user) {
    const refugiosQuery = query(collection(db, 'refugios'), where('email', '==', user.email));
    const refugiosSnapshot = await getDocs(refugiosQuery);

    if (!refugiosSnapshot.empty) {
      btn.style.display = 'block';
    } else {
      btn.style.display = 'none';
    }
  } else {
    btn.style.display = 'none';
  }
});

document.body.appendChild(btn);
