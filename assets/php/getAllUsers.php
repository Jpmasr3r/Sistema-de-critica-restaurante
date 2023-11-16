<?php

require_once "./connection.php";
session_start();

$sql = "SELECT nome,tipo,foto,email FROM user";
$stmt = $conn->prepare($sql);
$stmt->execute();
$output = $stmt->fetchAll();

foreach ($output as $i => $e) {
    if ($e["email"] == $_SESSION["user"]["email"]) {
        $output[$i]["logado"] = true;
        break;
    } else {
        $output[$i]["logado"] = false;
    }
}

echo json_encode($output);
