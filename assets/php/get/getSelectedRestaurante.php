<?php

require_once "../connection.php";
session_start();

try {
    $sql = "SELECT
    restaurante.nome AS resNome,
    restaurante.endereco AS resEndereco,
    restaurante.foto AS resFoto,
    restaurante.nota AS resNota,
    user.nome AS userNome,
    user.id AS userID,
    user.email AS userEmail
    FROM restaurante
    INNER JOIN user
    ON user.id = restaurante.userID
    WHERE restaurante.id = ?";

    $stmt = $conn->prepare($sql);
    $stmt->execute([$_SESSION["selectRestaurante"]]);
    $output = $stmt->fetch();

    if($output) {
        $output["status"] = "OK";
    }else {
        $output["status"] = "Fail";
    }
    // if ($output["userEmail"] == $_SESSION["user"]["email"]) {
    //     $output["logado"] = true;
    // } else {
    //     $output["logado"] = false;
    // }
    // unset($output["userEmail"]);
    echo json_encode($output);
} catch (Exception $e) {
    $output["status"] = "Error: " . $e->getMessage();
    echo json_encode($output);
}
