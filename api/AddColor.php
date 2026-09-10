<?php
	
	$keyjson = file_get_contents('key.json');
	$keydata = json_decode($keyjson, true);

	
	$inData = getRequestInfo();
	
	$color = $inData["color"];
	$userId = $inData["userId"];

	
	
	$conn = new mysqli($keydata['host'], $keydata['user'], $keydata['password'], $keydata['db']);
	if ($conn->connect_error) 
	{
		
		returnWithError( $conn->connect_error );
	} 
	else
	{
    
  	}
  
  	function getRequestInfo()
	{
		return json_decode(file_get_contents('php://input'), true);
	}
	function sendResultInfoAsJson( $obj )
	{
		header('Content-type: application/json');
		echo $obj;
	}
	
	function returnWithError( $err )
	{
		$retValue = '{"error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}

?>
