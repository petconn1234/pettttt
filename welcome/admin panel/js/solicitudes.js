import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { getFirestore, collection, getDocs, doc, deleteDoc, addDoc } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";

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

const solicitudesCollection = collection(db, 'solicitudes');
const refugiosCollection = collection(db, 'refugios');

const eliminarSolicitud = async (documentoId) => {
    try {
        await deleteDoc(doc(db, `solicitudes/${documentoId}`));
    } catch (error) {
        console.error("Error al eliminar la solicitud:", error);
    }
};

const aprobarSolicitud = async (documentoId, data, userEmail) => {
    try {
        await addDoc(refugiosCollection, {
            nombre: data.nombre,
            email: userEmail,
            direccion: data.direccion,
            numero: data.numero
        });

        window.location.href = `https://wa.me/+591${data.numero}?text=${encodeURIComponent("Felicidades, ahora eres parte de PetConnect. En el apartado de 'Mascotas' podrás añadir las de tu refugio.")}`;

        await eliminarSolicitud(documentoId);

        const filaAEliminar = document.getElementById(`fila-${documentoId}`);
        filaAEliminar.parentNode.removeChild(filaAEliminar);
    } catch (error) {
        console.error("Error al aprobar la solicitud:", error);
    }
};

onAuthStateChanged(auth, (user) => {
    if (user) {
        getDocs(solicitudesCollection).then((querySnapshot) => {
            const table = document.querySelector('#table-container tbody');

            querySnapshot.forEach((documento) => {
                const row = document.createElement('tr');
                row.id = `fila-${documento.id}`;

                const data = documento.data();
                row.innerHTML = `
                    <td>${data.nombre}</td>
                    <td>${data.email}</td>
                    <td>${data.direccion}</td>
                    <td>${data.numero}</td>
                    <td>
                        <button class="btn btn-success" id="approve-${documento.id}">✓</button>
                        <button class="btn btn-danger" id="deny-${documento.id}" data-bs-toggle="modal" data-bs-target="#confirmationModal">🗑</button>
                    </td>
                `;

                table.appendChild(row);

                document.getElementById(`approve-${documento.id}`).addEventListener('click', () => {
                    aprobarSolicitud(documento.id, data, user.email);
                });

                document.getElementById(`deny-${documento.id}`).addEventListener('click', () => {
                    const confirmButton = document.getElementById('confirmButton');
                    confirmButton.onclick = function () {
                        eliminarSolicitud(documento.id);
                    };
                });
            });
        });
    }
});
