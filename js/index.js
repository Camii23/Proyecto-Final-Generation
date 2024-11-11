// Entrega tarea 8
// Entrega tarea 8

import productsController from "./productsController.js";

const itemsController = new productsController();

const getImagePath = (imgPath) => {
  const cleanedPath = imgPath.startsWith('../') ? imgPath.slice(3) : imgPath;
  const finalPath = window.location.pathname.includes('index.html') ? `./${cleanedPath}` : `../${cleanedPath}`;
  console.log(`Ruta ${imgPath}:`, finalPath); 
  return finalPath;
};


function addItemCard(item) {
  const itemHTML = `
        <div class="card h-100" style="width: 20rem;">
            <img src="${getImagePath(item.img)}" class="card-img-top" alt="product image" style="height:250px;">
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

const products = [
  {
    name: "Crisopas",
    scientificName: "Chrysoperla rufilabris",
    description:
      "Depredadoras voraces de pulgones, ácaros, trips y otros pequeños insectos. Útiles en amplia gama de cultivos y entornos.",
    quantityUnit: "500 Larvas.",
    price: 100000,
    img: "../img/insects/crisopas.jpg",
    createdAt: "2020-09-20"
  },
  {
    name: "Avispas parasitoides",
    scientificName: "Trichogramma spp.",
    description:
      "Parasitan los huevos de muchas plagas, incluyendo polillas y gusanos. Eficaces para prevenir infestaciones en cultivos.",
    quantityUnit: "100 Insectos",
    price: 80000,
    img: "../img/insects/avispas-parasitoides.jpg",
    createdAt: "2020-09-20"
  },
  {
    name: "Ácaro depredador",
    scientificName: "Phytoseiulus persimilis",
    description:
      "Depredador natural de la araña roja, una plaga común en cultivos bajo invernadero. Controla infestaciones rápidamente.",
    quantityUnit: "80 Insectos",
    price: 160000,
    img: "../img/insects/acaro-depredador.jpg",
    createdAt: "2020-09-20"
  },
  {
    name: "Mariquitas",
    scientificName: "Hippodamia convergens",
    description:
      "Depredadoras de pulgones, ácaros y otros insectos blandos. Son populares por su eficacia y facilidad de uso.",
    quantityUnit: "90 Insectos",
    price: 120000,
    img: "../img/insects/mariquitas.jpg",
    createdAt: "2020-09-20"
  },
  {
    name: "Mosca soldado negra",
    scientificName: "Hermetia illucens",
    description:
      "Utilizada para control de desechos orgánicos y biológicos, sus larvas degradan residuos y reducen proliferación de plagas.",
    quantityUnit: "100 Insectos",  
    price: 110000,
    img: "../img/insects/mosca-soldado-negra.jpg",
    createdAt: "2020-09-20"
  },
  {
    name: "Escarabajo tigre",
    scientificName: "Calosoma sycophanta",
    description:
      "Se alimenta de orugas, procesionaria del pino y otras plagas forestales, siendo útil en ambientes al aire libre.",
    quantityUnit: "100 Insectos",  
    price: 110000,
    img: "../img/insects/escarabajo-tigre.jpg",
    createdAt: "2020-09-20"
  },
  {
    name: "Moscas depredadoras",
    scientificName: "Aphidoletes aphidimyza",
    description:
      "Se especializan en atacar pulgones, inyectándoles una toxina paralizante antes de alimentarse de ellos.",
    quantityUnit: "120 Insectos",
    price: 150000,
    img: "../img/insects/mosca-depredadora.jpg",
    createdAt: "2020-09-20"
  },
  {
    name: "Chinche pirata diminuta",
    scientificName: "Orius insidiosus",
    description:
      "Depredador eficaz contra trips, ácaros y pulgones. Funciona en cultivos con flores de polen, como los ornamentales.",
    quantityUnit: "50 Insectos",  
    price: 200000,
    img: "../img/insects/chinche-pirata.jpg",
    createdAt: "2020-09-20"
  },
  {
    name: "Escarabajo terrestre",
    scientificName: "Pterostichus melanarius",
    description:
      "Depredador eficaz contra babosas, orugas y otras plagas de suelo. Ideal para cultivos al aire libre.",
    quantityUnit: "20 Insectos",  
    price: 100000,
    img: "../img/insects/escarabajo-terrestre.jpg",
    createdAt: "2020-09-20"
  },
  {
    name: "Escarabajo depredador",
    scientificName: "cryptolaemus montrouzieri",
    description:
      "Utilizado en cultivos de frutas y hortalizas. Eficaz contra el combate de cochinillas algodonosas.",
    quantityUnit: "50 Adultos",
    price: 240000,
    img: "../img/insects/escarabajo-depredador.jpg",
    createdAt: "2020-09-20"
  },
];

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

