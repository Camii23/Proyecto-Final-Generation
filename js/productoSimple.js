import productsController from "./productsController.js";

const itemsController = new productsController();

document.addEventListener('DOMContentLoaded', loadProductDetails);
// Función para cargar el producto
function loadProductDetails() {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get('id'); 

    const product = itemsController.items.find(
      (item) => String(item.id) === productId
    );
   
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

