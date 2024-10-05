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
                <h5 class="card-text">$ ${item.price}</h5>
                <button href="#" class="btn btn-buy" onclick="addCarrito('${item.name}')">Comprar</button>
            </div>
        </div>
        <br/>
    `;
  const itemsContainer = document.getElementById("list-items");
  itemsContainer.innerHTML += itemHTML;
}

const products = [
  {
    name: "Crisopas",
    description:
      "Depredadoras voraces de pulgones, ácaros, trips y otros pequeños insectos. Útiles en amplia gama de cultivos y entornos.",
    price: 100000,
    img: "../img/insects/crisopas.jpg",
  },
  {
    name: "Avispas parasitoides",
    description:
      "Parasitan los huevos de muchas plagas, incluyendo polillas y gusanos. Eficaces para prevenir infestaciones en cultivos.",
    price: 80000,
    img: "../img/insects/avispas-parasitoides.jpg",
  },
  {
    name: "Ácaro depredador",
    description:
      "Depredador natural de la araña roja, una plaga común en cultivos bajo invernadero. Controla infestaciones rápidamente.",
    price: 160000,
    img: "../img/insects/acaro-depredador.jpg",
  },
  {
    name: "Mariquitas",
    description:
      "Depredadoras de pulgones, ácaros y otros insectos blandos. Son populares por su eficacia y facilidad de uso.",
    price: 120000,
    img: "../img/insects/mariquitas.jpg",
  },
  {
    name: "Mosca soldado negra",
    description:
      "Utilizada para control de desechos orgánicos y biológicos, sus larvas degradan residuos y reducen proliferación de plagas.",
    price: 110000,
    img: "../img/insects/mosca-soldado-negra.jpg",
  },
  {
    name: "Escarabajo tigre",
    description:
      "Se alimenta de orugas, procesionaria del pino y otras plagas forestales, siendo útil en ambientes al aire libre.",
    price: 110000,
    img: "../img/insects/escarabajo-tigre.jpg",
  },
  {
    name: "Moscas depredadoras",
    description:
      "Se especializan en atacar pulgones, inyectándoles una toxina paralizante antes de alimentarse de ellos.",
    price: 150000,
    img: "../img/insects/mosca-depredadora.jpg",
  },
  {
    name: "Chinche pirata diminuta",
    description:
      "Depredador eficaz contra trips, ácaros y pulgones. Funciona en cultivos con flores de polen, como los ornamentales.",
    price: 200000,
    img: "../img/insects/chinche-pirata.jpg",
  },
  {
    name: "Escarabajo terrestre",
    description:
      "Depredador eficaz contra babosas, orugas y otras plagas de suelo. Ideal para cultivos al aire libre.",
    price: 100000,
    img: "../img/insects/escarabajo-terrestre.jpg",
  },
  {
    name: "Escarabajo depredador",
    description:
      "Utilizado en cultivos de frutas y hortalizas. Eficaz contra el combate de cochinillas algodonosas.",
    price: 240000,
    img: "../img/insects/escarabajo-depredador.jpg",
  },
];

products.forEach((product) => {
    // Verificar si el producto ya está en el controlador
    const exists = itemsController.items.some(item => item.name === product.name);
    
    if (!exists) {
      // Si no existe, lo agregamos
      itemsController.addItem(
        product.name,
        product.description,
        product.price,
        product.img
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
