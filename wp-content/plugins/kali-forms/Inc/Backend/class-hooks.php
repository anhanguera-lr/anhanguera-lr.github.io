<?php

namespace KaliForms\Inc\Backend;

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Class Hooks
 *
 * @package Inc\Backend
 */
class Hooks
{
    /**
     * Plugin slug
     *
     * @var string
     */
    protected $slug = 'kaliforms';

    /**
     * Plugin basic hooks
     * Hooks constructor.
     */
    public function __construct()
    {
        /**
         * Admin enqueue script
         */
        add_action(
            'admin_enqueue_scripts',
            [$this, 'admin_enqueue'],
            99
        );

        add_action(
            'plugins_loaded',
            [$this, 'load_text_domain']
        );

        /**
         * Add settings link to plugins page
         */
        add_filter(
            'plugin_action_links_kaliforms/kaliforms.php',
            [$this, 'add_settings_link']
        );

        add_action('wp_ajax_kaliforms_reload_api_extensions',
            [$this, 'reload_api_extensions']
        );
        add_action('wp_ajax_nopriv_kaliforms_reload_api_extensions',
            [$this, 'denied']
        );
        add_action('wp_ajax_kaliforms_set_form_theme',
            [Form_Styles::get_instance(), 'set_form_theme']
        );
        add_action('wp_ajax_nopriv_kaliforms_set_form_theme',
            [$this, 'denied']
        );
        add_action('wp_ajax_kaliforms_update_option_ajax',
            [$this, 'update_option']
        );
        add_action('wp_ajax_kaliforms_clear_log', [$this, 'clear_mail_log']);
        add_action('wp_ajax_nopriv_kaliforms_clear_log', [$this, 'denied']);
        add_action('wp_ajax_nopriv_kaliforms_update_option_ajax', [$this, 'denied']);

    }
    /**
     * If the user is not authorized, deny action
     */
    public function denied()
    {
        wp_die(esc_html__('Denied', 'kaliforms'));
    }

    /**
     * Loads the plugin text domain
     */
    public function load_text_domain()
    {
        load_plugin_textdomain('kaliforms');
    }

    /**
     * Add settings link to plugin list table
     *
     * @param  array $links Existing links
     *
     * @return array        Modified links
     */
    public function add_settings_link($links)
    {
        /** @noinspection HtmlUnknownTarget */
        array_push(
            $links,
            sprintf(
                '<a href="%sedit.php?post_type=%s_forms">%s</a>',
                esc_url(get_admin_url()),
                $this->slug,
                esc_html__('Create your first form', 'kaliforms')
            )
        );

        return $links;
    }
    /**
     * Reloads extensions
     *
     * @return void
     */
    public function reload_api_extensions()
    {
        check_admin_referer('kaliforms_nonce', 'nonce');
        delete_transient('kaliforms_extensions');
        wp_die(json_encode(['status' => 'ok']));
    }
    /**
     * Updates option through ajax
     *
     * @return void
     */
    public function update_option()
    {
        if (isset($_POST['args'], $_POST['args']['nonce'])
            && !wp_verify_nonce(sanitize_key(wp_unslash($_POST['args']['nonce'])), $this->slug . '_nonce')) {
            wp_die(wp_json_encode([
                'success' => false,
                'message' => esc_html__('Denied', 'kaliforms'),
            ]));
        }

        $args = stripslashes_deep($_POST['args']);
        $args['method'] === 'delete'
        ? delete_option($this->slug . '_' . $args['option']['key'])
        : update_option($this->slug . '_' . $args['option']['key'], sanitize_text_field($args['option']['value']));

        wp_die(wp_json_encode([
            'success' => true,
            'message' => 'ok - updated option: ' . $args['option']['key'] . ' with the value: ' . $args['option']['value'],
        ]));
    }
    /**
     * Clear mail log
     *
     * @return void
     */
    public function clear_mail_log()
    {
        if (isset($_POST['args'], $_POST['args']['nonce'])
            && !wp_verify_nonce(sanitize_key(wp_unslash($_POST['args']['nonce'])), $this->slug . '_nonce')) {
            wp_die(wp_json_encode([
                'success' => false,
                'message' => esc_html__('Denied', 'kaliforms'),
            ]));
        }

        $temp_dir = get_temp_dir();
        unlink($temp_dir . $this->slug . '-mail.log');

        wp_die(wp_json_encode(['success' => true, 'message' => esc_html__('Log deleted', 'kaliforms')]));
    }
    /**
     * Enqueue files in the admin
     */
    public function admin_enqueue()
    {
        wp_enqueue_script(
            'kaliforms-general-scripts',
            KALIFORMS_URL . 'assets/general/js/general.js',
            ['jquery'],
            KALIFORMS_VERSION,
            true
        );

        wp_localize_script(
            'kaliforms-general-scripts',
            'KaliFormsGeneralObject',
            [
                'ajaxurl'      => esc_url(admin_url('admin-ajax.php')),
                'ajax_nonce'   => wp_create_nonce($this->slug . '_nonce'),
                'translations' => [
                    'shortcodeCopied' => esc_html__('Shortcode copied to clipboard', 'kaliforms'),
                    'themeApplied'    => esc_html__('Theme applied', 'kaliforms'),
                ],
            ]
        );

        // wp_register_script(
        //     'kaliforms-backend-component-vendor',
        //     KALIFORMS_URL . 'assets/backend/js/component-vendor.js',
        //     false,
        //     KALIFORMS_VERSION,
        //     true
        // );

        // wp_register_script(
        //     'kaliforms-backend-components',
        //     KALIFORMS_URL . 'assets/backend/js/components.js',
        //     ['kaliforms-backend-component-vendor'],
        //     KALIFORMS_VERSION,
        //     false
        // );

        wp_enqueue_style(
            'kaliforms-general',
            KALIFORMS_URL . 'assets/general/css/general.css',
            false,
            KALIFORMS_VERSION
        );
        wp_register_style(
            'kaliforms-icon-font',
            KALIFORMS_URL . 'assets/fonts/icomoon.css',
            false,
            KALIFORMS_VERSION
        );
        wp_register_style(
            'kaliforms-roboto-font',
            '//fonts.googleapis.com/css?family=Roboto:300,400,500',
            false,
            KALIFORMS_VERSION
        );
    }
}
