import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-auth.js";
import { getFirestore, query, where, getDocs, collection } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-firestore.js";

const auth = getAuth();
const db = getFirestore();


document.addEventListener('DOMContentLoaded', (event) => {
    // Tu código de JavaScript aquí
  
onAuthStateChanged(auth, (user) => {
    
  if (user) {
    
    // Usuario está logueado
    const refugiosCollection = collection(db, 'refugios');
    const q = query(refugiosCollection, where("email", "==", user.email));

    getDocs(q).then((querySnapshot) => {
        if (!querySnapshot.empty) {

            const userDataElement = document.getElementById('user-data');
        
            const refugioData = querySnapshot.docs[0].data();
            
            // Selecciona los elementos del DOM donde se mostrarán los datos del refugio
            const emailElement = document.getElementById('email');
            
            const nombreElement = document.getElementById('nombre');
            const direccionElement = document.getElementById('direccion');
            
            const numeroElement = document.getElementById('numero');
            
            // Actualiza los elementos con los datos del refugio
            direccionElement.textContent = refugioData.direccion;
            emailElement.textContent = refugioData.email;
            nombreElement.textContent = refugioData.nombre;
            numeroElement.textContent = refugioData.numero;
          }
           else {
        // No es un refugio, pero hay un usuario logueado
        // Muestra los datos del usuario
        const userDataElement = document.getElementById('user-data');
        userDataElement.innerHTML = `
          <p><strong>Usuario:</strong> ${user.displayName || 'Nombre no disponible'}</p>
          <p><strong>Email:</strong> ${user.email}</p>
        `;
      }
    }).catch((error) => {
      console.error('Error al obtener documentos:', error);
    });
  } else {
    // Usuario no está logueado
    console.log('No hay usuario logueado');
  }
});

});

