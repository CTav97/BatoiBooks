import Book from './book.class.js'
import { deleteBook, getBooks, postBook, putBook } from '../services/api.js'

export default class Books {

    constructor() {
        this.data = []
    }

    async fetchAll() {
        const booksData = await getBooks()

        this.data = booksData.map(book => new Book(book))



        return this.data


    }
    async addBook(bookData) {
        const savedBook = await postBook(bookData)

        const newBook = new Book(savedBook)

        this.data.push(newBook)

        return newBook
    }

    async removeBook(bookId) {
        await deleteBook(bookId)

        const index = this.getBookIndexById(bookId)

        this.data.splice(index, 1)
    }

    async changeBook(newData) {
        const savedBook = await putBook(newData)

        const index = this.getBookIndexById(newData.id)

        const changedBook = new Book(savedBook)

        this.data[index] = changedBook

        return changedBook
    }

    getBookById(id) {
        const libro = this.data.find(libro => libro.id === id);

        if (libro === undefined) {
            throw new Error(`No existe el libro con id ${id}`);
        }

        return libro;
    }

    getBookIndexById(id) {
        const index = this.data.findIndex(libro => libro.id === id)
        if (index === -1) {
            throw new Error(`No existe el libro con id ${id}`)
        }
        return index
    }

    averagePriceOfBooks() {
        if (this.data.length === 0) {
            return '0.00 €';
        }

        const total = this.data.reduce((suma, libro) => suma + libro.price, 0);
        const media = total / this.data.length;
        return `${media.toFixed(2)} €`;
    }

    booksOfTypeNotes() {
        return this.data.filter(libro => libro.publisher === 'Apunts');
    }

    bookExists(idUsuario, codigoModulo) {
        return this.data.some(libro =>
            libro.userId === idUsuario && libro.moduleCode === codigoModulo
        );
    }

    booksNotSold() {
        return this.data.filter(libro => libro.soldDate === '');
    }

    incrementPriceOfBooks(porcentaje) {
        return this.data.map(libro => new Book({
            ...libro,
            price: libro.price + libro.price * porcentaje
        }));
    }

    booksFromUser(userId) {
        return this.data.filter(libro => libro.userId === userId)
    }

    booksFromModule(moduleCode) {
        return this.data.filter(libro => libro.moduleCode === moduleCode)
    }

    booksCheeperThan(price) {
        return this.data.filter(libro => libro.price <= price)
    }

    booksWithStatus(status) {
        return this.data.filter(libro => libro.status === status)
    }

    toString() {
        return this.data
            .map(book => book.toString())
            .join('\n')
    }
}