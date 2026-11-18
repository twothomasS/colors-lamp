
<?php

$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

// Health check for GitHub Actions
if ($path === '/') {
    http_response_code(200);
    header('Content-Type: application/json');
    echo json_encode([
        'status' => 'ok',
        'message' => 'PHP server is running'
    ]);
    return true;
}

// API routes
$routes = [
    '/api/AddColor.php' => 'AddColor.php',
    '/api/Login.php' => 'Login.php',
    '/api/SearchColor.php' => 'SearchColor.php'
];

if (isset($routes[$path])) {
    $apiDirectory = __DIR__ . '/../api';

    chdir($apiDirectory);

    require $apiDirectory . '/' . $routes[$path];

    return true;
}

// Unknown route
http_response_code(404);
header('Content-Type: application/json');

echo json_encode([
    'error' => 'Not Found',
    'requested_path' => $path
]);

return true;

