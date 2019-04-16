<?php
function debugx($text, $append = false, $isObject = true) {
	require_once("lib/debug.php");
	// return;
	// dpm($text);
	// kpr($text);

	static $debug;
	if (!$debug){
	    $debug = new Debug('', '_debug.txt');
	}
	$debug->d($text, $append, $isObject);
}
debugx('savinu');
// debugx('Post:');
// debugx($_POST);

// $post_data = json_decode($_POST);
$data = json_decode($_POST['data']);
$post_data = 'let x = ' . json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
// debugx($post_data);
// debugx('post_datax hh:');
// debugx('let x = ' . $post_data);


$file = "dataX.js";
// $file='data_'.date('m-d-Y_hia').'.json';

$Saved_File = fopen($file, 'w');
fwrite($Saved_File, $post_data); 
fclose($Saved_File); 

echo "ok";
?>