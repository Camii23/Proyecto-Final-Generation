


import productsController from "./productsController.js";

const itemsController = new productsController();

//---
const STORAGE_KEY = "carroItems";
const PRODUCTS_KEY = "products"; // Asegúrate de tener la clave correcta para los productos

// Inicializar carrito desde el localStorage
let carroItems = cargarCarroDesdeLocalStorage() || [];
let productos = cargarProductosDesdeLocalStorage() || [];

// cargamos los productos para ver que todo ok
console.log("Productos cargados:", productos);

function addCarrito(idItem) {
  const productoEnCarro = carroItems.find(item => item.idProduct == idItem);

  if (!productoEnCarro) {
    // Si no existe, agregamos el producto al carrito con cantidad 1
    const producto = productos.find(item => item.idProduct == idItem);
    if (producto) {
      carroItems.push({ idProduct: +idItem, quantity: 1 });
    }
  } else {
    // Si ya existe, incrementamos la cantidad
    productoEnCarro.quantity += 1;
  }

  guardarCarroEnLocalStorage();
  actualizarCarro(); // Llamamos a actualizarCarro para refrescar la vista

  // Evitamos la redirección si ya estamos en la página de carrito
  if (!window.location.pathname.includes("carrito.html")) {
    // Solo redirigir si no estamos ya en la página de carrito
    if (window.location.pathname.includes("productoSimple.html")) {
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
}




function removerCarrito(idItem) {
  const productoEnCarro = carroItems.find(item => item.idProduct == idItem);
  
  if (productoEnCarro) {
    if (productoEnCarro.quantity > 1) {
      productoEnCarro.quantity -= 1;
    } else {
      // Si la cantidad es 1, eliminamos el producto del carrito
      carroItems = carroItems.filter(item => item.idProduct != idItem);
    }
  }

  guardarCarroEnLocalStorage();
  actualizarCarro(); // Llamamos a actualizarCarro después de modificar el carrito
}

function actualizarCarro() {
  const contenedorCarrito = document.querySelector(".items-carrito");
  if (!contenedorCarrito) {
    console.error("Contenedor de carrito no encontrado");
    return;
  }
  
  contenedorCarrito.innerHTML = "";
  let total = 0;

  if (carroItems.length === 0) {
    contenedorCarrito.innerHTML = `<p class="mensaje-vacio">¡No tienes nada aquí todavía! <i class="fas fa-shopping-cart"></i></p>`;
    document.querySelector(".carrito-resumen .carrito-detalles").innerHTML = `
      <p>Subtotal: <span>$0</span></p>
      <p>Descuento (-20%): <span>$0</span></p>
      <p>Envío: <span>$0.00</span></p>
      <h4>Total: <span>$0</span></h4>
    `;
    return;
  }

  carroItems.forEach(item => {
    const product = productos.find(prod => prod.idProduct == item.idProduct);
    
    if (product) {
      const { nameProduct, price, unitsPackage, img } = product;
      const cantidad = item.quantity;
      const totalItem = price * cantidad;
      total += totalItem;

      const itemHTML = `
        <div class="item col-12">
          <img src="${img}" alt="${nameProduct}" class="producto-imagen shadow">
          <div class="info-producto">
            <p>${nameProduct} (Pack: ${unitsPackage})</p>
            <span class="precio">$${totalItem.toLocaleString("es-CO")}</span>
          </div>
          <div class="boton-cantidad">
            <button onclick="removerCarrito('${item.idProduct}')">-</button>
            <span>${cantidad}</span>
            <button onclick="addCarrito('${item.idProduct}')">+</button>
          </div>
        </div>
      `;
      contenedorCarrito.innerHTML += itemHTML;
    }
  });

  let subtotal = total;
  let descuento = subtotal * 0.2;
  let totalConDescuento = subtotal - descuento;

  const detallesResumen = document.querySelector(".carrito-resumen .carrito-detalles");
  if (detallesResumen) {
    detallesResumen.innerHTML = `
      <p>Subtotal: <span>$${subtotal.toLocaleString("es-CO")}</span></p>
      <p>Descuento (-20%): <span>$${descuento.toLocaleString("es-CO")}</span></p>
      <p>Envío: <span>$0.00</span></p>
      <h4>Total: <span>$${totalConDescuento.toLocaleString("es-CO")}</span></h4>
    `;
  }
}

function guardarCarroEnLocalStorage() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(carroItems));
}

function cargarCarroDesdeLocalStorage() {
  const carroGuardado = localStorage.getItem(STORAGE_KEY);
  return carroGuardado ? JSON.parse(carroGuardado) : [];
}

function cargarProductosDesdeLocalStorage() {
  const productosGuardados = localStorage.getItem(PRODUCTS_KEY);
  return productosGuardados ? JSON.parse(productosGuardados) : [];
}

// Exponer funciones globalmente
window.addCarrito = addCarrito;
window.removerCarrito = removerCarrito;

document.addEventListener("DOMContentLoaded", () => {
  actualizarCarro();
});

// Manejo del botón de checkout
document.addEventListener('DOMContentLoaded', function () {
  const checkoutButton = document.querySelector('.checkout-btn');
  if (checkoutButton) {
    checkoutButton.addEventListener('click', async () => {
      if (Object.keys(carroItems).length === 0) {
        await Swal.fire({
          icon: 'info',
          title: 'Carrito vacío',
          text: 'No ha agregado productos al carrito.',
          confirmButtonColor: '#617842',
          showConfirmButton: false,
          timer: 2000
        });
        return;
      }

      await Swal.fire({
        title: 'Comprobando datos',
        html: '<div class="spinner"></div>',
        showConfirmButton: false,
        allowOutsideClick: false,
        timer: 1500
      });

      const user = JSON.parse(localStorage.getItem("user"));
      if (user) {
        if (user.rol === 'admin') {
          await Swal.fire({
            icon: 'error',
            title: 'Acceso Restringido',
            text: 'Acción no permitida para administradores.',
            confirmButtonColor: '#617842',
            showConfirmButton: false,
            timer: 2000
          });
        } else if (user.rolUser === 'customer') {
          
          await Swal.fire({
            icon: 'success',
            title: 'Generando factura',
            text: 'Redirigiendo a la página de facturación...',
            confirmButtonColor: '#617842',
            showConfirmButton: false,
            timer: 2000
          });
          await registrarDatosCarrito();
          localStorage.setItem("carroItems", JSON.stringify([]));
          setTimeout(() => {
            window.location.href = "../../html/factura.html";
          }, 1);
        }
      } else {
        console.log("Usuario no encontrado en el localStorage.");
        await Swal.fire({
          icon: 'warning',
          title: 'Por favor inicie sesión',
          text: 'Debe iniciar sesión para completar la compra.',
          confirmButtonColor: '#617842',
          showConfirmButton: false,
          timer: 2000
        });
        setTimeout(() => {
          window.location.href = "../../html/iniciosesion.html";
        }, 1);
      }
    });
  } else {
    console.error("Botón de checkout no encontrado");
  }
});

async function registrarDatosCarrito() {
  // Verificamos si el carrito está vacío
  const URL_CREATE_ORDER = "http://localhost:8080/order";
  if (carroItems.length === 0) {
    await Swal.fire({
      icon: 'info',
      title: 'Carrito vacío',
      text: 'No ha agregado productos al carrito.',
      confirmButtonColor: '#617842',
      showConfirmButton: false,
      timer: 2000
    });
    return;
  }

  // Creamos el arreglo de orderDetails con sus datos (ID de producto y cantidad)
  const orderDetails = carroItems.map(item => {
    return {
      idProduct: item.idProduct, // Solo el idProduct
      quantity: item.quantity
    };
  });

  // Calculamos el subtotal (sin aplicar descuento aún)
  let subtotal = orderDetails.reduce((total, item) => {
    const producto = productos.find(p => p.idProduct === item.idProduct);
    return total + (producto.price * item.quantity);
  }, 0);

  // El descuento es fijo en 20 (representando un 20%)
  let discount = 20;
  let totalConDescuento = subtotal - (subtotal * (discount / 100)); 

  // Obtener el usuario desde el localStorage
  const user = JSON.parse(localStorage.getItem("user"));

  // Crear el payload para enviar al backend
  const payload = {
    dateCreation: new Date().toISOString().split('T')[0], // Formato "YYYY-MM-DD"
    user: {
      idUser: user ? user.idUser : 1 
    },
    orderDetails: orderDetails,
    discount: discount, 
    subTotal: subtotal, 
    total: totalConDescuento 
  };

  console.log("Payload generado:", payload);

  // Enviar el payload a la API
  try {
    const response = await fetch(URL_CREATE_ORDER, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Respuesta del servidor:", data);

      // Redirigir al usuario a la página de facturación (si todo sale bien)
      setTimeout(() => {
        window.location.href = "../../html/factura.html";
      }, 1);
    } else {
      console.error("Error al registrar la orden:", response.statusText);
    }
  } catch (error) {
    console.error("Error al enviar la orden al servidor:", error);
  }
}





//==========================================================================








// import productsController from "./productsController.js";

// const itemsController = new productsController();

// const STORAGE_KEY = "carroItems";



// //------------------------------------------------




// //------------------------------------------------


// // Inicializar carrito desde el localStorage
// let carroItems = cargarCarroDesdeLocalStorage() || {};

// // cargamos los productos para ver que todo ok
// console.log(itemsController.items);
 

// function addCarrito(idItem) {
//   if (!carroItems[idItem]) {
//     carroItems[idItem] = { cantidad: 1 };
//   } else {
//     // incrementa cantidad si producto esta en carrito
//     carroItems[idItem].cantidad += 1;
//   }
//   guardarCarroEnLocalStorage();

//   if (window.location.pathname.includes("productoSimple.html") || window.location.pathname.includes("carrito.html")) {
//     window.location.href = "carrito.html";
//   } else {
//     Swal.fire({
//       icon: 'success',
//       title: 'Producto añadido al carrito!',
//       text: '¿Qué quieres hacer a continuación?',
//       showCancelButton: true,
//       confirmButtonText: 'Ir al carrito',
//       cancelButtonText: 'Explorar más',
//       confirmButtonColor: '#617842',
//       cancelButtonColor: '#B84450'
//     }).then((result) => {
//       if (result.isConfirmed) {
//           window.location.href = "carrito.html";
//       }
//     });
//   }
// }

// function removerCarrito(idItem) {
//   if (carroItems[idItem]) {
//     if (carroItems[idItem].cantidad > 1) {
//       carroItems[idItem].cantidad -= 1;
//     } else {
//       delete carroItems[idItem];
//     }
//     guardarCarroEnLocalStorage();
//   }
//   actualizarCarro();
// }

// function actualizarCarro() {
//   const contenedorCarrito = document.querySelector(".items-carrito");
//   contenedorCarrito.innerHTML = "";
//   let total = 0;

//   if (Object.keys(carroItems).length === 0) {
//     contenedorCarrito.innerHTML = `<p class="mensaje-vacio">¡No tienes nada aquí todavia!  <i class="fas fa-shopping-cart"></i></p>`;
//     document.querySelector(".carrito-resumen .carrito-detalles").innerHTML = `
//                 <p>Subtotal: <span>$0</span></p>
//                 <p>Descuento (-20%): <span>$0</span></p>
//                 <p>Envío: <span>$0.00</span></p>
//                 <h4>Total: <span>$0</span></h4>
//             `;
//     return;
//   }

//   Object.keys(carroItems).forEach((id) => {
//    // buscamos: si en itemsController hay forEach(id y parseamos pq no podemos comparar int de itemsController con String de carroItems
//     const product = itemsController.items.find(
//       (item) => String(item.id) === id
//     );
   
//     const { name, price, quantityUnit, img } = product;
//     const cantidad = carroItems[id].cantidad;
//     const totalItem = price * cantidad;
//     total += totalItem;

//     const itemHTML = `
//             <div class="item col-12">
//                 <img src="${img}" alt="${name}" class="producto-imagen shadow">
//                 <div class="info-producto">
//                     <p>${name}  (Pack: ${quantityUnit})</p>
//                     <span class="precio">$${totalItem.toLocaleString(
//                       "es-CO"
//                     )}</span>
//                 </div>
//                 <div class="boton-cantidad">
//                     <button onclick="removerCarrito('${id}')">-</button>
//                     <span>${cantidad}</span>
//                     <button onclick="addCarrito('${id}')">+</button>
//                 </div>
//             </div>
//         `;
//     contenedorCarrito.innerHTML += itemHTML;
//   });
//   let subtotal = total;
//   let descuento = subtotal * 0.2;
//   let totalConDescuento = subtotal - descuento;
//   document.querySelector(".carrito-resumen .carrito-detalles").innerHTML = `
//     <p>Subtotal: <span>$${subtotal.toLocaleString("es-CO")}</span></p>
//     <p>Descuento (-20%): <span>$${descuento.toLocaleString("es-CO")}</span></p>
//     <p>Envío: <span>$0.00</span></p>
//     <h4>Total: <span>$${totalConDescuento.toLocaleString("es-CO")}</span></h4>
// `;
// }

// function guardarCarroEnLocalStorage() {
//   localStorage.setItem(STORAGE_KEY, JSON.stringify(carroItems));
// }

// function cargarCarroDesdeLocalStorage() {
//   const carroGuardado = localStorage.getItem(STORAGE_KEY);
//   return carroGuardado ? JSON.parse(carroGuardado) : null;
// }

// // exponer funciones globalmente
// window.addCarrito = addCarrito;
// window.removerCarrito = removerCarrito;

// document.addEventListener("DOMContentLoaded", () => {
//   actualizarCarro();
// });

// document.addEventListener('DOMContentLoaded', function () {
//   const checkoutButton = document.querySelector('.checkout-btn');

//   checkoutButton.addEventListener('click', async () => {

//     if (Object.keys(carroItems).length === 0) {
//       await Swal.fire({
//           icon: 'info',
//           title: 'Carrito vacío',
//           text: 'No ha agregado productos al carrito.',
//           confirmButtonColor: '#617842',
//           showConfirmButton: false,
//           timer: 2000
//       });
//       return; // Evita continuar si el carrito está vacío
//   }
  
//       await Swal.fire({
//           title: 'Comprobando datos',
//           html: '<div class="spinner"></div>',
//           showConfirmButton: false,
//           allowOutsideClick: false,
//           timer: 1500
//       });

//       const user = JSON.parse(localStorage.getItem("user"));
      
//       if (user) {
//           if (user.rol === 'admin') {
//               await Swal.fire({
//                   icon: 'error',
//                   title: 'Acceso Restringido',
//                   text: 'Acción no permitida para administradores.',
//                   confirmButtonColor: '#617842',
//                   showConfirmButton: false,
//                   timer: 2000
//               });
//           } else if (user.rol === 'cliente') {
//               await Swal.fire({
//                   icon: 'success',
//                   title: 'Generando factura',
//                   text: 'Redirigiendo a la página de facturación...',
//                   confirmButtonColor: '#617842',
//                   showConfirmButton: false,
//                   timer: 2000
//               });
//               await registrarDatosCarrito();
//               setTimeout(() => {
//                   window.location.href = "../../html/factura.html";
//               }, 1);
//           }
//       } else {
//           console.log("Usuario no encontrado en el localStorage.");
//           await Swal.fire({
//               icon: 'warning',
//               title: 'Por favor inicie sesión',
//               text: 'Debe iniciar sesión para completar la compra.',
//               confirmButtonColor: '#617842',
//               showConfirmButton: false,
//               timer: 2000
//           });
//           setTimeout(() => {
//               window.location.href = "../../html/iniciosesion.html";
//           }, 1);
//       }
//   });
// });

// async function registrarDatosCarrito() {

// }
