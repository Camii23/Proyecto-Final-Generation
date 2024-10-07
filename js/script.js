    
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
