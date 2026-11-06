import Books from '../model/books.class.js'
import Modules from '../model/modules.class.js'
import View from '../view/view.class.js'

const USER_ID = 1

export default class Controller {

    constructor() {
        this.books = new Books()
        this.modules = new Modules()
        this.view = new View()
    }

    async init() {
        this.view.setSubmitHandler(
            this.handleAddBook.bind(this)
        )

        this.view.setRemoveHandler(
            this.handleRemoveBook.bind(this)
        )

        try {
            await this.modules.fetchAll()
            await this.books.fetchAll()

            this.view.renderModules(this.modules.data)

            this.books.data.forEach(book => {
                this.renderBook(book)
            })

        } catch (error) {
            this.view.showMessage('error', error.message)
        }
    }

    renderBook(book) {
        const module = this.modules.data.find(
            module => module.code === book.moduleCode
        )

        this.view.renderBook(book, module)
    }

    async handleAddBook(bookData) {
        try {
            const newBook = await this.books.addBook({
                ...bookData,
                userId: USER_ID,
                soldDate: ''
            })

            this.renderBook(newBook)

            this.view.showMessage('info', 'Libro añadido')

        } catch (error) {
            this.view.showMessage('error', error.message)
        }
    }

    async handleRemoveBook(bookId) {
        if (bookId === '') {
            this.view.showMessage('error', 'Debes indicar un libro')
            return
        }

        const id = Number(bookId)

        try {
            await this.books.removeBook(id)

            this.view.removeBookCard(id)

            this.view.showMessage('info', 'Libro eliminado')

        } catch (error) {
            this.view.showMessage('error', error.message)
        }
    }
}