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


//contraseña cifrada
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



//Capitaliza un texto
function capitalizeFirstLetter(text) {
  if (!text) return text; 
  return text.charAt(0).toUpperCase() + text.slice(1);
}
//HarddPassword
function validatePassword(password) {
  const minLength = 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  return password.length >= minLength && hasUppercase && hasLowercase && hasNumber && hasSpecialChar;
}

// -------------- Functiolality - Register -----------------

const baseURL = "http://localhost:8080/user";

document.addEventListener('DOMContentLoaded', function () {
  document.getElementById("form-register").addEventListener("submit", async function (e) {
    e.preventDefault();
    const name = document.querySelector("#name");
    const lastName = document.querySelector("#lastName");
    const email = document.querySelector("#email");
    const pass = document.querySelector("#password");
    const checkTerms = document.querySelector("#checkTerms");
    const rol = document.querySelector("#rol");
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const desplazamiento = 6;
    const contrasenaCifrada = cifrar(pass.value, desplazamiento);

    const cliente = {
      rolUser: rol.value,
      nameUser: capitalizeFirstLetter(name.value),
      lastNameUser: capitalizeFirstLetter(lastName.value),
      emailUser: email.value,
      passwordUser: contrasenaCifrada
    };
    
    
    // validacion si el usuario existe
    const isExist = users.some(u => u.email === email.value);
    if ((name.value !== "") && (lastName.value !== "") && (email.value !== "")
      && (contrasenaCifrada !== "") && checkTerms.checked) {
      if (isExist) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'El correo electronico ya existe!',
          confirmButtonColor: '#617842'
        });
        return;
        
      }
      if(!validatePassword(pass.value)){
        Swal.fire({
          icon: 'error',
          title: 'Contraseña inválida',
          html: `Tu contraseña debe tener:
          <ul style="text-align: left;">
            <li>Al menos una mayúscula.</li>
            <li>Al menos una minúscula.</li>
            <li>Al menos un número.</li>
            <li>Al menos un carácter especial.</li>
          </ul>`,
          confirmButtonColor: '#617842'

        });
          
          
        pass.value = "";
        return
      }
      const person = new Persona(capitalizeFirstLetter(name.value), capitalizeFirstLetter(lastName.value), email.value, contrasenaCifrada, rol.value);
      users.push(person);
      localStorage.setItem("users", JSON.stringify(users));

      try {
        const response = await fetch(`${baseURL}/create`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cliente)
        });
  
        if (!response.ok) {
            const errorData = await response.json();
            console.error("Detalles del error:", errorData);
            return;
        }
  
        const data = await response.json();
        console.log("Respuesta del servidor:", data);
  
    } catch (error) {
        console.error("Error al realizar la operación:", error);
    }

      Swal.fire({
        icon: 'success',
        title: 'Registro exitoso',
        text: 'Registro existoso! Ya puedes iniciar sesion.',
        confirmButtonColor: '#617842'
      });

      name.value = "";
      lastName.value = "";
      email.value = "";
      pass.value = "";
      setTimeout(() => {

        window.location.href = "../../html/iniciosesion.html";
      }, 3000);

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
      const desplazamiento = 6;
      const user = users.find(u => u.email === emailLogin.value && descifrar(u.password , desplazamiento) === passLogin.value);
      
    
      if (user) {
        const condition = true;
        if (condition) {
          const loginModal = new bootstrap.Modal(document.getElementById('login-modal'));
          loginModal.show();
        }
        
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem('rol', user.rol);
  
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


