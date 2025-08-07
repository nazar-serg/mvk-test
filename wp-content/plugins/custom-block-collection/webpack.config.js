const defaultConfig = require('@wordpress/scripts/config/webpack.config');
const path = require('path');

module.exports = {
    ...defaultConfig,
    entry: {
        // Hero Block
        'blocks/hero/index': path.resolve(process.cwd(), 'blocks/hero/src', 'index.js'),

        // Testimonial Block
        'blocks/testimonial/index': path.resolve(process.cwd(), 'blocks/testimonial/src', 'index.js'),
        'blocks/testimonial/frontend': path.resolve(process.cwd(), 'blocks/testimonial/src', 'frontend.js'),
    },
    output: {
        filename: '[name].js',
        path: path.resolve(process.cwd(), 'build'),
    },
};
