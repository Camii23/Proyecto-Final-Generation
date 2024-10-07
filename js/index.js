import productsController from './productsController.js';

const itemsController = new productsController();
itemsController.addItems();

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

function loadCardsListFromItemsController() {
    for (let i = 0; i < itemsController.items.length; i++) {
        const item = itemsController.items[i];
        addItemCard(item);
    }
}

loadCardsListFromItemsController();
