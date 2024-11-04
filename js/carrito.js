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

  if (window.location.pathname.includes("productoSimple.html") || window.location.pathname.includes("carrito.html")) {
    window.location.href = "carrito.html";
  } else {
    Swal.fire({
      icon: 'success',
      title: 'Producto añadido al carrito!',
      text: '¿Qué quieres hacer a continuación?',
      showCancelButton: true,
      confirmButtonText: 'Ir al carrito',
      cancelButtonText: 'Explorar más',
      confirmButtonColor: '#617842',
      cancelButtonColor: '#B84450'
    }).then((result) => {
      if (result.isConfirmed) {
          window.location.href = "carrito.html";
      }
    });
  }
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
  const contenedorCarrito = document.querySelector(".items-carrito");
  contenedorCarrito.innerHTML = "";
  let total = 0;

  if (Object.keys(carroItems).length === 0) {
    contenedorCarrito.innerHTML = `<p class="mensaje-vacio">¡No tienes nada aquí todavia!  <i class="fas fa-shopping-cart"></i></p>`;
    document.querySelector(".carrito-resumen .carrito-detalles").innerHTML = `
                <p>Subtotal: <span>$0</span></p>
                <p>Descuento (-20%): <span>$0</span></p>
                <p>Envío: <span>$0.00</span></p>
                <h4>Total: <span>$0</span></h4>
            `;
    return;
  }

  Object.keys(carroItems).forEach((id) => {
    //buscamos: si en itemsController hay forEach(id y parseamos pq no podemos comparar int de itemsController con String de carroItems
    const product = itemsController.items.find(
      (item) => String(item.id) === id
    );
    const { name, price, quantityUnit, img } = product;
    const cantidad = carroItems[id].cantidad;
    const totalItem = price * cantidad;
    total += totalItem;

    const itemHTML = `
            <div class="item col-12">
                <img src="${img}" alt="${name}" class="producto-imagen shadow">
                <div class="info-producto">
                    <p>${name}  (Pack: ${quantityUnit})</p>
                    <span class="precio">$${totalItem.toLocaleString(
                      "es-CO"
                    )}</span>
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
  let subtotal = total;
  let descuento = subtotal * 0.2;
  let totalConDescuento = subtotal - descuento;
  document.querySelector(".carrito-resumen .carrito-detalles").innerHTML = `
    <p>Subtotal: <span>$${subtotal.toLocaleString("es-CO")}</span></p>
    <p>Descuento (-20%): <span>$${descuento.toLocaleString("es-CO")}</span></p>
    <p>Envío: <span>$0.00</span></p>
    <h4>Total: <span>$${totalConDescuento.toLocaleString("es-CO")}</span></h4>
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
