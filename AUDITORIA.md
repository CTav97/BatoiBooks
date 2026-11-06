# Auditoría de renderBook

## 1. Estado de venta mal comprobado

**1. Qué falla:**  
La condición de `soldDate` está al revés. Si el libro tiene fecha pone "En venta" y si no tiene fecha pone "Vendido el".

**2. Cómo reproducirlo:**  
Se puede probar con un libro que tenga fecha de venta y otro que no tenga.

**3. Qué consecuencias tiene:**  
Muestra información incorrecta al usuario.

**4. Cómo lo he corregido:**  
He hecho que si no hay fecha muestre "En venta" y si hay fecha muestre "Vendido el" junto con la fecha.

---

## 2. Formato de la fecha

**1. Qué falla:**  
La fecha se muestra tal como viene del servidor, por ejemplo `2023-02-01`.

**2. Cómo reproducirlo:**  
Se puede probar mostrando cualquier libro que ya esté vendido.

**3. Qué consecuencias tiene:**  
La fecha no aparece en el formato que pide la práctica.

**4. Cómo lo he corregido:**  
He creado una función que separa el año, el mes y el día y muestra la fecha como `01/02/2023`.

---

## 3. El módulo puede no existir

**1. Qué falla:**  
El código usa directamente `module.cliteral`. Si el módulo no existe, se produce un error.

**2. Cómo reproducirlo:**  
Se puede usar un libro cuyo `moduleCode` no exista en la lista de módulos.

**3. Qué consecuencias tiene:**  
La aplicación puede dar error al intentar mostrar ese libro.

**4. Cómo lo he corregido:**  
Compruebo primero si el módulo existe. Si existe muestro su nombre y si no existe muestro el código del módulo.