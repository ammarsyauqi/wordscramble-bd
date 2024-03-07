<?php

require 'C:\xampp\htdocs\fyp\config.php';

$dbservername = "localhost";
$dbusername = "root";
$dbpassword = "";
$dbname = "dermawan";

$lnk = mysqli_connect($dbservername, $dbusername, $dbpassword, $dbname);

if (!$lnk) {
    die("Database connection failed");
}

function updatePuzzlescore($id, $wscramble_score, $lnk)
{
    $id = mysqli_real_escape_string($lnk, $id);
    $wscramble_score = intval($wscramble_score);
    
    // Update highscore set wscramble_score = $wscramble_score where id = '$id'
    $query = "UPDATE highscore SET wscramble_score = $wscramble_score WHERE id = '$id'";
    
    $rs = mysqli_query($lnk, $query);
    
    if (!$rs) {
        return false;
    }
    
    return true;
}

// Check if session ID exists and quiz score is provided
if (isset($_SESSION["id"]) && isset($_POST["wscramble_score"])) {
    $id = $_SESSION["id"];
    $wscramble_score = $_POST["wscramble_score"];
    
    if (updatePuzzlescore($id, $wscramble_score, $lnk)) {
        //echo "Score updated";
    } else {
        //echo "Update failed";
    }
} else {
    //echo "Session ID or quiz score not provided";
}
?>
