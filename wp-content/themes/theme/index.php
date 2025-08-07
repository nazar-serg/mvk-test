<?php get_header(); ?>

<main class="site-main">
    <div class="content-container">
        <?php
            if ( have_posts() ) :
                while ( have_posts() ) : the_post();
                    ?>
                    <article class="post-content">
                        <header class="entry-header">
                            <?php if (is_singular() && !is_front_page()) : ?>
                                <h1 class="entry-title"><?php the_title(); ?></h1>
                            <?php endif; ?>
                        </header>
                        
                        <div class="entry-content">
                            <?php the_content(); ?>
                        </div>
                    </article>
                    <?php
                endwhile;
            else :
                ?>
                <div class="no-content">
                    <h2>Контент не найден</h2>
                    <p>Извините, но запрашиваемый контент не найден.</p>
                </div>
                <?php
            endif;
        ?>
    </div>
</main>

<?php get_footer(); ?>
