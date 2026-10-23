import { describe, test, expect } from 'vitest'
import Books from '../src/model/books.class.js'
import Book from '../src/model/book.class.js'

const booksFixture = [
    {
        id: 1,
        userId: 2,
        moduleCode: '5021',
        publisher: 'Apunts',
        price: 15,
        pages: 80,
        status: 'good',
        soldDate: '2026-01-01'
    },
    {
        id: 2,
        userId: 4,
        moduleCode: '5022',
        publisher: 'McGraw-Hill',
        price: 30,
        pages: 120,
        status: 'new'
    }
]

describe('Clase Books', () => {

    test('constructor crea una colección vacía', () => {
        const books = new Books()

        expect(books.data).toEqual([])
    })

    test('getBookById devuelve el libro correcto', () => {
        const books = new Books()

        books.data = booksFixture.map(book => new Book(book))

        const book = books.getBookById(1)

        expect(book.id).toBe(1)
        expect(book.publisher).toBe('Apunts')
    })

    test('getBookById lanza error si no existe', () => {
        const books = new Books()

        books.data = booksFixture.map(book => new Book(book))

        expect(() => books.getBookById(999)).toThrow()
    })

    test('getBookIndexById devuelve la posición correcta', () => {
        const books = new Books()

        books.data = booksFixture.map(book => new Book(book))

        expect(books.getBookIndexById(2)).toBe(1)
    })

    test('getBookIndexById lanza error si no existe', () => {
        const books = new Books()

        books.data = booksFixture.map(book => new Book(book))

        expect(() => books.getBookIndexById(999)).toThrow()
    })

    test('booksFromUser devuelve los libros de un usuario', () => {
        const books = new Books()

        books.data = booksFixture.map(book => new Book(book))

        const resultado = books.booksFromUser(2)

        expect(resultado.length).toBe(1)
        expect(resultado[0].userId).toBe(2)
    })

    test('booksFromModule devuelve los libros de un módulo', () => {
        const books = new Books()

        books.data = booksFixture.map(book => new Book(book))

        const resultado = books.booksFromModule('5021')

        expect(resultado.length).toBe(1)
        expect(resultado[0].moduleCode).toBe('5021')
    })

    test('booksCheeperThan devuelve libros más baratos que el precio indicado', () => {
        const books = new Books()

        books.data = booksFixture.map(book => new Book(book))

        const resultado = books.booksCheeperThan(20)

        expect(resultado.length).toBe(1)
        expect(resultado[0].price).toBe(15)
    })

    test('booksWithStatus devuelve libros con el estado indicado', () => {
        const books = new Books()

        books.data = booksFixture.map(book => new Book(book))

        const resultado = books.booksWithStatus('new')

        expect(resultado.length).toBe(1)
        expect(resultado[0].status).toBe('new')
    })

    test('averagePriceOfBooks calcula correctamente la media', () => {
        const books = new Books()

        books.data = booksFixture.map(book => new Book(book))

        expect(books.averagePriceOfBooks()).toBe('22.50 €')
    })

    test('averagePriceOfBooks devuelve 0.00 € si no hay libros', () => {
        const books = new Books()

        expect(books.averagePriceOfBooks()).toBe('0.00 €')
    })

    test('booksOfTypeNotes devuelve los libros de tipo Apunts', () => {
        const books = new Books()

        books.data = booksFixture.map(book => new Book(book))

        const resultado = books.booksOfTypeNotes()

        expect(resultado.length).toBe(1)
        expect(resultado[0].publisher).toBe('Apunts')
    })

    test('bookExists devuelve true si existe el libro', () => {
        const books = new Books()

        books.data = booksFixture.map(book => new Book(book))

        expect(books.bookExists(2, '5021')).toBe(true)
    })

    test('bookExists devuelve false si no existe el libro', () => {
        const books = new Books()

        books.data = booksFixture.map(book => new Book(book))

        expect(books.bookExists(99, '9999')).toBe(false)
    })

    test('booksNotSold devuelve los libros no vendidos', () => {
        const books = new Books()

        books.data = booksFixture.map(book => new Book(book))

        const resultado = books.booksNotSold()

        expect(resultado.length).toBe(1)
        expect(resultado[0].id).toBe(2)
    })

    test('toString muestra todos los libros', () => {
        const books = new Books()

        books.data = booksFixture.map(book => new Book(book))

        const texto = books.toString()

        expect(texto).toContain('Apunts')
        expect(texto).toContain('McGraw-Hill')
    })
})