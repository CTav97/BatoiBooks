# AUDITORÍA

## removeBook

El problema es que si la id no existe, no lanza ningún error.

La solución es comprobar primero si el libro existe y, si no existe lanzar una excepción.

## addBook

El problema es usar `this.data.length + 1` para crear la id, porque puede repetir ids si antes se ha eliminado algún libro.

La solución es usar un contador para asignar nuevas ids.

## changeBook

El problema es que no comprueba si la id existe.

Además, guarda `newData` directamente, que es un objeto normal y no una instancia de `Book`.

La solución es comprobar primero la id y crear un nuevo `Book` con los datos recibidos.