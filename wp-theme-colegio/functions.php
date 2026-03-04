<?php
/**
 * Colegio Dual Theme Functions
 */

// Prevent header errors
ob_start();

/**
 * Theme setup
 */
function colegio_dual_setup() {
    add_theme_support('title-tag');
}
add_action('after_setup_theme', 'colegio_dual_setup');

/**
 * Get current slug
 */
function colegio_dual_get_current_slug() {
    if (is_front_page()) return 'home';

    $id = get_queried_object_id();
    if ($id) {
        $slug = get_post_field('post_name', $id);
        return $slug ?: 'home';
    }
    return 'home';
}

/**
 * Localization data for React
 */
function colegio_dual_localize_data() {
    $wpData = [
        'apiUrl'   => esc_url_raw(rest_url()),
        'nonce'    => wp_create_nonce('wp_rest'),
        'pageSlug' => colegio_dual_get_current_slug(),
        'sitePath' => parse_url(home_url(), PHP_URL_PATH) ?: '',
        'isApp'    => true
    ];
    echo "<script id='wp-data-sync'>window.wpData = " . json_encode($wpData) . ";</script>\n";
}
add_action('wp_head', 'colegio_dual_localize_data', 1);

/**
 * Enqueue React assets from dist/public
 */
function colegio_dual_enqueue_assets() {
    $manifest_path = get_template_directory() . '/dist/public/manifest.json';

    if (!file_exists($manifest_path)) {
        return;
    }

    $manifest = json_decode(file_get_contents($manifest_path), true);
    if (!$manifest) return;

    // ... (logic to find main_js)

    $main_js = '';
    $main_css = [];

    if (isset($manifest['index.html'])) {
        $main_js = $manifest['index.html']['file'] ?? '';
        $main_css = $manifest['index.html']['css'] ?? [];
    } else {
        foreach ($manifest as $value) {
            if (!empty($value['isEntry'])) {
                $main_js = $value['file'];
                $main_css = $value['css'] ?? [];
                break;
            }
        }
    }

    if ($main_js) {
        wp_enqueue_script(
            'colegio-dual-app',
            get_template_directory_uri() . '/dist/public/' . $main_js,
            [],
            null,
            true
        );
    }

    foreach ($main_css as $i => $css) {
        wp_enqueue_style(
            'colegio-dual-style-' . $i,
            get_template_directory_uri() . '/dist/public/' . $css
        );
    }
}
add_action('wp_enqueue_scripts', 'colegio_dual_enqueue_assets');

/**
 * React Router fallback
 */
function colegio_dual_client_side_routing($template) {
    if (!is_admin() && !wp_doing_ajax() && !is_feed()) {
        return get_template_directory() . '/index.php';
    }
    return $template;
}
add_filter('template_include', 'colegio_dual_client_side_routing');

/**
 * type="module" for React bundle
 */
function colegio_dual_add_module_type($tag, $handle, $src) {
    if ($handle !== 'colegio-dual-app') return $tag;
    return '<script type="module" crossorigin src="' . esc_url($src) . '"></script>';
}
add_filter('script_loader_tag', 'colegio_dual_add_module_type', 10, 3);

/**
 * META BOXES
 */
add_action('add_meta_boxes', function() {

    add_meta_box(
        'react_preview_box',
        'Vista previa del sitio (React)',
        function($post) {

            $slug = $post->post_name;

            if (get_option('page_on_front') == $post->ID) {
                $slug = 'home';
            }

            if ($slug) {
                $preview_url = home_url('/' . $slug . '?preview=true&t=' . time());

                echo '<div style="background:#f1f1f1;padding:10px;margin-bottom:10px;border:1px solid #ddd">';
                echo '<strong>Vista previa:</strong> <code>' . esc_html($slug) . '</code>';
                echo '</div>';

                echo '<iframe src="' . esc_url($preview_url) . '" style="width:100%;height:800px;border:1px solid #ccc;"></iframe>';
            } else {
                echo '<p>Guarda la página primero.</p>';
            }
        },
        'page',
        'normal',
        'high'
    );
});

/**
 * Remove Gutenberg editor and set default templates
 */
add_action('init', function() {
    // Remove editor from pages (we use ACF only)
    remove_post_type_support('page', 'editor');

    // Default template for News (Posts)
    $post_type_object = get_post_type_object('post');
    $post_type_object->template = [
        ['core/heading', ['placeholder' => 'Título de la Noticia...', 'level' => 2]],
        ['core/paragraph', ['placeholder' => 'Escribe una introducción cautivadora aquí...']],
        ['core/image', ['align' => 'center']],
        ['core/heading', ['content' => 'Detalles Adicionales', 'level' => 3]],
        ['core/table', [
            'hasFixedLayout' => true,
            'head' => [
                ['cells' => [
                    ['content' => 'Característica'],
                    ['content' => 'Descripción']
                ]]
            ],
            'body' => [
                ['cells' => [
                    ['content' => 'Fecha de Inicio'],
                    ['content' => 'Ej: 15 de Marzo']
                ]],
                ['cells' => [
                    ['content' => 'Lugar'],
                    ['content' => 'Ej: Auditorio Principal']
                ]]
            ]
        ]],
        ['core/paragraph', ['placeholder' => 'Continúa escribiendo el resto de la noticia...']]
    ];
    // Optional: lock it if you want to force this structure
    // $post_type_object->template_lock = 'all'; 
});

/**
 * Admin UI cleanup
 */
add_action('admin_head', function() {
    $screen = get_current_screen();
    if ($screen && $screen->post_type === 'page') {
        echo '<style>
            .editor-post-title__block { display:none!important; }
            .block-editor-default-block-appender { display:none!important; }
            .edit-post-sidebar { display:none!important; }
        </style>';
    }
});

/**
 * Force ACF on top
 */
add_filter('acf/input/meta_box_priority', function() {
    return 'high';
});

/**
 * Disable Gutenberg blocks
 */
add_filter('allowed_block_types_all', function($allowed_blocks, $editor_context) {
    if ($editor_context->post->post_type === 'page') {
        return [];
    }
    return $allowed_blocks;
}, 10, 2);

add_filter('acf/settings/save_json', function() {
    return get_template_directory() . '/acf-json';
});

add_filter('acf/settings/load_json', function($paths) {
    unset($paths[0]);
    $paths[] = get_template_directory() . '/acf-json';
    return $paths;
});

/**
 * PHP SEO Bridge: Inject ACF SEO tags into server-side HTML
 * This satisfies SEO plugins and non-JS social crawlers
 */
function colegio_dual_seo_bridge() {
    if (!function_exists('get_field')) return;

    $id = is_front_page() ? get_option('page_on_front') : get_queried_object_id();
    if (!$id) return;

    $seo_title = get_field('seo_title', $id);
    $seo_desc = get_field('seo_description', $id);
    $og_image = get_field('og_image', $id);
    $canonical = get_field('canonical_url', $id);
    $aeo_data = get_field('structured_data', $id);

    $site_name = get_bloginfo('name');
    $full_title = $seo_title ? $seo_title . " | " . $site_name : wp_get_document_title();
    $default_desc = "Colegio binacional con metodología de Formación Dual y Aprendizaje Basado en Proyectos.";
    $default_og = "https://tecnologia.pdagencia.eu/cms/wp-content/uploads/2026/03/logo.png";

    // Standard SEO
    if ($seo_desc) {
        echo '<meta name="description" content="' . esc_attr($seo_desc) . '" />' . "\n";
    }

    // Open Graph
    echo '<meta property="og:title" content="' . esc_attr($full_title) . '" />' . "\n";
    echo '<meta property="og:description" content="' . esc_attr($seo_desc ?: $default_desc) . '" />' . "\n";
    echo '<meta property="og:image" content="' . esc_url($og_image ?: $default_og) . '" />' . "\n";
    echo '<meta property="og:type" content="website" />' . "\n";

    // X (Twitter)
    echo '<meta name="twitter:card" content="summary_large_image" />' . "\n";
    echo '<meta name="twitter:title" content="' . esc_attr($full_title) . '" />' . "\n";
    echo '<meta name="twitter:description" content="' . esc_attr($seo_desc ?: $default_desc) . '" />' . "\n";
    echo '<meta name="twitter:image" content="' . esc_url($og_image ?: $default_og) . '" />' . "\n";

    // TEO: Canonical
    if ($canonical) {
        echo '<link rel="canonical" href="' . esc_url($canonical) . '" />' . "\n";
    }

    // AEO: Structured Data
    if ($aeo_data) {
        echo '<script type="application/ld+json">' . $aeo_data . '</script>' . "\n";
    }
}
add_action('wp_head', 'colegio_dual_seo_bridge', 2);

// Fix title tag to use our ACF title
add_filter('pre_get_document_title', function($title) {
    if (!function_exists('get_field')) return $title;
    $id = is_front_page() ? get_option('page_on_front') : get_queried_object_id();
    $seo_title = get_field('seo_title', $id);
    return $seo_title ?: $title;
}, 10);