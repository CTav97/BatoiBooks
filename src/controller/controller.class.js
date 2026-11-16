import Books from '../model/books.class.js'
import Modules from '../model/modules.class.js'
import View from '../view/view.class.js'
import Cart from '../model/cart.class.js'

const USER_ID = 2

export default class Controller {

    constructor() {
        this.books = new Books()
        this.modules = new Modules()
        this.view = new View()
        this.cart = new Cart()
    }

    async init() {
        this.view.setSubmitHandler(
            this.handleSubmitBook.bind(this)
        )

        this.view.setRouteHandler(
            this.handleRoute.bind(this)
        )

        this.view.setBookActionHandler(
            this.handleBookAction.bind(this)
        )

        this.view.setResetHandler(
            this.handleReset.bind(this)
        )

        try {
            await this.modules.fetchAll()
            await this.books.fetchAll()

            this.view.renderModules(this.modules.data)

            this.books.data.forEach(book => {
                this.renderBook(book)

                this.handleRoute(this.view.getCurrentHash())
            })

        } catch (error) {
            this.view.showMessage('error', error.message)
        }
    }

    renderBook(book) {
        const module = this.modules.data.find(
            module => module.code === book.moduleCode
        )

        const isOwner = book.userId === USER_ID

        this.view.renderBook(book, module, isOwner)
    }

    async handleSubmitBook(bookData) {
        try {

            if (bookData.id) {
                const oldBook = this.books.data.find(
                    book => book.id === bookData.id
                )

                const changedBook = await this.books.changeBook({
                    ...bookData,
                    userId: oldBook.userId,
                    soldDate: oldBook.soldDate
                })

                this.renderBook(changedBook)

                this.view.showMessage('info', 'Libro modificado')

            } else {

                const newBook = await this.books.addBook({
                    ...bookData,
                    userId: USER_ID,
                    soldDate: ''
                })

                this.renderBook(newBook)

                this.view.showMessage('info', 'Libro añadido')
            }

            this.view.navigate('#list')

        } catch (error) {
            this.view.showMessage('error', error.message)
        }
    }

    handleRoute(hash) {

        if (hash.startsWith('#edit/')) {
            const id = Number(hash.split('/')[1])

            const book = this.books.data.find(book => book.id === id)

            if (!book) {
                this.view.showPage('not-found')
                return
            }

            if (book.userId !== USER_ID) {
                this.view.showMessage('error', 'No puedes editar este libro')
                this.view.navigate('#list')
                return
            }

            this.view.showEditForm(book)
            this.view.showPage('form')
            return
        }

        switch (hash) {
            case '':
            case '#list':
                this.view.showPage('list')
                break

            case '#form':
                this.view.showAddForm()
                this.view.showPage('form')
                break

            case '#about':
                this.view.showPage('about')
                break

            default:
                this.view.showPage('not-found')
        }
    }

    handleBookAction(action, bookId) {
        if (action === 'edit') {
            this.view.navigate(`#edit/${bookId}`)
        }

        if (action === 'delete') {
            this.handleDeleteBook(bookId)
        }

        if (action === 'cart') {
            this.handleAddToCart(bookId)
        }
    }

    handleReset() {
        this.view.navigate('#form')
    }

    async handleDeleteBook(bookId) {
        const book = this.books.data.find(
            book => book.id === bookId
        )

        const module = this.modules.data.find(
            module => module.code === book.moduleCode
        )

        const confirmed = this.view.confirmDelete(
            book.id,
            module.cliteral
        )

        if (!confirmed) {
            return
        }

        try {
            await this.books.removeBook(bookId)

            this.view.deleteBookCard(bookId)

            this.view.showMessage('info', 'Libro borrado')

        } catch (error) {
            this.view.showMessage('error', error.message)
        }
    }

    handleAddToCart(bookId) {
    const book = this.books.data.find(
        book => book.id === bookId
    )

    try {
        this.cart.addBook(book)

        this.view.updateCartCount(this.cart.data.length)

        this.view.showMessage('info', 'Libro añadido al carrito')

        console.log(this.cart.data)

    } catch (error) {
        this.view.showMessage('error', error.message)
    }
}

}