const SERVER = 'http://localhost:3000'

async function getBooks() {
    const response = await fetch(`${SERVER}/books`)

    if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`)
    }

    return await response.json()
}

async function postBook(bookData) {
    const response = await fetch(`${SERVER}/books`, {
        method: 'POST',
        body: JSON.stringify(bookData),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`)
    }

    return await response.json()
}

async function deleteBook(bookId) {
    const response = await fetch(`${SERVER}/books/${bookId}`, {
        method: 'DELETE'
    })
    if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`)
    }
}

async function putBook(bookData) {
    const response = await fetch(`${SERVER}/books/${bookData.id}`, {
        method: 'PUT',
        body: JSON.stringify(bookData),
        headers: {
            'Content-Type': 'application/json'
        }
    })

    if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`)
    }

    return await response.json()
}

async function getUsers() {
    const response = await fetch(`${SERVER}/users`)

    if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`)
    }

    return await response.json()
}

async function postUser(userData) {
    const response = await fetch(`${SERVER}/users`, {
        method: 'POST',
        body: JSON.stringify(userData),
        headers: {
            'Content-Type': 'application/json'
        }
    })

    if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`)
    }

    return await response.json()
}

async function deleteUser(userId) {
    const response = await fetch(`${SERVER}/users/${userId}`, {
        method: 'DELETE'
    })

    if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`)
    }
}

async function putUser(userData) {
    const response = await fetch(`${SERVER}/users/${userData.id}`, {
        method: 'PUT',
        body: JSON.stringify(userData),
        headers: {
            'Content-Type': 'application/json'
        }
    })

    if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`)
    }

    return await response.json()
}

async function getModules() {
    const response = await fetch(`${SERVER}/modules`)

    if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`)
    }

    return await response.json()
}

export {
    getBooks,
    postBook,
    deleteBook,
    putBook,
    getUsers,
    postUser,
    deleteUser,
    putUser,
    getModules
}