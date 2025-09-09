<?php
require 'vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

$email = $_POST['email'] ?? '';

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo "有効なメールアドレスを入力してください。";
    exit;
}

$htmlBody = file_get_contents('thankyou.html');

$mail = new PHPMailer(true);

try {
    $mail->isSMTP();
    $mail->Host       = 'smtp.gmail.com';
    $mail->SMTPAuth   = true;
    $mail->Username   = 'shidaoqingren0@gmail.com';
    $mail->Password   = 'jxjj jvqd esfs phfg';
    $mail->SMTPSecure = 'tls';
    $mail->Port       = 587;

    $mail->CharSet = 'UTF-8';
    $mail->setFrom('shidaoqingren0@gmail.com', 'みんスぺきっず');
    $mail->addAddress($email);
    $mail->Subject = '登録ありがとうございます';
    $mail->Body    = $htmlBody;
    $mail->isHTML(true);

    $mail->send();
    header("Location: mail.html");
    exit;

} catch (Exception $e) {
    echo "メール送信に失敗しました: {$mail->ErrorInfo}";
}
?>
