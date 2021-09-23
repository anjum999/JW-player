<?php

if (isset($_SERVER['HTTP_ORIGIN'])) 
{
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    header('Access-Control-Allow-Credentials: true');     
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS"); 
}     
// Access-Control headers are received during OPTIONS requests    
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') 
{    
    header("Access-Control-Allow-Headers: *");
}


$conn = mysqli_connect('localhost', 'root', '', 'app');


if(!empty($_POST['id']) && !empty($_POST['name']) && !empty($_POST['date']))
{

    $id = $_POST['id'];
    $name= $_POST['name'];
    $date= $_POST['date'];

// Uploads files
    var_dump($_FILES);
    $filename = $_FILES['video']['name'];  // name of the uploaded file
    $file = $_FILES['video']['tmp_name'];  // name of the uploaded file
    $destination = 'uploads/' . $filename;     // destination of the file on the server
    $extension = pathinfo($filename, PATHINFO_EXTENSION);      // get the file extension
    $size = $_FILES['video']['size'];

    if (!in_array($extension, [ 'mp4'])) {
        echo "You file extension must be .mp4";

    } elseif ($_FILES['video']['size'] > 100000000000) { 
        echo "File too large!";

    } else {
        
        // move the uploaded (temporary) file to the specified destination
        if (move_uploaded_file($file, $destination)) {
            $vf = "http://localhost/react%20project/newapp/src/uploads/".$filename;
            $query = "INSERT INTO tabledata(id, name, date, video, size) values ('$id', '$name', '$date', '$vf', '$size')";

            if (mysqli_query($conn, $query)) {
                echo "File uploaded successfully";
            }
        } 
        else {
            echo "Failed to upload file.";
        }
    }
////
}
else{
     echo "no data uploaded"; }


?>    

