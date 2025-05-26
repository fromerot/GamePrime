// fecha y hora 
function actualizarFechaHora() {
    setInterval(function() {
        let ahora = new Date();
        let fecha = ahora.toLocaleDateString();
        let hora = ahora.toLocaleTimeString();

        document.getElementById('fecha').innerText = "Fecha: " + fecha;
        document.getElementById('tiempo').innerText = "Hora: " + hora;
    }, 1000);
}

// contactenos el formulario
function validarFormulario(event) {
    event.preventDefault();
    
    let nombre = document.getElementById('nombre').value;
    let email = document.getElementById('email').value;
    let mensaje = document.getElementById('mensaje').value;

    if (nombre === "" || email === "" || mensaje === "") {
        alert("Por favor, completa todos los campos.");
    } else {
        alert("Formulario enviado correctamente.");
    }
}

if (window.location.href.includes('contactanos.html')) {
    document.getElementById('contactForm').addEventListener('submit', validarFormulario);
}


// Carrusel de imágenes
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


// Carrito
let carrito = [];

// carrito 1 (dar valor)
function agregarAlCarrito(precioProducto) {
    carrito.push(precioProducto);
    localStorage.setItem(       'carrito', JSON.stringify(carrito));
    alert('Producto agregado al carrito');
}

// carrito 2 (precios y promedio)
function calcularTotal() {
    let carritoGuardado = JSON.parse(localStorage.getItem('carrito'));
    if (carritoGuardado && carritoGuardado.length > 0) {
        carrito = carritoGuardado;
    }
    
    let precioProducto = carrito.reduce((acc, curr) => acc + curr, 0);
    let precioEnvio = 15;
    let impuestos = precioProducto * 0.18;
    let total = precioProducto + precioEnvio + impuestos;

    document.getElementById('precio-producto').textContent = `S/${precioProducto.toFixed(2)}`;
    document.getElementById('impuestos').textContent = `S/${impuestos.toFixed(2)}`;
    document.getElementById('total-compra').textContent = `S/${total.toFixed(2)}`;
}

//carrito 3 (reset)
function resetearCarrito() {
    carrito = [];
    localStorage.removeItem('carrito');
    calcularTotal();
    alert('El carrito ha sido reiniciado.');
}

// carrito 4 (boton confirmar compra)
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
        alert('Compra confirmada. ¡Gracias por tu compra!');
        alert('te hemos enviado el codigo para cangear el producto a tu e-mail');
    }
}

// total y los demas calculados antes de cargar la pagina
if (window.location.href.includes('carrito.html')) {
    calcularTotal();

    document.getElementById('resetCarrito').addEventListener('click', resetearCarrito);
    document.getElementById('boton-confirmar').addEventListener('click', confirmarCompra);
}


// cargar las funciones
function iniciarPagina() {
    banner();
    actualizarFechaHora();
    validarFormulario();
    agregarAlCarrito();
    calcularTotal();
    confirmarCompra();

}