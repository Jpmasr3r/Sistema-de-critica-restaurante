<?php

require_once "../connection.php";
session_start();

try {
    $sql = "SELECT nome,telefone,tipo,foto,email FROM user WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->execute([$_SESSION["selectUser"]]);
    $output = $stmt->fetch();
    if($_SESSION["user"]["email"] == $output["email"]) {
        $output["logado"] = true;
    }else {
        $output["logado"] = false;
    }
    unset($output["email"]);
    echo json_encode($output);
} catch (Exception $e) {
    echo "Error: " . $e->getMessage();
}