<?php
namespace KaliForms\Inc\Utils;

/**
 * Class General_Placeholders_Helper
 *
 * @package Inc\Utils
 */

class General_Placeholders_Helper
{
    /**
     * Plugin slug
     *
     * @var string
     */
    public static $slug = 'kaliforms';

    /**
     * Returns a counter for the form entries
     *
     * @param [type] $id
     * @return void
     */
    public static function count_form_entries($id)
    {
        $args = [
            'post_type' => self::$slug . '_submitted',
            'meta_key' => 'formId',
            'meta_query' => [
                [
                    'key' => 'formId',
                    'value' => $id,
                    'compare' => '=',
                ],
            ],
        ];

        $query = new \WP_Query($args);
        $counter = 0;
        if ($query->have_posts()) {
            $counter = $query->post_count;
        }
        wp_reset_postdata();

        return $counter;
    }
}
