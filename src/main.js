import './style.css'
import logoBatoi from './assets/logoBatoi.png'
import Controller from './controller/controller.class.js'


document.querySelector('#app').innerHTML = `
  <header>
      <div>
        <img src="${logoBatoi}" alt="BatoiBooks">
        <h1>BatoiBooks</h1>
    </div>

    <nav>
      <ul>
        <li><a href="#list">Ver Libros</a></li>
        <li><a href="#form">Añadir Libro</a></li>
        <li><a href="#about">Acerca de...</a></li>
      </ul>
    </nav>
  </header>

    <div id="messages">
    
    </div>

    <main>
    <div id="list"></div>

    <div id="remove">
        <label for="id-remove">ID del libro:</label>
        <input type="number" id="id-remove">
        <button type="button" id="remove-btn">Eliminar</button>
    </div>

    <div id="form">
       <form id="bookForm">

        <div>
            <label for="moduleCode">Módulo</label>
            <select id="moduleCode" name="moduleCode" required></select>
        </div>

        <div>
            <label for="publisher">Editorial</label>
            <input type="text" id="publisher" name="publisher" required>
        </div>

        <div>
            <label for="price">Precio</label>
            <input type="number" id="price" name="price" required>
        </div>

        <div>
            <label for="pages">Páginas</label>
            <input type="number" id="pages" name="pages" required>
        </div>

        <div>
            <p>Estado</p>

            <label>
                <input type="radio" name="status" value="new" required>
                Nuevo
            </label>

            <label>
                <input type="radio" name="status" value="good" required>
                Bueno
            </label>

            <label>
                <input type="radio" name="status" value="used" required>
                Usado
            </label>

            <label>
                <input type="radio" name="status" value="bad" required>
                Malo
            </label>

            <label>
                <input type="radio" name="status" value="digital" required>
                Digital
            </label>
        </div>

        <div>
            <label for="photo">Foto</label>
            <input type="text" id="photo" name="photo" required>
        </div>

        <div>
            <label for="comments">Comentarios</label>
            <input type="text" id="comments" name="comments" required>
        </div>

        <button type="submit">Guardar</button>
        <button type="reset">Reset</button>

    </form>
</div>
    <div id="about">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis maximus laoreet nisi, id pretium mi eleifend quis.</p>
    </div>
</main>
  <footer>
    Clodoaldo
  </footer>
`

document.addEventListener('DOMContentLoaded', async () => {
    const controller = new Controller()

    await controller.init()
})
