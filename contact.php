
<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $to = "enquiries@sukhlegacy.org";
    $subject = "New Contact Form Submission";
    $name = strip_tags(trim($_POST["name"]));
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $subject_input = strip_tags(trim($_POST["subject"]));
    $message = trim($_POST["message"]);

    $email_content = "Name: $name\n";
    $email_content .= "Email: $email\n";
    $email_content .= "Subject: $subject_input\n\n";
    $email_content .= "Message:\n$message\n";

    $headers = "From: $name <$email>";

    if (mail($to, $subject, $email_content, $headers)) {
        header("Location: index.html");
        exit;
    } else {
        echo "Sorry, your message could not be sent.";
    }
}
?>

