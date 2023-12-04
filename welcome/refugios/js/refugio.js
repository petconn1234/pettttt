// Importa las funciones necesarias de Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { getFirestore, getDocs, collection, onSnapshot, query, where } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";

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
var db = getFirestore(app);

const refugiosCollection = collection(db, 'refugios');
const perrosCollection = collection(db, 'perros');

getDocs(refugiosCollection).then((querySnapshot) => {
    const container = document.getElementById('card-container');

    querySnapshot.forEach((doc) => {
        const card = document.createElement('div');
        card.classList.add('card', 'mb-3', 'shadow', 'bg-white', 'rounded');

        const data = doc.data();
        card.innerHTML = `
            <div class="card-body">
                <h5 class="card-title">${data.nombre}</h5>
                <p class="card-text">${data.numero}</p>
                <p class="card-text">${data.email}</p>
                <p class="card-text"><small class="text-muted">${data.direccion}</small></p>
                <button class="btn btn-success" id="verMas-${doc.id}" data-bs-toggle="modal" data-bs-target="#perrosModal">Ver más</button>
                <a href="https://wa.me/+591${data.numero}" class="btn btn-info">Más información</a>
            </div>
        `;

        const column = document.createElement('div');
        column.classList.add('col-lg-4', 'col-md-6', 'mb-4');
        column.appendChild(card);

        container.appendChild(column);

        // Agrega un controlador de eventos al botón "Ver más" para mostrar los perros del refugio
        document.getElementById(`verMas-${doc.id}`).addEventListener('click', () => {
            getDocs(query(perrosCollection, where("usuario", "==", data.email))).then((querySnapshot) => {
                const perrosTable = document.getElementById('perrosTable');
                perrosTable.innerHTML = ''; // Limpiar la tabla de perros

                querySnapshot.forEach((doc) => {
                    const perroRow = document.createElement('tr');
                    perroRow.innerHTML = `
                        <td>${doc.data().nombre}</td>
                        <td>${doc.data().descripcion}</td>
                        <td>${doc.data().edad}</td>
                        <td>${doc.data().genero}</td>
                        <td>${doc.data().raza}</td>
                    `;
                    perrosTable.appendChild(perroRow);
                });
            });
        });
    });
});
