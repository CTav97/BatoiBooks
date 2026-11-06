import './style.css'
import logoBatoi from './assets/logoBatoi.png'

import Books from './model/books.class.js'
import Modules from './model/modules.class.js'

document.querySelector('#app').innerHTML = `
  <header>
      <div>
        <img src="${logoBatoi}" alt="BatoiBooks">
        <h1>BatoiBooks</h1>
    </div>

    <nav>
      <ul>
        <li><a href="#list">Ver Libros</a></li>
        <li><a href="#form">Añadir Libro</a></li>
        <li><a href="#about">Acerca de...</a></li>
      </ul>
    </nav>
  </header>

    <div id="messages">
    
    </div>

    <main>
    <div id="list"></div>

    <div id="remove">
        <label for="id-remove">ID del libro:</label>
        <input type="number" id="id-remove">
        <button type="button" id="remove-btn">Eliminar</button>
    </div>

    <div id="form">
       <form id="bookForm">

        <div>
            <label for="moduleCode">Módulo</label>
            <select id="moduleCode" name="moduleCode" required></select>
        </div>

        <div>
            <label for="publisher">Editorial</label>
            <input type="text" id="publisher" name="publisher" required>
        </div>

        <div>
            <label for="price">Precio</label>
            <input type="number" id="price" name="price" required>
        </div>

        <div>
            <label for="pages">Páginas</label>
            <input type="number" id="pages" name="pages" required>
        </div>

        <div>
            <p>Estado</p>

            <label>
                <input type="radio" name="status" value="new" required>
                Nuevo
            </label>

            <label>
                <input type="radio" name="status" value="good" required>
                Bueno
            </label>

            <label>
                <input type="radio" name="status" value="used" required>
                Usado
            </label>

            <label>
                <input type="radio" name="status" value="bad" required>
                Malo
            </label>

            <label>
                <input type="radio" name="status" value="digital" required>
                Digital
            </label>
        </div>

        <div>
            <label for="photo">Foto</label>
            <input type="text" id="photo" name="photo" required>
        </div>

        <div>
            <label for="comments">Comentarios</label>
            <input type="text" id="comments" name="comments" required>
        </div>

        <button type="submit">Guardar</button>
        <button type="reset">Reset</button>

    </form>
</div>
    <div id="about">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis maximus laoreet nisi, id pretium mi eleifend quis.</p>
    </div>
</main>
  <footer>
    Clodoaldo
  </footer>
`

const books = new Books()
const modules = new Modules()

document.addEventListener('DOMContentLoaded', async () => {
    try {
        await modules.fetchAll()
        await books.fetchAll()

        renderModules()

        books.data.forEach(book => renderBook(book))

    } catch (error) {
        showMessage('error', error.message)
    }

    document.getElementById('bookForm').addEventListener('submit', async (event) => {
        event.preventDefault()

        const bookData = {
            userId: 1,
            moduleCode: document.getElementById('moduleCode').value,
            publisher: document.getElementById('publisher').value,
            price: Number(document.getElementById('price').value),
            pages: Number(document.getElementById('pages').value),
            status: document.querySelector('input[name="status"]:checked').value,
            photo: document.getElementById('photo').value,
            comments: document.getElementById('comments').value,
            soldDate: ''
        }

        try {
            const newBook = await books.addBook(bookData)

            renderBook(newBook)

            showMessage('info', 'Libro añadido')
        } catch (error) {
            showMessage('error', error.message)
        }


    })

    document.getElementById('remove-btn').addEventListener('click', async () => {
        const input = document.getElementById('id-remove')

        if (input.value === '') {
            showMessage('error', 'Debes indicar un libro')
            return
        }


        const bookId = Number(input.value)

        try {
            await books.removeBook(bookId)
            const card = document.querySelector(`.card[data-id="${bookId}"]`)
            card.remove()
            showMessage('info', 'Libro eliminado')
        } catch (error) {
            showMessage('error', error.message)
        }
    })
})

function renderBook(book) {
    const module = modules.data.find(m => m.code === book.moduleCode)

    const card = document.createElement('div')
    card.className = 'card'
    card.dataset.id = book.id

    card.innerHTML = `
    <img src="${book.photo}" alt="Libro: ${book.id}">
    <div>
        <h3>${module ? module.cliteral : book.moduleCode} (${book.id})</h3>
        <h4>${book.publisher}</h4>
        <p>${book.pages} páginas</p>
        <p>Estado: ${book.status}</p>
        <p>${formatSoldDate(book.soldDate)}</p>
        <p>${book.comments}</p>
        <h4>${book.price} €</h4>
    </div>
    `
    document.getElementById('list').append(card)
}

function renderModules() {
    const select = document.getElementById('moduleCode')

    modules.data.forEach(module => {
        const option = document.createElement('option')

        option.value = module.code
        option.textContent = module.cliteral

        select.append(option)
    })
}

function showMessage(type, text) {
    const messages = document.getElementById('messages')

    const message = document.createElement('div')
    message.className = `alert alert-${type === 'error' ? 'danger' : 'info'}`
    message.setAttribute('role', 'alert')

    message.append(text)

    const closeButton = document.createElement('button')
    closeButton.type = 'button'
    closeButton.className = 'btn-close'
    closeButton.setAttribute('aria-label', 'Cerrar')
    closeButton.textContent = 'x'

    closeButton.addEventListener('click', () => {
        message.remove()
    })

    message.append(closeButton)
    messages.append(message)

    if (type !== 'error') {
        setTimeout(() => {
            message.remove()
        }, 3000)
    }
}

function formatSoldDate(date) {
    if (!date) {
        return 'En venta'
    }

    const [year, month, day] = date.split('-')

    return `Vendido el ${day}/${month}/${year}`
}
