export default class View {

    constructor() {
        this.booksList = document.getElementById('list')
        this.modulesSelect = document.getElementById('moduleCode')
        this.messages = document.getElementById('messages')
        this.bookForm = document.getElementById('bookForm')
    }

    renderModules(modules) {
        modules.forEach(module => {
            const option = document.createElement('option')

            option.value = module.code
            option.textContent = module.cliteral

            this.modulesSelect.append(option)
        })
    }

    renderBook(book, module, isOwner) {
        let card = this.booksList.querySelector(
            `.card[data-id="${book.id}"]`
        )

        if (!card) {
            card = document.createElement('div')
            card.className = 'card'
            card.dataset.id = book.id
            this.booksList.append(card)
        }

        let buttons

        if (isOwner) {
            buttons = `
        <button type="button" aria-label="Editar" data-action="edit">
            <span class="material-icons">edit</span>
        </button>

        <button type="button" aria-label="Borrar" data-action="delete">
            <span class="material-icons">delete</span>
        </button>
        `
        } else {
            buttons = `
        <button type="button" aria-label="Añadir al carrito" data-action="cart">
            <span class="material-icons">add_shopping_cart</span>
        </button>
        `
        }

        card.innerHTML = `
            <img src="${book.photo}" alt="Libro: ${book.id}">
            <div>
                <h3>${module ? module.cliteral : book.moduleCode} (${book.id})</h3>
                <h4>${book.publisher}</h4>
                <p>${book.pages} páginas</p>
                <p>Estado: ${book.status}</p>
                <p>${this.formatSoldDate(book.soldDate)}</p>
                <p>${book.comments}</p>
                <h4>${book.price} €</h4>
            </div>

            ${buttons}
        `

        this.booksList.append(card)
    }

    formatSoldDate(date) {
        if (!date) {
            return 'En venta'
        }

        const [year, month, day] = date.split('-')

        return `Vendido el ${day}/${month}/${year}`
    }

    showMessage(type, text) {
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
        this.messages.append(message)

        if (type !== 'error') {
            setTimeout(() => {
                message.remove()
            }, 3000)
        }
    }

    removeBookCard(bookId) {
        const card = document.querySelector(`.card[data-id="${bookId}"]`)
        card.remove()
    }

    setSubmitHandler(callback) {
        this.bookForm.addEventListener('submit', event => {
            event.preventDefault()

            const bookData = {
                moduleCode: document.getElementById('moduleCode').value,
                publisher: document.getElementById('publisher').value,
                price: Number(document.getElementById('price').value),
                pages: Number(document.getElementById('pages').value),
                status: document.querySelector('input[name="status"]:checked').value,
                photo: document.getElementById('photo').value,
                comments: document.getElementById('comments').value
            }

            const id = this.bookForm.elements.namedItem('id').value

            if (id) {
                bookData.id = Number(id)
            }

            callback(bookData)
        })
    }

    getCurrentHash() {
        return location.hash
    }

    setRouteHandler(callback) {
        window.addEventListener('hashchange', () => {
            callback(location.hash)
        })
    }

    showPage(pageId) {
        const pages = ['list', 'form', 'about', 'not-found']

        pages.forEach(id => {
            document.getElementById(id).classList.add('hidden')
        })

        document.getElementById(pageId).classList.remove('hidden')
    }

    showAddForm() {
        this.bookForm.reset()

        const idInput = this.bookForm.elements.namedItem('id')
        idInput.value = ''
        idInput.parentElement.classList.add('hidden')

        document.querySelector('#form h2').textContent = 'Añadir libro'
    }

    showEditForm(book) {
        document.querySelector('#form h2').textContent = 'Editar libro'

        const idInput = this.bookForm.elements.namedItem('id')
        idInput.parentElement.classList.remove('hidden')
        idInput.value = book.id

        this.bookForm.elements.namedItem('moduleCode').value = book.moduleCode
        this.bookForm.elements.namedItem('publisher').value = book.publisher
        this.bookForm.elements.namedItem('price').value = book.price
        this.bookForm.elements.namedItem('pages').value = book.pages
        this.bookForm.elements.namedItem('photo').value = book.photo
        this.bookForm.elements.namedItem('comments').value = book.comments

        const status = document.querySelector(
            `input[name="status"][value="${book.status}"]`
        )

        status.checked = true
    }

    navigate(hash) {
        location.hash = hash
    }

    //Listener para las cards
    setBookActionHandler(callback) {
        this.booksList.addEventListener('click', (event) => {
            const button = event.target.closest('button[data-action]')

            if (!button) {
                return
            }

            const card = button.closest('.card')
            const bookId = Number(card.dataset.id)

            callback(button.dataset.action, bookId)
        })
    }

    setResetHandler(callback) {
        this.bookForm.addEventListener('reset', () => {
            callback()
        })
    }

    confirmDelete(id, moduleName) {
        return confirm(
            `¿Quieres borrar el libro ${id} del módulo ${moduleName}?`
        )
    }

    deleteBookCard(id) {
        const card = this.booksList.querySelector(
            `.card[data-id="${id}"]`
        )

        if (card) {
            card.remove()
        }
    }

    updateCartCount(count) {
        document.getElementById('cart-count').textContent = count
    }
}