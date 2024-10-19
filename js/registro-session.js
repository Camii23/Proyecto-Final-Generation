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


//Password encoder
function cifrar(texto, desplazamiento) {
  let resultado = '';
  for (let i = 0; i < texto.length; i++) {
      let char = texto[i];
      let code = char.charCodeAt(0);
      // Ajustar el desplazamiento para incluir caracteres ASCII del 32 al 126
    
      if (code >= 32 && code <= 126) {
          // Desplazamiento y ajuste con módulo
          let nuevoCode = ((code - 32 + desplazamiento) % 95) + 32;
          resultado += String.fromCharCode(nuevoCode);
      } else {
          resultado += char; // Mantener caracteres fuera del rango
      }
  }
  
  return resultado;
}

function descifrar(texto, desplazamiento) {
  return cifrar(texto, -desplazamiento); // Desplazamiento negativo para descifrar
}







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
    const desplazamiento = 10;
    const contrasenaCifrada = cifrar(pass.value, desplazamiento);

    const isExist = users.some(u => u.email === email);
    if ((name.value !== "") && (lastName.value !== "") && (email.value !== "")
      && (contrasenaCifrada !== "") && checkTerms.checked) {
      if (isExist) {
        alert("El correo electrónico ya existe!");
        return;
      }
      if(contrasenaCifrada.length < 8){
        alert("Tu debe tener al menos 8 caracteres.");
        pass.value = "";
        return
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



// ---------- Functionality - Login ------------

document.addEventListener("DOMContentLoaded", function () {
  document.querySelector("#login-form").addEventListener("submit", (e) => {
    e.preventDefault();

    let emailLogin = document.querySelector("#emailLogin");
    let passLogin = document.querySelector("#password");
    const users = JSON.parse(localStorage.getItem("users")) || [];

    if (emailLogin.value !== "" && passLogin.value !== "") {
      const textDanger = document.querySelector("#loginError");
      const desplazamiento = 10;
      const user = users.find(u => u.email === emailLogin.value && descifrar(u.password , desplazamiento) === passLogin.value);
    
     
      if (user) {
        const condition = true;
        console.log(user.pass);
        if (condition) {
          const loginModal = new bootstrap.Modal(document.getElementById('login-modal'));
          loginModal.show();
        }
        
        localStorage.setItem("user", JSON.stringify(user));
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






