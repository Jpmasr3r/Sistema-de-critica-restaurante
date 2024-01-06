<?php

require_once "../connection.php";
session_start();

$sql = "SELECT
user.nome AS userNome,
user.foto AS userFoto,
critica.nota AS criticaNota,
critica.data AS criticaData,
critica.texto AS criticaTexto,
restaurante.id AS restauranteID,
restaurante.nome AS restauranteNome
FROM critica
INNER JOIN user ON user.id = critica.userID
INNER JOIN restaurante ON restaurante.id = critica.restauranteID
WHERE critica.userID = ?";
$stmt = $conn->prepare($sql);
$stmt->execute([$_SESSION["selectUser"]]);
$output = $stmt->fetchAll();

echo json_encode($output);
