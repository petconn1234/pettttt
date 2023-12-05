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


  export class  Form {
    
    async  guardarDatos(e) {
      e.preventDefault();
    
      
      const nombre = document.getElementById('nombre').value;
      const numero = document.getElementById('numero').value;
      const email = document.getElementById('email').value;
      const direccion = document.getElementById('direccion').value;
    
      
      try {
        const docRef = await addDoc(collection(db, "solicitudes"), {
          nombre: nombre,
          numero: numero,
          email: email,
          direccion: direccion
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (error) {
        console.error("Error adding document: ", error);
      }
    }
  }



  export class ManageAccount {
    register(email, password, displayName) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          return updateProfile(userCredential.user, {
            displayName: displayName
          });
        })
        .then((_) => {
          window.location.href = "login.html";
          
          alert("Registro exitoso. Serás redirigido a la página de inicio de sesión.");
        })
        .catch((error) => {
          console.error(error.message);
        
          alert("Error al registrar: " + error.message);
        });
    }

    authenticate(email, password) {
      signInWithEmailAndPassword(auth, email, password)
        .then((_) => {
          window.location.href = "../welcome/index.html";
          alert("Has iniciado sesión correctamente. Serás redirigido a la página principal.");
        })
        .catch((error) => {
          console.error(error.message);
                  alert("Error al iniciar sesión: " + error.message);
        });
    }

    signOutUser() {
      signOut(auth)
        .then((_) => {
          window.location.href = "index.html";
        })
        .catch((error) => {
          console.error(error.message);
        });
    }

    userLog() {
      const auth = getAuth();
      var li = document.getElementById("miElemento");
      var li2 = document.getElementById("logout");
      var li3 = document.getElementById("admin");
  
      onAuthStateChanged(auth, (user) => {
          if (user) {
              const uid = user.uid;
              li.innerHTML = `<ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                  <li class="nav-item">
                      <a class="getstarted" > Bienvenido ${user.displayName ? user.displayName : 'Admin'}</a>
                  </li>`;

  
              li2.innerHTML = `
                  <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                      <li class="nav-item">
                          <a id="logout-link" class="getstarted" href="/login/login.js" style="background-color: red; color: white; padding: 10px 20px; text-decoration: none;">Cerrar sesión</a>
                      </li>`;
  
              if (user.email === "admin@gmail.com") {
                  li3.innerHTML = `
                      <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                          <li class="nav-item">
                          <a id="lo" class="getstarted" href="/welcome/admin panel/index.html" style="background-color: blue; color: white; padding: 10px 20px; text-decoration: none;">Solicitudes</a>
                          </li>
                      </ul>`;
  
            
              }
          } else {
              li.innerHTML = '<a class="getstarted" href="/login/login.html">Inicia sesión</a>';
              console.error("No ha iniciado sesión.");
          }
      });
  }

  }
