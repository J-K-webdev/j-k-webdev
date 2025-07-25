<?php
header('Content-Type: application/json');
header('X-Frame-Options: SAMEORIGIN');
header('X-Content-Type-Options: nosniff');
header('Referrer-Policy: no-referrer-when-downgrade');
header("Content-Security-Policy: default-src 'self'; img-src 'self' data:");

echo json_encode(['status' => 'OK', 'message' => 'Backend PHP opérationnel']);
?>
