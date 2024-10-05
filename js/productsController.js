export default class ProductsController {
  constructor() {
    this.items = JSON.parse(localStorage.getItem("products")) || [];
    this.currentid =
      this.items.length > 0 ? this.items[this.items.length - 1].id + 1 : 1;
  }

  // addItem(name, scientificName, description, quantity, price, image) {
  //   const newItem = {
  //       id: this.currentid++, // Genera un nuevo ID
  //       name: name,
  //       scientificName: scientificName,
  //       description: description,
  //       quantity: quantity,
  //       price: price,
  //       image: image
  //   };
  addItem(name, description, price, img) {
    const newItem = {
      id: this.currentid++,
      name: name,
      description: description,
      price: price,
      img: img,
    };

    const exists = this.items.some((item) => item.name === name);

    if (!exists) {
      this.items.push(newItem);
      this.saveItemsToLocalStorage();
    }
  }

  saveItemsToLocalStorage() {
    localStorage.setItem("products", JSON.stringify(this.items));
  }

  loadItemsFromLocalStorage() {
    this.items = JSON.parse(localStorage.getItem("products")) || [];
  }
}
