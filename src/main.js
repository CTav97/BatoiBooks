import './style.css'
import logoBatoi from './assets/logoBatoi.png'

import Books from './model/books.class.js'

document.querySelector('#app').innerHTML = `
    <div>
        <img src="${logoBatoi}" alt="BatoiBooks">
        <h1>BatoiBooks</h1>
    </div>
`

const books = new Books()

try {
    await books.fetchAll()

    console.log('Libros cargados:')
    console.log(books.data)

    console.log('Libros del módulo 5021:')
    console.log(books.booksFromModule('5021'))

    console.log('Libros con estado new:')
    console.log(books.booksWithStatus('new'))

} catch (error) {
    console.error(error)
}