<?php

require_once "./connection.php";

$usu["email"] = $_GET["email"];
$usu["senha"] = $_GET["senha"];

$sql = "SELECT id,nome,email,telefone,tipo,foto,senha FROM user WHERE email = :email";
$stmt = $conn->prepare($sql);
$stmt->bindParam(':email', $usu["email"]);
$stmt->execute();
$output["result"] = $stmt->fetch();
if($output["result"]) {
    $output["status"] = "Sucess";
}else {
    $output["status"] = "Nenhum usuario encontrado";
    echo json_encode($output);
    exit();
}

if(password_verify($usu["senha"],$output["result"]["senha"]) ){
    unset($output["result"]["senha"]);
    echo json_encode($output);
    exit();
}else {
    $output["result"] = "";
    $output["status"] = "Senha incorreta";
    echo json_encode($output);
    exit();
}


