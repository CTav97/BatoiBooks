import { describe, test, expect } from 'vitest'
import User from '../src/model/user.class.js'

const userFixture = [
    {
        id: 1,
        nick: 'clodo',
        email: 'clodo@email.com',
        password: '1234'
    },
    {
        id: 2,
        nick: 'carlos',
        email: 'carlos@email.com',
        password: 'abcd'
    }
]

describe('Clase User', () => {

    test('constructor crea un usuario correctamente', () => {
        const newUser = new User(
            userFixture[0].id,
            userFixture[0].nick,
            userFixture[0].email,
            userFixture[0].password
        )

        expect(newUser).toBeInstanceOf(User)
        expect(newUser).toEqual(userFixture[0])
    })

    test('toString pinta correctamente el usuario', () => {
        const newUser = new User(
            userFixture[0].id,
            userFixture[0].nick,
            userFixture[0].email,
            userFixture[0].password
        )

        const texto = newUser.toString()

        expect(texto).toContain(userFixture[0].nick)
        expect(texto).toContain(userFixture[0].email)
    })
})