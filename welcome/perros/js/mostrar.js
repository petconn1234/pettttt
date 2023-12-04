import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
import { getFirestore, getDocs, collection, onSnapshot } from  "https://www.gstatic.com/firebasejs/9.21.0/firebase-firestore.js";

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

const perrosCollection = collection(db, 'perros');

onSnapshot(perrosCollection, (snapshot) => {
    snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
            console.log("Nuevo perro: ", change.doc.data());
        }
    });
});

getDocs(perrosCollection).then((querySnapshot) => {
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target.querySelector('img');
                img.src = img.dataset.src;
                observer.unobserve(entry.target);
            }
        });
    });

    querySnapshot.forEach((doc) => {
        const card = document.createElement('div');
        card.classList.add('block', 'mb-3');

        const data = doc.data();
        card.innerHTML = `
        <div class="thumbnail">
            <a href="#" class="thumb-zoom" title="${data.nombre}">
                <img data-src="${data.imagen}" class="img-fluid card-img" alt="">
            </a>
            <div class="caption text-center">
                <h6>${data.nombre} <small>${data.descripcion}</small></h6>
                <div class="icons-group">
                    <a href="#"><i class="fa fa-google-plus"></i></a>
                    <a href="#"><i class="fa fa-twitter"></i></a>
                    <a href="#"><i class="fa fa-github"></i></a>
                </div>
            </div>
        </div>
        `;

        card.addEventListener('click', () => {
            const modalBody = document.querySelector('#dogModal .modal-body');
            modalBody.innerHTML = `
            <p><strong>Nombre:</strong> ${data.nombre}</p>
            <p><strong>Edad:</strong> ${data.edad}</p>
            <p><strong>Raza:</strong> ${data.raza}</p>
            <p><strong>Género:</strong> ${data.genero}</p>
            <p><strong>Descripción:</strong> ${data.descripcion}</p>
            <p><strong>Imagen:</strong> <img src="${data.imagen}" alt="${data.nombre}" style="width: 100%;"></p>
            `;

            const moreInfoButton = document.createElement('button');
            moreInfoButton.innerText = 'Más información';
            moreInfoButton.classList.add('btn', 'btn-primary', 'mt-2');

            moreInfoButton.addEventListener('click', () => {
                openWhatsAppChat(data.telefono);
            });

            modalBody.appendChild(moreInfoButton);

            const modal = new bootstrap.Modal(document.getElementById('dogModal'));
            modal.show();
        });

        const column = document.createElement('div');
        column.classList.add('col-md-4', 'col-sm-6');

        column.appendChild(card);

        document.getElementById('card-container').appendChild(column);

        observer.observe(card);
    });
});

function openWhatsAppChat(telefono) {
    const whatsappLink = `https://wa.me/+591${telefono}`;
    window.open(whatsappLink, '_blank');
}
