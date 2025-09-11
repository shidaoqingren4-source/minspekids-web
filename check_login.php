<?php
header("Access-Control-Allow-Origin: https://haruto.github.io");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");
session_start();
ini_set('display_errors', 1);
error_reporting(E_ALL);

$email = $_POST['email'] ?? '';
$password = $_POST['password'] ?? '';
$response = ['valid' => false];

try {
    $pdo = new PDO('mysql:host=localhost;dbname=minspekids_db;charset=utf8', 'root', '');

    $sql = "SELECT * FROM users WHERE email = :email";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([':email' => $email]);
    $user = $stmt->fetch();

    if ($user && password_verify($password, $user['password'])) {
        $_SESSION['user'] = $user['name'];
        $response['valid'] = true;
    } else {
        $response['message'] = "メールアドレスまたはパスワードが違います";
    }
} catch (PDOException $e) {
    $response['message'] = "データベースエラー: " . $e->getMessage();
}

echo json_encode($response);