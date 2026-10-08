import { describe, test, expect } from 'vitest'
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

describe('Clase Users', () => {

    test('constructor crea una colección vacía', () => {
        const users = new Users()

        expect(users.data).toEqual([])
    })

    test('populate carga usuarios como instancias de User', () => {
        const users = new Users()

        users.populate(usersFixture)

        expect(users.data.length).toBe(2)
        expect(users.data[0]).toBeInstanceOf(User)
        expect(users.data[1]).toBeInstanceOf(User)
    })

    test('addUser añade un usuario correctamente', () => {
        const users = new Users()
        users.populate(usersFixture)

        const newUser = users.addUser({
            nick: 'carlos',
            email: 'carlos@test.com',
            password: '9999'
        })

        expect(newUser).toBeInstanceOf(User)
        expect(newUser.id).toBe(3)
        expect(users.data.length).toBe(3)
    })

    test('removeUser elimina un usuario existente', () => {
        const users = new Users()
        users.populate(usersFixture)

        users.removeUser(1)

        expect(users.data.length).toBe(1)
        expect(users.data.find(user => user.id === 1)).toBeUndefined()
    })

    test('removeUser lanza error si no existe', () => {
        const users = new Users()
        users.populate(usersFixture)

        const lengthAntes = users.data.length

        expect(() => users.removeUser(999)).toThrow()
        expect(users.data.length).toBe(lengthAntes)
    })

    test('changeUser modifica un usuario existente', () => {
        const users = new Users()
        users.populate(usersFixture)

        const changedUser = users.changeUser({
            id: 1,
            nick: 'clodoNuevo',
            email: 'nuevo@test.com',
            password: 'abcd'
        })

        expect(changedUser).toBeInstanceOf(User)
        expect(changedUser.nick).toBe('clodoNuevo')
        expect(users.data[0].nick).toBe('clodoNuevo')
    })

    test('changeUser lanza error si no existe', () => {
        const users = new Users()
        users.populate(usersFixture)

        expect(() => users.changeUser({
            id: 999,
            nick: 'nadie',
            email: 'nadie@test.com',
            password: '1234'
        })).toThrow()
    })

    test('getUserById devuelve el usuario correcto', () => {
        const users = new Users()
        users.populate(usersFixture)

        const user = users.getUserById(1)

        expect(user.nick).toBe('clodo')
    })

    test('getUserById lanza error si no existe', () => {
        const users = new Users()
        users.populate(usersFixture)

        expect(() => users.getUserById(999)).toThrow()
    })

    test('getUserIndexById devuelve la posición correcta', () => {
        const users = new Users()
        users.populate(usersFixture)

        expect(users.getUserIndexById(2)).toBe(1)
    })

    test('getUserIndexById lanza error si no existe', () => {
        const users = new Users()
        users.populate(usersFixture)

        expect(() => users.getUserIndexById(999)).toThrow()
    })

    test('getUserByNickName devuelve el usuario correcto', () => {
        const users = new Users()
        users.populate(usersFixture)

        const user = users.getUserByNickName('unai')

        expect(user.id).toBe(2)
    })

    test('toString muestra todos los usuarios', () => {
        const users = new Users()
        users.populate(usersFixture)

        const texto = users.toString()

        expect(texto).toContain('clodo')
        expect(texto).toContain('unai')
    })
})