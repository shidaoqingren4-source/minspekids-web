<?php
require 'vendor/autoload.php';
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// エラーレポート
ini_set('display_errors', 1);
error_reporting(E_ALL);

// 入力取得
$email = $_POST['email'] ?? '';
$agreed = isset($_POST['terms']);

// バリデーション
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    exit("無効なメールアドレスです。");
}
if (!$agreed) {
    exit("利用規約に同意してください。");
}

// DB保存
try {
    $pdo = new PDO('mysql:host=localhost;dbname=minspekids_db;charset=utf8', 'root', '');
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // 重複チェック
    $check = $pdo->prepare("SELECT COUNT(*) FROM pre_users WHERE email = :email");
    $check->execute([':email' => $email]);
    if ($check->fetchColumn() > 0) {
        exit("このメールアドレスはすでに仮登録されています。");
    }

    // 保存
    $stmt = $pdo->prepare("INSERT INTO pre_users (email) VALUES (:email)");
    $stmt->execute([':email' => $email]);
} catch (PDOException $e) {
    exit("データベースエラー: " . $e->getMessage());
}

// メール送信
$mail = new PHPMailer(true);
try {
    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';
    $mail->SMTPAuth = true;
    $mail->Username = 'your@gmail.com'; // ←自分のGmailアドレス
    $mail->Password = 'your_app_password'; // ←アプリパスワード
    $mail->SMTPSecure = 'tls';
    $mail->Port = 587;

    $mail->CharSet = 'UTF-8';
    $mail->setFrom('your@gmail.com', 'みんスぺきっず');
    $mail->addAddress($email);
    $mail->Subject = '【みんスぺきっず】本登録のご案内';
    $mail->isHTML(true);
    $mail->Body = <<<EOT
<p>仮登録ありがとうございます。</p>
<p>以下のリンクから本登録を完了してください。</p>
<p><a href="http://localhost/entry2.html">▶ 本登録ページへ</a></p>
EOT;

    $mail->send();

    // localStorageにメールアドレスを保存して本登録ページへ遷移
    echo "<script>
      localStorage.setItem('email', '$email');
      window.location.href = 'entry2.html';
    </script>";
} catch (Exception $e) {
    exit("メール送信に失敗しました: {$mail->ErrorInfo}");
}
?>
