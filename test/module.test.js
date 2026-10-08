import { describe, test, expect } from 'vitest'
import Module from '../src/model/module.class.js'

const moduleFixture = [
    {
        code: '5021',
        cliteral: 'Desarrollo web en entorno cliente',
        vliteral: 'Desenvolupament web en entorn client',
        courseId: 2
    },
    {
        code: '5022',
        cliteral: 'Desarrollo web en entorno servidor',
        vliteral: 'Desenvolupament web en entorn servidor',
        courseId: 2
    }
]

describe('Clase Module', () => {

    test('constructor crea un módulo correctamente', () => {
        const newModule = new Module(
            moduleFixture[0].code,
            moduleFixture[0].cliteral,
            moduleFixture[0].vliteral,
            moduleFixture[0].courseId
        )

        expect(newModule).toBeInstanceOf(Module)
        expect(newModule).toEqual(moduleFixture[0])
    })

    test('toString pinta correctamente el módulo', () => {
        const newModule = new Module(
            moduleFixture[0].code,
            moduleFixture[0].cliteral,
            moduleFixture[0].vliteral,
            moduleFixture[0].courseId
        )

        const texto = newModule.toString()

        expect(texto).toContain(moduleFixture[0].code)
        expect(texto).toContain(moduleFixture[0].cliteral)
    })
})