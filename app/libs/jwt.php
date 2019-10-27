<?php

define("SECRET_KEY","secret_key");
function base64UrlEncode(string $data): string {
    $urlSafeData = strtr(base64_encode($data), '+/', '-_');
    return rtrim($urlSafeData, '='); 
} 
 
function base64UrlDecode(string $data): string {
    $urlUnsafeData = strtr($data, '-_', '+/');
    $paddedData = str_pad($urlUnsafeData, strlen($data) % 4, '=', STR_PAD_RIGHT);
    return base64_decode($paddedData);
}

function generateJWT(array $payload): string {
    $headerEncoded = base64UrlEncode(json_encode([
        "alg"     => "HS256",
        "typ"     => "JWT"
    ]));
    $payloadEncoded = base64UrlEncode(json_encode($payload));
    $dataEncoded = "$headerEncoded.$payloadEncoded";
    $rawSignature = hash_hmac('sha256', $dataEncoded, SECRET_KEY, true);
    $signatureEncoded = base64UrlEncode($rawSignature);
    $jwt = "$dataEncoded.$signatureEncoded";
    return $jwt;
}

function verifyJWT(string $jwt): bool
{
    list($headerEncoded, $payloadEncoded, $signatureEncoded) = explode('.', $jwt);
    $dataEncoded = "$headerEncoded.$payloadEncoded";
    $signature = base64UrlDecode($signatureEncoded);
    $rawSignature = hash_hmac('sha256', $dataEncoded, SECRET_KEY, true);
    return hash_equals($rawSignature, $signature);
}
// $payload = [
//     "sub"        => "1234567890",
//     "name"        => "John Doe",
//     "admin"        => true
// ];
 
// // Create the JWT
// $jwt = generateJWT($payload);
 
// var_dump($jwt);