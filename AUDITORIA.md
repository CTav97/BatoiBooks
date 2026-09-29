# Auditoría

## booksNotSold

El código usa un for y en esta práctica no podemos usarlo.
Además, los libros sin vender tienen soldDate vacío (''),
no null. Por eso la condición no funciona como esperamos.

Lo corregimos con filter:

```js
function booksNotSold(libros) {
    return libros.filter(libro => libro.soldDate === '');
}
```

## incrementPriceOfBooks modificando el original

Esta versión cambia el precio directamente en los libros originales:

```js
function incrementPriceOfBooks(libros, porcentaje) {
    libros.forEach(libro => {
        libro.price = libro.price + libro.price * porcentaje / 100;
    });

    return libros;
}
```

map crea un array nuevo y ...libro copia cada libro. Así cambiamos el precio de la copia y conservamos el original.