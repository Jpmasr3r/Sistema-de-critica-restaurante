<?php

require_once "connection.php";

$output;

$usu["nome"] = $_POST["nome"];
$usu["email"] = $_POST["email"];
$usu["telefone"] = $_POST["telefone"];
$usu["senha"] = password_hash($_POST["senha"], PASSWORD_BCRYPT);
$usu["tipo"] = $_POST["tipo"];
$usu["foto"] = $_FILES["foto"];

$sql = "SELECT * FROM user WHERE email = :email";
$stmt = $conn->prepare($sql);
$stmt->bindParam(":email", $usu["email"], PDO::PARAM_STR);
$stmt->execute();
$output["result"] = $stmt->fetchAll();
if ($output["result"]) {
    $output["result"] = "";
    $output["status"] = "Usuario ja cadastrado";
    echo json_encode($output);
    exit();
}
$output["result"] = "";

$newNameFile = md5(microtime()) . $usu["foto"]["name"];

move_uploaded_file($usu["foto"]["tmp_name"], "../uploads/img/user/" . $newNameFile);

$usu["foto"] = "../assets/uploads/img/user/" . $newNameFile;

$sql = "INSERT INTO user(nome,email,telefone,senha,tipo,foto) 
        VALUES (:nome,:email,:telefone,:senha,:tipo,:foto)";
$stmt = $conn->prepare($sql);

try {
    $stmt->execute($usu);
    $output["status"] = "Usuario cadastrado com sucesso";
    echo json_encode($output);

} catch (PDOException $e) {
    echo json_encode($output);
    $output["status"] = "Erro ao cadrastar usuario " . $e->getMessage();

}
