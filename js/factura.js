import productsController from "./productsController.js";

const itemsController = new productsController();

const STORAGE_KEY = "carroItems";

// Inicializar carrito desde el localStorage
let carroItems = cargarCarroDesdeLocalStorage() || {};

// cargamos los productos para ver que todo ok
console.log(itemsController.items);
 
listarCarro();

function listarCarro() {
  const contenedorCarrito = document.querySelector("#contenedorFactura");
  contenedorCarrito.innerHTML = "";
  let total = 0;

  Object.keys(carroItems).forEach((id) => {
    const product = itemsController.items.find(
      (item) => String(item.id) === id
    );
    const { name, price, quantityUnit, img } = product;
    const cantidad = carroItems[id].cantidad;
    const totalItem = price * cantidad;
    total += totalItem;

    const itemHTML = `
            <tr>
                <td><img src="${img}" alt="${name}" class="producto-imagen shadow" style="width: 50px; height: 50px;"></td>
                <td>${name}</td>
                <td>${quantityUnit}</td>
                <td>$${totalItem.toLocaleString("es-CO")}</td>
                <td style="text-align: center;">${cantidad}</td>
            </tr>
        `;
    contenedorCarrito.innerHTML += itemHTML;
  });
  let subtotal = total;
  let descuento = subtotal * 0.2;
  let totalConDescuento = subtotal - descuento;
  document.querySelector(".factura-resumen .factura-detalles").innerHTML = `
    <p>Fecha: <span>20/09/2024</span></p>
    <p>Subtotal: <span>$${subtotal.toLocaleString("es-CO")}</span></p>
    <p>Descuento (-20%): <span>$${descuento.toLocaleString("es-CO")}</span></p>
    <p>Envío: <span>$0.00</span></p>
    <h4>Total: <span>$${totalConDescuento.toLocaleString("es-CO")}</span></h4>
    <hr>
`;
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
