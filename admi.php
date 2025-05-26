<?php
header("Content-Type: application/json");

$host = "localhost";
$user = "root";
$password = "";
$dbname = "juegos_db";

$conn = new mysqli($host, $user, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(["status" => "error", "message" => "Conexión fallida"]));
}

// Obtener todos los productos
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $result = $conn->query("SELECT * FROM productos");
    $productos = [];
    while ($row = $result->fetch_assoc()) {
        $productos[] = $row;
    }
    echo json_encode($productos);
    exit();
}

// Insertar nuevo producto
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action']) && $_POST['action'] === 'add') {
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

// Eliminar producto
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action']) && $_POST['action'] === 'delete') {
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

echo json_encode(["status" => "error", "message" => "Acción no reconocida"]);
?>