import { describe, test, expect } from 'vitest';
import Book from '../src/model/book.class.js';

const bookFixture = [
    {
        id: 31, userId: 2, moduleCode: '2150', publisher: 'Apunts',
        pages: 76, status: 'bad', soldDate: '2023-03-25',
        photo: 'book311img1.png', comments: 'Muy buen estado'
    },
    {
        id: 35, userId: 2, moduleCode: '7021', publisher: 'McGraw-Hill',
        price: 34, pages: 116, status: 'good'
    }
]

describe('Clase Book', () => {
    test('constructor crea un libro vendido', () =>{
        const newBook = new Book(bookFixture[0])
        expect(newBook).toBeInstanceOf(Book)
        expect(newBook).toEqual(bookFixture[0])
    })

    test('constructor crea un libro no vendido', () => {
        const newBook = new Book(bookFixture[1])
        expect(newBook).toEqual({...bookFixture[1], soldDate: '', photo:'', 
            comments: ''
        })
    })
    test('toString pinta correctamente el libro', () => {
        const newBook = new Book(bookFixture[0])
        const texto = newBook.toString()
        expect(texto).toContain(bookFixture[0].id);
        expect(texto).toContain(bookFixture[0].publisher)
        expect(texto).toContain(bookFixture[0].status)
    })
})