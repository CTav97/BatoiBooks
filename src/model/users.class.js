import User from './user.class.js'

export default class Users {

    constructor() {
        this.data = []
        this.contador = 1
    }

    populate(usersData) {
        this.data = usersData.map(user =>
            new User(user.id, user.nick, user.email, user.password)
        )

        if (this.data.length > 0) {
            this.contador = Math.max(...this.data.map(user => user.id)) + 1
        }
    }

    addUser(userData) {
        const newUser = new User(
            this.contador,
            userData.nick,
            userData.email,
            userData.password
        )

        this.data.push(newUser)
        this.contador++

        return newUser
    }

    removeUser(userId) {
        const index = this.data.findIndex(user => user.id === userId)

        if (index === -1) {
            throw new Error('Usuario no encontrado')
        }

        this.data.splice(index, 1)
    }

    changeUser(newData) {
        const index = this.data.findIndex(user => user.id === newData.id)

        if (index === -1) {
            throw new Error('Usuario no encontrado')
        }

        const changedUser = new User(
            newData.id,
            newData.nick,
            newData.email,
            newData.password
        )

        this.data[index] = changedUser

        return changedUser
    }

    getUserById(id) {
        const user = this.data.find(user => user.id === id)

        if (user === undefined) {
            throw new Error(`No existe el usuario con id ${id}`)
        }

        return user
    }

    getUserIndexById(id) {
        const index = this.data.findIndex(user => user.id === id)

        if (index === -1) {
            throw new Error(`No existe el usuario con id ${id}`)
        }

        return index
    }

    getUserByNickName(nick) {
        return this.data.find(user => user.nick === nick)
    }

    toString() {
        return this.data
            .map(user => user.toString())
            .join('\n')
    }
}