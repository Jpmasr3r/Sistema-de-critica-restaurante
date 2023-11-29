<?php

require_once "../connection.php";
session_start();

try {
    $sql = "SELECT comida.nome AS comidaNome
    ,comida.imagem AS comidaImagem
    ,comida.valor AS comidaValor
    ,comida.descricao AS comidaDescricao
    FROM comida INNER JOIN categoria
    ON comida.categoriaID = categoria.id
    WHERE comida.categoriaID = ?";
    $stmt = $conn->prepare($sql);
    $stmt->execute([$_GET["categoriaID"]]);
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
