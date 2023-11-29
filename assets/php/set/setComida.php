<?php

require_once "../connection.php";
session_start();


try {
    $comida = [
        "comidaNome" => $_POST["comidaNome"],
        "comidaDesc" => $_POST["comidaDesc"],
        "comidaPreco" => $_POST["comidaPreco"],
        "categoriaID" => $_POST["categoriaID"],
        "comidaFoto" => $_FILES["comidaFoto"],
    ];

    $sql = "SELECT userID FROM restaurante WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->execute([$_SESSION["selectRestaurante"]]);
    $userID = $stmt->fetchAll();

    if ($userID = $_SESSION["user"]["id"]) {

        $newNameFile = md5(microtime()) . $comida["comidaFoto"]["name"];

        try {
            move_uploaded_file($comida["comidaFoto"]["tmp_name"], "../../uploads/img/comidas/" . $newNameFile);
            $comida["comidaFoto"] = "../../assets/uploads/img/comidas/" . $newNameFile;
        } catch (PDOException $e) {
            $output = [
                "success" => false,
                "message" => "Erro na imagem",
                "error" => "Erro ao cadrastar usuario " . $e->getMessage(),
            ];
            echo json_encode($output);
            exit();
        }

        $sql = "INSERT INTO comida(nome,imagem,descricao,valor,categoriaID) VALUES (:comidaNome,:comidaFoto,:comidaDesc,:comidaPreco,:categoriaID)";
        $stmt = $conn->prepare($sql);
        $stmt->execute($comida);

        $output = [
            "success" => true,
            "message" => "Comida adicionada com sucesso",
        ];
    } else {
        $output = [
            "success" => false,
            "message" => "Você não é o dono deste restaurante",
        ];
    }


    echo json_encode($output);
} catch (Exception $e) {
    $output = [
        "success" => false,
        "message" =>  "Erro geral",
        "error" =>  "Error: " . $e->getMessage()
    ];
    echo json_encode($output);
}
