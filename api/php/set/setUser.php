<?php

require_once "../connection.php";

$output;

$usu = [
    "nome" => $_POST["nome"],
    "email" => $_POST["email"],
    "telefone" => $_POST["telefone"],
    "senha" => password_hash($_POST["senha"], PASSWORD_BCRYPT),
    "tipo" => $_POST["tipo"],
    "foto" => $_FILES["foto"],
];

$sql = "SELECT * FROM user WHERE email = :email";
$stmt = $conn->prepare($sql);
$stmt->bindParam(":email", $usu["email"], PDO::PARAM_STR);
$stmt->execute();
$output["result"] = $stmt->fetchAll();
if ($output["result"]) {
    $output["result"] = "";
    echo "Usuario ja cadastrado";
    exit();
}

$newNameFile = md5(microtime()) . $usu["foto"]["name"];

try {
    move_uploaded_file($usu["foto"]["tmp_name"], "../../uploads/img/user/" . $newNameFile);
    $usu["foto"] = "../assets/uploads/img/user/" . $newNameFile;
} catch (PDOException $e) {
    echo "Erro ao cadrastar usuario " . $e->getMessage();
    exit();
}


$sql = "INSERT INTO user(nome,email,telefone,senha,tipo,foto)
        VALUES (:nome,:email,:telefone,:senha,:tipo,:foto)";
$stmt = $conn->prepare($sql);

try {
    $stmt->execute($usu);
    echo "OK";
} catch (PDOException $e) {
    echo "Erro ao cadrastar usuario " . $e->getMessage();
    exit();
}
