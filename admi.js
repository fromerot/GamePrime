document.addEventListener("DOMContentLoaded", () => {
  // === PRODUCTOS ===
  const formProducto = document.getElementById("formProducto");
  const listaProductos = document.getElementById("listaProductos");

  if (formProducto) {
    formProducto.addEventListener("submit", function(e) {
      e.preventDefault();

      const formData = new FormData();
      formData.append("action", "add_producto");
      formData.append("titulo", document.getElementById("tituloProducto").value.trim());
      formData.append("categoria", document.getElementById("categoriaProducto").value.trim());
      formData.append("precio", document.getElementById("precioProducto").value.trim());
      formData.append("fecha_lanzamiento", document.getElementById("fechaLanzamiento").value.trim());
      formData.append("descuento", document.getElementById("descuentoProducto").value.trim());

      fetch("admi.php", { method: "POST", body: formData })
        .then(res => res.json())
        .then(data => {
          if (data.status === "success") {
            alert("✅ Producto agregado correctamente.");
            formProducto.reset();
            cargarProductos();
          } else {
            alert("❌ Error al agregar producto: " + data.message);
          }
        });
    });
  }

  function cargarProductos() {
    fetch("admi.php")
      .then(res => res.json())
      .then(productos => {
        listaProductos.innerHTML = "";
        productos.forEach(p => {
          const li = document.createElement("li");
          li.textContent = `${p.titulo} - $${parseFloat(p.precio).toFixed(2)} - ${p.categoria}`;

          const btnModificar = document.createElement("button");
          btnModificar.textContent = "Modificar";
          btnModificar.className = "modificar";
          btnModificar.onclick = () => modificarProducto(p.id, p.titulo, p.categoria, p.precio, p.fecha_lanzamiento, p.descuento);

          const btnEliminar = document.createElement("button");
          btnEliminar.textContent = "Eliminar";
          btnEliminar.className = "eliminar";
          btnEliminar.onclick = () => eliminarProducto(p.id);

          li.appendChild(btnModificar);
          li.appendChild(btnEliminar);
          listaProductos.appendChild(li);
        });
      });
  }

  function eliminarProducto(id) {
    if (!confirm("¿Estás seguro de eliminar este producto?")) return;

    const formData = new FormData();
    formData.append("action", "delete_producto");
    formData.append("id", id);

    fetch("admi.php", { method: "POST", body: formData })
      .then(res => res.json())
      .then(data => {
        if (data.status === "success") {
          alert("🗑️ Producto eliminado.");
          cargarProductos();
        } else {
          alert("❌ Error al eliminar producto: " + data.message);
        }
      });
  }

  function modificarProducto(id, titulo, categoria, precio, fecha, descuento) {
    const nuevoTitulo = prompt("Nuevo título:", titulo);
    const nuevaCategoria = prompt("Nueva categoría:", categoria);
    const nuevoPrecio = prompt("Nuevo precio:", precio);
    const nuevaFecha = prompt("Fecha de lanzamiento:", fecha);
    const nuevoDescuento = prompt("Descuento (%):", descuento || "");

    const formData = new FormData();
    formData.append("action", "update_producto");
    formData.append("id", id);
    formData.append("titulo", nuevoTitulo);
    formData.append("categoria", nuevaCategoria);
    formData.append("precio", parseFloat(nuevoPrecio));
    formData.append("fecha_lanzamiento", nuevaFecha);
    formData.append("descuento", nuevoDescuento);

    fetch("admi.php", { method: "POST", body: formData })
      .then(res => res.json())
      .then(data => {
        if (data.status === "success") {
          alert("✏️ Producto actualizado.");
          cargarProductos();
        } else {
          alert("❌ Error al actualizar producto: " + data.message);
        }
      });
  }

  // === USUARIOS ===
  const formUsuario = document.getElementById("formUsuario");
  const listaUsuarios = document.getElementById("listaUsuarios");

  if (formUsuario) {
    formUsuario.addEventListener("submit", function(e) {
      e.preventDefault();

      const formData = new FormData();
      formData.append("action", "add_usuario");
      formData.append("nombre", document.getElementById("nombreUsuario").value.trim());
      formData.append("correo", document.getElementById("correoUsuario").value.trim());
      formData.append("rol", document.getElementById("rolUsuario").value);

      fetch("admi.php", { method: "POST", body: formData })
        .then(res => res.json())
        .then(data => {
          if (data.status === "success") {
            alert("👤 Usuario agregado correctamente.");
            formUsuario.reset();
            cargarUsuarios();
          } else {
            alert("❌ Error al agregar usuario: " + data.message);
          }
        });
    });
  }

  function cargarUsuarios() {
    fetch("admi.php?type=usuarios")
      .then(res => res.json())
      .then(usuarios => {
        listaUsuarios.innerHTML = "";
        usuarios.forEach(u => {
          const li = document.createElement("li");
          li.textContent = `${u.nombre} - ${u.correo} - Rol: ${u.rol}`;

          const btnModificar = document.createElement("button");
          btnModificar.textContent = "Modificar";
          btnModificar.className = "modificar";
          btnModificar.onclick = () => modificarUsuario(u.id, u.nombre, u.correo, u.rol);

          const btnEliminar = document.createElement("button");
          btnEliminar.textContent = "Eliminar";
          btnEliminar.className = "eliminar";
          btnEliminar.onclick = () => eliminarUsuario(u.id);

          li.appendChild(btnModificar);
          li.appendChild(btnEliminar);
          listaUsuarios.appendChild(li);
        });
      });
  }

  function eliminarUsuario(id) {
    if (!confirm("¿Estás seguro de eliminar a este usuario?")) return;

    const formData = new FormData();
    formData.append("action", "delete_usuario");
    formData.append("id", id);

    fetch("admi.php", { method: "POST", body: formData })
      .then(res => res.json())
      .then(data => {
        if (data.status === "success") {
          alert("🗑️ Usuario eliminado.");
          cargarUsuarios();
        } else {
          alert("❌ Error al eliminar usuario: " + data.message);
        }
      });
  }

  function modificarUsuario(id, nombre, correo, rol) {
    const nuevoNombre = prompt("Nuevo nombre:", nombre);
    const nuevoCorreo = prompt("Nuevo correo:", correo);
    const nuevoRol = prompt("Nuevo rol (cliente/admin):", rol);

    const formData = new FormData();
    formData.append("action", "update_usuario");
    formData.append("id", id);
    formData.append("nombre", nuevoNombre);
    formData.append("correo", nuevoCorreo);
    formData.append("rol", nuevoRol);

    fetch("admi.php", { method: "POST", body: formData })
      .then(res => res.json())
      .then(data => {
        if (data.status === "success") {
          alert("✏️ Usuario actualizado.");
          cargarUsuarios();
        } else {
          alert("❌ Error al actualizar usuario: " + data.message);
        }
      });
  }

  // === PROVEEDORES ===
  const formProveedor = document.getElementById("formProveedor");
  const listaProveedores = document.getElementById("listaProveedores");

  if (formProveedor) {
    formProveedor.addEventListener("submit", function(e) {
      e.preventDefault();

      const formData = new FormData();
      formData.append("action", "add_proveedor");
      formData.append("nombre", document.getElementById("nombreProveedor").value.trim());
      formData.append("correo", document.getElementById("correoProveedor").value.trim());
      formData.append("articulos", document.getElementById("articulosProveedor").value.trim());

      fetch("admi.php", { method: "POST", body: formData })
        .then(res => res.json())
        .then(data => {
          if (data.status === "success") {
            alert("📦 Proveedor agregado correctamente.");
            formProveedor.reset();
            cargarProveedores();
          } else {
            alert("❌ Error al agregar proveedor: " + data.message);
          }
        });
    });
  }

  function cargarProveedores() {
    fetch("admi.php?type=proveedores")
      .then(res => res.json())
      .then(proveedores => {
        listaProveedores.innerHTML = "";
        proveedores.forEach(p => {
          const li = document.createElement("li");
          li.textContent = `${p.nombre} - ${p.correo} - Artículos: ${p.articulos}`;

          const btnModificar = document.createElement("button");
          btnModificar.textContent = "Modificar";
          btnModificar.className = "modificar";
          btnModificar.onclick = () => modificarProveedor(p.id, p.nombre, p.correo, p.articulos);

          const btnEliminar = document.createElement("button");
          btnEliminar.textContent = "Eliminar";
          btnEliminar.className = "eliminar";
          btnEliminar.onclick = () => eliminarProveedor(p.id);

          li.appendChild(btnModificar);
          li.appendChild(btnEliminar);
          listaProveedores.appendChild(li);
        });
      });
  }

  function eliminarProveedor(id) {
    if (!confirm("¿Estás seguro de eliminar a este proveedor?")) return;

    const formData = new FormData();
    formData.append("action", "delete_proveedor");
    formData.append("id", id);

    fetch("admi.php", { method: "POST", body: formData })
      .then(res => res.json())
      .then(data => {
        if (data.status === "success") {
          alert("🗑️ Proveedor eliminado.");
          cargarProveedores();
        } else {
          alert("❌ Error al eliminar proveedor: " + data.message);
        }
      });
  }

  function modificarProveedor(id, nombre, correo, articulos) {
    const nuevoNombre = prompt("Nuevo nombre:", nombre);
    const nuevoCorreo = prompt("Nuevo correo:", correo);
    const nuevosArticulos = prompt("Nuevos artículos:", articulos);

    const formData = new FormData();
    formData.append("action", "update_proveedor");
    formData.append("id", id);
    formData.append("nombre", nuevoNombre);
    formData.append("correo", nuevoCorreo);
    formData.append("articulos", nuevosArticulos);

    fetch("admi.php", { method: "POST", body: formData })
      .then(res => res.json())
      .then(data => {
        if (data.status === "success") {
          alert("✏️ Proveedor actualizado.");
          cargarProveedores();
        } else {
          alert("❌ Error al actualizar proveedor: " + data.message);
        }
      });
  }

  // Cargar todo al iniciar
  cargarProductos();
  cargarUsuarios();
  cargarProveedores();
});