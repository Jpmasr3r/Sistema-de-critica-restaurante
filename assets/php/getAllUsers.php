<?php

require_once "./connection.php";

$sql = "SELECT id,nome,email,telefone,tipo,foto FROM user";
$stmt = $conn->prepare($sql);
$stmt->execute();
$output = $stmt->fetchAll();

echo json_encode($output);
