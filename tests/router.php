
<?php

$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

$routes = [
    '/api/AddColor.php' => 'AddColor.php',
    '/api/Login.php' => 'Login.php',
    '/api/SearchColors.php' => 'SearchColor.php'
];

if (isset($routes[$path])) {
    chdir(__DIR__ . '/../api');
    require $routes[$path];
    return true;
}

http_response_code(404);
header('Content-Type: application/json');
echo json_encode(['error' => 'Not Found']);
?>
