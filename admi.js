document.addEventListener("DOMContentLoaded", () => {
  const formUsuario = document.getElementById("formUsuario");
  const listaUsuarios = document.getElementById("listaUsuarios");
  let usuarios = [];

  formUsuario.addEventListener("submit", (e) => {
    e.preventDefault();

    const nombre = document.getElementById("nombreUsuario").value;
    const correo = document.getElementById("correoUsuario").value;
    const rol = document.getElementById("rolUsuario").value;

    const usuario = { id: Date.now(), nombre, correo, rol };
    usuarios.push(usuario);
    renderUsuarios();
    formUsuario.reset();
  });

  function renderUsuarios() {
    listaUsuarios.innerHTML = "";

    usuarios.forEach((usuario) => {
      const div = document.createElement("div");
      div.classList.add("usuario-card");
      div.dataset.id = usuario.id;

      div.innerHTML = `
        <input type="text" value="${usuario.nombre}" disabled class="nombre" />
        <input type="email" value="${usuario.correo}" disabled class="correo" />
        <input type="text" value="${usuario.rol}" disabled class="rol" />
        <div>
          <button class="editar">Editar</button>
          <button class="guardar" style="display:none;">Guardar</button>
          <button class="eliminar">Eliminar</button>
        </div>
      `;

      // Botones
      const btnEditar = div.querySelector(".editar");
      const btnGuardar = div.querySelector(".guardar");
      const btnEliminar = div.querySelector(".eliminar");

      btnEditar.addEventListener("click", () => {
        div.querySelectorAll("input").forEach(input => input.disabled = false);
        btnEditar.style.display = "none";
        btnGuardar.style.display = "inline-block";
      });

      btnGuardar.addEventListener("click", () => {
        const nuevoNombre = div.querySelector(".nombre").value;
        const nuevoCorreo = div.querySelector(".correo").value;
        const nuevoRol = div.querySelector(".rol").value;

        usuario.nombre = nuevoNombre;
        usuario.correo = nuevoCorreo;
        usuario.rol = nuevoRol;

        div.querySelectorAll("input").forEach(input => input.disabled = true);
        btnEditar.style.display = "inline-block";
        btnGuardar.style.display = "none";
      });

      btnEliminar.addEventListener("click", () => {
        usuarios = usuarios.filter(u => u.id !== usuario.id);
        renderUsuarios();
      });

      listaUsuarios.appendChild(div);
    });
  }
});
  
      usuarioDiv.appendChild(nombreEl);
      usuarioDiv.appendChild(correoEl);
      usuarioDiv.appendChild(rolEl);
      usuarioDiv.appendChild(btnEditar);
      usuarioDiv.appendChild(btnEliminar);
      usuarioDiv.appendChild(btnGuardar);
  
      listaUsuarios.appendChild(usuarioDiv);
      formUsuario.reset();
  
    function toggleEditable(nombreEl, correoEl, rolEl, editable) {
      const nombreSpan = nombreEl.querySelector("span");
      const correoSpan = correoEl.querySelector("span");
      const rolSpan = rolEl.querySelector("span");
  
      if (editable) {
        nombreSpan.contentEditable = true;
        correoSpan.contentEditable = true;
        rolSpan.contentEditable = true;
        nombreSpan.style.backgroundColor = "#333";
        correoSpan.style.backgroundColor = "#333";
        rolSpan.style.backgroundColor = "#333";
      } else {
        nombreSpan.contentEditable = false;
        correoSpan.contentEditable = false;
        rolSpan.contentEditable = false;
        nombreSpan.style.backgroundColor = "transparent";
        correoSpan.style.backgroundColor = "transparent";
        rolSpan.style.backgroundColor = "transparent";
      }
    }
 
  document.addEventListener("DOMContentLoaded", () => {
    // Ventas por región
    new Chart(document.getElementById("ventasRegionChart"), {
      type: "bar",
      data: {
        labels: ["América", "Europa", "Asia", "Otros"],
        datasets: [{
          label: "Ventas por región",
          data: [400, 300, 350, 193],
          backgroundColor: "#ff3399"
        }]
      }
    });
  
    // Ventas por plataforma
    new Chart(document.getElementById("ventasPlataformaChart"), {
      type: "pie",
      data: {
        labels: ["PC", "PlayStation", "Xbox", "Móvil"],
        datasets: [{
          label: "Ventas por plataforma",
          data: [500, 300, 200, 243],
          backgroundColor: ["#ff3399", "#66ccff", "#99ff99", "#ffcc66"]
        }]
      }
    });
  
    // Descargas por plataforma
    new Chart(document.getElementById("descargasPlataformaChart"), {
      type: "bar",
      data: {
        labels: ["PC", "PlayStation", "Xbox", "Móvil"],
        datasets: [{
          label: "Descargas",
          data: [1000, 800, 700, 770],
          backgroundColor: "#66ccff"
        }]
      }
    });
  
    // Descargas por región
    new Chart(document.getElementById("descargasRegionChart"), {
      type: "doughnut",
      data: {
        labels: ["América", "Europa", "Asia", "Otros"],
        datasets: [{
          label: "Descargas por región",
          data: [900, 800, 1000, 570],
          backgroundColor: ["#33cccc", "#ff9966", "#99cc00", "#cc66ff"]
        }]
      }
    });
  
    // Actividad del usuario (tiempo de juego)
    new Chart(document.getElementById("tiempoJuegoChart"), {
      type: "line",
      data: {
        labels: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"],
        datasets: [{
          label: "Horas promedio jugadas",
          data: [2.5, 3, 2.8, 3.2, 3.5, 5, 4.2],
          backgroundColor: "rgba(255, 51, 153, 0.2)",
          borderColor: "#ff3399",
          fill: true,
          tension: 0.4
        }]
      }
    });
  
    // Engagement (usuarios frecuentes)
    new Chart(document.getElementById("engageChart"), {
      type: "bar",
      data: {
        labels: ["1 día", "2-3 días", "4-5 días", "6-7 días"],
        datasets: [{
          label: "Usuarios por frecuencia semanal",
          data: [100, 200, 160, 100],
          backgroundColor: "#ff66c4"
        }]
      }
    });
  });
  
  function guardarMensaje(event) {
    event.preventDefault();
    
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const telefono = document.getElementById('telefono').value;
    const mensaje = document.getElementById('mensaje').value;
  
    const nuevoMensaje = { nombre, email, telefono, mensaje };
  
    let mensajes = JSON.parse(localStorage.getItem('mensajesContacto')) || [];
    mensajes.push(nuevoMensaje);
    localStorage.setItem('mensajesContacto', JSON.stringify(mensajes));
  
    document.getElementById('contactForm').reset();
    document.getElementById('modalContacto').style.display = 'block';
  }
  
  function cerrarModalContacto() {
    document.getElementById('modalContacto').style.display = 'none';
  }

function mostrarCompras() {
    const compras = JSON.parse(localStorage.getItem("compras")) || [];
    const lista = document.getElementById("lista-compras");
    lista.innerHTML = "";

    compras.forEach((compra, index) => {
        const productosTexto = compra.productos.map(p => `${p.nombre} (x${p.cantidad})`).join(", ");

        const div = document.createElement("div");
        div.classList.add("usuario-item");

        div.innerHTML = `
            <p><strong>Nombre:</strong> ${compra.nombre} ${compra.apellido}</p>
            <p><strong>Email:</strong> ${compra.email}</p>
            <p><strong>Dirección:</strong> ${compra.direccion}</p>
            <p><strong>Productos:</strong> ${productosTexto}</p>
            <p><strong>Fecha:</strong> ${compra.fecha}</p>
            <button onclick="eliminarCompra(${index})">Eliminar</button>
        `;

        lista.appendChild(div);
    });
}

function eliminarCompra(indice) {
    let compras = JSON.parse(localStorage.getItem("compras")) || [];
    compras.splice(indice, 1);
    localStorage.setItem("compras", JSON.stringify(compras));
    mostrarCompras();
}

const producto = {
    nombre: "God of War Ragnarök",
    precio: 159
};

const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
carrito.push(producto);
localStorage.setItem("carrito", JSON.stringify(carrito));
