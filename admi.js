document.addEventListener("DOMContentLoaded", () => {
  const formProducto = document.getElementById("formProducto");
  const listaProductos = document.getElementById("listaProductos");
  const formUsuario = document.getElementById("formUsuario");
  const listaUsuarios = document.getElementById("listaUsuarios");

  // Cargar productos
  function cargarProductos() {
      fetch('admi.php')
          .then(res => res.json())
          .then(productos => {
              listaProductos.innerHTML = '';
              if (!Array.isArray(productos)) return;
              productos.forEach(p => {
                  const li = document.createElement('li');
                  li.textContent = `${p.titulo} - ${p.categoria} - $${parseFloat(p.precio).toFixed(2)}`;
                  const btnEliminar = document.createElement('button');
                  btnEliminar.textContent = 'Eliminar';
                  btnEliminar.style.marginLeft = '10px';
                  btnEliminar.onclick = () => eliminarProducto(p.id);
                  li.appendChild(btnEliminar);
                  listaProductos.appendChild(li);
              });
          });
  }

  // Agregar producto
  if (formProducto) {
      formProducto.addEventListener('submit', function(e) {
          e.preventDefault();

          const formData = new FormData();
          formData.append('action', 'add_producto');
          formData.append('titulo', document.getElementById('tituloProducto').value.trim());
          formData.append('categoria', document.getElementById('categoriaProducto').value.trim());
          formData.append('precio', document.getElementById('precioProducto').value.trim());
          formData.append('fecha_lanzamiento', document.getElementById('fechaLanzamiento').value.trim());
          formData.append('descuento', document.getElementById('descuentoProducto').value.trim());

          fetch('admi.php', {
              method: 'POST',
              body: formData
          })
          .then(res => res.json())
          .then(data => {
              if (data.status === 'success') {
                  alert('✅ Producto agregado correctamente.');
                  formProducto.reset();
                  cargarProductos();
              } else {
                  alert('❌ Error al agregar producto: ' + data.message);
              }
          });
      });
  }

  // Eliminar producto
  function eliminarProducto(id) {
      if (!confirm("¿Estás seguro de eliminar este producto?")) return;

      const formData = new FormData();
      formData.append('action', 'delete_producto');
      formData.append('id', id);

      fetch('admi.php', {
          method: 'POST',
          body: formData
      })
      .then(res => res.json())
      .then(data => {
          if (data.status === 'success') {
              alert('🗑️ Producto eliminado.');
              cargarProductos();
          } else {
              alert('❌ Error al eliminar producto: ' + data.message);
          }
      });
  }

  // Cargar usuarios
  function cargarUsuarios() {
      fetch('admi.php?type=usuarios')
          .then(res => res.json())
          .then(usuarios => {
              listaUsuarios.innerHTML = '';
              usuarios.forEach(u => {
                  const div = document.createElement('div');
                  div.classList.add('usuario-card');
                  div.dataset.id = u.id;
                  div.innerHTML = `
                      <input type="text" value="${u.nombre}" disabled class="nombre" />
                      <input type="email" value="${u.correo}" disabled class="correo" />
                      <input type="text" value="${u.rol}" disabled class="rol" />
                      <button onclick="eliminarUsuario(${u.id})">Eliminar</button>
                  `;
                  listaUsuarios.appendChild(div);
              });
          });
  }

  // Agregar usuario
  if (formUsuario) {
      formUsuario.addEventListener('submit', function(e) {
          e.preventDefault();

          const formData = new FormData();
          formData.append('action', 'add_usuario');
          formData.append('nombre', document.getElementById('nombreUsuario').value.trim());
          formData.append('correo', document.getElementById('correoUsuario').value.trim());
          formData.append('rol', document.getElementById('rolUsuario').value);

          fetch('admi.php', {
              method: 'POST',
              body: formData
          })
          .then(res => res.json())
          .then(data => {
              if (data.status === 'success') {
                  alert('👤 Usuario agregado correctamente.');
                  formUsuario.reset();
                  cargarUsuarios();
              } else {
                  alert('❌ Error al agregar usuario: ' + data.message);
              }
          });
      });
  }

  // Eliminar usuario
  window.eliminarUsuario = function(id) {
      if (!confirm("¿Estás seguro de eliminar a este usuario?")) return;

      const formData = new FormData();
      formData.append('action', 'delete_usuario');
      formData.append('id', id);

      fetch('admi.php', {
          method: 'POST',
          body: formData
      })
      .then(res => res.json())
      .then(data => {
          if (data.status === 'success') {
              alert('🗑️ Usuario eliminado.');
              cargarUsuarios();
          } else {
              alert('❌ Error al eliminar usuario: ' + data.message);
          }
      });
  }

  // Inicializar
  cargarProductos();
  cargarUsuarios();
});