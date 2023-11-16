<?php

require_once "./connection.php";
session_start();

$sql = "SELECT nome,email,telefone,tipo,foto FROM user WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->execute([$_GET["id"]]);
$output = $stmt->fetch();

$_SESSION["selectUser"] = $output;
