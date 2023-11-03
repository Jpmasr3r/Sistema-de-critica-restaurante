<?php 

require_once "./connection.php";

$sql = "SELECT id,nome,email,telefone,tipo,foto FROM user";
$stmt = $conn->prepare($sql);
$stmt->execute();
$output["result"] = $stmt->fetchAll();
if($output["result"]) {
    $output["status"] = "Sucess";
}else {
    $output["status"] = "Nenhum usuario encontrado";
    echo json_encode($output);
    exit();
}

echo json_encode($output);

