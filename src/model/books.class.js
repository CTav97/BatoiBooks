import Book from './book.class.js'

export default class Books {

    constructor() {
        this.data = []
        this.contador = 1
    }

    populate(booksData) {
        this.data = booksData.map(book => new Book(book))

        if (this.data.length > 0) {
            this.contador = Math.max(...this.data.map(book => book.id)) + 1
        }
    }

    addBook(bookData) {
        const newBook = new Book({
            ...bookData,
            id: this.contador
        })

        this.data.push(newBook)
        this.contador++

        return newBook
    }

    removeBook(bookId) {
        const index = this.data.findIndex(book => book.id === bookId)

        if (index === -1) {
            throw new Error('Libro no encontrado')
        }

        this.data.splice(index, 1)
    }

    changeBook(newData) {
        const index = this.data.findIndex(book => book.id === newData.id)

        if (index === -1) {
            throw new Error('Libro no encontrado')
        }

        const changedBook = new Book(newData)

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