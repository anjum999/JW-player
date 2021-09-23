<?php

if (isset($_SERVER['HTTP_ORIGIN'])) {
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    header('Access-Control-Allow-Credentials: true'); 
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS"); 
    } 
// Access-Control headers are received during OPTIONS requests    
    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    header("Access-Control-Allow-Headers: *");
    }

$server = "localhost";
$username = "root";
$password = "";
$dbname = "app";

$conn = mysqli_connect($server, $username , $password, $dbname);

$func = $_GET['function'];

if($func == "show" )
{ show($conn); }

else if($func == "edit" )  
{ edit($conn); }

else if($func == "delete")
{ delete($conn); }

else
    echo "no function call";

function show($conn)
{
    $query = "select * from tabledata";
    $run = mysqli_query($conn, $query) or die(mysqli_error());
    $result=[];
    while ($row = mysqli_fetch_array($run)) {
    
        $result[] =  $row;
    }
    echo json_encode($result);
}
function edit($conn)
{   
        $id = $_POST['id'];
        $name = $_POST['name'];
        $date = $_POST['date'];
        $video = $_POST['video'];

$query = "UPDATE tabledata SET  name='$name', date='$date' WHERE id=$id";
$run = mysqli_query($conn, $query) or die(mysqli_error());
        
    if($run)
        { echo "----RECORD UPDATED----";  }
    else
        { echo "----NO-RECORD UPDATED----"; }
}

function delete($conn)
{
    $id = $_POST['id'];

    $query = "DELETE from tabledata WHERE id=$id";
    $run = mysqli_query($conn, $query) or die(mysqli_error());
    
    if($run)
        { echo "----RECORD DELETED----";  }
    else
        { echo "----NO-RECORD DELETED----"; }
}
?>

