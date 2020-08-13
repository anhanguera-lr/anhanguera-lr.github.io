<?php
namespace KaliForms\Inc;

if (!defined('ABSPATH')) {
    exit;
}

use KaliForms\Inc\Backend\Dashboard_Widget;
use KaliForms\Inc\Backend\Hooks;
use KaliForms\Inc\Backend\Meta_Save;
use KaliForms\Inc\Backend\Notifications;
use KaliForms\Inc\Backend\Plugin_Collision;
use KaliForms\Inc\Backend\Plugin_Deactivation;
use KaliForms\Inc\Backend\Plugin_Health_Checks;
use KaliForms\Inc\Backend\Plugin_Review;
use KaliForms\Inc\Backend\Posts\Forms;
use KaliForms\Inc\Backend\Predefined_Forms;
use KaliForms\Inc\Frontend\Form_Processor;
use KaliForms\Inc\Payments_Simple;
use KaliForms\Inc\Utils\TransientHelper;
use KaliForms\Inc\Utils\Welcome_Screen;

/**
 * Class KaliForms
 *
 * @package App
 */
class KaliForms
{
    use TransientHelper;
    /**
     * Plugin slug
     *
     * @var string
     */
    protected $slug = 'kaliforms';

    /**
     * Plugins hooked in KaliForms
     *
     * @var array
     */
    public $plugins = [];

    /**
     * KaliForms constructor.
     */
    public function __construct()
    {
        // Activation hook - mostly used for first installers
        register_activation_hook(KALIFORMS_PLUGIN_FILE, [$this, 'install']);
        // Welcome screen init
        new Welcome_Screen();
        // Init Kali Forms plugin during the plugins_loaded hook. It provides an order for the "additional" components
        add_action('plugins_loaded', [$this, 'init_kaliforms']);
        add_action('admin_head', [$this, 'upgrade_pro']);
    }

    /**
     * Initiate kaliforms
     */
    public function init_kaliforms()
    {
        /**
         * Hook before the plugin is constructed
         */
        do_action($this->slug . '_before_construction', $this);
        /**
         * Hook external plugins in KaliForms
         */
        $this->plugins = apply_filters($this->slug . '_hook_external_plugins', $this->plugins);
        /**
         * Create an instance of the meta save
         */
        Meta_Save::get_instance();
        /**
         * Register the new custom post type
         */
        new Forms();
        /**
         * Initiate actions & filters
         */
        new Hooks();
        /**
         * Form processor
         */
        new Form_Processor();
        /**
         * Payment actions
         */
        new Payments_Simple();
        /**
         * Load the predefined forms
         */
        new Predefined_Forms();
        /**
         * Create notifications
         */
        Notifications::get_instance();
        /**
         * Initiate the plugin collision class
         */
        $this->check_plugin_collision();
        /**
         * Start the plugin health checks ( for page /wp-admin/site-health.php )
         */
        new Plugin_Health_Checks();
        /**
         * Plugin review
         */
        new Plugin_Review();
        /**
         * Plugin deactivation
         */
        new Plugin_Deactivation();
        /**
         * Dashboard widgets;
         */
        new Dashboard_Widget();
        /**
         * Hook after the plugin constructor is ready
         * (Some parts of the plugin e.g. Hooks() may happen later)
         */
        do_action($this->slug . '_after_construction', $this);
        /**
         * Delete transient files from the file upload
         */
        add_action($this->slug . '_delete_transient_file', [$this, 'delete_transient_file']);

    }

    /**
     * Returns an instance of the plugin
     *
     * @return KaliForms
     */
    public static function get_instance()
    {
        static $inst;
        if (!$inst) {
            $inst = new KaliForms();
        }

        return $inst;
    }

    /**
     * Installation hook
     */
    public function install()
    {
        // This was the welcome screen - we dont really need it
        // $first_install = new First_Install();
    }

    /**
     * Checks plugin collision
     *
     * @return void
     */
    public function check_plugin_collision()
    {
        $collision = new Plugin_Collision();
        if (count($collision->activated_plugins) > 0) {
            $collision->set_notice();
        }
    }

    /**
     * Upgrade pro version if needed
     *
     * @return void
     */
    public function upgrade_pro()
    {
        $plugins = get_plugins();
        $status  = array_key_exists('kali-forms-pro/kali-forms-pro.php', $plugins) ? 'installed' : 'not-installed';
        if ($status === 'not-installed') {
            return;
        }

        if ($status === 'installed') {
            $status = is_plugin_active('kali-forms-pro/kali-forms-pro.php') ? 'active' : 'installed';
        }

        if ($status === 'active' && version_compare(KALIFORMS_PRO_VERSION, '1.5.0', '<')) {
            $html = '<div class="notice" style="background: #e9eff3;padding: 15px;border: 10px solid #fff;text-align:center;">';
            $html .= '<h1 style="text-align:center; margin-bottom:15px">';
            $html .= esc_html__('Update Kali Forms Pro to the latest version', 'kaliforms');
            $html .= '</h1>';
            $html .= '<h4>' . esc_html__("Please make sure you update our plugins to the latest versions. You can do so by using the automatic plugin updater functionality, or by downloading the newest plugin file from our website.", 'kaliforms') . '</h4>';
            $html .= '</div>';

            echo $html;
        }
    }
}
