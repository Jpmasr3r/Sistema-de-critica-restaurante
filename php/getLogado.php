<?php

session_start();

if (!isset($_SESSION["user"])) {
    echo "Nao Logado";
} else {
    echo "Logado";
}
