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
    const name = document.querySelector("#name").value;
    const lastName = document.querySelector("#lastName").value;
    const email = document.querySelector("#email").value;
    const pass = document.querySelector("#password").value;
    const checkTerms = document.querySelector("#checkTerms");
    const rol = document.querySelector("#rol").value;

    let users = JSON.parse(localStorage.getItem("users") || "[]");
    const isExist = users.some(u => u.email === emailValue);
    if ((name !== "") && (lastName !== "") && (email !== "")
      && (pass !== "") && checkTerms.checked) {
      if (isExist) {
        alert("El correo electrónico ya existe!");
        return;
      }
      const person = new Persona(name, lastName, email, pass, rol);
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

    let emailLogin = document.querySelector("#emailLogin").value;
    let passLogin = document.querySelector("#passLogin").value;
    const users = JSON.parse(localStorage.getItem("users")) || [];

    if (emailLogin !== "" && passLogin !== "") {
      const user = users.find(u => u.email === emailLogin && u.password === passLogin);
      if (user) {
        alert("Has iniciado sesión con éxito!");
        emailLogin = "";
        passLogin = "";
        setTimeout(() => {
          window.location.href = "../../html/index.html";
        }, 1000);

      } else {
        alert("El correo electrónico o la contraseña son incorrectos.");
      }
    } else {
      alert("Por favor, completa todos los campos.");
    }
  });
});




