<?php
header('Content-Type: text/plain; charset=utf-8'); header('Cache-Control: no-store'); header('Access-Control-Allow-Origin: *');
$clean = fn($v) => mb_substr(strip_tags((string)$v), 0, 400);
$body = $_POST; $n = filter_var($body['num1'] ?? null, FILTER_VALIDATE_FLOAT); $m = filter_var($body['num2'] ?? null, FILTER_VALIDATE_FLOAT);
$out = ["RESPUESTA DEL SERVIDOR", "======================", ""];
if ($n !== false && $m !== false) { $out[]="Suma: ".($n+$m); $out[]="Resta: ".($n-$m); $out[]="Producto: ".($n*$m); $out[]="División: ".($m==0?'No se puede dividir por cero':number_format($n/$m,4,'.','')); $out[]=""; }
if (!empty($body['nombre'])||!empty($body['correo'])||!empty($body['mensaje'])) { $out[]="Nombre: ".$clean($body['nombre']??''); $out[]="Correo: ".$clean($body['correo']??''); $out[]="Mensaje: ".$clean($body['mensaje']??''); $out[]=""; }
if (count($out)===3) $out[]='Campos aceptados: num1, num2, nombre, correo y mensaje'; $out[]='Método: '.($_SERVER['REQUEST_METHOD']??'GET'); $out[]='Fecha del servidor: '.date('Y-m-d H:i:s'); echo implode("\n",$out);
?>
