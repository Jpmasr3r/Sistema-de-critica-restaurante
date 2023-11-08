<?php

require_once "connection.php";

$output;

$res["nome"] = $_POST["nome"];
$res["endereco"] = $_POST["endereco"];
$res["dono"] = $_POST["dono"];
$res["nota"] = $_POST["nota"];
$res["foto"] = $_FILES["foto"];

$newNameFile = md5(microtime()) . $res["foto"]["name"];

move_uploaded_file($res["foto"]["tmp_name"], "../uploads/img/restaurante/" . $newNameFile);

$res["foto"] = "../assets/uploads/img/restaurante/" . $newNameFile;

$sql = "INSERT INTO restaurante(nome,endereco,foto,nota,userID) 
        VALUES (:nome,:endereco,:foto,:nota,:dono)";
$stmt = $conn->prepare($sql);

try {
    $stmt->execute($res);
    $output["status"] = "Restaurante cadastrado com sucesso";
    echo json_encode($res);

} catch (PDOException $e) {
    echo json_encode($res);
    $output["status"] = "Erro ao cadrastar restaurante " . $e->getMessage();

}
