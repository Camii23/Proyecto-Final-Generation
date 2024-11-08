document.addEventListener('DOMContentLoaded', function () {
    // Elementos del formulario
    const addProductForm = document.getElementById('add-product-form');
    const addButton = document.getElementById('add-button');
    const editButton = document.getElementById('edit-button');
    const addBtn = document.getElementById("btnBigAdd");
    const cancelButton = document.getElementById('cancel-button');
    const productList = document.getElementById('product-list');

    addBtn.addEventListener("click", () => {
        editButton.style.display = "none";
        addButton.style.display = "block";
    })

    // Función para agregar un producto
    if (addProductForm) {
        addProductForm.onsubmit = async function (event) {
            event.preventDefault();
            editButton.style.display = "none";
            const name = document.getElementById('recipient-name').value;
            const scientificName = document.getElementById('cientific-name').value;
            const description = document.getElementById('description').value;
            const quantity = document.getElementById('quantity').value;
            const price = document.getElementById('price').value;
            const image = document.getElementById('imagen-add').files[0];

            // Crear un objeto con los datos del producto
            const productData = {
                nameProduct: name,
                scientificName: scientificName,
                description: description,
                price: price,
                quantity: quantity,
                img: image ? image.name : '', // Asumiendo que solo se sube el nombre de la imagen
                unitsPackage: quantity // Ajusta esto si necesitas otro valor
            };

            try {
                // Agregar producto a través de la API
                const response = await fetch('http://localhost:8080/product', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(productData),
                });

                if (!response.ok) {
                    throw new Error('Error al agregar el producto');
                }

                Swal.fire('Producto agregado', '', 'success');
                $('#biobugModal').modal('hide'); // Cierra el modal de agregar

                // Recargar los productos
                displayProducts();
            } catch (error) {
                console.error(error);
                Swal.fire('Error', 'No se pudo agregar el producto', 'error');
            }
        };
    }

    // Cancelar acción del modal
    if (cancelButton) {
        cancelButton.onclick = function () {
            $('#biobugModal').modal('hide'); // Cierra el modal sin hacer nada
        };
    }

    // Función para cerrar el modal y restablecer el formulario
    const closeModalAndResetForm = () => {
        // Obtener el modal y cerrarlo
        const modal = new bootstrap.Modal(document.getElementById('biobugModal'));
        modal.hide();  // Cierra el modal

        // Obtener el formulario y restablecerlo
        const form = document.getElementById("add-product-form");
        form.reset();  // Restablece todos los campos del formulario

        // Limpiar cualquier mensaje de error previo
        const errorMessage = document.getElementById('error-message');
        if (errorMessage) {
            errorMessage.style.display = "none";  // Oculta el mensaje de error
        }
    };

    // Añadir el evento de cierre tanto para el botón de cancelar como para la X
    document.getElementById("cancel-button").a; // Botón Cancelar
    document.querySelector('.btn-close').addEventListener("click", closeModalAndResetForm); // Botón X (cerrar modal)








    // Mostrar productos en la tabla
    async function displayProducts() {
        productList.innerHTML = ''; // Limpiar la lista antes de cargar los productos

        try {
            const response = await fetch('http://localhost:8080/product');
            const products = await response.json();

            products.forEach(product => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td><img src="${product.img}" alt="${product.nameProduct}" width="50"></td>
                    <td>${product.nameProduct}</td>
                    <td>${product.scientificName}</td>
                    <td>${product.description}</td>
                    <td>${product.unitsPackage}</td>
                    <td>${product.price}</td>
                   
                     <td>
          <button class="btn btn-sm btn-primary edit-btn" onclick="editProduct(${product.idProduct})" title="Editar" >
        <i class="fa fa-edit"></i> <!-- Ícono de edición -->
      </button>
      <button class="btn btn-sm btn-danger delete-btn" onclick="deleteProduct(${product.idProduct})" title="Eliminar">
        <i class="fa fa-trash"></i> <!-- Ícono de eliminación -->
      </button>
        </td>
                `;
                productList.appendChild(row);
            });
        } catch (error) {
            console.error('Error al cargar productos:', error);
            Swal.fire('Error', 'No se pudieron cargar los productos', 'error');
        }
    }

    displayProducts(); // Llama a la función para mostrar los productos en la tabla

    // Función para editar un producto
    window.editProduct = async function editProduct(idProduct) {
        try {
            addButton.style.display = "none";
            editButton.style.display = "block";
            // Solicitar el producto por ID
            const response = await fetch(`http://localhost:8080/product/${+idProduct}`);

            if (!response.ok) {
                throw new Error('No se pudo obtener el producto');
            }

            const product = await response.json();

            // Rellenar el formulario de edición con los datos del producto
            document.getElementById('recipient-name').value = product.nameProduct;
            document.getElementById('cientific-name').value = product.scientificName;
            document.getElementById('description').value = product.description;
            document.getElementById('quantity').value = product.unitsPackage;
            document.getElementById('price').value = product.price;

            // Asignar el ID del producto para actualizar
            // El evento 'click' se asigna aquí para asegurarnos de que funcione después de llenar el formulario
            document.getElementById('edit-button').onclick = async function () {
                const updatedProduct = {
                    idProduct: product.idProduct, // Asegúrate de que se mantenga el idProduct original
                    nameProduct: document.getElementById('recipient-name').value, // Nombre editado
                    scientificName: document.getElementById('cientific-name').value, // Nombre científico editado
                    description: document.getElementById('description').value, // Descripción editada
                    unitsPackage: +document.getElementById('quantity').value, // Cantidad editada
                    price: + document.getElementById('price').value, // Precio editado
                    img: product.img // Suponiendo que no se edita la imagen
                };

                // Verificación: Log para ver los datos antes de enviar la solicitud
                console.log("Datos a enviar para actualización:", updatedProduct);

                // Realizar la solicitud PUT para actualizar el producto
                try {
                    const updateResponse = await fetch(`http://localhost:8080/product`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(updatedProduct)
                    });

                    if (!updateResponse.ok) {
                        throw new Error('No se pudo actualizar el producto');
                    }

                    Swal.fire('Éxito', 'Producto actualizado con éxito', 'success');
                    displayProducts(); // Recargar los productos

                    // Cerrar modal usando JavaScript puro
                    const modal = document.getElementById('biobugModal');
                    const modalInstance = bootstrap.Modal.getInstance(modal);
                    modalInstance.hide();
                } catch (error) {
                    console.error('Error al actualizar el producto:', error);
                    Swal.fire('Error', 'No se pudo actualizar el producto', 'error');
                }
            };

            // Abrir el modal usando JavaScript puro
            const modal = document.getElementById('biobugModal');
            const modalInstance = new bootstrap.Modal(modal);
            modalInstance.show();

        } catch (error) {
            console.error('Error al obtener el producto:', error);
            Swal.fire('Error', 'No se pudo obtener el producto', 'error');
        }
    }



    // Función para eliminar un producto
    window.deleteProduct = async function (productId) {
        const confirmDelete = await Swal.fire({
            title: '¿Estás seguro?',
            text: "No podrás revertir esta acción",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        });

        if (confirmDelete.isConfirmed) {
            try {
                const response = await fetch(`http://localhost:8080/product/${productId}`, {
                    method: 'DELETE',
                });

                if (!response.ok) {
                    throw new Error('Error al eliminar el producto');
                }

                Swal.fire('Producto eliminado', '', 'success');
                displayProducts(); // Recargar los productos después de eliminar
            } catch (error) {
                console.error(error);
                Swal.fire('Error', 'No se pudo eliminar el producto', 'error');
            }
        }
    };
});
