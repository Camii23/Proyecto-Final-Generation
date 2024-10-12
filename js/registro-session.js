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
    const desplazamiento = 3;
    const contrasenaCifrada = cifrar(pass.value, desplazamiento);
    console.log(contrasenaCifrada);
    const isExist = users.some(u => u.email === email);
    if ((name.value !== "") && (lastName.value !== "") && (email.value !== "")
      && (contrasenaCifrada !== "") && checkTerms.checked) {
      if (isExist) {
        alert("El correo electrónico ya existe!");
        return;
      }
      const person = new Persona(name.value, lastName.value, email.value, contrasenaCifrada, rol.value);
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

//



function cifrar(texto, desplazamiento) {
  let resultado = '';
  
  for (let i = 0; i < texto.length; i++) {
      let char = texto[i];

      // Cifrado de letras mayúsculas
      if (char >= 'A' && char <= 'Z') {
          resultado += String.fromCharCode(((char.charCodeAt(0) - 65 + desplazamiento) % 26) + 65);
      }
      // Cifrado de letras minúsculas
      else if (char >= 'a' && char <= 'z') {
          resultado += String.fromCharCode(((char.charCodeAt(0) - 97 + desplazamiento) % 26) + 97);
      } else {
          resultado += char; // No cifrar otros caracteres
      }
  }
  
  return resultado;
}

function descifrar(texto, desplazamiento) {
  return cifrar(texto, -desplazamiento); // Desplazamiento negativo para descifrar
}

// Ejemplo de uso
// const contrasena = "HolaMundo123";
//const desplazamiento = 3;

// const contrasenaCifrada = cifrar(contrasena, desplazamiento);
// console.log("Contraseña cifrada:", contrasenaCifrada);

// const contrasenaDescifrada = descifrar(contrasenaCifrada, desplazamiento);
// console.log("Contraseña descifrada:", contrasenaDescifrada);


// ---------- Functionality - Login ------------

document.addEventListener("DOMContentLoaded", function () {
  document.querySelector("#login-form").addEventListener("submit", (e) => {
    e.preventDefault();

    let emailLogin = document.querySelector("#emailLogin");
    let passLogin = document.querySelector("#password");
    const users = JSON.parse(localStorage.getItem("users")) || [];

    if (emailLogin.value !== "" && passLogin.value !== "") {
      const textDanger = document.querySelector("#loginError");
      const desplazamiento = 3;
      // const contrasenaDescifrada = descifrar(contrasenaCifrada, desplazamiento);
      const user = users.find(u => u.email === emailLogin.value && descifrar(u.password , desplazamiento) === passLogin.value);
    
      console.log("users -->", users);
      console.log("user->", user);
      if (user) {
        const condition = true;
        console.log(user.pass);
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







