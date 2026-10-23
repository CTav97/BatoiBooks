import {
    describe,
    test,
    expect,
    beforeAll,
    afterEach,
    afterAll
} from 'vitest'

import { http, HttpResponse } from 'msw'
import { server } from '../src/mocks/server'
import Users from '../src/model/users.class.js'
import User from '../src/model/user.class.js'

const usersFixture = [
    {
        id: 1,
        nick: 'clodo',
        email: 'clodo@test.com',
        password: '1234'
    },
    {
        id: 2,
        nick: 'unai',
        email: 'unai@test.com',
        password: '5678'
    }
]

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('Clase Users', () => {

    test('constructor crea una colección vacía', () => {
        const users = new Users()

        expect(users.data).toEqual([])
    })

    test('fetchAll carga usuarios como instancias de User', async () => {
        const users = new Users()

        await users.fetchAll()

        expect(users.data.length).toBeGreaterThan(0)
        expect(users.data[0]).toBeInstanceOf(User)
    })

    test('addUser añade un usuario correctamente', async () => {
        const users = new Users()

        const newUser = await users.addUser({
            nick: 'carlos',
            email: 'carlos@test.com',
            password: '9999'
        })

        expect(newUser).toBeInstanceOf(User)
        expect(newUser.id).toBeDefined()
        expect(users.data[0]).toBe(newUser)
    })

    test('removeUser elimina un usuario existente', async () => {
        const users = new Users()

        users.data = usersFixture.map(user => users.toUser(user))

        server.use(
            http.delete('http://localhost:3000/users/1', () => {
                return new HttpResponse(null, { status: 200 })
            })
        )

        await users.removeUser(1)

        expect(users.data.length).toBe(1)
        expect(users.data.find(user => user.id === 1)).toBeUndefined()
    })

    test('changeUser modifica un usuario existente', async () => {
        const users = new Users()

        users.data = usersFixture.map(user => users.toUser(user))

        const changedData = {
            id: 1,
            nick: 'clodoNuevo',
            email: 'nuevo@test.com',
            password: 'abcd'
        }

        server.use(
            http.put('http://localhost:3000/users/1', async ({ request }) => {
                const body = await request.json()

                return HttpResponse.json(body)
            })
        )

        const changedUser = await users.changeUser(changedData)

        expect(changedUser).toBeInstanceOf(User)
        expect(changedUser.nick).toBe('clodoNuevo')
        expect(users.data[0]).toBe(changedUser)
    })

    test('getUserById devuelve el usuario correcto', () => {
        const users = new Users()

        users.data = usersFixture.map(user => users.toUser(user))

        expect(users.getUserById(1).nick).toBe('clodo')
    })

    test('getUserById lanza error si no existe', () => {
        const users = new Users()

        users.data = usersFixture.map(user => users.toUser(user))

        expect(() => users.getUserById(999)).toThrow()
    })

    test('getUserIndexById devuelve la posición correcta', () => {
        const users = new Users()

        users.data = usersFixture.map(user => users.toUser(user))

        expect(users.getUserIndexById(2)).toBe(1)
    })

    test('getUserByNickName devuelve el usuario correcto', () => {
        const users = new Users()

        users.data = usersFixture.map(user => users.toUser(user))

        expect(users.getUserByNickName('unai').id).toBe(2)
    })

    test('getUserByNickName lanza error si no existe', () => {
        const users = new Users()

        users.data = usersFixture.map(user => users.toUser(user))

        expect(() => users.getUserByNickName('pepe')).toThrow()
    })

    test('toString muestra todos los usuarios', () => {
        const users = new Users()

        users.data = usersFixture.map(user => users.toUser(user))

        const texto = users.toString()

        expect(texto).toContain('clodo')
        expect(texto).toContain('unai')
    })

    test('fetchAll mantiene this.data si el servidor devuelve 404', async () => {
        const users = new Users()

        users.data = usersFixture.map(user => users.toUser(user))
        const before = [...users.data]

        server.use(
            http.get('http://localhost:3000/users', () => {
                return new HttpResponse(null, { status: 404 })
            })
        )

        await expect(users.fetchAll()).rejects.toThrow()

        expect(users.data).toEqual(before)
    })

    test('fetchAll mantiene this.data si el servidor devuelve 500', async () => {
        const users = new Users()

        users.data = usersFixture.map(user => users.toUser(user))
        const before = [...users.data]

        server.use(
            http.get('http://localhost:3000/users', () => {
                return new HttpResponse(null, { status: 500 })
            })
        )

        await expect(users.fetchAll()).rejects.toThrow()

        expect(users.data).toEqual(before)
    })

    test('fetchAll mantiene this.data si hay un fallo de red', async () => {
        const users = new Users()

        users.data = usersFixture.map(user => users.toUser(user))
        const before = [...users.data]

        server.use(
            http.get('http://localhost:3000/users', () => {
                return HttpResponse.error()
            })
        )

        await expect(users.fetchAll()).rejects.toThrow()

        expect(users.data).toEqual(before)
    })

    test('addUser mantiene this.data si el servidor devuelve 404', async () => {
        const users = new Users()
        const before = [...users.data]

        server.use(
            http.post('http://localhost:3000/users', () => {
                return new HttpResponse(null, { status: 404 })
            })
        )

        await expect(users.addUser({
            nick: 'carlos',
            email: 'carlos@test.com',
            password: '9999'
        })).rejects.toThrow()

        expect(users.data).toEqual(before)
    })

    test('addUser mantiene this.data si el servidor devuelve 500', async () => {
        const users = new Users()
        const before = [...users.data]

        server.use(
            http.post('http://localhost:3000/users', () => {
                return new HttpResponse(null, { status: 500 })
            })
        )

        await expect(users.addUser({
            nick: 'carlos',
            email: 'carlos@test.com',
            password: '9999'
        })).rejects.toThrow()

        expect(users.data).toEqual(before)
    })

    test('addUser mantiene this.data si hay un fallo de red', async () => {
        const users = new Users()
        const before = [...users.data]

        server.use(
            http.post('http://localhost:3000/users', () => {
                return HttpResponse.error()
            })
        )

        await expect(users.addUser({
            nick: 'carlos',
            email: 'carlos@test.com',
            password: '9999'
        })).rejects.toThrow()

        expect(users.data).toEqual(before)
    })

    test('removeUser mantiene this.data si el servidor devuelve 404', async () => {
        const users = new Users()

        users.data = usersFixture.map(user => users.toUser(user))
        const before = [...users.data]

        server.use(
            http.delete('http://localhost:3000/users/1', () => {
                return new HttpResponse(null, { status: 404 })
            })
        )

        await expect(users.removeUser(1)).rejects.toThrow()

        expect(users.data).toEqual(before)
    })

    test('removeUser mantiene this.data si el servidor devuelve 500', async () => {
        const users = new Users()

        users.data = usersFixture.map(user => users.toUser(user))
        const before = [...users.data]

        server.use(
            http.delete('http://localhost:3000/users/1', () => {
                return new HttpResponse(null, { status: 500 })
            })
        )

        await expect(users.removeUser(1)).rejects.toThrow()

        expect(users.data).toEqual(before)
    })

    test('removeUser mantiene this.data si hay un fallo de red', async () => {
        const users = new Users()

        users.data = usersFixture.map(user => users.toUser(user))
        const before = [...users.data]

        server.use(
            http.delete('http://localhost:3000/users/1', () => {
                return HttpResponse.error()
            })
        )

        await expect(users.removeUser(1)).rejects.toThrow()

        expect(users.data).toEqual(before)
    })

    test('changeUser mantiene this.data si el servidor devuelve 404', async () => {
        const users = new Users()

        users.data = usersFixture.map(user => users.toUser(user))
        const before = [...users.data]

        server.use(
            http.put('http://localhost:3000/users/1', () => {
                return new HttpResponse(null, { status: 404 })
            })
        )

        await expect(users.changeUser({
            id: 1,
            nick: 'nuevo',
            email: 'nuevo@test.com',
            password: 'abcd'
        })).rejects.toThrow()

        expect(users.data).toEqual(before)
    })

    test('changeUser mantiene this.data si el servidor devuelve 500', async () => {
        const users = new Users()

        users.data = usersFixture.map(user => users.toUser(user))
        const before = [...users.data]

        server.use(
            http.put('http://localhost:3000/users/1', () => {
                return new HttpResponse(null, { status: 500 })
            })
        )

        await expect(users.changeUser({
            id: 1,
            nick: 'nuevo',
            email: 'nuevo@test.com',
            password: 'abcd'
        })).rejects.toThrow()

        expect(users.data).toEqual(before)
    })

    test('changeUser mantiene this.data si hay un fallo de red', async () => {
        const users = new Users()

        users.data = usersFixture.map(user => users.toUser(user))
        const before = [...users.data]

        server.use(
            http.put('http://localhost:3000/users/1', () => {
                return HttpResponse.error()
            })
        )

        await expect(users.changeUser({
            id: 1,
            nick: 'nuevo',
            email: 'nuevo@test.com',
            password: 'abcd'
        })).rejects.toThrow()

        expect(users.data).toEqual(before)
    })
})