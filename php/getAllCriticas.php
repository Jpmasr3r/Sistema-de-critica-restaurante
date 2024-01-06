<?php

require_once "../connection.php";
session_start();

$sql = "SELECT
user.nome AS userNome,
user.foto AS userFoto,
user.id AS userID,
critica.nota AS criticaNota,
critica.data AS criticaData,
critica.texto AS criticaTexto
FROM critica
INNER JOIN user ON user.id = critica.userID
WHERE critica.restauranteID = ?";
$stmt = $conn->prepare($sql);
$stmt->execute([$_SESSION["selectRestaurante"]]);
$output = $stmt->fetchAll();

echo json_encode($output);
