    <footer class="site-footer">
        <div class="footer-container">
            <!-- Footer Menu -->
            <nav class="footer-nav">
                <?php
                wp_nav_menu(array(
                    'theme_location' => 'footer-menu',
                    'menu_class' => 'footer-menu',
                    'container' => false,
                    'fallback_cb' => 'footer_fallback_menu'
                ));
                ?>
            </nav>
            
            <!-- Footer Logo -->
            <div class="footer-logo">
                <?php if (has_custom_logo()) : ?>
                    <?php the_custom_logo(); ?>
                <?php else : ?>
                    <a href="<?php echo esc_url(home_url('/')); ?>" class="footer-logo-text">
                        <?php bloginfo('name'); ?>
                    </a>
                <?php endif; ?>
            </div>
            
            <!-- Copyright -->
            <div class="footer-copyright">
                <p>&copy; <?php echo date('Y'); ?> <?php bloginfo('name'); ?></p>
                
            </div>
        </div>
    </footer>

<?php wp_footer(); ?>
</body>
</html>