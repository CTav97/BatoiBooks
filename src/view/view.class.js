export default class View {

    constructor() {
        this.booksList = document.getElementById('list')
        this.modulesSelect = document.getElementById('moduleCode')
        this.messages = document.getElementById('messages')
        this.bookForm = document.getElementById('bookForm')
        this.removeInput = document.getElementById('id-remove')
        this.removeButton = document.getElementById('remove-btn')
    }

    renderModules(modules) {
        modules.forEach(module => {
            const option = document.createElement('option')

            option.value = module.code
            option.textContent = module.cliteral

            this.modulesSelect.append(option)
        })
    }

    renderBook(book, module) {
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
                <p>${this.formatSoldDate(book.soldDate)}</p>
                <p>${book.comments}</p>
                <h4>${book.price} €</h4>
            </div>
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
        this.bookForm.addEventListener('submit', (event) => {
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

            callback(bookData)
        })
    }

    setRemoveHandler(callback) {
        this.removeButton.addEventListener('click', () => {
            callback(this.removeInput.value)
        })
    }
}