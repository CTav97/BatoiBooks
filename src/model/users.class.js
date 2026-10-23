import User from './user.class.js'
import { getUsers, postUser, deleteUser, putUser } from '../services/api.js'

export default class Users {

    constructor() {
        this.data = []
    }

    toUser(userData) {
        return new User(
            userData.id,
            userData.nick,
            userData.email,
            userData.password
        )
    }
    async fetchAll() {
        const usersData = await getUsers()

        this.data = usersData.map(user => this.toUser(user))

        return this.data
    }

    async addUser(userData) {
        const savedUser = await postUser(userData)

        const newUser = this.toUser(savedUser)

        this.data.push(newUser)

        return newUser
    }

    async removeUser(userId) {
        await deleteUser(userId)

        const index = this.getUserIndexById(userId)

        this.data.splice(index, 1)
    }

    async changeUser(newData) {
        const savedUser = await putUser(newData)

        const index = this.getUserIndexById(newData.id)

        const changedUser = this.toUser(savedUser)

        this.data[index] = changedUser

        return changedUser
    }

    getUserById(id) {
        const index = this.getUserIndexById(id)

        return this.data[index]
    }

    getUserIndexById(id) {
        const index = this.data.findIndex(user => user.id === id)

        if (index === -1) {
            throw new Error(`No existe el usuario con id ${id}`)
        }

        return index
    }

    getUserByNickName(nick) {
        const user = this.data.find(user => user.nick === nick)

        if (user === undefined) {
            throw new Error(`No existe el usuario con nick ${nick}`)
        }

        return user
    }

    toString() {
        return this.data
            .map(user => user.toString())
            .join('\n')
    }
}