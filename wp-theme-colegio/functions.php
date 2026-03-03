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
        'isApp'    => true,
        'v'        => '1.0.6'
    ];
    echo "<script id='wp-data-sync'>window.wpData = " . json_encode($wpData) . "; console.log('wpData Initialized v1.0.6');</script>\n";
}
add_action('wp_head', 'colegio_dual_localize_data', 1);

/**
 * Enqueue React assets from dist/public
 */
function colegio_dual_enqueue_assets() {
    $manifest_path = get_template_directory() . '/dist/public/.vite/manifest.json';

    if (!file_exists($manifest_path)) {
        add_action('wp_head', function() use ($manifest_path) {
            echo "<!-- Colegio Dual Error: Manifest not found at $manifest_path -->\n";
        });
        return;
    }

    $manifest = json_decode(file_get_contents($manifest_path), true);
    if (!$manifest) return;

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
 * Remove Gutenberg editor
 */
add_action('init', function() {
    remove_post_type_support('page', 'editor');
});

/**
 * Admin UI cleanup
 */
add_action('admin_head', function() {
    echo '<style>
        .editor-post-title__block { display:none!important; }
        .block-editor-default-block-appender { display:none!important; }
        .edit-post-sidebar { display:none!important; }
    </style>';
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
add_filter('allowed_block_types_all', function() {
    return [];
});

add_filter('acf/settings/save_json', function() {
    return get_template_directory() . '/acf-json';
});

add_filter('acf/settings/load_json', function($paths) {
    unset($paths[0]);
    $paths[] = get_template_directory() . '/acf-json';
    return $paths;
});