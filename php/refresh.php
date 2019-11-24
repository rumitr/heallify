<?php
require 'config.php';
$collection->deleteMany([]);

$url = "https://api.themoviedb.org/3/movie/now_playing?api_key=604184c2dcd057a1a1da0b5608d9dc97&language=en-US&page=1&region=IN";
$api_result = json_decode(file_get_contents($url), true);
$movies = array_values($api_result['results']);
$total_pages = $api_result['total_pages'];

for($i=2; $i <= $total_pages; $i++) {
    $url = "https://api.themoviedb.org/3/movie/now_playing?api_key=604184c2dcd057a1a1da0b5608d9dc97&language=en-US&page=$i&region=IN";

    $api_result = json_decode(file_get_contents($url), true);

    foreach ($api_result['results'] as $movie){
        $movies[] = $movie;
    }
}

foreach ($movies as $movie) {
	$insertOneResult = $collection->insertOne($movie);
}

echo "success";

?>