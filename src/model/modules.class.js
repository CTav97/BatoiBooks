import Module from './module.class.js'
import { getModules } from '../services/api.js'

export default class Modules {

    constructor() {
        this.data = []
    }

    toModule(moduleData) {
        return new Module(
            moduleData.code,
            moduleData.cliteral,
            moduleData.vliteral,
            moduleData.courseId
        )
    }

    async fetchAll() {
        const modulesData = await getModules()

        this.data = modulesData.map(module => this.toModule(module))

        return this.data
    }

    getModuleByCode(code) {
        const module = this.data.find(m => m.code === code)

        if (module === undefined) {
            throw new Error(`No existe el módulo con código ${code}`)
        }

        return module
    }

    toString() {
        return this.data
            .map(module => module.toString())
            .join('\n')
    }
}