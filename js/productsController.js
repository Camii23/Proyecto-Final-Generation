class productsController {
  constructor(currentId = 1) {
    this.items = [];
    this.currentId = currentId;
  }

  addItems(){
    const product1 = {
      id: this.currentId++,
      name: "Crisopas",
      scientificName: "Chrysoperla rufilabris",
      description: "Depredadoras voraces de pulgones, ácaros, trips y otros pequeños insectos. Utiles en amplia gama de cultivos y entornos",
      quantityUnit: "500 Larvas.",
      price: "100.000",
      img: "../img/insects/crisopas.jpg",
      createdAt: "2020-09-20"
    };

    const product2 = {
      id: this.currentId++,
      name: "Avispas parasitoides",
      scientificName: "Trichogramma spp.",
      description: "Parasitan los huevos de muchas plagas, incluyendo polillas y gusanos. Eficaces para prevenir infestaciones en cultivos.",
      quantityUnit: "100 Insectos",
      price: "80.000",
      img: "../img/insects/avispas-parasitoides.jpg",
      createdAt: "2020-09-20"
    };

    const product3 = {
      id: this.currentId++,
      name: "Ácaro depredador",
      scientificName: "Phytoseiulus persimilis",
      description: "Depredador natural de la araña roja, una plaga común en cultivos bajo invernadero. Controla infestaciones rápidamente.",
      quantityUnit: "80 Insectos",
      price: "160.000",
      img: "../img/insects/acaro-depredador.jpg",
      createdAt: "2020-09-20"
    };

    const product4 = {
      id: this.currentId++,
      name: "Mariquitas",
      scientificName: "Hippodamia convergens",
      description: "Depredadoras de pulgones, ácaros y otros insectos blandos. Son populares por su eficacia y facilidad de uso.",
      quantityUnit: "90 Insectos",
      price: "120.000",
      img: "../img/insects/mariquitas.jpg",
      createdAt: "2020-09-20"
    };

    const product5 = {
      id: this.currentId++,
      name: "Mosca soldado negra",
      scientificName: "Hermetia illucens",
      description: "Utilizada para control de desechos orgánicos y biológicos, sus larvas degradan residuos y reducen proliferación de plagas.",
      quantityUnit: "100 Insectos",
      price: "110.000",
      img: "../img/insects/mosca-soldado-negra.jpg",
      createdAt: "2020-09-20"
    };

    const product6 = {
      id: this.currentId++,
      name: "Escarabajo tigre",
      scientificName: "Calosoma sycophanta",
      description: "Se alimenta de orugas, procesionaria del pino y otras plagas forestales, siendo útil en ambientes al aire libre.",
      quantityUnit: "100 Insectos",
      price: "110.000",
      img: "../img/insects/escarabajo-tigre.jpg",
      createdAt: "2020-09-20"
    };

    const product7 = {
      id: this.currentId++,
      name: "Moscas depredadoras",
      scientificName: "Aphidoletes aphidimyza",
      description: "Se especializan en atacar pulgones, inyectándoles una toxina paralizante antes de alimentarse de ellos.",
      quantityUnit: "120 Insectos",
      price: "150.000",
      img: "../img/insects/mosca-depredadora.jpg",
      createdAt: "2020-09-20"
    };

    const product8 = {
      id: this.currentId++,
      name: "Chinche pirata diminuta",
      scientificName: "Orius insidiosus",
      description: "Depredador eficaz contra trips, ácaros y pulgones. Funciona en cultivos con flores de polen, como los ornamentales.",
      quantityUnit: "50 Insectos",
      price: "200.000",
      img: "../img/insects/chinche-pirata.jpg",
      createdAt: "2020-09-20"
    };

    const product9 = {
      id: this.currentId++,
      name: "Escarabajo terrestre",
      scientificName: "Pterostichus melanarius",
      description: "Depredador eficaz contra babosas, orugas y otras plagas de suelo. Ideal para cultivos al aire libre.",
      quantityUnit: "20 Insectos",
      price: "100.000",
      img: "../img/insects/escarabajo-terrestre.jpg",
      createdAt: "2020-09-20"
    };

    const product10 = {
      id: this.currentId++,
      name: "Escarabajo depredador",
      scientificName: "cryptolaemus montrouzieri",
      description: "Utilizado en cultivos de frutas y hortalizas. Eficaz contra el combate de cochinillas algodonosas.",
      quantityUnit: "50 Adultos",
      price: "240.000",
      img: "../img/insects/escarabajo-depredador.jpg",
      createdAt: "2020-09-20"
    };

    this.items.push(product1, product2, product3, product4, product5, product6, product7, product8, product9, product10);
  }
}
export default productsController;




