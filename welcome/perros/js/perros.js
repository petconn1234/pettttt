import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-auth.js";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-storage.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-firestore.js";

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
var db = getFirestore(app);
const form = document.querySelector("#task-form");
const taskContainer = document.querySelector('#tasks-container');

let nombreInput = document.getElementById('nombre');
let edadInput = document.getElementById('edad');
let razaInput = document.getElementById('raza');
let generoInput = document.getElementById('genero');
let descripcionInput = document.getElementById('descripcion');
let imagenInput = document.getElementById('imagen');
let telefono = document.getElementById('Telefono');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nombre = nombreInput.value;
    const edad = edadInput.value;
    const telefonoValue = telefono.value;
    const raza = razaInput.value;
    const genero = generoInput.value;
    const descripcion = descripcionInput.value;
    const imagen = imagenInput.files[0];

    if (!nombre || !edad || !raza || !genero || !descripcion || !imagen) {
        swal("Error", "Por favor, complete todos los campos", "error");
        return;
    }

    var storage = getStorage();
    var storageRef = ref(storage, 'images/' + imagen.name);

    var uploadTask = uploadBytesResumable(storageRef, imagen);

    try {
        await uploadTask;

        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

        const docRef = await addDoc(collection(db, "perros"), {
            nombre: nombre,
            edad: edad,
            raza: raza,
            telefono: telefonoValue,
            genero: genero,
            descripcion: descripcion,
            imagen: downloadURL,
            usuario: auth.currentUser.email
        });

        form.reset();

        swal("Éxito", "Mascota añadida", "success");
        console.log("Document written with ID: ", docRef.id);
    } catch (error) {
        swal("Error", "Ocurrió un error, inténtelo más tarde", "error");
        console.error("Error adding document: ", error);
    }
});
