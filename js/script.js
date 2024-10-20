
// Cargar el contenido del Navbar con DOM
fetch('../componentes/Navbar/navbar.html')
    .then(response => response.text())
    .then(data => {
    document.getElementById('Navbar').innerHTML = data;

    //Enlace para el archivo CSS del Navbar
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '../componentes/Navbar/navbar.css';
    document.head.appendChild(link);

    //perfil-session
    const rol = localStorage.getItem('rol');
    const user = JSON.parse(localStorage.getItem("user"));
    const btnStock = document.querySelector(".btn-stock");
    const btnLink_sesion = document.querySelector(".link-sesion"); 
    const btnIconSession = document.querySelector(".acceso-icon-1"); 
    const btnLoginOut = document.querySelector(".login-out")
    const nameUser = document.querySelector(".name-user");
    const nameAccesoIcon = document.querySelector(".acceso-icon");
    const acceso_sesion_tablet = document.querySelector(".acceso-sesion-tablet");
    
    if (rol === 'admin') {
        alert("Eres administrador"); 
        btnStock.style.display = 'block';
        acceso_sesion_tablet.style.display = "none";
        btnLink_sesion.style.display = "none";
        nameUser.innerHTML= `${user.name} ${user.lastName.charAt(0)}.`;
        nameAccesoIcon.innerHTML= `${user.name.charAt(0).toUpperCase()}`;
        btnIconSession.style.display = "block";
    } else if(rol === "cliente"){
        btnStock.style.display = 'none'; 
        btnLink_sesion.style.display = "none";
        acceso_sesion_tablet.style.display = "none";
        nameUser.innerHTML= `${user.name} ${user.lastName.charAt(0)}.`;
        nameAccesoIcon.innerHTML= `${user.name.charAt(0).toUpperCase()}`;
        btnIconSession.style.display = "block";
    }else{
        btnStock.style.display = 'none'; 
        nameAccesoIcon.style.display = "none";
        acceso_sesion_tablet.style.display = "block";
        btnLink_sesion.style.display = "block";
        btnIconSession.style.display = "none";
    }
   //event click for button close-session
    btnLoginOut.addEventListener("click", loginOut);
    document.querySelector("#login-out-tablet").addEventListener("click", loginOut);
    //close session function
    function loginOut(){
        localStorage.setItem('rol', "user");
        nameUser.innerHTML= "";
        nameAccesoIcon.innerHTML= "";
        nameAccesoIcon.style.display = "none";
        acceso_sesion_tablet.style.display = "block";
        localStorage.removeItem("user");
        btnStock.style.display = "none";
        btnIconSession.style.display = "none";
        btnLink_sesion.style.display = "block";
        
        // Alerta cuando se cierra sesion
        Swal.fire({
            icon: 'info',
            title: 'cerrando sesion',
            text: 'Has cerrado sesión exitosamente.',
            confirmButtonColor: '#617842'
        }).then(() => {
            setTimeout(() => {
                window.location.href = "../../html/index.html";
                }, 2000);
            });
        });

    })
.catch(error => console.error('Error al cargar el Navbar:', error));


    // Cargar el contenido del footer con DOM
fetch('../componentes/Footer/footer.html')
    .then(response => response.text())
    .then(data => {
    document.getElementById('footer').innerHTML = data;

    // Enlace para el archivo CSS del footer
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '../componentes/Footer/footer.css';
    document.head.appendChild(link);
    })
.catch(error => console.error('Error al cargar el footer:', error));

//redirecciona al la página de inicio
document.querySelector(".home-link").addEventListener("click", () =>{
    window.location.href= "../../html/index.html";
})
