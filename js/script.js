
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

    const rol = localStorage.getItem('rol');
    const btnStock = document.querySelector(".btn-stock");
    const btnLink_sesion = document.querySelector(".link-sesion"); 
    const btnIconSession = document.querySelector(".acceso-icon-1"); 
    const loginOut = document.getElementById("login-out")
    if (rol === 'admin') {
        // alert("Eres administrador"); 
        btnStock.style.display = 'block';
        btnLink_sesion.style.display = "none";
        btnIconSession.style.display = "block";
    } else if(rol === "cliente"){
        btnStock.style.display = 'none'; 
        btnLink_sesion.style.display = "none";
        btnIconSession.style.display = "block";
    }else{
        btnStock.style.display = 'none'; 
        btnLink_sesion.style.display = "block";
        btnIconSession.style.display = "none";
    }
    loginOut.addEventListener("click", function(){
        localStorage.setItem('rol', "user"); 
        btnStock.style.display = "none";
        btnIconSession.style.display = "none";
        btnLink_sesion.style.display = "block";
        /*ALERTAAAA --> 2000*/
        
    })

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
