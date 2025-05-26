document.addEventListener("DOMContentLoaded", () => {
  const formProducto = document.getElementById("formProducto");
  const listaProductos = document.getElementById("listaProductos");

  // Cargar productos al iniciar
  cargarProductos();

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
          })
          .catch(err => console.error("Error al cargar productos:", err));
  }

  // Agregar producto
  if (formProducto) {
      formProducto.addEventListener('submit', function(e) {
          e.preventDefault();

          const formData = new FormData();
          formData.append('action', 'add');
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
                  alert('❌ Error al agregar: ' + (data.message || "Desconocido"));
              }
          })
          .catch(err => alert('⚠️ Error: ' + err.message));
      });
  }

  // Eliminar producto
  function eliminarProducto(id) {
      if (!confirm("¿Estás seguro de eliminar este producto?")) return;

      const formData = new FormData();
      formData.append('action', 'delete');
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
              alert('❌ Error al eliminar: ' + (data.message || "Desconocido"));
          }
      })
      .catch(err => alert('⚠️ Error: ' + err.message));
  }
});