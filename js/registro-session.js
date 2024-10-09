import Persona from "../js/models/persona.js";

//======== Functionality - Hidden Password =========
const togglePass = document.querySelector(".toggle-pass");
const passInput = document.getElementById("password")
togglePass.addEventListener("click", () => {
  const valueType = passInput.getAttribute("type") === "password" ? "text" : "password";
  passInput.setAttribute("type", valueType);
  if (valueType === "password") {
    togglePass.innerHTML = `<i class="fa-solid fa-eye-slash eye-icon"></i>`;
  } else {
    togglePass.innerHTML = `<i class="fa-solid fa-eye eye-icon"></i>`;
  }
});
//============== End functionality ============

//====== Validation Bootstrap v5.3 ======
// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()

      }

      form.classList.add('was-validated')
    }, false)
  })
})()


// -------------- Functiolality - Register -----------------

document.addEventListener('DOMContentLoaded', function () {
  document.getElementById("form-register").addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.querySelector("#name");
    const lastName = document.querySelector("#lastName");
    const email = document.querySelector("#email");
    const pass = document.querySelector("#password");
    const checkTerms = document.querySelector("#checkTerms");
    const rol = document.querySelector("#rol");
    let users = JSON.parse(localStorage.getItem("users") || "[]");
    const isExist = users.some(u => u.email === email);
    if ((name.value !== "") && (lastName.value !== "") && (email.value !== "")
      && (pass.value !== "") && checkTerms.checked) {
      if (isExist) {
        alert("El correo electrónico ya existe!");
        return;
      }
      const person = new Persona(name.value, lastName.value, email.value, pass.value, rol.value);
      users.push(person);
      localStorage.setItem("users", JSON.stringify(users));
      alert("Registro existoso! Ya puedes iniciar sesion.");
      name.value = "";
      lastName.value = "";
      email.value = "";
      pass.value = "";
      setTimeout(() => {

        window.location.href = "../../html/iniciosesion.html";
      }, 2000);

    }
  });
});


// ---------- Functionality - Login ------------

document.addEventListener("DOMContentLoaded", function () {
  document.querySelector("#login-form").addEventListener("submit", (e) => {
    e.preventDefault();

    let emailLogin = document.querySelector("#emailLogin");
    let passLogin = document.querySelector("#passLogin");
    const users = JSON.parse(localStorage.getItem("users")) || [];

    if (emailLogin.value !== "" && passLogin.value !== "") {
      const textDanger = document.querySelector("#loginError");
      const user = users.find(u => u.email === emailLogin.value && u.password === passLogin.value);
      console.log("users -->", users);
      console.log("user->", user);
      if (user) {
        const condition = true;
        if (condition) {
          const loginModal = new bootstrap.Modal(document.getElementById('login-modal'));
          loginModal.show();
        }
        
        localStorage.setItem('rol', user.rol);
       alert(user.rol)
  
        setTimeout(() => {
         
          window.location.href = "../../html/index.html";
        }, 2000);
      }else {
        alertUserInvalid(textDanger, emailLogin, passLogin);
      }
    }
  });
});

function alertUserInvalid(b, d, e) {
  b.style.display = "block";
  d.value = "";
  e.value = "";

}




//--prueba-copia--
// document.addEventListener("DOMContentLoaded", function () {
//   document.querySelector("#login-form").addEventListener("submit", (e) => {
//     e.preventDefault();

//     let emailLogin = document.querySelector("#emailLogin").value;
//     let passLogin = document.querySelector("#passLogin").value;
//     const users = JSON.parse(localStorage.getItem("users")) || [];

//     if (emailLogin !== "" && passLogin !== "") {
//       const user = users.find(u => u.email === emailLogin && u.password === passLogin);
//       if (user) {
//         const condition = true;
//         if (condition) {
//           const loginModal = new bootstrap.Modal(document.getElementById('login-modal'));
//           loginModal.show();
//         }
//         emailLogin = "";
//         passLogin = "";
//         setTimeout(() => {
//           window.location.href = "../../html/index.html";
//         }, 2000);
//       }
//     }
//   });
// });




