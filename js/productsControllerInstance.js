// productsControllerInstance.js
import productsController from './productsController.js';

// Crear una instancia única y agregar los ítems
const itemsController = new productsController();
itemsController.addItems();

export default itemsController;
