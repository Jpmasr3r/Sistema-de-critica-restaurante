<?php

$host = "26.209.49.87";
$user = "root";
$password = "12345";
$database = "trabalhoPW";
$port = 3320;
$options = [
    PDO::ATTR_ERRMODE =>
    PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE =>
    PDO::FETCH_ASSOC,
];

$output;


try {
    $conn = new PDO(
        "mysql:host=$host;port=$port;dbname=$database",
        $user,
        $password,
        $options
    );
    $output["status"] = "Conexao Bem Sucedida";
} catch (PDOException $e) {
    $output["status"] = "Conexao Falha :" . $e->getMessage();
}
