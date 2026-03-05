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

    // 1. Intentar obtener el campo manual de ACF
    $seo_title = get_field('seo_title', $id);
    $seo_desc = get_field('seo_description', $id);

    // 2. AUTO-GENERACIÓN: Si están vacíos, usamos los datos del post
    if (!$seo_title) {
        $seo_title = get_the_title($id); 
    }
    if (!$seo_desc) {
        $post_content = get_post_field('post_content', $id);
        $seo_desc = wp_trim_words(strip_shortcodes($post_content), 25, '...'); 
    }
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

/**
 * ENGAGEMENT METRICS: Views & Likes
 */

// Track views when a post is requested via REST API
add_action('rest_api_init', function() {
    register_rest_field('post', 'views_count', [
        'get_callback' => function($post_array) {
            return (int) get_post_meta($post_array['id'], 'colegio_dual_views', true) ?: 0;
        }
    ]);

    register_rest_field('post', 'likes_count', [
        'get_callback' => function($post_array) {
            return (int) get_post_meta($post_array['id'], 'colegio_dual_likes', true) ?: 0;
        }
    ]);

    register_rest_field('post', 'comments_count', [
        'get_callback' => function($post_array) {
            return (int) get_comments_number($post_array['id']);
        }
    ]);
});

// Increment views on single post fetch
// Using rest_prepare_post for single post contexts
add_filter('rest_prepare_post', function($response, $post, $request) {
    if ($request->get_method() === 'GET' && strpos($request->get_route(), '/wp/v2/posts/') !== false) {
        $views = (int) get_post_meta($post->ID, 'colegio_dual_views', true);
        update_post_meta($post->ID, 'colegio_dual_views', $views + 1);
    }
    return $response;
}, 10, 3);

// Custom endpoint for Likes
add_action('rest_api_init', function() {
    register_rest_route('colegio-dual/v1', '/post/(?P<id>\d+)/like', [
        'methods' => 'POST',
        'callback' => function($data) {
            $post_id = $data['id'];
            $likes = (int) get_post_meta($post_id, 'colegio_dual_likes', true);
            update_post_meta($post_id, 'colegio_dual_likes', $likes + 1);
            return [
                'success' => true,
                'new_count' => $likes + 1
            ];
        },
        'permission_callback' => '__return_true'
    ]);
});




/**
 * CUSTOM PRO DASHBOARD CORREGIDO (Ruta pp-calendar): Colegio Dual
 */

add_action('wp_dashboard_setup', function() {
    remove_meta_box('dashboard_primary', 'dashboard', 'side');
    remove_meta_box('dashboard_quick_press', 'dashboard', 'side');
    remove_meta_box('dashboard_right_now', 'dashboard', 'normal');
    remove_meta_box('dashboard_activity', 'dashboard', 'normal');

    add_meta_box(
        'colegio_dual_dashboard',
        '🚀 Panel de Control - Colegio Dual',
        'colegio_dual_dashboard_render',
        'dashboard',
        'normal',
        'high'
    );
});

function colegio_dual_dashboard_render() {
    global $wpdb;
    // Sumamos las métricas de tus funciones personalizadas
    $total_views = $wpdb->get_var("SELECT SUM(meta_value) FROM $wpdb->postmeta WHERE meta_key = 'colegio_dual_views'");
    $total_likes = $wpdb->get_var("SELECT SUM(meta_value) FROM $wpdb->postmeta WHERE meta_key = 'colegio_dual_likes'");
    
    // RUTA EXACTA DETECTADA
    $url_calendario = admin_url('admin.php?page=pp-calendar');
    $url_nuevo_post = admin_url('post-new.php?post_type=post');
    ?>
    <style>
        .cd-dash-container { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; padding: 10px; font-family: sans-serif; }
        .cd-card { background: #fff; border: 1px solid #ccd0d4; border-radius: 8px; padding: 20px; text-align: center; box-shadow: 0 2px 5px rgba(0,0,0,0.05); }
        .cd-card h3 { margin: 0 0 10px 0; color: #2271b1; font-size: 1.1em; }
        .cd-card .metric { font-size: 2.8em; font-weight: bold; color: #1d2327; display: block; line-height: 1.2; }
        .cd-btn { display: inline-flex; align-items: center; justify-content: center; background: #2271b1; color: white !important; padding: 15px 25px; text-decoration: none; border-radius: 6px; font-weight: bold; flex: 1; transition: 0.2s; border: none; }
        .cd-btn:hover { background: #135e96; transform: scale(1.02); }
        .cd-full { grid-column: 1 / -1; background: #f8f9fa; border-top: 4px solid #2271b1; }
        .cd-grid-btns { display: flex; gap: 15px; margin-top: 15px; }
    </style>

    <div class="cd-dash-container">
        <div class="cd-card">
            <h3>Vistas en Blog</h3>
            <span class="metric"><?php echo number_format($total_views ?: 0); ?></span>
            <small>Impacto Total</small>
        </div>
        <div class="cd-card">
            <h3>Likes Comunidad</h3>
            <span class="metric"><?php echo number_format($total_likes ?: 0); ?></span>
            <small>Reacciones Totales</small>
        </div>

        <div class="cd-card cd-full">
            <h3>Gestión de Contenidos</h3>
            <p>Acceso directo a la planificación editorial:</p>
            <div class="cd-grid-btns">
                <a href="<?php echo $url_calendario; ?>" class="cd-btn">📅 Abrir Calendario de Publicaciones</a>
                <a href="<?php echo $url_nuevo_post; ?>" class="cd-btn" style="background:#008a20;">✍️ Crear Nueva Noticia</a>
            </div>
        </div>
    </div>
    
    <style>
        /* Limpieza de avisos intrusivos para mantener el Dashboard Pro */
        .notice:not(.cd-notice), .update-nag, .updated, .error, .is-dismissible { display: none !important; }
    </style>
    <?php
}



 /**
 * REBRANDING TOTAL V3: Corrección de legibilidad y Dashboard visible
 */
function colegio_dual_custom_admin_style() {
    $logo_url = "https://tecnologia.pdagencia.eu/cms/wp-content/uploads/2026/03/logo.png";
    
    echo '
    <style type="text/css">
        /* 1. FONDO Y ESTRUCTURA */
        body, #wpwrap { background: #f0f2f5 !important; }
        #wpcontent { padding-left: 20px !important; }

        /* 2. HEADER PRO (Sin transparencias conflictivas) */
        #wpadminbar {
            background: #ffffff !important;
            border-bottom: 1px solid #e2e8f0 !important;
        }
        #wpadminbar .ab-item, #wpadminbar a.ab-item, #wpadminbar .ab-label { 
            color: #475569 !important; 
        }
        
        /* Logo único */
        #wpadminbar #wp-admin-bar-wp-logo > .ab-item .ab-icon:before {
            content: "" !important; background: url(' . $logo_url . ') no-repeat center !important;
            background-size: contain !important; width: 22px !important; height: 32px !important;
            display: block !important; filter: none !important;
        }

        /* 3. CORRECCIÓN DE SUBMENÚS (HOVER NEGRO SOLUCIONADO) */
        /* Fondo del dropdown */
        #wpadminbar .menupop .ab-sub-wrapper, #wpadminbar .ab-sub-active .ab-sub-wrapper {
            background: #ffffff !important;
            border: 1px solid #e2e8f0 !important;
            box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1) !important;
        }
        /* Texto normal en submenú */
        #wpadminbar .ab-submenu .ab-item {
            color: #64748b !important;
        }
        /* HOVER: Fondo azul claro, texto azul oscuro (Legible) */
        #wpadminbar .ab-submenu .ab-item:hover, 
        #wpadminbar .quicklinks .menupop ul li a:hover,
        #wpadminbar .quicklinks .menupop.hover ul li a:hover {
            color: #2563eb !important; 
            background: #eff6ff !important;
        }

        /* 4. SIDEBAR (MENÚ LATERAL) */
        #adminmenu, #adminmenuwrap, #adminmenuback { background: #ffffff !important; border-right: 1px solid #e2e8f0 !important; }
        #adminmenu a { color: #475569 !important; font-weight: 500 !important; }
        #adminmenu li.current a.menu-top, #adminmenu li.wp-has-current-submenu a.wp-has-current-submenu {
            background: #f1f5f9 !important; color: #2563eb !important;
        }
        /* Submenús laterales al hacer hover */
        #adminmenu .wp-submenu { background: #ffffff !important; border: 1px solid #e2e8f0 !important; }
        #adminmenu .wp-submenu a { color: #64748b !important; }
        #adminmenu .wp-submenu a:hover { color: #2563eb !important; }

        /* 5. DASHBOARD WIDGETS (Forzar visibilidad) */
        #dashboard-widgets-wrap { margin-top: 20px !important; }
        .postbox {
            background: #ffffff !important;
            border: 1px solid #e2e8f0 !important;
            border-radius: 12px !important;
            box-shadow: 0 1px 3px rgba(0,0,0,0.05) !important;
        }
            /* Color base de los iconos (Celeste Tenue / Slate) */
        #adminmenu .wp-menu-image:before {
            color: #94a3b8 !important; /* Un gris azulado elegante */
            opacity: 0.8;
            transition: all 0.2s ease;
        }

        /* Color al hacer HOVER (Azul vivo) */
        #adminmenu li.menu-top:hover .wp-menu-image:before,
        #adminmenu li.opensub .wp-menu-image:before {
            color: #2563eb !important;
            opacity: 1;
        }

        /* Color cuando la opción está SELECCIONADA */
        #adminmenu li.current .wp-menu-image:before,
        #adminmenu li.wp-has-current-submenu .wp-menu-image:before {
            color: #2563eb !important;
            opacity: 1;
        }

        /* Ajuste para iconos SVG (como los de algunos plugins) */
        #adminmenu .wp-menu-image img {
            filter: opacity(0.5);
            transition: all 0.2s ease;
        }
        #adminmenu li.menu-top:hover .wp-menu-image img,
        #adminmenu li.current .wp-menu-image img {
            filter: opacity(1) sepia(100%) saturate(2000%) hue-rotate(190deg);
        }
        
        /* Ocultar avisos que rompen el diseño */
        .notice, .update-nag, #footer-upgrade, #wp-admin-bar-comments { display: none !important; }
    </style>
    ';
}
add_action('admin_head', 'colegio_dual_custom_admin_style');