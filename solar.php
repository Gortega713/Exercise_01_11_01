<?php
$WeatherSource = "https://api.forecast.io/forecast/2149097bc42d5f0a92d233180b2f6052/" . $_GET["lat"] . "," . $_GET["lng"];
header("Content-Type: application/json");
header("Cache-Control: no-cache");
readfile($WeatherSource);
?>