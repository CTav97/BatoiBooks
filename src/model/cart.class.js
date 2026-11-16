export default class Cart {
    constructor() {
        this.data = []
    }

    addBook(book) {
        if (book.soldDate) {
            throw new Error('El libro ya está vendido')
        }

        if (this.data.some(item => item.id === book.id)) {
            throw new Error('El libro ya está en el carrito')
        }

        const copy = { ...book }

        this.data.push(copy)

        return copy
    }
}