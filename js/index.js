import itemsController from './productsControllerInstance.js';

itemsController.addItems();

function addItemCard(item) {
    const itemHTML = `
        <div class="card h-100" id="${item.id}" style="width: 20rem;">
            <img src="${item.img}" class="card-img-top" alt="product image" style="height:250px;">
            <div class="card-body mb-1">
                <h5 class="card-title">${item.name}</h5>
                <p class="card-text">${item.description}</p>
                <h5 class="card-price">$ ${item.price}</h5>
                <button href="#" class="btn btn-buy" onclick="addCarrito('${item.id}')">Comprar</button>
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

