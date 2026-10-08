import Module from './module.class.js'

export default class Modules {

    constructor() {
        this.data = []
    }

    populate(modulesData) {
        this.data = modulesData.map(module =>
            new Module(
                module.code,
                module.cliteral,
                module.vliteral,
                module.courseId
            )
        )
    }

    getModuleByCode(code) {
        const module = this.data.find(module => module.code === code)

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