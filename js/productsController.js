

class ProductsController {
  constructor() {
    this.items = [];
    this.baseUrl = 'http://localhost:8080/product';
  }

  async getProducts() {
    try {
      const response = await fetch(this.baseUrl);
      if (!response.ok) throw new Error('Error al obtener los productos');
      this.items = await response.json();
      return this.items;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  async addItem(name, scientificName, description, quantity, price, imageBase64) {
    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nameProduct: name,
          scientificName: scientificName,
          description: description,
          unitsPackage: parseInt(quantity),
          price: parseFloat(price),
          img: imageBase64,
        }),
      });

      if (!response.ok) throw new Error('Error al agregar el producto');
      const newProduct = await response.json();
      this.items.push(newProduct);
      return newProduct;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  async editProduct(product) {
    try {
      const response = await fetch(this.baseUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      });

      if (!response.ok) throw new Error('Error al editar el producto');
      const updatedProduct = await response.json();
      const index = this.items.findIndex(item => item.idProduct === updatedProduct.idProduct);
      if (index !== -1) {
        this.items[index] = updatedProduct;
      }
      return updatedProduct;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  async deleteProduct(productId) {
    try {
      const response = await fetch(`${this.baseUrl}/${productId}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Error al eliminar el producto');
      this.items = this.items.filter(item => item.idProduct !== productId);
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
}

export default ProductsController;
