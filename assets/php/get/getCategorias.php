<?php

require_once "../connection.php";
session_start();

try {
    $sql = "SELECT
            categoria.nome AS categoriaNome,
            categoria.restauranteID AS categoriaRestauranteID,
            categoria.id AS categoriaID,
            restaurante.id AS restauranteID
            FROM categoria
            INNER JOIN restaurante ON restaurante.id = categoria.restauranteID
            WHERE restaurante.id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->execute([$_SESSION["selectRestaurante"]]);
    $data = $stmt->fetchAll();

    $output = [
        "success" => true,
        "message" =>  "Todas as categorias mostradas",
        "data" => $data
    ];

    echo json_encode($output);
} catch (Exception $e) {
    $output = [
        "success" => false,
        "message" =>  "Error: " . $e->getMessage()
    ];
    echo json_encode($output);
}
