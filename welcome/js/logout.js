import { ManageAccount } from '../../config/firebaseconect.js';



document.addEventListener('DOMContentLoaded', function () {
    const logoutButton = document.getElementById('logout');

    if (logoutButton) {
        logoutButton.addEventListener('click', function () {
            const account = new ManageAccount();
            account.signOutUser();
            console.log('Cerrar sesión');

            
        });
    } else {
        console.error('Elemento de botón de cierre de sesión no encontrado.');
    }
});
