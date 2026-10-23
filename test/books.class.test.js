// test/books.class.test.js
//
// Esto es lo que se te entrega como ÚNICO EJEMPLO. El resto de tests los
// escribes tú, siguiendo este mismo patrón.
//
// El arranque/parada del servidor simulado (beforeAll/afterEach/afterAll) ya
// viene hecho, no lo toques.
//
// Fíjate en el test de éxito: crea una instancia de Books y llama a su
// método addBook. No sabe ni le importa cómo hayas repartido el código
// entre la clase y api.js — solo comprueba el resultado.

import { describe, it, expect, beforeAll, afterEach, afterAll } from 'vitest'
import { http, HttpResponse } from 'msw'
import { server } from '../src/mocks/server'
import Books from '../src/model/books.class'

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('Books — persistencia', () => {
  it('addBook crea un libro en el servidor y lo añade a this.data', async () => {
    const books = new Books()

    const nuevo = {
      userId: 2,
      moduleCode: 'ABCD',
      publisher: 'Apunts',
      price: 12,
      pages: 40,
      status: 'good'
    }

    const response = await books.addBook(nuevo)

    expect(response.id).toBeDefined()

    expect(response.userId).toBe(nuevo.userId)
    expect(response.moduleCode).toBe(nuevo.moduleCode)
    expect(response.publisher).toBe(nuevo.publisher)
    expect(response.price).toBe(nuevo.price)
    expect(response.pages).toBe(nuevo.pages)
    expect(response.status).toBe(nuevo.status)

    expect(books.data).toHaveLength(1)

    // Es exactamente la misma instancia que hemos devuelto
    expect(books.data[0]).toBe(response)
  })

  it('removeBook elimina un libro del servidor y de this.data', async () => {
    const books = new Books()

    books.data = [
      {
        id: 1,
        userId: 2,
        moduleCode: 'ABCD',
        publisher: 'Apunts',
        price: 12,
        pages: 40,
        status: 'good'
      }
    ]

    server.use(
      http.delete('http://localhost:3000/books/1', () => {
        return new HttpResponse(null, { status: 200 })
      })
    )

    await books.removeBook(1)

    expect(books.data).toHaveLength(0)
  })

  // Para simular un error en un test concreto (servidor caído, validación
  // rechazada por el backend...), sobrescribe el handler SOLO para ese test
  // con server.use(). Cada handler de src/mocks/handlers.js intercepta una
  // URL y un método concretos; server.use() añade uno nuevo que sustituye
  // temporalmente al que ya había, solo para este test — se restaura
  // automáticamente después gracias al afterEach de arriba.
  //
  // Ejemplo de la forma (no es un test completo, te falta decidir
  // qué debe hacer tu método ante este caso y comprobarlo):
  //
  // it('addBook ante un error del servidor...', async () => {
  //   const books = new Books()
  //   server.use(
  //     http.post('http://localhost:3000/books', () => {
  //       return new HttpResponse(null, { status: 500 })
  //     })
  //   )
  //   // ¿qué esperas que haga tu método aquí?
  // })

  it('fetchAll carga los libros del servidor en this.data', async () => {
    const books = new Books()

    const response = await books.fetchAll()

    expect(response).toBe(books.data)
    expect(books.data.length).toBeGreaterThan(0)
  })

  it('changeBook modifica un libro en el servidor y en this.data', async () => {
    const books = new Books()

    books.data = [
      {
        id: 1,
        userId: 2,
        moduleCode: 'ABCD',
        publisher: 'Apunts',
        price: 12,
        pages: 40,
        status: 'good'
      }
    ]

    const cambiado = {
      id: 1,
      userId: 2,
      moduleCode: 'ABCD',
      publisher: 'Anaya',
      price: 20,
      pages: 40,
      status: 'good'
    }

    server.use(
      http.put('http://localhost:3000/books/1', async ({ request }) => {
        const body = await request.json()

        return HttpResponse.json(body)
      })
    )

    const response = await books.changeBook(cambiado)

    expect(response.publisher).toBe('Anaya')
    expect(response.price).toBe(20)

    expect(books.data).toHaveLength(1)
    expect(books.data[0]).toBe(response)
  })

  it('addBook no modifica this.data si el servidor devuelve 500', async () => {
    const books = new Books()

    const nuevo = {
      userId: 2,
      moduleCode: 'ABCD',
      publisher: 'Apunts',
      price: 12,
      pages: 40,
      status: 'good'
    }

    server.use(
      http.post('http://localhost:3000/books', () => {
        return new HttpResponse(null, { status: 500 })
      })
    )

    await expect(books.addBook(nuevo)).rejects.toThrow()

    expect(books.data).toHaveLength(0)
  })

  it('addBook no modifica this.data si el servidor devuelve 404', async () => {
    const books = new Books()

    const nuevo = {
      userId: 2,
      moduleCode: 'ABCD',
      publisher: 'Apunts',
      price: 12,
      pages: 40,
      status: 'good'
    }

    server.use(
      http.post('http://localhost:3000/books', () => {
        return new HttpResponse(null, { status: 404 })
      })
    )

    await expect(books.addBook(nuevo)).rejects.toThrow()

    expect(books.data).toHaveLength(0)
  })

  it('addBook no modifica this.data si hay un fallo de red', async () => {
    const books = new Books()

    const nuevo = {
      userId: 2,
      moduleCode: 'ABCD',
      publisher: 'Apunts',
      price: 12,
      pages: 40,
      status: 'good'
    }

    server.use(
      http.post('http://localhost:3000/books', () => {
        return HttpResponse.error()
      })
    )

    await expect(books.addBook(nuevo)).rejects.toThrow()

    expect(books.data).toHaveLength(0)
  })

  it('removeBook no modifica this.data si el servidor devuelve 500', async () => {
    const books = new Books()

    books.data = [
      {
        id: 1,
        userId: 2,
        moduleCode: 'ABCD',
        publisher: 'Apunts',
        price: 12,
        pages: 40,
        status: 'good'
      }
    ]

    server.use(
      http.delete('http://localhost:3000/books/1', () => {
        return new HttpResponse(null, { status: 500 })
      })
    )

    await expect(books.removeBook(1)).rejects.toThrow()

    expect(books.data).toHaveLength(1)
    expect(books.data[0].id).toBe(1)
  })

  it('removeBook no modifica this.data si el servidor devuelve 404', async () => {
    const books = new Books()

    books.data = [
      {
        id: 1,
        userId: 2,
        moduleCode: 'ABCD',
        publisher: 'Apunts',
        price: 12,
        pages: 40,
        status: 'good'
      }
    ]

    server.use(
      http.delete('http://localhost:3000/books/1', () => {
        return new HttpResponse(null, { status: 404 })
      })
    )

    await expect(books.removeBook(1)).rejects.toThrow()

    expect(books.data).toHaveLength(1)
    expect(books.data[0].id).toBe(1)
  })

  it('removeBook no modifica this.data si hay fallo de red', async () => {
    const books = new Books()

    books.data = [
      {
        id: 1,
        userId: 2,
        moduleCode: 'ABCD',
        publisher: 'Apunts',
        price: 12,
        pages: 40,
        status: 'good'
      }
    ]

    server.use(
      http.delete('http://localhost:3000/books/1', () => {
        return HttpResponse.error()
      })
    )

    await expect(books.removeBook(1)).rejects.toThrow()

    expect(books.data).toHaveLength(1)
    expect(books.data[0].id).toBe(1)
  })

  it('changeBook no modifica this.data si el servidor devuelve 500', async () => {
    const books = new Books()

    books.data = [
      {
        id: 1,
        userId: 2,
        moduleCode: 'ABCD',
        publisher: 'Apunts',
        price: 12,
        pages: 40,
        status: 'good'
      }
    ]

    const cambiado = {
      id: 1,
      userId: 2,
      moduleCode: 'ABCD',
      publisher: 'Anaya',
      price: 20,
      pages: 40,
      status: 'good'
    }

    server.use(
      http.put('http://localhost:3000/books/1', () => {
        return new HttpResponse(null, { status: 500 })
      })
    )

    await expect(books.changeBook(cambiado)).rejects.toThrow()

    expect(books.data[0].publisher).toBe('Apunts')
    expect(books.data[0].price).toBe(12)
  })

  it('changeBook no modifica this.data si el servidor devuelve 404', async () => {
    const books = new Books()

    books.data = [
      {
        id: 1,
        userId: 2,
        moduleCode: 'ABCD',
        publisher: 'Apunts',
        price: 12,
        pages: 40,
        status: 'good'
      }
    ]

    const cambiado = {
      id: 1,
      userId: 2,
      moduleCode: 'ABCD',
      publisher: 'Anaya',
      price: 20,
      pages: 40,
      status: 'good'
    }

    server.use(
      http.put('http://localhost:3000/books/1', () => {
        return new HttpResponse(null, { status: 404 })
      })
    )

    await expect(books.changeBook(cambiado)).rejects.toThrow()

    expect(books.data[0].publisher).toBe('Apunts')
    expect(books.data[0].price).toBe(12)
  })

  it('changeBook no modifica this.data si hay fallo de red', async () => {
    const books = new Books()

    books.data = [
      {
        id: 1,
        userId: 2,
        moduleCode: 'ABCD',
        publisher: 'Apunts',
        price: 12,
        pages: 40,
        status: 'good'
      }
    ]

    const cambiado = {
      id: 1,
      userId: 2,
      moduleCode: 'ABCD',
      publisher: 'Anaya',
      price: 20,
      pages: 40,
      status: 'good'
    }

    server.use(
      http.put('http://localhost:3000/books/1', () => {
        return HttpResponse.error()
      })
    )

    await expect(books.changeBook(cambiado)).rejects.toThrow()

    expect(books.data[0].publisher).toBe('Apunts')
    expect(books.data[0].price).toBe(12)
  })

  it('fetchAll no modifica this.data si el servidor devuelve 500', async () => {
    const books = new Books()

    books.data = [
      {
        id: 99,
        publisher: 'Libro antiguo'
      }
    ]

    server.use(
      http.get('http://localhost:3000/books', () => {
        return new HttpResponse(null, { status: 500 })
      })
    )

    await expect(books.fetchAll()).rejects.toThrow()

    expect(books.data).toHaveLength(1)
    expect(books.data[0].id).toBe(99)
  })

  it('fetchAll no modifica this.data si el servidor devuelve 404', async () => {
    const books = new Books()

    books.data = [
      {
        id: 99,
        publisher: 'Libro antiguo'
      }
    ]

    server.use(
      http.get('http://localhost:3000/books', () => {
        return new HttpResponse(null, { status: 404 })
      })
    )

    await expect(books.fetchAll()).rejects.toThrow()

    expect(books.data).toHaveLength(1)
    expect(books.data[0].id).toBe(99)
  })

  it('fetchAll no modifica this.data si hay un fallo de red', async () => {
    const books = new Books()

    books.data = [
      {
        id: 99,
        publisher: 'Libro antiguo'
      }
    ]

    server.use(
      http.get('http://localhost:3000/books', () => {
        return HttpResponse.error()
      })
    )

    await expect(books.fetchAll()).rejects.toThrow()

    expect(books.data).toHaveLength(1)
    expect(books.data[0].id).toBe(99)
  })
})
