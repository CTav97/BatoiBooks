export {
    getBookById,
    getBookIndexById, getUserById, getUserIndexById, getUserByNickName, getModuleByCode, booksFromUser,
    booksFromModule, booksCheeperThan, booksWithStatus,
    averagePriceOfBooks, booksOfTypeNotes, bookExists,
    booksNotSold, incrementPriceOfBooks
};

function getBookById(libros, id) {
    const libro = libros.find(libro => libro.id === id);

    if (libro === undefined) {
        throw new Error(`No existe el libro con id ${id}`);
    }

    return libro;
}

function getBookIndexById(libros, id) {
    return libros.findIndex(libro => libro.id === id);
}

function getUserById(usuarios, id) {
    const usuario = usuarios.find(usuario => usuario.id === id);

    if (usuario === undefined) {
        throw new Error(`No existe el usuario con id ${id}`);
    }

    return usuario;
}

function getUserIndexById(usuarios, id) {
    return usuarios.findIndex(usuario => usuario.id === id);
}

function getUserByNickName(usuarios, nick) {
    const usuario = usuarios.find(usuario => usuario.nick === nick);

    if (usuario === undefined) {
        throw new Error(`No existe el usuario con nick ${nick}`);
    }

    return usuario;
}

function getModuleByCode(modulos, codigo) {
    const modulo = modulos.find(modulo => modulo.code === codigo);

    if (modulo === undefined) {
        throw new Error(`No existe el módulo con código ${codigo}`);
    }

    return modulo;
}

function booksFromUser(libros, idUsuario) {
    return libros.filter(libro => libro.userId === idUsuario);
}

function booksFromModule(libros, codigoModulo) {
    return libros.filter(libro => libro.moduleCode === codigoModulo);
}

function booksCheeperThan(libros, precio) {
    return libros.filter(libro => libro.price <= precio);
}

function booksWithStatus(libros, estado) {
    return libros.filter(libro => libro.status === estado);
}

function averagePriceOfBooks(libros) {
    if (libros.length === 0) {
        return '0.00 €';
    }

    const total = libros.reduce((suma, libro) => suma + libro.price, 0);
    const media = total / libros.length;

    return `${media.toFixed(2)} €`;
}

function booksOfTypeNotes(libros) {
    return libros.filter(libro => libro.publisher === 'Apunts');
}

function bookExists(libros, idUsuario, codigoModulo) {
    return libros.some(libro =>
        libro.userId === idUsuario && libro.moduleCode === codigoModulo
    );
}

function booksNotSold(libros) {
    return libros.filter(libro => libro.soldDate === '');
}

function incrementPriceOfBooks(libros, porcentaje) {
    return libros.map(libro => ({
        ...libro,
        price: libro.price + libro.price * porcentaje / 100
    }));
}