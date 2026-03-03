<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" type="image/png" href="https://tecnologia.pdagencia.eu/cms/wp-content/uploads/2026/03/logo.png">
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
    <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; background: #fff; font-family: sans-serif;">
        <div style="position: relative; margin-bottom: 40px;">
            <div style="width: 80px; height: 80px; border: 2px solid #f3f3f3; border-top: 2px solid #DC1E35; border-radius: 50%; animation: dual-spin 1.5s linear infinite;"></div>
            <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);">
                 <img src="https://tecnologia.pdagencia.eu/cms/wp-content/uploads/2026/03/logo.png" style="width: 48px; height: auto; opacity: 0.9;">
            </div>
        </div>
        <p style="color: #666; font-size: 14px; font-weight: 500; letter-spacing: 0.1em; margin: 0;">COLEGIO DUAL</p>
        <p id="debug-status" style="color: #999; font-size: 11px; margin-top: 15px;">Iniciando sistema...</p>
    </div>
</div>

<script>
    // Global error tracking to help debug in WordPress
    window.onerror = function(msg, url, line, col, error) {
        var status = document.getElementById('debug-status');
        if (status) {
            status.style.color = '#DC1E35';
            status.innerHTML = 'Error de carga: ' + msg.split('\n')[0];
        }
        return false;
    };
    
    // Check for wpData with timeout
    setTimeout(function() {
        var status = document.getElementById('debug-status');
        if (typeof wpData === 'undefined') {
            console.warn('wpData is not defined.');
            if (status) status.innerHTML = 'Error: wpData no encontrado. Revisa functions.php';
        } else {
            if (status && status.innerHTML === 'Iniciando sistema...') {
                status.innerHTML = 'Conectando con WordPress...';
            }
        }
    }, 2000);
</script>

<style>
    @keyframes dual-spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
</style>

<div class="debug-indicator" style="position: fixed; bottom: 0; left: 0; background: #000; color: #fff; font-size: 9px; padding: 2px 5px; z-index: 9999; opacity: 0.5;">
    Colegio Dual Theme v1.0.5
</div>

<?php wp_footer(); ?>
</body>
</html>