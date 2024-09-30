
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



