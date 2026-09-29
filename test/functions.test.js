import { describe, it, expect } from 'vitest'
import * as functions from '../src/functions'
import data from '../src/services/datos'

const books = data.books
const users = data.users
const modules = data.modules

describe('function getBookById', () => {
  it('getBookById 1 devuelve el libro con id 1', () => {
    const response = functions.getBookById(books, 1)
    expect(response.id).toBe(1)
  });

  it('getBookById 22 devuelve un error', () => {
    expect(() => functions.getBookById(books, 22)).toThrow()
  });
})

describe('function getBookIndexById', () => {
  it('el libro con id 1 está en la posición 0', () => {
    expect(functions.getBookIndexById(books, 1)).toBe(0)
  })

  it('el libro con id 6 está en la posición 1', () => {
    expect(functions.getBookIndexById(books, 6)).toBe(1)
  })

  it('devuelve -1 si el libro no existe', () => {
    expect(functions.getBookIndexById(books, 22)).toBe(-1)
  })
})

describe('function getUserById', () => {
  it('devuelve el usuario con id 2', () => {
    expect(functions.getUserById(users, 2)).toEqual(users[0])
  })

  it('lanza un error si el usuario no existe', () => {
    expect(() => functions.getUserById(users, 99)).toThrow()
  })
})

describe('function getUserIndexById', () => {
  it('el usuario con id 3 está en la posición 1', () => {
    expect(functions.getUserIndexById(users, 3)).toBe(1)
  })

  it('devuelve -1 si el usuario no existe', () => {
    expect(functions.getUserIndexById(users, 99)).toBe(-1)
  })
})

describe('function getUserByNickName', () => {
  it('devuelve el usuario con nick Ignasi', () => {
    expect(functions.getUserByNickName(users, 'Ignasi')).toEqual(users[0])
  })

  it('lanza un error si el nick no existe', () => {
    expect(() => functions.getUserByNickName(users, 'NoExiste')).toThrow()
  })
})

describe('function getModuleByCode', () => {
  it('devuelve el módulo con código 5021', () => {
    const resultado = functions.getModuleByCode(modules, '5021')
    expect(resultado.code).toBe('5021')
  })

  it('lanza un error si el módulo no existe', () => {
    expect(() => functions.getModuleByCode(modules, 'XXXX')).toThrow()
  })
})

describe('function booksFromUser', () => {
  it('devuelve los libros del usuario 4', () => {
    const resultado = functions.booksFromUser(books, 4)
    expect(resultado.map(libro => libro.id)).toEqual([7, 8, 9])
  })

  it('devuelve un array vacío si el usuario no tiene libros', () => {
    expect(functions.booksFromUser(books, 99)).toEqual([])
  })
})

describe('function booksFromModule', () => {
  it('devuelve los libros del módulo 5021', () => {
    const resultado = functions.booksFromModule(books, '5021')
    expect(resultado.map(libro => libro.id)).toEqual([6, 7, 10])
  })

  it('devuelve un array vacío si no hay libros del módulo', () => {
    expect(functions.booksFromModule(books, 'XXXX')).toEqual([])
  })
})

describe('function booksCheeperThan', () => {
  it('incluye los libros que cuestan 15 o menos', () => {
    const resultado = functions.booksCheeperThan(books, 15)
    expect(resultado.map(libro => libro.id)).toEqual([1, 7, 8, 10])
  })

  it('devuelve un array vacío si ninguno cumple el precio', () => {
    expect(functions.booksCheeperThan(books, 0)).toEqual([])
  })
})

describe('function booksWithStatus', () => {
  it('devuelve los libros en buen estado', () => {
    const resultado = functions.booksWithStatus(books, 'good')
    expect(resultado.map(libro => libro.id)).toEqual([1, 8, 9, 10])
  })

  it('devuelve un array vacío si no hay libros en ese estado', () => {
    expect(functions.booksWithStatus(books, 'digital')).toEqual([])
  })
})

describe('function averagePriceOfBooks', () => {
  it('devuelve la media con dos decimales y €', () => {
    expect(functions.averagePriceOfBooks(books)).toBe('26.17 €')
  })

  it('devuelve 0.00 € si el array está vacío', () => {
    expect(functions.averagePriceOfBooks([])).toBe('0.00 €')
  })
})

describe('function booksOfTypeNotes', () => {
  it('devuelve solo los apuntes', () => {
    const resultado = functions.booksOfTypeNotes(books)
    expect(resultado.map(libro => libro.id)).toEqual([1, 9, 10])
  })

  it('devuelve un array vacío si no hay apuntes', () => {
    expect(functions.booksOfTypeNotes([
      { publisher: 'McGraw-Hill' }
    ])).toEqual([])
  })
})

describe('function bookExists', () => {
  it('devuelve true si el usuario tiene un libro del módulo', () => {
    expect(functions.bookExists(books, 4, '5025')).toBe(true)
  })

  it('devuelve false si el usuario no tiene libros del módulo', () => {
    expect(functions.bookExists(books, 2, '5021')).toBe(false)
  })
})

describe('function booksNotSold', () => {
  it('devuelve los libros cuya fecha de venta está vacía', () => {
    const resultado = functions.booksNotSold(books)
    expect(resultado.map(libro => libro.id)).toEqual([6, 7, 8, 9, 10])
  })

  it('devuelve un array vacío si todos están vendidos', () => {
    expect(functions.booksNotSold([
      { soldDate: '2023-02-01' }
    ])).toEqual([])
  })
})

describe('function incrementPriceOfBooks', () => {
  it('incrementa los precios el porcentaje indicado', () => {
    const originales = [
      { id: 1, price: 20 },
      { id: 2, price: 50 }
    ]

    const resultado = functions.incrementPriceOfBooks(originales, 10)

    expect(resultado).toEqual([
      { id: 1, price: 22 },
      { id: 2, price: 55 }
    ])
  })

  it('crea un array y objetos nuevos sin modificar los originales', () => {
    const originales = [{ id: 1, price: 20 }]
    const resultado = functions.incrementPriceOfBooks(originales, 25)

    expect(resultado[0].price).toBe(25)
    expect(originales).toEqual([{ id: 1, price: 20 }])
    expect(resultado).not.toBe(originales)
    expect(resultado[0]).not.toBe(originales[0])
  })

  it('devuelve un array vacío si recibe uno vacío', () => {
    expect(functions.incrementPriceOfBooks([], 10)).toEqual([])
  })
})