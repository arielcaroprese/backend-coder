const socketClient = io()
const products = []

const form = document.getElementById('form')
const titleInput = document.getElementById('title')
const descriptionInput = document.getElementById('description')
const thumbnailInput = document.getElementById('thumbnail')
const codeInput = document.getElementById('code')
const stockInput = document.getElementById('stock')
const statusInput = document.getElementById('status')

const productsContainer = document.getElementById('productsContainer')

form.onsubmit = (e)=> {
    e.preventDefault()
    newProduct = {
        title: titleInput.value,
        description: descriptionInput.value,
        thumbnail: thumbnailInput.value,
        code: codeInput.value,
        stock: stockInput.value,
        status: statusInput.value
    }
    socketClient.emit('productAdd', newProduct)
}

socketClient.on('productsUpdate', (productsArray) => {
    const productList = productsArray.map(product => {
        return `<div>
                    <h2>${product.title}</h2>
                    <p>${product.description}</p>
                    <ul>
                        <li>Precio: ${product.price}</li>
                        <li>Thumbnail: ${product.thumbnail}</li>
                        <li>Code: ${product.code}</li>
                        <li>Stock: ${product.stock}</li>
                        <li>Status: ${product.status}</li>
                        <li>ID:${product.id} </li>
                    </ul>
                </div>`
        }).join('')
        console.log(productList)
        productsContainer.innerHTML = productList
    });