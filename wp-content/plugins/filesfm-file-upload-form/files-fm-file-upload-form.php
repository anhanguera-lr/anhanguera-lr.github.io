<?php
/**
 * @package FilesFm_File_Upload_Form
 * @version 1.3.5
 */
/*
Plugin Name: Files.fm File Upload Form
Plugin URI: https://files.fm/upload-form?wp
Description: Plugin for file upload with customizable design form, backend cloud storage, e-mail notifications, file management and fast, reliable, secure upload.
Author: Files.fm
Version: 1.3.5
*/

define('FILES_FM_UPLOAD__VERSION', '1.3.5');
define('FILES_FM_UPLOAD__PLUGIN_NAME', 'Files.fm File Upload Form');
define('FILES_FM_UPLOAD__TRANSLATION_DOMAIN', 'files_fm_upload_form');
define('FILES_FM_UPLOAD__WIDGET_NAME', 'FilesFmUpload_Widget');
define('FILES_FM_UPLOAD__WIDGET_IDBASE', strtolower(FILES_FM_UPLOAD__WIDGET_NAME . '_IDBASE'));
define('FILES_FM_UPLOAD__ADMIN_ORIGIN', 'https://files.fm');
define('FILES_FM_UPLOAD__ADMIN_PATH', '/web_module/wp_plugin/v1/admin.php');
define('FILES_FM_UPLOAD__EMBED_SCRIPT_HOST', 'https://files.fm');
define('FILES_FM_UPLOAD__EMBED_SCRIPT_PATH', '/web_module/js/v1/');
define('FILES_FM_UPLOAD__SHORTCODE', 'files_fm_upload');
define('FILES_FM_UPLOAD__DEFAULT_LANGUAGE_CODE', 'en');
define('FILES_FM_UPLOAD__OPTION_PREFIX', 'files_fm_upload__');
define('FILES_FM_UPLOAD__DEBUG', FALSE);

add_action( 'init', 'files_fm_upload__init' );
add_action( 'widgets_init', create_function('', 'return register_widget("'. FILES_FM_UPLOAD__WIDGET_NAME .'");') );
add_action( 'wp_ajax_files_fm_upload__config_ajax', 'files_fm_upload__config_ajax' );

$strOriginUrl = urlencode((isset($_SERVER['HTTPS']) ? "https" : "http") . "://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]");

function files_fm_upload__get_allowed_options () {
    return array('iframe_src', 'user_id', 'user_hash', 'username', 'addhash', 'iframe_width', 'iframe_height');
}
function files_fm_upload__get_required_options () {
    return array('iframe_src', 'user_id', 'user_hash', 'username', 'addhash', 'iframe_width', 'iframe_height');
}

function files_fm_upload__init() {
    if ( ! function_exists( 'json_encode' ) ) {
        add_action( 'admin_notices', create_function( '', "echo '<div class=\"error\"><p>".__( FILES_FM_UPLOAD__PLUGIN_NAME . ' requires PHP 5.2 to function properly. Please upgrade PHP or deactivate '. FILES_FM_UPLOAD__PLUGIN_NAME .'.', FILES_FM_UPLOAD__TRANSLATION_DOMAIN ) ."</p></div>';" ) );
        return;
    }
    
    if ( current_user_can('activate_plugins') ) {
        add_action( 'admin_menu', 'files_fm_upload__config_page' );
        add_filter( 'plugin_action_links', 'files_fm_upload__action_links', 10, 5 );
        
        files_fm_upload__admin_warnings();
    }
    
    // register shotcode handler
    add_shortcode( FILES_FM_UPLOAD__SHORTCODE , 'files_fm_upload__shortcode_handler' );
    
    add_action('wp_head','files_fm_upload__setup_header_widget_popup');
    add_action('wp_footer','files_fm_upload__setup_footer_widget_popup');
    
    register_uninstall_hook( __FILE__, 'files_fm_upload__uninstall' );
}

function files_fm_upload__action_links( $actions, $plugin_file ) {
    static $plugin;
    
    if (!isset($plugin))
        $plugin = plugin_basename( __FILE__ );
    
    if ($plugin == $plugin_file) {
        $actions[] = '<a href="'. esc_url( get_admin_url(null, 'plugins.php?page=files-fm-upload-config') ) .'">'. __( 'Settings', FILES_FM_UPLOAD__TRANSLATION_DOMAIN ) .'</a>';
    }
    return $actions;
}

function files_fm_upload__get_option ($str_key, $mix_default_value=null) {
    return get_option(FILES_FM_UPLOAD__OPTION_PREFIX . $str_key, $mix_default_value);
}

function files_fm_upload__set_option ($str_key, $str_val) {
    $bol_success = TRUE;
    $str_old_val = get_option( FILES_FM_UPLOAD__OPTION_PREFIX . $str_key );
    if (empty($str_old_val)) {
        if ( ! add_option( FILES_FM_UPLOAD__OPTION_PREFIX . $str_key, $str_val, '', TRUE ) ) {
            $bol_success = FALSE;
        }
    }
    elseif ($str_old_val != $str_val) {
        if ( ! update_option( FILES_FM_UPLOAD__OPTION_PREFIX . $str_key, $str_val ) ) {
            $bol_success = FALSE;
        }
    }
    return $bol_success;
}

function files_fm_upload__shortcode_handler( $atts ) {
    
    $str_iframe_src = get_option( FILES_FM_UPLOAD__OPTION_PREFIX . 'iframe_src' );
    $str_iframe_width = get_option( FILES_FM_UPLOAD__OPTION_PREFIX . 'iframe_width' );
    $str_iframe_height = get_option( FILES_FM_UPLOAD__OPTION_PREFIX . 'iframe_height' );
    
    $str_user_id = get_option( FILES_FM_UPLOAD__OPTION_PREFIX . 'user_id' );
    $str_user_hash = get_option( FILES_FM_UPLOAD__OPTION_PREFIX . 'user_hash' );
    
    $str_username = get_option( FILES_FM_UPLOAD__OPTION_PREFIX . 'username' );
    $str_addhash = get_option( FILES_FM_UPLOAD__OPTION_PREFIX . 'addhash' );
    
    $config = '';
    if ( ! empty( $atts['config'] ) && (int) $atts['config'] > 0 ) {
        $config = '&cid=' . (int) $atts['config'];
    }
    $lang = '';
    if ( ! empty( $atts['language'] ) && strlen( $atts['language'] ) == 2 ) {
        $lang = '&language=' . $atts['language'];
    }
    if ( ! empty($atts['width']) ) {
        $str_iframe_width = $atts['width'];
    }
    if ( ! empty($atts['height']) ) {
        $str_iframe_height = $atts['height'];
    }
    if ( ! empty($atts['src']) ) {
        $str_iframe_src = $atts['src'];
    }
    
    if ( $str_iframe_width === strval( intval( $str_iframe_width ) ) ) {
        $str_iframe_width = $str_iframe_width . 'px';
    }
    if ( $str_iframe_height === strval( intval( $str_iframe_height ) ) ) {
        $str_iframe_height = $str_iframe_height . 'px';
    }
    
    $str_embed_code = '';
    if ( ! empty( $str_user_id ) && ! empty( $str_user_hash ) )
    {
        $strScriptURL = FILES_FM_UPLOAD__EMBED_SCRIPT_HOST . FILES_FM_UPLOAD__EMBED_SCRIPT_PATH . '?uid='.$str_user_id.'&uid_hash='.$str_user_hash.'&insert_before_id=files_fm_upload_script_tag'. $config .''. $lang;
    }
    elseif ( ! empty( $str_username ) && ! empty( $str_addhash ) )
    {
        $strScriptURL = FILES_FM_UPLOAD__EMBED_SCRIPT_HOST . FILES_FM_UPLOAD__EMBED_SCRIPT_PATH . '?addto='.$str_username.'&addhash='.$str_addhash.'&insert_before_id=files_fm_upload_script_tag'. $config .''. $lang;    
    }
    
    $strIframeSrc = empty( $str_iframe_src ) ? "" : ( $str_iframe_src . $config . $lang );
    
    $strCode = "
    <span id='files_fm_temp_element'></span>
    <script>     
        // keep all temp data in a separate object to avoid collisions
        var filesfm_temp = {};
        filesfm_temp.scriptSrc = '" . ( isset($strScriptURL) ? $strScriptURL : '' ) . "';
        filesfm_temp.embedCode = " . json_encode( $str_embed_code ) . ";
        filesfm_temp.iFrameSrc = '" . ( isset($strIframeSrc) ? $strIframeSrc : '' ) . "';
    
        function filesfm_iframe_error() 
        {
            // files.fm is not available or its being blocked by cloudflare?
            var elementToReplace = document.getElementById( 'files_fm_temp_element' );

            // display an error message
            var warningElement = document.createElement( 'div' );
            warningElement.style.width = '" . (empty($str_iframe_width) ? '500px': $str_iframe_width) . "';
            warningElement.innerHTML = 'Unfortunately, Files.fm file upload form failed to load. Either Files.fm is under maintenance or your IP address is blocked due to security reasons. Please open <a href=\'https://files.fm\' target=\'_blank\'>Files.fm</a> for more information.';
            
            elementToReplace.parentElement.appendChild( warningElement );
            elementToReplace.parentElement.removeChild( elementToReplace );
        }   
        
        function filesfm_make_iframe_element() 
        {
            var newElement = document.createElement( 'iframe' );
            
            newElement.src = filesfm_temp.iFrameSrc;
            newElement.setAttribute( 'frameborder', 0 );
            
            newElement.style.border = '0';
            newElement.style.width = '". (empty($str_iframe_width) ? '500px': $str_iframe_width) ."';
            newElement.style.height = '". (empty($str_iframe_height) ? '500px': $str_iframe_height) ."';
            newElement.style.overflowX = 'hidden';
            newElement.style.maxWidth = 'none !important';
            
            return newElement;
        }
        
        function filesfm_on_cf_test_response()
        {
            var elementToReplace = document.getElementById( 'files_fm_temp_element' );                       
            var newElement;
                        
            if( this.response === '1' )
            {
                // response is OK        
                if( filesfm_temp.scriptSrc.length > 0 )
                {
                    newElement = document.createElement( 'script' ) ;
                    newElement.src = filesfm_temp.scriptSrc;
                    newElement.id = 'files_fm_upload_script_tag';
                }
                else
                {
                   newElement = filesfm_make_iframe_element();
                }
                
                elementToReplace.parentElement.appendChild( newElement );
                elementToReplace.parentElement.removeChild( elementToReplace );
            }
            else 
            {
                // response is bad
                filesfm_iframe_error();
            }
        }
        
        function filesfm_init_fileupload_form()
        {
            // create xhr -> calls cf_test.php (this should always return 1)    
            var xhr = new XMLHttpRequest();
            xhr.addEventListener( 'load', filesfm_on_cf_test_response );
            xhr.addEventListener( 'error', filesfm_iframe_error );
        
            xhr.open( 'GET', '" . FILES_FM_UPLOAD__EMBED_SCRIPT_HOST . FILES_FM_UPLOAD__EMBED_SCRIPT_PATH . "cf_test.php' );        
            xhr.send();
        }
        
        if (typeof document.addEventListener != 'undefined') 
        {
            document.addEventListener('DOMContentLoaded', filesfm_init_fileupload_form, false);
        }
        else
        {
            window.attachEvent(\"onload\", filesfm_init_fileupload_form);
        }
    </script>";
    
    return $strCode;
}

function files_fm_upload__admin_warnings() {
    
    /* Access rights check */
    if ( ! current_user_can('activate_plugins') ) {
        return;
    }
    
    if ( !get_option( FILES_FM_UPLOAD__OPTION_PREFIX . 'iframe_src' ) ) {
        function files_fm_upload__config_warning() {
            echo "
            <div id='files-fm-upload-warning' class='updated fade'><p><strong>".__( 'Files.fm File Upload Form plugin is almost ready.', FILES_FM_UPLOAD__TRANSLATION_DOMAIN )."</strong> ".sprintf(__( 'You must <a href="%1$s">configure your plugin</a> for it to work.', FILES_FM_UPLOAD__TRANSLATION_DOMAIN ), "plugins.php?page=files-fm-upload-config")."</p></div>
            ";
        }
        add_action('admin_notices', 'files_fm_upload__config_warning');
        return;
    }
    
}

function files_fm_upload__config_page() {
    
    /* Access rights check */
    if ( ! current_user_can( 'activate_plugins' ) ) {
        return;
    }
    
    if ( function_exists( 'add_menu_page' ) ) {
        add_menu_page(__( 'Files.fm File Upload Form', FILES_FM_UPLOAD__TRANSLATION_DOMAIN ), __( 'Files.fm File Upload Form', FILES_FM_UPLOAD__TRANSLATION_DOMAIN ), 'manage_options', 'files-fm-upload-config', 'files_fm_upload__config');
    }
    
}

function files_fm_upload__config_ajax() {
    
    /* Access rights check */
    if ( ! current_user_can('activate_plugins') ) {
        return;
    }
    
    $files_fm_upload__arr_allowed_options = files_fm_upload__get_allowed_options();
    $files_fm_upload__arr_required_options = files_fm_upload__get_required_options();
    
    $arr_response = array(
        'success' => FALSE,
        'settings_set' => null,
    );
    
    $bol_success = TRUE;
    
    $int_required_settings_set = 0;
    foreach ( $_POST as $str_key => $str_val )
    {
        if ( in_array( $str_key, $files_fm_upload__arr_allowed_options ) ) {
            
            if ( ! isset($arr_response['settings_set']) ) {
                $arr_response['settings_set'] = array();
            }
            
            $str_val = sanitize_text_field( urldecode($str_val) );
            
            if ( ! files_fm_upload__set_option ( $str_key, $str_val ) ) {
                $bol_success = FALSE;
            }
            
            
            $arr_response['settings_set'][$str_key] = $str_val;
            
            if ( in_array( $str_key, $files_fm_upload__arr_required_options ) ) {
                $int_required_settings_set++;
            }
            
        }
    }
    
    if ( count( $files_fm_upload__arr_required_options ) != $int_required_settings_set ) {
        $bol_success = FALSE;
    }
    
    if( $bol_success )
    {
        if( get_option( FILES_FM_UPLOAD__OPTION_PREFIX . 'options_just_saved', null ) === null )
        {
            add_option( FILES_FM_UPLOAD__OPTION_PREFIX . 'options_just_saved', 1, TRUE );
        }
    }
    
    $arr_response['success'] = $bol_success;
    
    echo json_encode( $arr_response );
    
    exit();
}

function files_fm_upload__uninstall () {
    global $current_user;
    global $strOriginUrl;
    
    get_currentuserinfo();
    
    $str_user_parameters = '';
    $str_user_parameters .= '&username=' . $current_user->user_login;
    $str_user_parameters .= '&email=' . $current_user->user_email;
    $str_user_parameters .= '&firstname=' . $current_user->user_firstname;
    $str_user_parameters .= '&lastname=' . $current_user->user_lastname;
    
    $str_lang_code = null;
    
    $str_language = get_bloginfo ( 'language' );
    if ( ! empty($str_language) ) {
        $str_lang_code = strtolower( substr( $str_language, 0, 2 ) );
    }
    
    if ( empty($str_lang_code) || strlen( $str_lang_code ) != 2 ) {
        $str_lang_code = FILES_FM_UPLOAD__DEFAULT_LANGUAGE_CODE;
    }
    
    $str_url = FILES_FM_UPLOAD__ADMIN_ORIGIN . FILES_FM_UPLOAD__ADMIN_PATH . '?uninstall=1&lng=' . $str_lang_code . $str_user_parameters . "&wp_referer=" . $strOriginUrl;
    file_get_contents( $str_url );
}

function files_fm_upload__config() {
    
    global $current_user;
    global $strOriginUrl;
    
    /* Access rights check */
    if ( ! current_user_can( 'activate_plugins' ) ) {
        return;
    }
    
    get_currentuserinfo();
    
    $arr_user_data = array(
        'username' => $current_user->user_login,
        'email' => $current_user->user_email,
        'firstname' => $current_user->user_firstname,
        'lastname' => $current_user->user_lastname,
    );
    
    $files_fm_upload__arr_allowed_options = files_fm_upload__get_allowed_options();
    
    $str_lang_code = null;
    
    $str_language = get_bloginfo ( 'language' );
    if ( ! empty($str_language) ) {
        $str_lang_code = strtolower( substr( $str_language, 0, 2 ) );
    }
    
    if ( empty($str_lang_code) || strlen( $str_lang_code ) != 2 ) {
        $str_lang_code = FILES_FM_UPLOAD__DEFAULT_LANGUAGE_CODE;
    }
    
    wp_enqueue_script('jquery');
    
    $arr_settings = array();
    foreach ( $files_fm_upload__arr_allowed_options as $str_key )
    {
        $tmp = get_option( FILES_FM_UPLOAD__OPTION_PREFIX . $str_key );
        if(!empty($tmp)) {
            $arr_settings[$str_key] = $tmp;
        }
    }
    
    $str_files_fm_url = FILES_FM_UPLOAD__ADMIN_ORIGIN . '/profile/';
    if ( ! empty($arr_settings['public_domain']) ) {
        $str_files_fm_url = 'https://' . $arr_settings['public_domain'] . '/profile/';
    }
    
    $str_files_fm_url .= "?wp_referer=" . $strOriginUrl;
    
    $str_saved_username = null;
    if ( ! empty($arr_settings['username']) ) {
        $str_saved_username = $arr_settings['username'];
    }
    
    $bol_show_save_success = FALSE;
    if ( get_option( FILES_FM_UPLOAD__OPTION_PREFIX . 'options_just_saved', null ) === 1 ) {
        delete_option( FILES_FM_UPLOAD__OPTION_PREFIX . 'options_just_saved' );
        $bol_show_save_success = TRUE;
    }
    
    ?>



    <div id="success_message" class="updated fade" style="<?php echo ($bol_show_save_success ? '' : 'display: none;')?>"><p><strong><?php _e('Options saved. You can use file upload by saving shortcode into your content.') ?></strong></p></div>
    <div id="error_message" class="error fade" style="display: none;"><p><strong><?php _e('There was an error while updating your settings. Please try again later, or contact Files.fm support team.') ?></strong></p></div>

    <div class="wrap">
        <h2><?php _e( 'Files.fm File Upload Form Configuration' ); ?></h2>
        
        <?php if( ! empty($arr_settings) ) :?>
            <h3><?php _e( 'Files.fm account' ); ?>:</h3>
            <p><a href="<?php echo esc_url($str_files_fm_url)?>" target="_blank"><?php echo $arr_settings['username'] ?></a>&nbsp;&nbsp;&nbsp;(<?php echo _e('click to view your files'); ?>)</p>
            <h3><?php _e( 'Paste this shortcode into any WordPress content you want to allow upload from' ); ?>:</h3>
            <p><textarea readonly="readonly" style="width: 300px; height: 50px;"><?php echo '['. FILES_FM_UPLOAD__SHORTCODE .']' ?></textarea></p>

            <!-- 
<h3><?php _e( 'Upload box width' ); ?></h3>
<p><?php echo $arr_settings['iframe_width'] ?></p>
<h3><?php _e( 'Upload box height' ); ?></h3>
<p><?php echo $arr_settings['iframe_height'] ?></p>
 -->
        <?php endif;?>

        <!-- 
<?php if( ! $bol_auto_connect ) :?>
<input type="button" id="files_fm_upload__connect_button" onclick="files_fm_upload__connect()" value="<?php _e('Connect to Files.fm and configure upload form'); ?>" />
<?php endif;?>
 -->

        <div id="files_fm_config_wrapper" style="margin: 20px;">
        </div>

        <script type="text/javascript">

            jQuery(function() {
                files_fm_upload__connect();
            });

            var bol_files_fm_upload__do_redirect_on_save = <?php echo (empty($arr_settings) ? 'true' : 'false')?>;

            var arr_allowed_options_keys = ["<?php echo implode( '", "', files_fm_upload__get_allowed_options() )?>"];

            var obj_user_data = <?php echo json_encode( $arr_user_data )?>;
            var str_saved_username = <?php echo json_encode( $str_saved_username )?>;

            function files_fm_upload__save_settings_ajax ( obj_settings ) {

                var obj_post_data = {
                    'action': 'files_fm_upload__config_ajax'
                };

                for (key in obj_settings)
                {
                    if (jQuery.inArray(key, arr_allowed_options_keys) != -1)
                    {
                        obj_post_data[key] = obj_settings[key];
                    }
                }

                jQuery.post(ajaxurl, obj_post_data, function(obj_response) {
                    <?php if ( FILES_FM_UPLOAD__DEBUG ) : ?>
                    console.log(obj_response);
                    <?php endif;?>
                    if(obj_response.success) {
                        if (bol_files_fm_upload__do_redirect_on_save)
                        {
                            document.location.reload(true);
                        }
                        else
                        {
                            jQuery('#error_message').hide();
                            jQuery('#success_message').show().fadeOut(10000);
                        }
                    }
                    else {
                        jQuery('#error_message').show();
                        jQuery('#success_message').hide().fadeOut(10000);
                    }
                }, 'json');

            }


            var files_fm_upload__admin_iframe_cwin = null;
            var files_fm_origin = '<?php echo FILES_FM_UPLOAD__ADMIN_ORIGIN?>';
            var files_fm_iframe_prev_height = null;
            function files_fm_upload__config_receive_message(event) {

                if (event.origin !== files_fm_origin || typeof event.data != 'string') {
                    return;
                }

                var obj_data = files_fm_upload__decode(event.data);

                if (obj_data == null || typeof(obj_data.Method) != 'string') {
                    return;
                }

                switch (obj_data.Method) {

                    case 'Handshake':
                    <?php if ( FILES_FM_UPLOAD__DEBUG ) : ?>
                        console.log('Handshake WP', obj_data);
                    <?php endif;?>
                        files_fm_upload__admin_iframe_cwin = event.source;
                        files_fm_upload__admin_post_message ({'Method': 'HandshakeComplete'});
                        jQuery('#files_fm_upload__connect_button').hide();
                        break;

                    case 'HandshakeComplete':
                    <?php if ( FILES_FM_UPLOAD__DEBUG ) : ?>
                        console.log('HandshakeComplete WP', obj_data);
                    <?php endif;?>
                        jQuery('#files_fm_upload__connect_button').hide();
                        break;

                    case 'ChangeOrigin':
                    <?php if (FILES_FM_UPLOAD__DEBUG) : ?>
                        console.log('ChangeOrigin WP', obj_data.NewOrigin);
                    <?php endif;?>
                        files_fm_upload__admin_post_message ({'Method': 'OriginChangeComplete'});
                        files_fm_origin = obj_data.NewOrigin;
                        break;

                    case 'SaveSettings':
                    <?php if ( FILES_FM_UPLOAD__DEBUG ) : ?>
                        console.log('SaveSettings WP', obj_data);
                    <?php endif;?>
                        if ( typeof(obj_data.Settings)!='undefined' && typeof(obj_data.Settings.username)!='undefined' && obj_data.Settings.username != str_saved_username ) {
                            bol_files_fm_upload__do_redirect_on_save = true;
                        }
                        files_fm_upload__save_settings_ajax(obj_data.Settings);
                        break;

                    case 'ResizeIframe':
                    <?php if ( FILES_FM_UPLOAD__DEBUG ) : ?>
                        console.log('Resize Iframe', obj_data);
                    <?php endif;?>
                        if (obj_data.Height && obj_data.Height != files_fm_iframe_prev_height) {
                            files_fm_iframe_prev_height = obj_data.Height;
                            jQuery('#files_fm_config_iframe').height(obj_data.Height + 'px');
                        }
                        break;
                }
            }

            function files_fm_upload__admin_post_message (obj_data) {
                if(files_fm_upload__admin_iframe_cwin != null) {
                    <?php if ( FILES_FM_UPLOAD__DEBUG ) : ?>
                    console.log('postMessage', obj_data);
                    <?php endif;?>
                    files_fm_upload__admin_iframe_cwin.postMessage(
                        files_fm_upload__encode(obj_data),
                        files_fm_origin
                    );
                }
            }

            function files_fm_upload__encode (obj_data) {
                data = null;
                try {
                    var data = JSON.stringify(obj_data);
                }
                catch (e) {
                }
                return data;
            }
            function files_fm_upload__decode (str_data) {
                data = null;
                try {
                    var data = JSON.parse(str_data);
                }
                catch (e) {
                }
                return data;
            }

            function files_fm_upload__connect() {

                var jq_iframe = jQuery('<iframe />');
                jq_iframe.css({'width': '100%','height': '100%','min-height': '800px'});
                jq_iframe.attr('id', 'files_fm_config_iframe');
                jQuery('#files_fm_config_wrapper').append(jq_iframe);
                jQuery('#files_fm_config_iframe').load(function (){
                    <?php if ( FILES_FM_UPLOAD__DEBUG ) : ?>
                    console.log('iframe loaded');
                    <?php endif;?>
                    files_fm_upload__admin_iframe_cwin = jQuery(this)[0].contentWindow;
                    files_fm_upload__admin_post_message ({'Method':'Handshake'});
                });

                var str_user_data_param = '';
                if (typeof(obj_user_data) == 'object' && obj_user_data.username) {
                    str_user_data_param += '&user_json=' + encodeURIComponent(JSON.stringify(obj_user_data));
                }
                
                jQuery('#files_fm_config_iframe').attr('src', '<?php echo esc_url( FILES_FM_UPLOAD__ADMIN_ORIGIN . FILES_FM_UPLOAD__ADMIN_PATH . '?lng=' . $str_lang_code . '' ) . "&wp_referer=" . $strOriginUrl; ?>' + str_user_data_param + (str_saved_username ? '&username='+str_saved_username : ''));
            }

            if ( window.addEventListener ) {
                window.addEventListener( 'message', files_fm_upload__config_receive_message, false );
            } else if ( window.attachEvent )  {
                window.attachEvent( 'onmessage', files_fm_upload__config_receive_message );
            }


        </script>

    </div>
    <?php
}


/***** WIDGET *****/

function files_fm_upload__setup_header_widget_popup () {
    // if widget is activated, append upload popup form to body
    if( is_active_widget( false, false, FILES_FM_UPLOAD__WIDGET_IDBASE ) ) {
        
        $str_iframe_src = files_fm_upload__get_option( 'iframe_src' );
        $str_iframe_width = files_fm_upload__get_option( 'iframe_width' );
        $str_iframe_height = files_fm_upload__get_option( 'iframe_height' );
        
        if ( ! empty($str_iframe_src) ) {
            if ( empty($str_iframe_width) ) {
                $str_iframe_width = 500;
            }
            if ( empty($str_iframe_height) ) {
                $str_iframe_height = 485;
            }
            
            ?>
            <style type="text/css" media="screen">
                .ffm-popup-wrapper {
                    display: none;
                    position: absolute;
                    z-index:1001;
                    top: 0;
                    left: 0;
                    width: <?php echo intval( $str_iframe_width ) +32 ?>px;
                    height: <?php echo intval( $str_iframe_height ) +74 ?>px;
                    background-color: #fff;
                    border: 1px solid #ddd;
                    border-radius: 5px;
                    box-shadow: 0 2px 8px #aaa;
                    overflow: hidden;
                }
                #files_fm_upload_modal_window.active {
                    display: block;
                }

                .ffm-popup-title {
                    padding: 10px 15px;
                    /*background-color: #f4f4f4;*/
                    border-bottom: 1px solid #f0f0f0;
                    margin-bottom: 15px;
                }
                .ffm-popup-title h3 {
                    display: inline-block;
                    margin: 0;
                    line-height: 1.5em;
                    color: #333;
                }
                .ffm-popup-body {
                    border:0;
                    width: <?php echo intval( $str_iframe_width ) ?>px;
                    height: <?php echo intval( $str_iframe_height ) ?>px;
                    margin: 0 15px;
                    color: #555;
                    overflow: hidden;
                }
                .ffm-popup-close {
                    float: right;
                    margin-top: 2px;
                    padding: 0;
                    font-size: 24px;
                    line-height: 1;
                    border: 0;
                    background: transparent;
                    color: #aaa;
                    cursor: pointer;
                }
                .ffm-popup-close:hover {
                    color: #333;
                }

                #files_fm_upload_document_overlay {
                    display: none;
                    position: fixed;
                    z-index:1000;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background-color:#000;
                    filter:alpha(opacity=75);
                    -moz-opacity: 0.75;
                    opacity: 0.75;
                }
                #files_fm_upload_document_overlay.active {
                    display: block;
                }

                #files_fm_upload_modal_iframe {
                    border:0;
                    width: <?php echo intval( $str_iframe_width ) ?>px;
                    height: <?php echo intval( $str_iframe_height ) ?>px;
                    margin: 0;
                }
            </style>
            <?php
        }
    }
}
function files_fm_upload__setup_footer_widget_popup () {
    // if widget is activated, append upload popup form to body
    if( is_active_widget( false, false, FILES_FM_UPLOAD__WIDGET_IDBASE ) ) {
        
        $str_iframe_src = get_option( FILES_FM_UPLOAD__OPTION_PREFIX . 'iframe_src' );
        $str_iframe_width = get_option( FILES_FM_UPLOAD__OPTION_PREFIX . 'iframe_width' );
        $str_iframe_height = get_option( FILES_FM_UPLOAD__OPTION_PREFIX . 'iframe_height' );
        
        $str_title = files_fm_upload__get_option ( 'widget_title' );
        
        if ( ! empty( $str_iframe_src ) ) {
            ?>
            <div id="files_fm_upload_document_overlay" onclick="files_fm_upload_popup_hide()"></div>
            <div id="files_fm_upload_modal_window" class="ffm-popup-wrapper">
                <div class="ffm-popup-title">
                    <button type="button" class="ffm-popup-close" onclick="files_fm_upload_popup_hide ()">&times;</button>
                    <h3 id="files_fm_upload_modal_window_title"></h3>
                </div>
                <div class="ffm-popup-body">
                    <iframe id="files_fm_upload_modal_iframe" frameborder="0" src="" width="<?php echo $str_iframe_width;?>" height="<?php echo $str_iframe_height;?>"></iframe>
                </div>
            </div>
            <script type="text/javascript">
                var dom_ffm_modal = document.getElementById('files_fm_upload_modal_window');
                var dom_ffm_overlay = document.getElementById('files_fm_upload_document_overlay');
                var dom_ffm_iframe = document.getElementById('files_fm_upload_modal_iframe');
                var int_ffm_modal_width = <?php echo intval( $str_iframe_width ) +30 ?>;
                var int_ffm_modal_height = <?php echo intval( $str_iframe_height ) +72 ?>;

                var ffm_fnc_extend = function(to, from) {
                    for (var p in from) {
                        if (from.hasOwnProperty(p)) {
                            to[p] = from[p];
                        }
                    }
                    return to;
                };

                var bol_files_fm_upload_modal_is_active = false;
                function files_fm_upload_popup_toogle (str_title) {
                    if (typeof(str_title)=='undefined')
                        var str_title = '';

                    if (bol_files_fm_upload_modal_is_active) {
                        files_fm_upload_popup_hide();
                    } else {
                        files_fm_upload_popup_show(str_title);
                    }
                }

                function files_fm_upload_popup_show (str_title) {
                    files_fm_upload_popup_position();
                    dom_ffm_iframe.src = '<?php echo $str_iframe_src ?>';
                    dom_ffm_overlay.className += ' active';
                    dom_ffm_modal.className += ' active';

                    bol_files_fm_upload_modal_is_active = true;
                    document.getElementById('files_fm_upload_modal_window_title').innerHTML = str_title;
                }

                function files_fm_upload_popup_hide () {
                    dom_ffm_overlay.className = dom_ffm_overlay.className.replace('active', '');
                    if (typeof(dom_ffm_overlay.className.trim) == 'function')
                        dom_ffm_overlay.className = dom_ffm_overlay.className.trim();
                    else
                        dom_ffm_overlay.className = dom_ffm_overlay.className.replace('  ', '');

                    dom_ffm_modal.className = dom_ffm_modal.className.replace('active', '');
                    if (typeof(dom_ffm_modal.className.trim) == 'function')
                        dom_ffm_modal.className = dom_ffm_modal.className.trim();
                    else
                        dom_ffm_modal.className = dom_ffm_modal.className.replace('  ', '');

                    dom_ffm_iframe.src = '';

                    bol_files_fm_upload_modal_is_active = false;
                }

                function files_fm_upload_popup_position () {

                    var int_win_width = window.innerWidth || document.documentElement.clientWidth;
                    var int_win_height = window.innerHeight || document.documentElement.clientHeight
                    var int_scroll_x = window.pageXOffset || document.documentElement.scrollLeft;
                    var int_scroll_y = window.pageYOffset || document.documentElement.scrollTop;

                    var top = int_scroll_y + Math.max(0, (int_win_height - int_ffm_modal_height) / 2);
                    var left = int_scroll_x + Math.max(0, (int_win_width - int_ffm_modal_width) / 2);

                    ffm_fnc_extend(dom_ffm_modal.style, {
                        top: top + 'px',
                        left: left + 'px'
                    });
                }

                var fnc_ffm_key_down = function (e){
                    e = e || window.event;
                    var keyCode = e.which || e.keyCode;
                    if (keyCode === 27) {
                        files_fm_upload_popup_hide();
                    }
                };

                if (window.addEventListener) {
                    window.addEventListener('resize', files_fm_upload_popup_position, false);
                    window.addEventListener('keydown', fnc_ffm_key_down, false);
                } else {
                    window.attachEvent('onresize', files_fm_upload_popup_position);
                    window.attachEvent('onkeydown', fnc_ffm_key_down);
                }
            </script>
            <?php
        }
    }
}






class FilesFmUpload_Widget extends WP_Widget {
    
    function __construct() {
        parent::__construct(
            FILES_FM_UPLOAD__WIDGET_IDBASE,
            __( 'Files.fm File Upload Form Widget', FILES_FM_UPLOAD__TRANSLATION_DOMAIN ), // Name
            array( 'description' => __( 'Widget shows upload button, after clicking it, popup will show up and enable uploading files to Files.fm service.', FILES_FM_UPLOAD__TRANSLATION_DOMAIN ), ) // Args
        );
    }
    
    function form($instance) {
        $title = isset( $instance['title'] ) ? $instance['title'] : __( 'File upload', FILES_FM_UPLOAD__TRANSLATION_DOMAIN );
        $button_text = !empty( $instance['button_text'] ) ? $instance['button_text'] : __( 'Click here to upload files!', FILES_FM_UPLOAD__TRANSLATION_DOMAIN );
        
        $background_color = isset( $instance['background_color'] ) ? $instance['background_color'] : 'CA1913';
        $text_color = isset( $instance['text_color'] ) ? $instance['text_color'] : 'FFFFFF';
        $width_pixels = isset( $instance['width_pixels'] ) ? $instance['width_pixels'] : '230';
        $height_pixels = isset( $instance['height_pixels'] ) ? $instance['height_pixels'] : '40';
        $font_size = isset( $instance['font_size'] ) ? $instance['font_size'] : '12';
        $custom_css = isset( $instance['custom_css'] ) ? $instance['custom_css'] : '';
        
        ?>
        <p>
            <label for="<?php echo $this->get_field_id( 'title' ); ?>"><?php _e( 'Block title:' ); ?></label>
            <input class="widefat" id="<?php echo $this->get_field_id( 'title' ); ?>" name="<?php echo $this->get_field_name( 'title' ); ?>" type="text" value="<?php echo esc_attr( $title ); ?>">
        </p>
        <p>
            <label for="<?php echo $this->get_field_id( 'button_text' ); ?>"><?php _e( 'Button text:' ); ?></label>
            <input class="widefat" id="<?php echo $this->get_field_id( 'button_text' ); ?>" name="<?php echo $this->get_field_name( 'button_text' ); ?>" type="text" value="<?php echo esc_attr( $button_text ); ?>">
        </p>
        <p>
            <label for="<?php echo $this->get_field_id( 'background_color' ); ?>"><?php _e( 'Button background color HEX code:' ); ?></label>
            <input class="widefat" id="<?php echo $this->get_field_id( 'background_color' ); ?>" name="<?php echo $this->get_field_name( 'background_color' ); ?>" type="text" value="<?php echo esc_attr( $background_color ); ?>">
        </p>
        <p>
            <label for="<?php echo $this->get_field_id( 'text_color' ); ?>"><?php _e( 'Button text color HEX code:' ); ?></label>
            <input class="widefat" id="<?php echo $this->get_field_id( 'text_color' ); ?>" name="<?php echo $this->get_field_name( 'text_color' ); ?>" type="text" value="<?php echo esc_attr( $text_color ); ?>">
        </p>
        <p>
            <label for="<?php echo $this->get_field_id( 'width_pixels' ); ?>"><?php _e( 'Button width in pixels:' ); ?></label>
            <input class="widefat" id="<?php echo $this->get_field_id( 'width_pixels' ); ?>" name="<?php echo $this->get_field_name( 'width_pixels' ); ?>" type="text" value="<?php echo esc_attr( $width_pixels ); ?>">
        </p>
        <p>
            <label for="<?php echo $this->get_field_id( 'height_pixels' ); ?>"><?php _e( 'Button height in pixels:' ); ?></label>
            <input class="widefat" id="<?php echo $this->get_field_id( 'height_pixels' ); ?>" name="<?php echo $this->get_field_name( 'height_pixels' ); ?>" type="text" value="<?php echo esc_attr( $height_pixels ); ?>">
        </p>
        <p>
            <label for="<?php echo $this->get_field_id( 'font_size' ); ?>"><?php _e( 'Button font size in pixels:' ); ?></label>
            <input class="widefat" id="<?php echo $this->get_field_id( 'font_size' ); ?>" name="<?php echo $this->get_field_name( 'font_size' ); ?>" type="text" value="<?php echo esc_attr( $font_size ); ?>">
        </p>
        <p>
            <label for="<?php echo $this->get_field_id( 'custom_css' ); ?>"><?php _e( 'Custom CSS:' ); ?></label>
            <textarea class="widefat" id="<?php echo $this->get_field_id( 'custom_css' ); ?>" name="<?php echo $this->get_field_name( 'custom_css' ); ?>"><?php echo esc_attr( $custom_css ); ?></textarea>
        </p>
        <?php
    }
    
    function update($new_instance, $old_instance) {
        $instance = array();
        
        $arr_fields = array( 'title', 'button_text', 'background_color', 'text_color', 'width_pixels', 'height_pixels', 'font_size', 'custom_css' );
        
        foreach ( $arr_fields as $str_field )
        {
            if ( isset( $new_instance[$str_field] )) {
                $str_val = sanitize_text_field( strip_tags( $new_instance[$str_field] ) );
                $str_key = 'widget_' . $str_field;
                
                $instance[$str_field] = $str_val;
            }
        }
        return $instance;
    }
    
    function widget( $args, $instance ) {
        echo $args['before_widget'];
        
        if ( ! empty( $instance['title'] ) ) {
            echo $args['before_title'] . apply_filters( 'widget_title', $instance['title'] ). $args['after_title'];
        }
        
        if ( ! empty( $instance['button_text'] ) ) {
            $str_button_text = $instance['button_text'];
        } else {
            $str_button_text = __( 'Click here to upload files!', FILES_FM_UPLOAD__TRANSLATION_DOMAIN );
        }
        $str_uid = rand(1,10000);
        
        $background_color = isset( $instance['background_color'] ) ? $instance['background_color'] : 'CA1913';
        $text_color = isset( $instance['text_color'] ) ? $instance['text_color'] : 'FFFFFF';
        $height_pixels = isset( $instance['height_pixels'] ) ? $instance['height_pixels'] : '40';
        $width_pixels = isset( $instance['width_pixels'] ) ? $instance['width_pixels'] : '230';
        $font_size = isset( $instance['font_size'] ) ? $instance['font_size'] : '12';
        $custom_css = isset( $instance['custom_css'] ) ? $instance['custom_css'] : '';
        $title = isset( $instance['title'] ) ? $instance['title'] : '';
        
        $str_button_id = 'FilesFmUploadButton_'. $str_uid;
        
        ?>
        <style type="text/css">
            #<?php echo $str_button_id?> {
                background-color: <?php echo '#'.$background_color?>;
                color: <?php echo '#'.$text_color?>;
                width: <?php echo $width_pixels?>px;
                height: <?php echo $height_pixels?>px;
                font-size: <?php echo $font_size?>px;
                border: none;
                cursor: pointer;
            }
            <?php if ( ! empty( $custom_css ) ) :?>
            #<?php echo $str_button_id?> {
            <?php echo $custom_css;?>
            }
            <?php endif;?>
        </style>
        <button onclick="files_fm_upload_popup_toogle('<?php echo $title?>')" class="files_fm_upload_button" id="<?php echo $str_button_id?>"><?php echo $str_button_text; ?></button>
        <?php
        
        echo $args['after_widget'];
    }
}

?>