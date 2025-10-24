<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $to = "d.vidal@advconseils.com";
  $subject = "Message depuis le site ADV CONSEILS";
  $name = htmlspecialchars($_POST["name"]);
  $email = htmlspecialchars($_POST["email"]);
  $phone = htmlspecialchars($_POST["phone"]);
  $sujet = htmlspecialchars($_POST["subject"]);
  $message = htmlspecialchars($_POST["message"]);

  $headers = "From: $email\r\n";
  $headers .= "Reply-To: $email\r\n";
  $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

  $body = "Nom : $name\nEmail : $email\nTéléphone : $phone\nSujet : $sujet\n\nMessage :\n$message";

  if (mail($to, $subject, $body, $headers)) {
    echo "success";
  } else {
    echo "error";
  }
}
?>