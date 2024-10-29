// Entrega tarea 8

import ProductsController from './productsController.js'; 

const itemsController = new ProductsController();
document.getElementById("add-button").addEventListener("click", async () => {
    const name = document.getElementById('recipient-name').value;
    const scientificName = document.getElementById('cientific-name').value;
    const description = document.getElementById('description').value;
    const quantity = document.getElementById('quantity').value;
    const price = document.getElementById('price').value;
    const imageInput = document.getElementById('imagen-add'); 
    
    if (!name || !scientificName || !description || !quantity || !price || !imageInput.files[0]) {
      await Swal.fire({
        icon: 'error',
        title: 'Campos Incompletos',
        text: 'Por favor, completa todos los campos antes de agregar el producto.',
      });
      return;
    }
  
    // base64
    const reader = new FileReader();
    reader.onload = function (e) {
      const imageBase64 = e.target.result;
  
      itemsController.addItem(name, scientificName, description, quantity, parseFloat(price), imageBase64);
  
      Swal.fire({
        title: "¡Excelente!",
        text: "Has agregado un nuevo producto!",
        icon: "success"
      });
  
      const modal = bootstrap.Modal.getInstance(document.getElementById('biobugModal'));
      modal.hide();
  
      clearForm();
      loadCardsListFromItemsController();
    };
  
    reader.readAsDataURL(imageInput.files[0]); // lo convierte a base 64
  });


document.getElementById("cancel-button").addEventListener("click", async () => {
    const result = await Swal.fire({
        title: "¿Estás seguro que quieres cancelar el proceso?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Si",
        cancelButtonText: "No"
    });

    if (result.isConfirmed) {
        const modal = bootstrap.Modal.getInstance(document.getElementById('biobugModal'));
        modal.hide();
          clearForm();
        Swal.fire("Has cancelado el proceso.");
    } else {
        Swal.fire("Continúa con el proceso.");
    }

    
});

function clearForm() {
    document.getElementById('recipient-name').value = '';
    document.getElementById('cientific-name').value = '';
    document.getElementById('description').value = '';
    document.getElementById('quantity').value = '';
    document.getElementById('price').value = '';
    document.getElementById('imagen-add').value = '';
}

function loadCardsListFromItemsController() {
    const itemsContainer = document.getElementById("list-items");
    itemsContainer.innerHTML = "";

    itemsController.items.forEach(item => {
        addItemCard(item);
    });
}
