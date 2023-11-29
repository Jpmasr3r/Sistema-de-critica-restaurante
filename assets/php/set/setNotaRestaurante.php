<?php

require_once "../connection.php";
session_start();

$newNota = [
    "nota" => $_POST["nota"],
    "id" => $_SESSION["selectRestaurante"]
];

$sql = "UPDATE restaurante
SET nota = :nota
WHERE id = :id";
$stmt = $conn->prepare($sql);
try {
    $stmt->execute($newNota);
    echo "OK";
} catch (PDOException $e) {
    echo "Erro ao cadrastar critica " . $e->getMessage();
    exit();
}