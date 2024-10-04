
//======== Functionality - Hidden Password =========
const togglePass = document.querySelector(".toggle-pass");
const passInput = document.getElementById("password")
togglePass.addEventListener("click", ()=>{
    const valueType = passInput.getAttribute("type") === "password" ? "text" : "password";
    passInput.setAttribute("type", valueType);
    if(valueType === "password"){
        togglePass.innerHTML =`<i class="fa-solid fa-eye-slash eye-icon"></i>`; 
    }else{
       togglePass.innerHTML =`<i class="fa-solid fa-eye eye-icon"></i>`;
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

