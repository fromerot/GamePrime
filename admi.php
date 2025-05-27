<?php
header("Content-Type: application/json");
$conn = new mysqli("localhost", "root", "", "juegos_db");

if ($conn->connect_error) {
    die(json_encode(["status" => "error", "message" => "Conexión fallida"]));
}

// === PRODUCTOS ===
if ($_SERVER['REQUEST_METHOD'] === 'GET' && !isset($_GET['type'])) {
    $result = $conn->query("SELECT * FROM productos");
    $productos = [];
    while ($row = $result->fetch_assoc()) {
        $productos[] = $row;
    }
    echo json_encode($productos);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action']) && $_POST['action'] === 'add_producto') {
    $titulo = $conn->real_escape_string($_POST['titulo']);
    $categoria = $conn->real_escape_string($_POST['categoria']);
    $precio = floatval($_POST['precio']);
    $fecha_lanzamiento = $conn->real_escape_string($_POST['fecha_lanzamiento']);
    $descuento = isset($_POST['descuento']) ? floatval($_POST['descuento']) : null;

    $stmt = $conn->prepare("INSERT INTO productos (titulo, categoria, precio, fecha_lanzamiento, descuento) VALUES (?, ?, ?, ?, ?)");
    $stmt->bind_param("ssdss", $titulo, $categoria, $precio, $fecha_lanzamiento, $descuento);

    if ($stmt->execute()) {
        echo json_encode(["status" => "success"]);
    } else {
        echo json_encode(["status" => "error", "message" => $stmt->error]);
    }
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action']) && $_POST['action'] === 'delete_producto') {
    $id = intval($_POST['id']);
    $stmt = $conn->prepare("DELETE FROM productos WHERE id = ?");
    $stmt->bind_param("i", $id);
    if ($stmt->execute()) {
        echo json_encode(["status" => "success"]);
    } else {
        echo json_encode(["status" => "error", "message" => $stmt->error]);
    }
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action']) && $_POST['action'] === 'update_producto') {
    $id = intval($_POST['id']);
    $titulo = $conn->real_escape_string($_POST['titulo']);
    $categoria = $conn->real_escape_string($_POST['categoria']);
    $precio = floatval($_POST['precio']);
    $fecha_lanzamiento = $conn->real_escape_string($_POST['fecha_lanzamiento']);
    $descuento = isset($_POST['descuento']) ? floatval($_POST['descuento']) : null;

    $stmt = $conn->prepare("UPDATE productos SET titulo=?, categoria=?, precio=?, fecha_lanzamiento=?, descuento=? WHERE id=?");
    $stmt->bind_param("ssdssi", $titulo, $categoria, $precio, $fecha_lanzamiento, $descuento, $id);

    if ($stmt->execute()) {
        echo json_encode(["status" => "success"]);
    } else {
        echo json_encode(["status" => "error", "message" => $stmt->error]);
    }
    exit();
}

// === USUARIOS ===
if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['type']) && $_GET['type'] === 'usuarios') {
    $result = $conn->query("SELECT id, nombre, correo, rol FROM usuarios");
    $usuarios = [];
    while ($row = $result->fetch_assoc()) {
        $usuarios[] = $row;
    }
    echo json_encode($usuarios);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action']) && $_POST['action'] === 'add_usuario') {
    $nombre = $conn->real_escape_string($_POST['nombre']);
    $correo = $conn->real_escape_string($_POST['correo']);
    $rol = in_array($_POST['rol'], ['cliente', 'admin']) ? $_POST['rol'] : 'cliente';

    $stmt = $conn->prepare("INSERT INTO usuarios (nombre, correo, rol) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $nombre, $correo, $rol);

    if ($stmt->execute()) {
        echo json_encode(["status" => "success"]);
    } else {
        echo json_encode(["status" => "error", "message" => $stmt->error]);
    }
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action']) && $_POST['action'] === 'delete_usuario') {
    $id = intval($_POST['id']);
    $stmt = $conn->prepare("DELETE FROM usuarios WHERE id = ?");
    $stmt->bind_param("i", $id);
    if ($stmt->execute()) {
        echo json_encode(["status" => "success"]);
    } else {
        echo json_encode(["status" => "error", "message" => $stmt->error]);
    }
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action']) && $_POST['action'] === 'update_usuario') {
    $id = intval($_POST['id']);
    $nombre = $conn->real_escape_string($_POST['nombre']);
    $correo = $conn->real_escape_string($_POST['correo']);
    $rol = in_array($_POST['rol'], ['cliente', 'admin']) ? $_POST['rol'] : 'cliente';

    $stmt = $conn->prepare("UPDATE usuarios SET nombre=?, correo=?, rol=? WHERE id=?");
    $stmt->bind_param("sssi", $nombre, $correo, $rol, $id);

    if ($stmt->execute()) {
        echo json_encode(["status" => "success"]);
    } else {
        echo json_encode(["status" => "error", "message" => $stmt->error]);
    }
    exit();
}

// === PROVEEDORES ===
if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['type']) && $_GET['type'] === 'proveedores') {
    $result = $conn->query("SELECT id, nombre, correo, articulos FROM proveedores");
    $proveedores = [];
    while ($row = $result->fetch_assoc()) {
        $proveedores[] = $row;
    }
    echo json_encode($proveedores);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action']) && $_POST['action'] === 'add_proveedor') {
    $nombre = $conn->real_escape_string($_POST['nombre']);
    $correo = $conn->real_escape_string($_POST['correo']);
    $articulos = $conn->real_escape_string($_POST['articulos']);

    $stmt = $conn->prepare("INSERT INTO proveedores (nombre, correo, articulos) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $nombre, $correo, $articulos);

    if ($stmt->execute()) {
        echo json_encode(["status" => "success"]);
    } else {
        echo json_encode(["status" => "error", "message" => $stmt->error]);
    }
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action']) && $_POST['action'] === 'delete_proveedor') {
    $id = intval($_POST['id']);
    $stmt = $conn->prepare("DELETE FROM proveedores WHERE id = ?");
    $stmt->bind_param("i", $id);
    if ($stmt->execute()) {
        echo json_encode(["status" => "success"]);
    } else {
        echo json_encode(["status" => "error", "message" => $stmt->error]);
    }
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action']) && $_POST['action'] === 'update_proveedor') {
    $id = intval($_POST['id']);
    $nombre = $conn->real_escape_string($_POST['nombre']);
    $correo = $conn->real_escape_string($_POST['correo']);
    $articulos = $conn->real_escape_string($_POST['articulos']);

    $stmt = $conn->prepare("UPDATE proveedores SET nombre=?, correo=?, articulos=? WHERE id=?");
    $stmt->bind_param("sssi", $nombre, $correo, $articulos, $id);

    if ($stmt->execute()) {
        echo json_encode(["status" => "success"]);
    } else {
        echo json_encode(["status" => "error", "message" => $stmt->error]);
    }
    exit();
}

echo json_encode(["status" => "error", "message" => "Acción no reconocida"]);
?>