import './style.css'
import logoBatoi from './assets/logoBatoi.png'
import * as functions from './functions.js'
import data from './services/datos.js'

document.querySelector('#app').innerHTML = `
    <div>
        <img src="${logoBatoi}" alt="Logo Batoi">
        <h1>BatoiBooks</h1>
        <p>Abre la consola para ver el resultado</p>
    </div>
`
console.log(
  'Libros del usuario 4:',
  functions.booksFromUser(data.books, 4)
)

const librosDelModulo = functions.booksFromModule(data.books, '5021')

console.log(
  'Libros del módulo 5021 en buen estado:',
  functions.booksWithStatus(librosDelModulo, 'good')
)

console.log(
  'Libros con un incremento del 10%:',
  functions.incrementPriceOfBooks(data.books, 10)
)