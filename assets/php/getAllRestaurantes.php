<?php

require_once "./connection.php";

$sql = "SELECT nome,endereco,foto,nota FROM restaurante";
$stmt = $conn->prepare($sql);
$stmt->execute();
$output = $stmt->fetchAll();

echo json_encode($output);