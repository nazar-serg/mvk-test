<?php

function theme_setup() {

    add_theme_support('editor-styles');
    
    add_editor_style('editor-style.css');
    
    add_theme_support('align-wide');

    add_theme_support('custom-logo', array(
        'height'      => 60,
        'width'       => 200,
        'flex-height' => true,
        'flex-width'  => true,
    ));

    register_nav_menus(
        array(
            'header-menu' => __('Header menu', 'test'),
            'footer-menu' => __('Footer menu', 'test'),
        )
    );
    
}
add_action('after_setup_theme', 'theme_setup');

function theme_enqueue_scripts() {
    wp_enqueue_style('theme-style', get_stylesheet_uri(), array(), wp_get_theme()->get('Version'));
    
    wp_enqueue_style(
        'theme-google-fonts',
        'https://fonts.googleapis.com/css?family=Open+Sans:400,700&display=swap',
        array(),
        null
    );
    
    wp_enqueue_script(
        'theme-scripts',
        get_template_directory_uri() . '/js/script.js',
        array(),
        wp_get_theme()->get('Version'),
        true
    );
    
    wp_enqueue_script(
        'random-brand-script',
        get_template_directory_uri() . '/js/random-brand.js',
        array(),
        wp_get_theme()->get('Version'),
        true
    );
    
    wp_localize_script('random-brand-script', 'themeData', array(
        'templateUrl' => get_template_directory_uri(),
        'ajaxUrl' => admin_url('admin-ajax.php'),
        'nonce' => wp_create_nonce('theme_nonce')
    ));
}
add_action('wp_enqueue_scripts', 'theme_enqueue_scripts');
