<?php

session_start();

try {
    $_SESSION["selectUser"] = $_GET["id"];
    echo "OK";
} catch (Exception $e) {
    echo "Erro: " . $e->getMessage();
}
