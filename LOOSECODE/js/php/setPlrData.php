<?php
if(isset($_POST)){
    $gameId=$_POST['gId'];
    $plrId=$_POST['pId'];
    $toset=$_POST['tsr'];
    $value=$_POST['vts'];
    $location = 'localhost';
	$user = 'user';
	$pass = 'pass';
	&databaseid = 'id';
	$con = new mysqli($location, $user, $pass, $databaseid);
    if ($con->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    $q="UPDATE `".$gameId."` SET `".$toset."`='".$value."' WHERE playerId='".$plrId."'";
    //"UPDATE `123` SET `stat1`='s1-tst' WHERE playerId='p1'";
    if(!$con -> query($q)){
        echo "ERR_INVLD_DTA";
    }
    else{
        echo "Saved Data";
    }
}
?>