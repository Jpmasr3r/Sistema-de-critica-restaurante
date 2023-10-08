<?php

$output = array();
$output["_status"] = "OK";
foreach ($_GET as $key => $value) {
    $output[$key] = $value;
}

$output["senha"] = password_hash($output["senha"], PASSWORD_DEFAULT);

echo json_encode($output);
