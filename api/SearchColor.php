<?php
	$keyjson = file_get_contents('key.json');
	$keydata = json_decode($keyjson, true);
	$inData = getRequestInfo();
	
	$searchResults = "";
	$searchCount = 0;

	$conn = new mysqli($keydata['host'], $keydata['user'], $keydata['password'], $keydata['db']);
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{
  }

?>
