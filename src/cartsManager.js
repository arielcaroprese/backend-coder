
import fs from 'fs'

class CartManager {
    constructor(path){
        this.path = path
    }

    async getCarts() {
      try {
          if (fs.existsSync(this.path)) {
              const cartsFile = await fs.promises.readFile(this.path, 'utf-8')
              const carts = JSON.parse(cartsFile)
              return carts
          } else {
              return []
          }
      } catch(error) {
          return error
      }
  }

  async getCartById(idCart) {
    try {
      const carts = await this.getCarts()
      const cart = carts.find((cart) => cart.id === idCart);
      if (!cart) {
        return "El carrito buscado no existe";
      } else {
        return cart;
      }
    } catch (error) {
      return error
    }
    }

  async createCart() {
    try {
      const carts = await this.getCarts()
      let id
      if(!carts.length){
        id = 1
      } else {
        id = carts[carts.length - 1].id + 1
      }
      const newCart = {id, products: []}
      carts.push(newCart)
      await fs.promises.writeFile(this.path, JSON.stringify(carts))
      return newCart
    } catch (error) {
      console.log(error)
      return error
    }
  }

  async addToCart(idCart, idProduct) {
    try {
      const carts = await this.getCarts()
      const cart = carts.find((cart) => cart.id === idCart);
      const productIndex = cart.products.findIndex((prod) => prod.product === idProduct);
      console.log(productIndex)
      if (productIndex===-1) {
        cart.products.push({product:idProduct, quantity:1})
      } else {
        console.log(productIndex)
        cart.products[productIndex].quantity++
      }
      await fs.promises.writeFile(this.path, JSON.stringify(carts))
      return cart
    } catch (error) {
      return error
    }
    }

  async getCartItems(idCart) {
    try {
      const cart = await this.getCartById(idCart)
      if (!cart) {
        return "El carrito buscado no existe";
      } else {
        return cart.products;
      }
    } catch (error) {
      return error
    }
    }

}
  

// Prueba

const productoNuevo = {
  title: 'producto prueba',
  description: 'Este es un producto prueba',
  price: 200,
  thumbnail: 'Sin imagen',
  code: 'abc123',
  stock: 25
}



/* async function prueba() {

  const productManager = new ProductManager('Products.json')

  console.log(await productManager.getProducts())

  await productManager.addProduct(productoNuevo)

  console.log(await productManager.getProducts())

  console.log(await productManager.getProductsById(1))

  await productManager.updateProduct(1,{title: 'Producto actualizado'})

  console.log(await productManager.getProductsById(1))



  console.log(await productManager.getProductsById(1))
}

prueba() */

const cartsManager = new CartManager('Carts.json')

export default cartsManager