<?php

session_start();

try {
    $_SESSION["selectRestaurante"] = $_GET["id"];
    echo "OK";
} catch (Exception $e) {
    echo "Erro: " . $e->getMessage();
}
