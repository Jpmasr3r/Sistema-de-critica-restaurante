<?php

require_once "./connection.php";

$usu["nome"] = $_POST["nome"];
$usu["email"] = $_POST["email"];
$usu["telefone"] = $_POST["telefone"];
$usu["senha"] = password_hash($_POST["senha"], PASSWORD_DEFAULT);
$usu["tipo"] = $_POST["tipo"];
$usu["foto"] = $_FILES["foto"];

$sql = "SELECT id,nome,email,telefone,tipo,foto FROM user";
$stmt = $conn->prepare($sql);
$stmt->execute();
$output["result"] = $stmt->fetchAll();
$output["status"] = "Sucess";

foreach ($output["result"] as $e) {
    if ($e["email"] == $usu["email"]) {
        $output["result"] = "";
        $output["status"] = "Usuario ja cadastrado";
        echo json_encode($output);
        exit();
    }
}

$output["result"] = "";

$arquivoNovo = explode(".",$usu["foto"]["name"]);

$extensionFile = pathinfo($usu["foto"]["name"], PATHINFO_EXTENSION);
$novoNome = md5(microtime()) . "." . $extensionFile;

move_uploaded_file($usu["foto"]["tmp_name"],"../uploads/img/". $novoNome); 

$usu["foto"] = "/assets/uploads/img/" . $novoNome;

$sql = "INSERT INTO user(nome,email,telefone,senha,tipo,foto) 
        VALUES (:nome, :email, :telefone, :senha, :tipo, :foto)";
$stmt = $conn->prepare($sql);

try {
    $stmt->execute($usu);
    echo json_encode($output);
} catch (PDOException $erro) {
    echo "ERRO => " . $erro->getMessage();
}
