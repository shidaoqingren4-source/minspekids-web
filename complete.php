<?php
$pdo = new PDO('mysql:host=localhost;dbname=minspekids_db;charset=utf8', 'root', '');

// POSTデータ取得
$firstname = $_POST['firstname'] ?? '';
$lastname = $_POST['lastname'] ?? '';
$firstKana = $_POST['first-name-kana'] ?? '';
$lastKana = $_POST['last-name-kana'] ?? '';
$name = $firstname . ' ' . $lastname; // nameとして統合

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

$hashedPassword = password_hash($password, PASSWORD_DEFAULT);
$birthdate = sprintf('%04d-%02d-%02d', $year, $month, $day);

// 登録処理
$sql = "INSERT INTO users (
  name, firstname, lastname, first_kana, last_kana, post_number, pref, city, town, buildings,
  phone, password, birthdate
) VALUES (
  :name, :firstname, :lastname, :first_kana, :last_kana, :post_number, :pref, :city, :town, :buildings,
  :phone, :password, :birthdate
)";

$stmt = $pdo->prepare($sql);
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
  ':birthdate' => $birthdate
]);

echo "登録が完了しました！";
?>
