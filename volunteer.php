
<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $to = "enquiries@sukhlegacy.org";
    $subject = "New Volunteer Form Submission";
    $name = strip_tags(trim($_POST["full-name"]));
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $phone = strip_tags(trim($_POST["phone"]));
    $availability = $_POST["availability"];
    $skills = trim($_POST["skills"]);
    $interest = trim($_POST["interest"]);

    $email_content = "Name: $name\n";
    $email_content .= "Email: $email\n";
    $email_content .= "Phone: $phone\n";
    $email_content .= "Availability: $availability\n";
    $email_content .= "Skills: $skills\n\n";
    $email_content .= "Interest:\n$interest\n";

    $headers = "From: $name <$email>";

    if (mail($to, $subject, $email_content, $headers)) {
        header("Location: success.html");
        exit;
    } else {
        echo "Sorry, your message could not be sent.";
    }
}
?>
