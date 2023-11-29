<?php

require_once "../connection.php";
session_start();

try {
    $categoria = [
        "nome" => $_POST["cNome"],
        "restauranteID" => $_SESSION["selectRestaurante"]
    ];

    $sql = "SELECT userID FROM restaurante WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->execute([$_SESSION["selectRestaurante"]]);
    $userID = $stmt->fetchAll();

    if ($userID = $_SESSION["user"]["id"]) {
        $sql = "INSERT INTO categoria(nome,restauranteID) VALUES (:nome,:restauranteID)";
        $stmt = $conn->prepare($sql);
        $stmt->execute($categoria);

        $output = [
            "success" => true,
            "message" => "Categoria adicionada com sucesso",
        ];
    }else {
        $output = [
            "success" => false,
            "message" => "Você não é o dono deste restaurante",
        ];
    }


    echo json_encode($output);
} catch (Exception $e) {
    $output = [
        "success" => false,
        "message" =>  "Error: " . $e->getMessage()
    ];
    echo json_encode($output);
}
