if (!sessionStorage.getItem("edadConfirmada")) {
    var confirmar = window.prompt("Coloca tu edad 👾");
    if (confirmar >= 18) {
        alert("Bienvenido a Game Prime 🥵");
        sessionStorage.setItem("edadConfirmada", true); 
    } else {
        alert("Más te vale, no utilizar la tarjeta de tus padres 🧐");
        sessionStorage.setItem("edadConfirmada", true); 
    }
}
