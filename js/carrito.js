import productsController from "./productsController.js";

const itemsController = new productsController();

const STORAGE_KEY = "carroItems";

// Inicializar carrito desde el localStorage
let carroItems = cargarCarroDesdeLocalStorage() || {};

// cargamos los productos para ver que todo ok
console.log(itemsController.items);

function addCarrito(idItem) {
    if (!carroItems[idItem]) {
        carroItems[idItem] = { cantidad: 1 };
    } else {
        // incrementa cantidad si producto esta en carrito
        carroItems[idItem].cantidad += 1;
    }
    guardarCarroEnLocalStorage();
    window.location.href = 'carrito.html';
}

function removerCarrito(idItem) {
    if (carroItems[idItem]) {
        if (carroItems[idItem].cantidad > 1) {
            carroItems[idItem].cantidad -= 1;
        } else {
            delete carroItems[idItem];
        }
        guardarCarroEnLocalStorage();
    }
    actualizarCarro();
}

function actualizarCarro() {
    const contenedorCarrito = document.querySelector('.items-carrito');
    contenedorCarrito.innerHTML = '';
    let total = 0;

    Object.keys(carroItems).forEach(id => {
        //buscamos: si en itemsController hay forEach(id y parseamos pq no podemos comparar int de itemsController con String de carroItems
        const product = itemsController.items.find(item => String(item.id) === id);
        const { name, price } = product;
        const cantidad = carroItems[id].cantidad;
        const totalItem = price * cantidad;
        total += totalItem;

        const itemHTML = `
            <div class="item">
                <div class="info-producto">
                    <p>${name}</p>
                    <span class="precio">$${totalItem.toFixed(2)}</span>
                </div>
                <div class="boton-cantidad">
                    <button onclick="removerCarrito('${id}')">-</button>
                    <span>${cantidad}</span>
                    <button onclick="addCarrito('${id}')">+</button>
                </div>
            </div>
        `;
        contenedorCarrito.innerHTML += itemHTML;
    });

    document.querySelector('.carrito-resumen .carrito-detalles').innerHTML = `
        <p>Subtotal: <span>$${total.toFixed(2)}</span></p>
        <p>Descuento (-20%): <span>$${(total * 0.2).toFixed(2)}</span></p>
        <p>Envío: <span>$0.00</span></p>
        <h4>Total: <span>$${(total * 0.8).toFixed(2)}</span></h4>
    `;
}

function guardarCarroEnLocalStorage() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(carroItems));
}

function cargarCarroDesdeLocalStorage() {
    const carroGuardado = localStorage.getItem(STORAGE_KEY);
    return carroGuardado ? JSON.parse(carroGuardado) : null;
}

// exponer funciones globalmente
window.addCarrito = addCarrito;
window.removerCarrito = removerCarrito;

document.addEventListener("DOMContentLoaded", () => {
    actualizarCarro();
});
