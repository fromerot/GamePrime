function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
}

function validarFormulario(event) {
    event.preventDefault();

    let nombre = document.getElementById('nombre').value;
    let email = document.getElementById('email').value;
    let mensaje = document.getElementById('mensaje').value;
    let telefono = document.getElementById('telefono').value;

    if (nombre === "" || email === "" || mensaje === ""|| telefono=== "") {
        alert("Por favor, completa todos los campos.");
    } else {
        abrirModalContacto();
    }
}

function abrirModalContacto() {
    document.getElementById("modalOverlay").style.display = "block";
    document.getElementById("modalContacto").style.display = "block";
}

function cerrarModalContacto() {
    document.getElementById("modalOverlay").style.display = "none";
    document.getElementById("modalContacto").style.display = "none";
    location.reload();
}


function validarFormularioReclamaciones(event) {
    event.preventDefault();

    let nombre = document.getElementById('nombre').value;
    let email = document.getElementById('email').value;
    let telefono = document.getElementById('telefono').value;
    let descripcion = document.getElementById('reclamacion').value;
    let fecha = document.getElementById('fecha').value;
    let archivo = document.getElementById('archivo').value;
    let terminos = document.getElementById('terminos').checked;
    
    if (nombre === "" || email === "" ||  telefono=== "" || descripcion== "" || fecha== "" || archivo== "" || !terminos) {
        alert("Por favor, completa todos los campos.");
    } else {
        abrirModalReclamaciones();
    }
}

function abrirModalReclamaciones() {
    document.getElementById("modalOverlay").style.display = "block";
    document.getElementById("modalReclamaciones").style.display = "block";
}

function cerrarModalReclamaciones() {
    document.getElementById("modalOverlay").style.display = "none";
    document.getElementById("modalReclamaciones").style.display = "none";
    location.reload();
}

let imagenCarrusel = 1;

function banner() {
    setInterval(function(){
        imagenCarrusel += 1;
        if (imagenCarrusel > 3) {
            imagenCarrusel = 1;
        }
        document.getElementById('img_banner').setAttribute("src", "imagenes/banner" + imagenCarrusel + ".jpg");
    }, 3000);
}

function agregarAlCarrito(producto) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito.push(producto);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    alert('Producto agregado al carrito');
    calcularTotal();
}


function calcularTotal() {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    let subtotal = 0;

    carrito.forEach(item => {
        let precio = parseFloat(item.precio.replace('S/', '').trim());
        subtotal += precio * (item.cantidad || 1);
    });

    const envio = 15;
    const impuestos = subtotal * 0.18;
    const total = subtotal + envio + impuestos;

    if (document.getElementById('precio-producto')) {
        document.getElementById('precio-producto').textContent = `S/${subtotal.toFixed(2)}`;
        document.getElementById('precio-envio').textContent = `S/${envio.toFixed(2)}`;
        document.getElementById('impuestos').textContent = `S/${impuestos.toFixed(2)}`;
        document.getElementById('total-compra').textContent = `S/${total.toFixed(2)}`;
    }
}


function resetearCarrito() {
    var reiniciar = window.confirm("¿Desea Reiniciar el Carrito?");
    if (reiniciar == true) {
        alert("Se reinicio el carrito"); 
        carrito = [];
        localStorage.removeItem('carrito');
        calcularTotal();
    } else {
        alert("No se reinicio el carrito");
    }
}


function confirmarCompra() {
    let nombres = document.getElementById('nombre').value;
    let apellidos = document.getElementById('apellido').value;
    let direccion = document.getElementById('direccion').value;
    let numeroTarjeta = document.getElementById('tarjeta').value;
    let fechaVencimiento = document.getElementById('fecha-vencimiento').value;
    let cvv = document.getElementById('cvv').value;

    if (nombres === "" || apellidos === "" || direccion === "" || numeroTarjeta === "" || fechaVencimiento === "" || cvv === "") {
        alert('Por favor, completa todos los campos antes de confirmar la compra.');
    } else {
        abrirModalCarrito();
        carrito = [];
        localStorage.removeItem('carrito');
        calcularTotal();
    }
}

function abrirModalCarrito() {
    document.getElementById("modalOverlay").style.display = "block";
    document.getElementById("modalGracias").style.display = "block";
}

function cerrarModalCarrito() {
    document.getElementById("modalOverlay").style.display = "none";
    document.getElementById("modalGracias").style.display = "none";
    location.reload();
}


function mostrarTipoTarjeta() {
    const tipoTarjeta = document.getElementById('tipo-tarjeta').value;

    if (tipoTarjeta === "visa") {
        alert("Has seleccionado Visa");
    } else if (tipoTarjeta === "mastercard") {
        alert("Has seleccionado MasterCard");
    } else {
        alert("Por favor selecciona un tipo de tarjeta.");
    }
}

function filtrarJuegos() {
    const categoriaSeleccionada = document.getElementById('categoria-juegos').value;
    const juegosLista = document.getElementById('juegos-lista');
    const juegos = juegosLista.getElementsByClassName('producto-item');

    if (!categoriaSeleccionada) {
        for (let juego of juegos) {
            juego.style.display = 'block'; 
        }
        return;
    }

    for (let juego of juegos) {
        if (juego.getAttribute('data-categoria') === categoriaSeleccionada) {
            juego.style.display = 'block'; 
        } else {
            juego.style.display = 'none'; 
        }
    }
}

function iniciarPagina() {
    
    if (window.location.href.includes('contactanos.html')) {
        document.getElementById('contactForm').addEventListener('submit', validarFormulario);
    }

    if (window.location.href.includes('carrito.html')) {
        calcularTotal();
        document.getElementById('resetCarrito').addEventListener('click', resetearCarrito);
        document.getElementById('boton-confirmar').addEventListener('click', confirmarCompra);
    }
    banner();
}

function obtenerProductosCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    if (carrito.length === 0) return 'Sin productos';

    const nombres = carrito.map(item => item.nombre).join(', ');
    return nombres;
}

function obtenerPrecioTotalCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    let total = 0;
    carrito.forEach(item => {
        const precioNumerico = parseFloat(item.precio.replace('S/', ''));
        total += precioNumerico * item.cantidad;
    });
    return `S/${total.toFixed(2)}`;
}

function agregarAlCarrito(producto) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito.push(producto);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    alert('Producto agregado al carrito');
    calcularTotal();
}

function calcularTotal() {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    let subtotal = 0;

    carrito.forEach(item => {
        if (item.precio) {
            let precioNumerico = parseFloat(item.precio.replace('S/', '').trim());
            subtotal += precioNumerico * (item.cantidad || 1);
        }
    });

    let envio = 15;
    let impuestos = subtotal * 0.18;
    let total = subtotal + envio + impuestos;

    document.getElementById('precio-producto').textContent = `S/${subtotal.toFixed(2)}`;
    document.getElementById('precio-envio').textContent = `S/${envio.toFixed(2)}`;
    document.getElementById('impuestos').textContent = `S/${impuestos.toFixed(2)}`;
    document.getElementById('total-compra').textContent = `S/${total.toFixed(2)}`;
}

function reiniciarCarrito() {
    localStorage.removeItem('carrito');
    alert('Carrito reiniciado');
    location.reload();
}

function confirmarCompra() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    if (carrito.length === 0) {
        alert("No hay productos en el carrito.");
        return;
    }

    alert("Compra confirmada. Gracias por tu compra.");
    localStorage.removeItem('carrito');
    location.reload();
}

window.onload = calcularTotal;