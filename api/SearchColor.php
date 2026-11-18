
<?php

header('Content-Type: application/json');

function returnWithError($error)
{
    echo json_encode([
        "error" => $error
    ]);
    exit;
}

try {
    // Read database configuration
    $keyjson = file_get_contents(__DIR__ . '/key.json');

    if ($keyjson === false) {
        throw new Exception("Could not read database configuration");
    }

    $keydata = json_decode($keyjson, true);

    if (!$keydata) {
        throw new Exception("Invalid database configuration");
    }

    // Read incoming JSON
    $inData = json_decode(file_get_contents('php://input'), true);

    if (
        !isset($inData['search']) ||
        !isset($inData['userId'])
    ) {
        returnWithError("Missing search or userId");
    }

    $search = trim($inData['search']);
    $userId = (int)$inData['userId'];

    // Connect to database
    $conn = new mysqli(
        $keydata['host'],
        $keydata['user'],
        $keydata['password'],
        $keydata['db']
    );

    // Prepare query
    $stmt = $conn->prepare(
        "SELECT Name FROM Colors WHERE Name LIKE ? AND UserID = ?"
    );

    $colorName = "%" . $search . "%";

    $stmt->bind_param("si", $colorName, $userId);

    $stmt->execute();

    // Retrieve results without get_result()
    $stmt->bind_result($name);

    $searchResults = [];

    while ($stmt->fetch()) {
        $searchResults[] = $name;
    }

    $stmt->close();
    $conn->close();

    // Return results
    if (count($searchResults) === 0) {
        returnWithError("No Records Found");
    }

    echo json_encode([
        "results" => $searchResults,
        "error" => ""
    ]);

} catch (Throwable $e) {
    http_response_code(500);

    echo json_encode([
        "error" => $e->getMessage()
    ]);
}

?>
