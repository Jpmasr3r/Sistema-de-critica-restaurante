<?php

require_once "../connection.php";
session_start();

if(!isset($_SESSION["user"]["email"])) {
    // echo "Fail";
    exit();
}

$sql = "SELECT nome,tipo,foto,email,id FROM user";
$stmt = $conn->prepare($sql);
$stmt->execute();
$output = $stmt->fetchAll();

foreach ($output as $i => $e) {
    if ($e["email"] == $_SESSION["user"]["email"]) {
        unset($output[$i]["email"]);
        $output[$i]["logado"] = true;
    } else {
        unset($output[$i]["email"]);
        $output[$i]["logado"] = false;
    }
}
// echo "OK";
echo json_encode($output);
