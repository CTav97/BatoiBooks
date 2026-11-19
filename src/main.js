import './style.css'
import logoBatoi from './assets/logoBatoi.png'
import Controller from './controller/controller.class.js'


document.querySelector('#app').innerHTML = `
  <header>
      <div>
        <img src="${logoBatoi}" alt="BatoiBooks">
        <h1>BatoiBooks</h1>
    </div>
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <nav>
      <ul>
        <li><a href="#list">Ver Libros</a></li>
        <li><a href="#form">Añadir Libro</a></li>
        <li><a href="#about">Acerca de...</a></li>
      </ul>
    </nav>
    <span id="cart-count">0</span>
  </header>

    <div id="messages">
    
    </div>

    <main>
    <div id="list"></div>

    <div id="form">
       <form id="bookForm" novalidate>

        <div class="hidden">
        <label for="id">ID</label>
        <input type="number" id="id" name="id" readonly>
        </div>

        <div>
            <label for="moduleCode">Módulo</label>
            <select id="moduleCode" name="moduleCode" required></select>
            <span id="moduleCode-error" class="error"></span>
        </div>

        <div>
            <label for="publisher">Editorial</label>
            <input type="text" id="publisher" name="publisher" required>
            <span id="publisher-error" class="error"></span>
        </div>

        <div>
            <label for="price">Precio</label>
            <input type="number" id="price" name="price" min="0" step="0.01" required>
            <span id="price-error" class="error"></span>
        </div>

        <div>
            <label for="pages">Páginas</label>
            <input type="number" id="pages" name="pages" min="1" step="1" required>
            <span id="pages-error" class="error"></span>
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
            <span id="status-error" class="error"></span>
        </div>

        <div>
            <label for="photo">Foto</label>
            <input type="text" id="photo" name="photo">
        </div>

        <div>
            <label for="comments">Comentarios</label>
            <input type="text" id="comments" name="comments">
        </div>

        <button type="submit">Guardar</button>
        <button type="reset">Reset</button>

        <h2>Añadir libro</h2>

    </form>
</div>
    <div id="about">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis maximus laoreet nisi, id pretium mi eleifend quis.</p>
    </div>

    <div id="not-found">
        <p>La página no existe</p>
        <a href="#list">Volver a la lista</a>
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
