import ProductsController from './productsController.js';

const itemsController = new ProductsController();
let isEditing = false;
let currentProductId = null;

async function loadAndDisplayProducts() {
  try {
    const products = await itemsController.getProducts();
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';

    products.forEach(product => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td><img src="${product.img}" alt="${product.nameProduct}" class="producto-imagen shadow" style="width: 40px; height: 40px;"></td>
        <td>${product.nameProduct}</td>
        <td>${product.scientificName}</td>
        <td>${product.description}</td>
        <td>${product.unitsPackage}</td>
        <td>${product.price}</td>
        <td>
          <button class="btn btn-sm btn-primary edit-btn" data-id="${product.idProduct}" title="Editar">
        <i class="fa fa-edit"></i> <!-- Ícono de edición -->
      </button>
      <button class="btn btn-sm btn-danger delete-btn" data-id="${product.idProduct}" title="Eliminar">
        <i class="fa fa-trash"></i> <!-- Ícono de eliminación -->
      </button>
        </td>
      `;
      productList.appendChild(row);
    });

    addEventListeners();
  } catch (error) {
    showError('Error al cargar los productos');
  }
}

function addEventListeners() {
  document.querySelectorAll('.edit-btn').forEach(btn => {
    btn.addEventListener('click', handleEdit);
  });
  
  document.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', handleDelete);
  });

  document.getElementById('add-button').addEventListener('click', handleAddOrUpdate);
  document.getElementById('cancel-button').addEventListener('click', handleCancel);
  
  // Reset form when modal is hidden
  document.getElementById('biobugModal').addEventListener('hidden.bs.modal', () => {
    resetForm();
  });
}

async function handleAddOrUpdate() {
  const formData = getFormData();
  
  if (!validateForm(formData)) {
    await showError('Por favor, completa todos los campos correctamente.');
    return;
  }

  try {
    if (isEditing) {
      await handleUpdate(formData);
    } else {
      await handleAdd(formData);
    }
  } catch (error) {
    showError('Error al procesar el producto');
  }
}

async function handleAdd(formData) {
  const { name, scientificName, description, quantity, price, imageFile } = formData;
  
  const imageBase64 = await convertToBase64(imageFile);
  await itemsController.addItem(name, scientificName, description, quantity, price, imageBase64);
  
  await showSuccess('Producto agregado exitosamente');
  closeModalAndRefresh();
}

async function handleUpdate(formData) {
  const { name, scientificName, description, quantity, price, imageFile } = formData;
  
  const updatedProduct = {
    idProduct: currentProductId,
    nameProduct: name,
    scientificName,
    description,
    unitsPackage: parseInt(quantity),
    price: parseFloat(price)
  };

  if (imageFile) {
    updatedProduct.img = await convertToBase64(imageFile);
  }

  await itemsController.editProduct(updatedProduct);
  await showSuccess('Producto actualizado exitosamente');
  closeModalAndRefresh();
}

async function handleCancel() {
  const result = await Swal.fire({
    title: '¿Estás seguro que deseas cancelar?',
    text: 'Los cambios no guardados se perderán',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí, cancelar',
    cancelButtonText: 'No, continuar editando'
  });

  if (result.isConfirmed) {
    closeModalAndRefresh();
    await Swal.fire('Cancelado', 'La operación ha sido cancelada', 'info');
  }
}

async function handleDelete(event) {
  const productId = event.target.getAttribute('data-id');
  
  const result = await Swal.fire({
    title: '¿Estás seguro?',
    text: 'Esta acción no se puede deshacer',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar'
  });

  if (result.isConfirmed) {
    try {
      await itemsController.deleteProduct(productId);
      await loadAndDisplayProducts();
      await showSuccess('Producto eliminado exitosamente');
    } catch (error) {
      showError('Error al eliminar el producto');
    }
  }
}

function handleEdit(event) {
  const productId = event.target.getAttribute('data-id');
  const product = itemsController.items.find(item => item.idProduct == productId);
  
  if (!product) {
    showError('Producto no encontrado');
    return;
  }

  fillFormWithProduct(product);
  isEditing = true;
  currentProductId = productId;
  
  const addButton = document.getElementById('add-button');
  addButton.textContent = 'Actualizar';
  
  const modal = new bootstrap.Modal(document.getElementById('biobugModal'));
  modal.show();
}

// Utility functions
function getFormData() {
  return {
    name: document.getElementById('recipient-name').value,
    scientificName: document.getElementById('cientific-name').value,
    description: document.getElementById('description').value,
    quantity: document.getElementById('quantity').value,
    price: document.getElementById('price').value,
    imageFile: document.getElementById('imagen-add').files[0]
  };
}

function validateForm(formData) {
  const { name, scientificName, description, quantity, price } = formData;
  return name && scientificName && description && quantity && price && 
         !isNaN(parseFloat(price)) && !isNaN(parseInt(quantity));
}

function fillFormWithProduct(product) {
  document.getElementById('recipient-name').value = product.nameProduct;
  document.getElementById('cientific-name').value = product.scientificName;
  document.getElementById('description').value = product.description;
  document.getElementById('quantity').value = product.unitsPackage;
  document.getElementById('price').value = product.price;
}

function resetForm() {
  document.getElementById('product-form').reset();
  isEditing = false;
  currentProductId = null;
  document.getElementById('add-button').textContent = 'Agregar';
}

function closeModalAndRefresh() {
  const modal = bootstrap.Modal.getInstance(document.getElementById('biobugModal'));
  modal.hide();
  resetForm();
  loadAndDisplayProducts();
}

async function convertToBase64(file) {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject(new Error('No file provided'));
      return;
    }
    
    const reader = new FileReader();
    reader.onload = e => resolve(e.target.result);
    reader.onerror = error => reject(error);
    reader.readAsDataURL(file);
  });
}

// Alert utility functions
function showSuccess(message) {
  return Swal.fire({
    title: '¡Éxito!',
    text: message,
    icon: 'success'
  });
}

function showError(message) {
  return Swal.fire({
    title: 'Error',
    text: message,
    icon: 'error'
  });
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
  loadAndDisplayProducts();
});