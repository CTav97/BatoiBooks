import './style.css'
import logoBatoi from './assets/logoBatoi.png'

import data from './services/datos.js'

import Books from './model/books.class.js'
import Users from './model/users.class.js'
import Modules from './model/modules.class.js'


document.querySelector('#app').innerHTML = `
    <div>
        <img src="${logoBatoi}" alt="BatoiBooks">
        <h1>BatoiBooks</h1>
    </div>
`


// Creamos las colecciones
const books = new Books()
const users = new Users()
const modules = new Modules()


// Cargamos los datos
books.populate(data.books)
users.populate(data.users)
modules.populate(data.modules)


// Libros del módulo 5021
console.log('Libros del módulo 5021:')
console.log(books.booksFromModule('5021'))


// Libros con estado new
console.log('Libros con estado new:')
console.log(books.booksWithStatus('new'))


// Incrementamos los precios un 10%
console.log('Libros con precio aumentado un 10%:')
console.log(books.incrementPriceOfBooks(0.1))