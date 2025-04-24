<?php

session_start();

try {
    unset($_SESSION["user"]);
    echo "OK";
    exit();
} catch (Exception $e) {
    echo "Error: " . $e->getMessage();
}
