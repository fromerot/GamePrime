document.addEventListener("DOMContentLoaded", () => {
  // === PRODUCTOS ===
  const formProducto = document.getElementById("formProducto");
  const listaProductos = document.getElementById("listaProductos");

  function cargarProductos() {
    fetch('admi.php')
      .then(res => res.json())
      .then(productos => {
        listaProductos.innerHTML = '';
        if (!Array.isArray(productos)) return;
        productos.forEach(p => {
          const li = document.createElement('li');
          li.textContent = `${p.titulo} - ${p.categoria} - $${parseFloat(p.precio).toFixed(2)}`;
          const btnEditar = document.createElement('button');
          btnEditar.textContent = 'Editar';
          btnEditar.onclick = () => editarProducto(p.id, p.titulo, p.categoria, p.precio, p.fecha_lanzamiento, p.descuento);
          const btnEliminar = document.createElement('button');
          btnEliminar.textContent = 'Eliminar';
          btnEliminar.onclick = () => eliminarProducto(p.id);
          li.appendChild(btnEditar);
          li.appendChild(btnEliminar);
          listaProductos.appendChild(li);
        });
      });
  }

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

      fetch('admi.php', { method: 'POST', body: formData })
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

  function eliminarProducto(id) {
    if (!confirm("¿Estás seguro de eliminar este producto?")) return;

    const formData = new FormData();
    formData.append('action', 'delete_producto');
    formData.append('id', id);

    fetch('admi.php', { method: 'POST', body: formData })
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

  function editarProducto(id, titulo, categoria, precio, fecha, descuento) {
    const nuevoTitulo = prompt("Nuevo título:", titulo);
    const nuevaCategoria = prompt("Nueva categoría:", categoria);
    const nuevoPrecio = prompt("Nuevo precio:", precio);
    const nuevaFecha = prompt("Fecha de lanzamiento:", fecha);
    const nuevoDescuento = prompt("Descuento (%):", descuento);

    const formData = new FormData();
    formData.append('action', 'update_producto');
    formData.append('id', id);
    formData.append('titulo', nuevoTitulo);
    formData.append('categoria', nuevaCategoria);
    formData.append('precio', nuevoPrecio);
    formData.append('fecha_lanzamiento', nuevaFecha);
    formData.append('descuento', nuevoDescuento);

    fetch('admi.php', { method: 'POST', body: formData })
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success') {
          alert('✏️ Producto actualizado.');
          cargarProductos();
        } else {
          alert('❌ Error al actualizar producto: ' + data.message);
        }
      });
  }

  // === USUARIOS ===
  const formUsuario = document.getElementById("formUsuario");
  const listaUsuarios = document.getElementById("listaUsuarios");

  function cargarUsuarios() {
    fetch('admi.php?type=usuarios')
      .then(res => res.json())
      .then(usuarios => {
        listaUsuarios.innerHTML = '';
        if (!Array.isArray(usuarios)) return;
        usuarios.forEach(u => {
          const div = document.createElement('div');
          div.dataset.id = u.id;
          div.innerHTML = `
            ${u.nombre} - ${u.correo} - Rol: ${u.rol}
            <button onclick="editarUsuario(${u.id}, '${u.nombre}', '${u.correo}', '${u.rol}')">Editar</button>
            <button onclick="eliminarUsuario(${u.id})">Eliminar</button>
          `;
          listaUsuarios.appendChild(div);
        });
      });
  }

  if (formUsuario) {
    formUsuario.addEventListener('submit', function(e) {
      e.preventDefault();

      const formData = new FormData();
      formData.append('action', 'add_usuario');
      formData.append('nombre', document.getElementById('nombreUsuario').value.trim());
      formData.append('correo', document.getElementById('correoUsuario').value.trim());
      formData.append('rol', document.getElementById('rolUsuario').value);

      fetch('admi.php', { method: 'POST', body: formData })
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

  function eliminarUsuario(id) {
    if (!confirm("¿Estás seguro de eliminar a este usuario?")) return;

    const formData = new FormData();
    formData.append('action', 'delete_usuario');
    formData.append('id', id);

    fetch('admi.php', { method: 'POST', body: formData })
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

  window.editarUsuario = function(id, nombre, correo, rol) {
    const nuevoNombre = prompt("Nuevo nombre:", nombre);
    const nuevoCorreo = prompt("Nuevo correo:", correo);
    const nuevoRol = prompt("Nuevo rol (cliente/admin):", rol);

    const formData = new FormData();
    formData.append('action', 'update_usuario');
    formData.append('id', id);
    formData.append('nombre', nuevoNombre);
    formData.append('correo', nuevoCorreo);
    formData.append('rol', nuevoRol);

    fetch('admi.php', { method: 'POST', body: formData })
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success') {
          alert('✏️ Usuario actualizado.');
          cargarUsuarios();
        } else {
          alert('❌ Error al actualizar usuario: ' + data.message);
        }
      });
  }

  // === PROVEEDORES ===
  const formProveedor = document.getElementById("formProveedor");
  const listaProveedores = document.getElementById("listaProveedores");

  function cargarProveedores() {
    fetch('admi.php?type=proveedores')
      .then(res => res.json())
      .then(proveedores => {
        listaProveedores.innerHTML = '';
        if (!Array.isArray(proveedores)) return;
        proveedores.forEach(p => {
          const li = document.createElement('li');
          li.textContent = `${p.nombre} - ${p.correo} - Artículos: ${p.articulos}`;
          const btnEditar = document.createElement('button');
          btnEditar.textContent = 'Editar';
          btnEditar.onclick = () => editarProveedor(p.id, p.nombre, p.correo, p.articulos);
          const btnEliminar = document.createElement('button');
          btnEliminar.textContent = 'Eliminar';
          btnEliminar.onclick = () => eliminarProveedor(p.id);
          li.appendChild(btnEditar);
          li.appendChild(btnEliminar);
          listaProveedores.appendChild(li);
        });
      });
  }

  if (formProveedor) {
    formProveedor.addEventListener('submit', function(e) {
      e.preventDefault();

      const formData = new FormData();
      formData.append('action', 'add_proveedor');
      formData.append('nombre', document.getElementById('nombreProveedor').value.trim());
      formData.append('correo', document.getElementById('correoProveedor').value.trim());
      formData.append('articulos', document.getElementById('articulosProveedor').value.trim());

      fetch('admi.php', { method: 'POST', body: formData })
        .then(res => res.json())
        .then(data => {
          if (data.status === 'success') {
            alert('📦 Proveedor agregado correctamente.');
            formProveedor.reset();
            cargarProveedores();
          } else {
            alert('❌ Error al agregar proveedor: ' + data.message);
          }
        });
    });
  }

  function eliminarProveedor(id) {
    if (!confirm("¿Estás seguro de eliminar este proveedor?")) return;

    const formData = new FormData();
    formData.append('action', 'delete_proveedor');
    formData.append('id', id);

    fetch('admi.php', { method: 'POST', body: formData })
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success') {
          alert('🗑️ Proveedor eliminado.');
          cargarProveedores();
        } else {
          alert('❌ Error al eliminar proveedor: ' + data.message);
        }
      });
  }

  function editarProveedor(id, nombre, correo, articulos) {
    const nuevoNombre = prompt("Nuevo nombre:", nombre);
    const nuevoCorreo = prompt("Nuevo correo:", correo);
    const nuevosArticulos = prompt("Nuevos artículos:", articulos);

    const formData = new FormData();
    formData.append('action', 'update_proveedor');
    formData.append('id', id);
    formData.append('nombre', nuevoNombre);
    formData.append('correo', nuevoCorreo);
    formData.append('articulos', nuevosArticulos);

    fetch('admi.php', { method: 'POST', body: formData })
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success') {
          alert('✏️ Proveedor actualizado.');
          cargarProveedores();
        } else {
          alert('❌ Error al actualizar proveedor: ' + data.message);
        }
      });
  }

  // Inicializar todo
  cargarProductos();
  cargarUsuarios();
  cargarProveedores();

  // === GRÁFICOS CON CHART.JS ===
  const ctxVentasRegion = document.getElementById('ventasRegionChart')?.getContext('2d');
  const ctxVentasPlataforma = document.getElementById('ventasPlataformaChart')?.getContext('2d');

  if (ctxVentasRegion) {
    new Chart(ctxVentasRegion, {
      type: 'bar',
      data: {
        labels: ['América', 'Europa', 'Asia', 'Otros'],
        datasets: [{
          label: 'Ventas por Región',
          data: [400, 300, 350, 193],
          backgroundColor: '#ff3399'
        }]
      }
    });
  }

  if (ctxVentasPlataforma) {
    new Chart(ctxVentasPlataforma, {
      type: 'pie',
      data: {
        labels: ['PC', 'PlayStation', 'Xbox', 'Móvil'],
        datasets: [{
          label: 'Ventas por Plataforma',
          data: [500, 300, 200, 243],
          backgroundColor: ['#ff3399', '#66ccff', '#99ff99', '#ffcc66']
        }]
      }
    });
  }
});