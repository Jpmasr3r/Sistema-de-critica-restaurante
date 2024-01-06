<?php

require_once "../connection.php";
session_start();

try {
    $sql = "SELECT
    restaurante.nome AS resNome,
    restaurante.endereco AS resEndereco,
    restaurante.nota AS resNota,
    user.nome AS userNome,
    user.email AS userEmail,
    user.id AS userID
    FROM restaurante
    INNER JOIN user
    ON user.id = restaurante.userID
    WHERE restaurante.id = ?";

    $stmt = $conn->prepare($sql);
    $stmt->execute([$_SESSION["selectRestaurante"]]);
    $output = $stmt->fetch();
    $output["logado"] = $output["userEmail"] == $_SESSION["user"]["email"];
    $output["status"] = "OK";
    unset($output["userEmail"]);
    echo json_encode($output);
} catch (Exception $e) {
    $output = [
        "status" => "error",
        "message" =>  "Error: " . $e->getMessage()
    ];
    echo json_encode($output);
}
?>
