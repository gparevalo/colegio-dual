<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        #root { 
            min-height: 100vh; 
            background: #ffffff;
            display: block !important;
            visibility: visible !important;
            opacity: 1 !important;
        }
    </style>
    <?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<div id="root">
    <div style="display: flex; align-items: center; justify-content: center; height: 100vh; font-family: sans-serif; color: #666;">
        <div style="text-align: center;">
            <p>Cargando aplicación...</p>
            <p style="font-size: 12px; margin-top: 20px; color: #999;">Si este mensaje no desaparece, hay un error en el archivo JavaScript.</p>
        </div>
    </div>
</div>

<div class="debug-indicator" style="position: fixed; bottom: 0; left: 0; background: #000; color: #fff; font-size: 9px; padding: 2px 5px; z-index: 9999;">
    Colegio Dual Theme v1.0.1
</div>

<?php wp_footer(); ?>
</body>
</html>