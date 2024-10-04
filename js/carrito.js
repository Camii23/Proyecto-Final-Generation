import itemsController from './productsControllerInstance.js';

const STORAGE_KEY = "carroItems";

// Inicializar carrito desde el localStorage
let carroItems = cargarCarroDesdeLocalStorage() || {};

// Ahora, itemsController ya tiene los productos cargados.
console.log(itemsController.items);

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


function removerCarrito(idItem) {
    if (carroItems[idItem]) {
        if (carroItems[idItem].cantidad > 1) {
            carroItems[idItem].cantidad -= 1;
        } else {
            delete carroItems[idItem]; // Eliminar producto del carrito
        }
        guardarCarroEnLocalStorage();
    }
    actualizarCarro();
}

function actualizarCarro() {
    const contenedorCarrito = document.querySelector('.items-carrito');
    contenedorCarrito.innerHTML = ''; // Limpia el carrito antes de actualizar
    let total = 0;

    Object.keys(carroItems).forEach(id => {
        const { nombre, precio, cantidad } = carroItems[id];
        const totalItem = precio * cantidad;
        total += totalItem;

        const itemHTML = `
            <div class="item">
                <div class="info-producto">
                    <p>${nombre}</p>
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

    // Actualizar resumen de la orden
    document.querySelector('.carrito-resumen .carrito-detalles').innerHTML = `
        <p>Subtotal: <span>$${total.toFixed(2)}</span></p>
        <p>Descuento (-20%): <span>$${(total * 0.2).toFixed(2)}</span></p>
        <p>Envío: <span>$0.00</span></p>
        <h4>Total: <span>$${(total * 0.8).toFixed(2)}</span></h4>
    `;
}

// Funciones para trabajar con el localStorage
function guardarCarroEnLocalStorage() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(carroItems));
}

function cargarCarroDesdeLocalStorage() {
    const carroGuardado = localStorage.getItem(STORAGE_KEY);
    return carroGuardado ? JSON.parse(carroGuardado) : null;
}

// Exponer funciones globalmente
window.addCarrito = addCarrito;
window.removerCarrito = removerCarrito;

// Cargar carrito en la interfaz al iniciar la página
actualizarCarro();

 