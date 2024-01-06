<?php

require_once "../connection.php";
session_start();

$output;

$res["nome"] = $_POST["nome"];
$res["endereco"] = $_POST["endereco"];
$res["nota"] = $_POST["nota"];
$res["foto"] = $_FILES["foto"];
$res["dono"] = $_SESSION["user"]["id"];

$newNameFile = md5(microtime()) . $res["foto"]["name"];

move_uploaded_file($res["foto"]["tmp_name"], "../../uploads/img/restaurante/" . $newNameFile);

$res["foto"] = "../assets/uploads/img/restaurante/" . $newNameFile;

$sql = "INSERT INTO restaurante(nome,endereco,foto,nota,userID)
        VALUES (:nome,:endereco,:foto,:nota,:dono)";
$stmt = $conn->prepare($sql);

try {
    $stmt->execute($res);
    echo "OK";
} catch (PDOException $e) {
    echo "Erro ao cadrastar restaurante " . $e->getMessage();
}
