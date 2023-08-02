
import fs from 'fs'

class ProductManager {
    constructor(path){
        this.path = path
    }

    async getProducts(limit) {
        try {
            if (fs.existsSync(this.path)) {
                const productsFile = await fs.promises.readFile(this.path, 'utf-8')
                const products = JSON.parse(productsFile)
                return products.slice(0,limit)
            } else {
                return []
            }
        } catch(error) {
            return error
        }
    }
 
    async addProduct(productData) {
        try {
          const productosActuales = await this.getProducts()
          let id
          if(!productosActuales.length){
            id = 1
          } else {
            id = productosActuales[productosActuales.length - 1].id + 1
          }
          const newProduct = {...productData, id}
          productosActuales.push(newProduct)
          await fs.promises.writeFile(this.path, JSON.stringify(productosActuales))
          return newProduct
        } catch (error) {
          console.log(error)
          return error
        }
    }
 
    async getProductsById(id) {
    try {
      const productosActuales = await this.getProducts()
      const idExists = productosActuales.find((prod) => prod.id === id);
      if (!idExists) {
        return "El producto buscado no existe";
      } else {
        return idExists;
      }
    } catch (error) {
      return error
    }
    }

    async updateProduct(id, dataUpdate) {
      try {
        const productosActuales = await this.getProducts()
        const productosIndex = productosActuales.findIndex((u) => u.id === id)
        if (productosIndex === -1) {
          return 'No hay un producto con ese id'
        }
        const productoActual = productosActuales[productosIndex]
        const updatedProduct = { ...productoActual, ...dataUpdate }
        productosActuales[productosIndex] = updatedProduct
        await fs.promises.writeFile(this.path, JSON.stringify(productosActuales))
        return updatedProduct
      } catch (error) {
        return error
      }
    }

    async deleteProduct(id) {
      try {
        const productosActual = await this.getProducts()
        const productosNuevo = productosActual.filter((p) => p.id !== id)
        await fs.promises.writeFile(this.path, JSON.stringify(productosNuevo)
        )
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

const productsManager = new ProductManager('Products.json')

export default productsManager