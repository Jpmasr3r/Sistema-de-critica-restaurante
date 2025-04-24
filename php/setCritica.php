<?php

require_once "../connection.php";
session_start();

$critica = [
    "texto" => $_POST["texto"],
    "nota" => $_POST["nota"],
    "data" => $_POST["data"],
    "userID" => $_SESSION["user"]["id"],
    "restauranteID" => $_SESSION["selectRestaurante"]
];

$repitida = false;
$sql = "SELECT * FROM critica WHERE critica.userID = ? AND critica.restauranteID = ?";
$stmt = $conn->prepare($sql);
$stmt->execute([$critica["userID"],$critica["restauranteID"]]);
$output = $stmt->fetchAll();
if ($output) {
    $repitida = true;
}

if (!$repitida) {
    $sql = "INSERT INTO critica(texto,nota,data,userID,restauranteID)
            VALUES (:texto,:nota,:data,:userID,:restauranteID)";
    $stmt = $conn->prepare($sql);
    try {
        $stmt->execute($critica);
        echo "OK";
    } catch (PDOException $e) {
        echo "Erro ao cadrastar critica " . $e->getMessage();
        exit();
    }
} else {
    $sql = "UPDATE critica
    SET texto = :texto,
    nota = :nota,
    data = :data
    WHERE userID = :userID
    AND restauranteID = :restauranteID";
    $stmt = $conn->prepare($sql);
    try {
        $stmt->execute($critica);
        echo "OK";
    } catch (PDOException $e) {
        echo "Erro ao cadrastar critica " . $e->getMessage();
        exit();
    }
}
