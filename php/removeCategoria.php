<?php

require_once "../connection.php";
session_start();

try {
    $sql = "DELETE FROM comida WHERE categoriaID = ?";
    $stmt = $conn->prepare($sql);
    $stmt->execute([$_POST["categoriaID"]]);
    
    $sql = "DELETE FROM categoria WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->execute([$_POST["categoriaID"]]);


    $output = [
        "success" => true,
        "message" =>  "Categoria removida"
    ];

    echo json_encode($output);
} catch (Exception $e) {
    $output = [
        "success" => false,
        "message" =>  "Error: " . $e->getMessage()
    ];
    echo json_encode($output);
}
