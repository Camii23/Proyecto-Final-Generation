// Entrega tarea 8

import ProductsController from './productsController.js'; 

const itemsController = new ProductsController();

document.getElementById("add-button").addEventListener("click", async () => {

    const name = document.getElementById('recipient-name').value;
    //const scientificName = document.getElementById('cientific-name').value;
    const description = document.getElementById('description').value;
    //const quantity = document.getElementById('quantity').value;
    const price = document.getElementById('price').value;
    const image = document.getElementById('imagen-add').value;

    if (!name || !description || !price || !image) {
        await Swal.fire({
            icon: 'error',
            title: 'Campos Incompletos',
            text: 'Por favor, completa todos los campos antes de agregar el producto.',
        });
        return;
    }

    itemsController.addItem(name, description, parseFloat(price), image);

    await Swal.fire({
        title: "¡Excelente!",
        text: "Has agregado un nuevo producto!",
        icon: "success"
    });

    const modal = bootstrap.Modal.getInstance(document.getElementById('biobugModal'));
    modal.hide();

    loadCardsListFromItemsController();
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
        Swal.fire("Has cancelado el proceso.");
    } else {
        Swal.fire("Continúa con el proceso.");
    }
});

function loadCardsListFromItemsController() {
    const itemsContainer = document.getElementById("list-items");
    itemsContainer.innerHTML = "";

    itemsController.items.forEach(item => {
        addItemCard(item);
    });
}
