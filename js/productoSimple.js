const products = [
    {
        id: 1,
        name: "Crisopas",
        scientificName: "Chrysoperla rufilabris",
        description: "Depredadoras voraces de pulgones, ácaros, trips y otros pequeños insectos. Útiles en amplia gama de cultivos y entornos.",
        quantityUnit: "500 Larvas.",
        price: 100000,
        img: "../img/insects/crisopas.jpg",
        createdAt: "2020-09-20"
    },
    {
        id: 2,
        name: "Avispas parasitoides",
        scientificName: "Trichogramma spp.",
        description: "Parasitan los huevos de muchas plagas, incluyendo polillas y gusanos. Eficaces para prevenir infestaciones en cultivos.",
        quantityUnit: "100 Insectos",
        price: 80000,
        img: "../img/insects/avispas-parasitoides.jpg",
        createdAt: "2020-09-20"
    },
    {
        id: 3,
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
        id: 4,
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
        id: 5,
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
        id: 6,
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
        id: 7,
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
        id: 8,
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
        id: 9,
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
        id: 10,
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

document.addEventListener('DOMContentLoaded', loadProductDetails);
// Función para cargar el producto
function loadProductDetails() {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get('id'); 
    const product = products.find(p => p.id == productId); 

    if (product) {
        document.getElementById('productName').innerText = product.name;
        document.getElementById('productScientificName').innerHTML = `<em>${product.scientificName}</em>`;
        document.getElementById('productImage').src = product.img;
        document.getElementById('productDescription').innerText = product.description;
        document.getElementById('productQuantityUnit').innerText = product.quantityUnit;
        document.getElementById('productPrice').innerText = `$${product.price.toLocaleString('es-CO')}`;

        
        document.getElementById('buyButton').onclick = () => {
            addCarrito(product.id);
        };
    } else {
        document.body.innerHTML = '<h2>Producto no encontrado</h2>';
    }
}

