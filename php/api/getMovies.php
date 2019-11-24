<?php

require '../config.php';
header('Content-Type: application/json');

$month = $_GET['month'];
$query = [];
if(!empty($month)) {
	$string = "-".$month."-";
	$regex = new MongoDB\BSON\Regex($string);
	$query = ['release_date' => $regex];
}

$cursor = $collection->find($query);
$result = iterator_to_array($cursor);
echo json_encode($result);

?>