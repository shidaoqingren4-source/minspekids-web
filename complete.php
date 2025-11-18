<?php
header("Content-Type: application/json");
ini_set('display_errors', 1);
error_reporting(E_ALL);

try {
    // DB接続
    $pdo = new PDO('mysql:host=localhost;dbname=minspekids_db;charset=utf8', 'root', '');
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // POSTデータ取得
    $email = $_POST['email'] ?? '';
    $firstname = $_POST['firstname'] ?? '';
    $lastname = $_POST['lastname'] ?? '';
    $firstKana = $_POST['first-name-kana'] ?? '';
    $lastKana = $_POST['last-name-kana'] ?? '';
    $postNumber = $_POST['post-number'] ?? '';
    $pref = $_POST['pref'] ?? '';
    $city = $_POST['city'] ?? '';
    $town = $_POST['town'] ?? '';
    $buildings = $_POST['buildings'] ?? '';
    $phone = $_POST['phone'] ?? '';
    $password = $_POST['password'] ?? '';
    $year = $_POST['year'] ?? '';
    $month = $_POST['month'] ?? '';
    $day = $_POST['day'] ?? '';

    // バリデーション（簡易）
    if (!$email || !$password || !$firstname || !$lastname) {
        throw new Exception("必須項目が不足しています。");
    }

    // パスワードハッシュ化
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
    $birthdate = sprintf('%04d-%02d-%02d', $year, $month, $day);
    $name = $firstname . ' ' . $lastname;

    // 本登録保存
    $stmt = $pdo->prepare("INSERT INTO users (
        name, firstname, lastname, first_kana, last_kana, post_number, pref, city, town, buildings,
        phone, password, birthdate, email
    ) VALUES (
        :name, :firstname, :lastname, :first_kana, :last_kana, :post_number, :pref, :city, :town, :buildings,
        :phone, :password, :birthdate, :email
    )");

    $stmt->execute([
        ':name' => $name,
        ':firstname' => $firstname,
        ':lastname' => $lastname,
        ':first_kana' => $firstKana,
        ':last_kana' => $lastKana,
        ':post_number' => $postNumber,
        ':pref' => $pref,
        ':city' => $city,
        ':town' => $town,
        ':buildings' => $buildings,
        ':phone' => $phone,
        ':password' => $hashedPassword,
        ':birthdate' => $birthdate,
        ':email' => $email
    ]);

    // 仮登録テーブルから削除（任意）
    $pdo->prepare("DELETE FROM pre_users WHERE email = :email")->execute([':email' => $email]);

    // レスポンス返却
    echo json_encode([
        "status" => "success",
        "name" => $name,
        "birth" => $birthdate,
        "phone" => $phone,
        "postnumber" => $postNumber,
        "address" => $pref . $city . $town . $buildings
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        "status" => "error",
        "message" => "データベースエラー: " . $e->getMessage()
    ]);
} catch (Exception $e) {
    http_response_code(400);
    echo json_encode([
        "status" => "error",
        "message" => "入力エラー: " . $e->getMessage()
    ]);
}
?>
