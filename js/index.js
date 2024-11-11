// Entrega tarea 8

import productsController from "./productsController.js";

const itemsController = new productsController();

function addItemCard(item) {
  const itemHTML = `
        <div class="card h-100" style="width: 20rem;">
            <img src="${item.img}" class="card-img-top" alt="product image" style="height:250px;">
            <div class="card-body mb-1">
                <h5 class="card-title">${item.name}</h5>
                <p class="card-text">${item.description}</p>
                <h5 class="card-text">$ ${item.price.toLocaleString('es-CO')}</h5>
                <button class="btn btn-buy" onclick="window.location.href='docs/productoSimple.html?id=${item.id}'">Ver Detalles</button>
                <button href="#" class="btn btn-buy" onclick="addCarrito('${item.id}')">Comprar</button>
            </div>
        </div>
        <br/>
    `;
  const itemsContainer = document.getElementById("list-items");
  itemsContainer.innerHTML += itemHTML;
}
// Determinar la base de la ruta dependiendo de si estamos en index.html o en una página dentro de docs
const imgBasePath = window.location.pathname.includes('/docs/') ? '../img/insects/' : '/img/insects/';

// Lista de productos con rutas dinámicas
const products = [
  {
    name: "Crisopas",
    scientificName: "Chrysoperla rufilabris",
    description: "Depredadoras voraces de pulgones, ácaros, trips y otros pequeños insectos. Útiles en amplia gama de cultivos y entornos.",
    quantityUnit: "500 Larvas.",
    price: 100000,
    img: `${imgBasePath}crisopas.jpg`,
    createdAt: "2020-09-20"
  },
  {
    name: "Avispas parasitoides",
    scientificName: "Trichogramma spp.",
    description: "Parasitan los huevos de muchas plagas, incluyendo polillas y gusanos. Eficaces para prevenir infestaciones en cultivos.",
    quantityUnit: "100 Insectos",
    price: 80000,
    img: `${imgBasePath}avispas-parasitoides.jpg`,
    createdAt: "2020-09-20"
  },
  // Resto de los productos...
];

// Este código debería asegurarse de que las rutas se generen correctamente en el despliegue de GitHub Pages.

products.forEach((product) => {
    // Verificar si el producto ya está en el controlador
    const exists = itemsController.items.some(item => item.name === product.name);
    
    if (!exists) {
      // Si no existe, lo agregamos
      itemsController.addItem(
        product.name,
        product.scientificName,
        product.description,
        product.quantityUnit,
        product.price,
        product.img,
        product.createdAt
      );
    }
  });

// Función para cargar las tarjetas de productos
function loadCardsListFromItemsController() {
  const itemsContainer = document.getElementById("list-items");

  // Limpia el contenedor antes de agregar nuevos productos
  itemsContainer.innerHTML = "";

  // Recorrer los productos y agregarlos al DOM
  itemsController.items.forEach((item) => {
    addItemCard(item);
  });
}

// Llamar a la función para mostrar los productos en la página
loadCardsListFromItemsController();
 function addCarrito(idItem) {
    // Guarda el id en el localStorage para usarlo en carrito.html
    let carroItems = JSON.parse(localStorage.getItem('carroItems')) || [];

    // Si el producto ya está en el carrito, incrementa la cantidad
    const existingItem = carroItems.find(item => item.id === idItem);
    if (existingItem) {
        existingItem.cantidad += 1;
    } else {
        carroItems.push({ id: idItem, cantidad: 1 });
    }

    // Guarda el carrito actualizado en el localStorage
    localStorage.setItem('carroItems', JSON.stringify(carroItems));

    // Redirigir a la página del carrito
    window.location.href = 'carrito.html';
}

