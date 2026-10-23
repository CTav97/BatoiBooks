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

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('Clase Modules', () => {

    test('constructor crea una colección vacía', () => {
        const modules = new Modules()

        expect(modules.data).toEqual([])
    })

    test('fetchAll carga módulos como instancias de Module', async () => {
        const modules = new Modules()

        await modules.fetchAll()

        expect(modules.data.length).toBeGreaterThan(0)
        expect(modules.data[0]).toBeInstanceOf(Module)
    })

    test('getModuleByCode devuelve el módulo correcto', () => {
        const modules = new Modules()

        modules.data = modulesFixture.map(module => modules.toModule(module))

        const module = modules.getModuleByCode('5021')

        expect(module.code).toBe('5021')
        expect(module.vliteral).toBe('DWEC')
    })

    test('getModuleByCode lanza error si no existe', () => {
        const modules = new Modules()

        modules.data = modulesFixture.map(module => modules.toModule(module))

        expect(() => modules.getModuleByCode('9999')).toThrow()
    })

    test('toString muestra todos los módulos', () => {
        const modules = new Modules()

        modules.data = modulesFixture.map(module => modules.toModule(module))

        const texto = modules.toString()

        expect(texto).toContain('5021')
        expect(texto).toContain('5022')
    })

    test('fetchAll mantiene this.data si el servidor devuelve 404', async () => {
        const modules = new Modules()

        modules.data = [{ code: 'TEST' }]
        const before = [...modules.data]

        server.use(
            http.get('http://localhost:3000/modules', () => {
                return new HttpResponse(null, { status: 404 })
            })
        )

        await expect(modules.fetchAll()).rejects.toThrow()

        expect(modules.data).toEqual(before)
    })

    test('fetchAll mantiene this.data si el servidor devuelve 500', async () => {
        const modules = new Modules()

        modules.data = [{ code: 'TEST' }]
        const before = [...modules.data]

        server.use(
            http.get('http://localhost:3000/modules', () => {
                return new HttpResponse(null, { status: 500 })
            })
        )

        await expect(modules.fetchAll()).rejects.toThrow()

        expect(modules.data).toEqual(before)
    })

    test('fetchAll mantiene this.data si hay un fallo de red', async () => {
        const modules = new Modules()

        modules.data = [{ code: 'TEST' }]
        const before = [...modules.data]

        server.use(
            http.get('http://localhost:3000/modules', () => {
                return HttpResponse.error()
            })
        )

        await expect(modules.fetchAll()).rejects.toThrow()

        expect(modules.data).toEqual(before)
    })
})