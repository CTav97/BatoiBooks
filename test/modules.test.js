import { describe, test, expect } from 'vitest'
import Modules from '../src/model/modules.class.js'
import Module from '../src/model/module.class.js'

const modulesFixture = [
    {
        code: '5021',
        cliteral: 'Desarrollo Web en Entorno Cliente',
        vliteral: 'DWEC',
        courseId: 2
    },
    {
        code: '5022',
        cliteral: 'Desarrollo Web en Entorno Servidor',
        vliteral: 'DWES',
        courseId: 2
    }
]

describe('Clase Modules', () => {

    test('constructor crea una colección vacía', () => {
        const modules = new Modules()

        expect(modules.data).toEqual([])
    })

    test('populate carga módulos como instancias de Module', () => {
        const modules = new Modules()

        modules.populate(modulesFixture)

        expect(modules.data.length).toBe(2)
        expect(modules.data[0]).toBeInstanceOf(Module)
        expect(modules.data[1]).toBeInstanceOf(Module)
    })

    test('getModuleByCode devuelve el módulo correcto', () => {
        const modules = new Modules()

        modules.populate(modulesFixture)

        const module = modules.getModuleByCode('5021')

        expect(module.code).toBe('5021')
        expect(module.vliteral).toBe('DWEC')
    })

    test('getModuleByCode lanza error si no existe', () => {
        const modules = new Modules()

        modules.populate(modulesFixture)

        expect(() => modules.getModuleByCode('9999')).toThrow()
    })

    test('toString muestra todos los módulos', () => {
        const modules = new Modules()

        modules.populate(modulesFixture)

        const texto = modules.toString()

        expect(texto).toContain('5021')
        expect(texto).toContain('5022')
    })
})