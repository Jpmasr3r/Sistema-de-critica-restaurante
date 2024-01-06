<?php

$host = "viaduct.proxy.rlwy.net";
$user = "root";
$password = "ecaA21D3HF-3G4E6E6Fa3c41dfCg1h13";
$database = "railway";
$port = 44060;
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
    $output = [
        "status" => "Conexao Bem Sucedida",
    ];
    echo json_encode($output);
} catch (PDOException $e) {
    $output = [
        "status"=> "Conexao Falha :" . $e->getMessage(),
    ];
    echo json_encode($output);
}
