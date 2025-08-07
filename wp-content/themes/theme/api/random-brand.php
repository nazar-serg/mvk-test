<?php


header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-cache, must-revalidate');
header('Access-Control-Allow-Origin: *');

$wp_load_paths = [
    '../../../wp-load.php',
    '../../../../wp-load.php',
    '../../../../../wp-load.php'
];

$wp_loaded = false;
foreach ($wp_load_paths as $path) {
    if (file_exists(__DIR__ . '/' . $path)) {
        require_once(__DIR__ . '/' . $path);
        $wp_loaded = true;
        break;
    }
}

function get_random_brand() {
    global $wp_loaded;
    
    if (function_exists('get_template_directory')) {
        $brands_file = get_template_directory() . '/assets/logos/brands.txt';
        $template_uri = get_template_directory_uri();
    } else {
        $brands_file = dirname(__DIR__) . '/assets/logos/brands.txt';
        $template_uri = '';
    }
    
    if (!file_exists($brands_file)) {
        return array(
            'success' => false,
            'error' => 'Файл брендов не найден: ' . $brands_file
        );
    }
    
    $content = file_get_contents($brands_file);
    if ($content === false) {
        return array(
            'success' => false,
            'error' => 'Не удалось прочитать файл брендов'
        );
    }
    
    $lines = array_filter(array_map('trim', explode("\n", $content)));
    
    if (empty($lines)) {
        return array(
            'success' => false,
            'error' => 'Файл брендов пуст или не содержит валидных данных'
        );
    }
    
    $random_line = $lines[array_rand($lines)];
    
    $parts = array_map('trim', explode('|', $random_line));
    
    if (count($parts) !== 3) {
        return array(
            'success' => false,
            'error' => 'Неправильный формат данных в строке: ' . $random_line
        );
    }
    
    if ($template_uri) {
        $logo_url = $template_uri . '/assets/logos/' . $parts[0];
    } else {
        $logo_url = '/wp-content/themes/theme/assets/logos/' . $parts[0];
    }
    
    $logo_path = dirname(__DIR__) . '/assets/logos/' . $parts[0];
    
    $link = filter_var($parts[2], FILTER_VALIDATE_URL);
    if (!$link) {
        $link = 'https://' . ltrim($parts[2], 'http://https://');
    }
    
    return array(
        'success' => true,
        'data' => array(
            'logo' => $logo_url,
            'logo_exists' => file_exists($logo_path),
            'logo_filename' => $parts[0],
            'description' => $parts[1],
            'link' => $link,
            'timestamp' => time(),
            'debug' => array(
                'brands_file' => $brands_file,
                'total_brands' => count($lines),
                'wp_loaded' => $wp_loaded
            )
        )
    );
}

try {
    $result = get_random_brand();
    echo json_encode($result, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
} catch (Exception $e) {
    echo json_encode(array(
        'success' => false,
        'error' => 'Системная ошибка: ' . $e->getMessage()
    ), JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
}

exit;
