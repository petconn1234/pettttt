import { ManageAccount } from '../config/firebaseconect.js';

document.getElementById("formulario-crear").addEventListener("submit", (event) => {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const user = document.getElementById("user").value;
  const account = new ManageAccount();
  account.register(email, password,user);

});

console.log('Formulario de Registro');