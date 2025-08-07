<?php
/*
Plugin Name: Custom Block Collection
Description: A collection of custom blocks.
Version: 1.0
Author: Nazarenko Sergey
Text Domain: custom-blocks-collection
*/
    
if ( ! defined ('ABSPATH') ) {
    exit;
}

define( 'CUSTOM_BLOCKS_COLLECTION_URL', plugin_dir_url( __FILE__ ) );
define( 'CUSTOM_BLOCKS_COLLECTION_PATH', plugin_dir_path( __FILE__ ) );

class CustomBlocksCollection {

      public function __construct() {
        add_action( 'init', array( $this, 'register_blocks' ) );
        add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_frontend_styles' ) );
        add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_frontend_assets' ) );
    }

    public function register_blocks() {
        
        register_block_type( CUSTOM_BLOCKS_COLLECTION_PATH . 'blocks/hero/block.json' );

        register_block_type( CUSTOM_BLOCKS_COLLECTION_PATH . 'blocks/testimonial/block.json' );
        
    }

    public function enqueue_frontend_styles() {
        wp_enqueue_style(
            'custom-blocks-frontend-styles',
            CUSTOM_BLOCKS_COLLECTION_URL . 'assets/frontend-global.css',
            array(),
            '1.0.0'
        );
    }

     public function enqueue_frontend_assets() {
     
        
        if ( has_block( 'custom-blocks/testimonial' ) ) {
            wp_enqueue_script(
                'custom-blocks-testimonial-frontend',
                CUSTOM_BLOCKS_COLLECTION_URL . 'build/blocks/testimonial/frontend.js',
                array( 'jquery' ),
                '1.0.0',
                true
            );
            
            wp_enqueue_style(
                'custom-blocks-testimonial-frontend-style',
                CUSTOM_BLOCKS_COLLECTION_URL . 'build/blocks/testimonial/frontend.css',
                array(),
                '1.0.0'
            );
        }
        
    
    }
}
new CustomBlocksCollection();