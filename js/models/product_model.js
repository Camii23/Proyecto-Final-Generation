export class Product {
    constructor(idProduct, nameProduct, scientificName, description, price, img, unitsPackage, dateCreation) {
        this.idProduct = idProduct;
        this.nameProduct = nameProduct;
        this.scientificName = scientificName;
        this.description = description;
        this.price = price;
        this.img = img;
        this.unitsPackage = unitsPackage;
        this.dateCreation = new Date(dateCreation); // Convertir a objeto Date
    }

    displayProduct(){
        return`
        <div class="card h-100" style="width: 20rem;">
            <img src="${this.img}" class="card-img-top" alt="product image" style="height:250px;">
            <div class="card-body mb-1">
                <h5 class="card-title">${this.nameProduct}</h5>
                <p class="card-text">${this.description}</p>
                <h5 class="card-text">$ ${this.price.toLocaleString('es-CO')}</h5>
                <button class="btn btn-buy" onclick="window.location.href='productoSimple.html?id=${this.idProduct}'">Ver Detalles</button>
                <button href="#" class="btn btn-buy" onclick="addCarrito('${this.idProduct}')">Comprar</button>
            </div>
        </div>
        <br/>
    `;
    }
}

