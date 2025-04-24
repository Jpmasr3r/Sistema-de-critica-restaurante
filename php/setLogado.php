<?php

require_once "../connection.php";

$usu = [
    "email" => $_GET["email"],
    "senha" => $_GET["senha"],
];

$sql = "SELECT nome,email,telefone,tipo,foto,senha,id FROM user WHERE email = :email";
$stmt = $conn->prepare($sql);
$stmt->bindParam(":email", $usu["email"], PDO::PARAM_STR);
$stmt->execute();
$output = [
    "result" => $stmt->fetch(),
];
if ($output["result"]) {
    if (password_verify($usu["senha"], $output["result"]["senha"])) {
        unset($output["result"]["senha"]);

        session_start();
        $_SESSION["user"] = $output["result"];
        $output["status"] = "Logado com sucesso";
        echo json_encode($output);
    } else {
        $output["result"] = "";
        $output["status"] = "Email ou Senha incorreta";
        echo json_encode($output);
    }
} else {
    $output["result"] = "";
    $output["status"] = "Email ou Senha incorreta";
    echo json_encode($output);
}
