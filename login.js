function login() {
    const user = document.getElementById("username").value.toLowerCase();
    const pass = document.getElementById("password").value;

    if (user === "admin" && pass === "admin123") {
        sessionStorage.setItem("sesionIniciada", "admin");
    window.location.href = "admi.html";
    } else if (user === "usuario" && pass === "user123") {
        sessionStorage.setItem("sesionIniciada", "usuario");
    window.location.href = "index.html";
    } else {
        alert("Credenciales incorrectas 😠");
    }
    }

window.onload = iniciarPagina;