<?php
namespace KaliForms\Inc\Frontend\FormFields;

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Class Image_Radio
 *
 * @package Inc\Frontend\FormFields;
 */
class Image_Radio extends Form_Field
{
    /**
     * Class constructor
     */
    public function __construct()
    {
        $this->id = 'imageRadio';
    }

    /**
     * Render function
     *
     * @return void
     */
    public function render($item, $form_info)
    {
        $item['class'] = 'input';
        $item['type'] = 'radio';
        $offset = isset($item['offset']) && $item['offset'] > 0 ? 'offset-md-' . absint($item['offset']) : '';
        $div = '<div class="col-12 col-md-' . absint($item['col']) . ' ' . $offset . '">';
        $div .= '<label class="image-radio-label" style="margin-bottom:15px;display:inline-block">' . esc_html($item['caption']) . '</label>';
        $div .= $item['flow'] === 'vertical'
        ? $this->flow_vertical($item)
        : $this->flow_horizontal($item);

        $div .= !empty($item['description']) ? '<small>' . esc_html($item['description']) . '</small>' : '';
        $div .= '</div>';
        return $div;
    }
    /**
     * Flow vertical
     *
     * @param [type] $item
     * @param [type] $choice
     * @param [type] $i
     * @return void
     */
    public function flow_vertical($item)
    {
        $i = 0;
        $div = '';
        foreach ($item['choices'] as $choice) {
            $temp = $item['id'];
            $item['id'] = $item['id'] . $i;
            $attributes = $this->generate_attribute_string($item);
            $defaultValue = $this->default_value($item, $item['default']);
            $checked = $choice->id === $defaultValue ? 'checked' : '';
            $div .= '<label class="image-radio-label">';
            $div .= '<img src="' . esc_url($choice->fullUrl) . '" /> <input ' . $attributes . ' ' . $checked . ' value="' . esc_attr($choice->id) . '" />';
            $div .= '</label>';
            $item['id'] = $temp;

            $i++;
        }

        return $div;
    }
    /**
     * Flow horizontal
     *
     * @param [type] $item
     * @param [type] $choice
     * @param [type] $i
     * @return void
     */
    public function flow_horizontal($item)
    {
        $i = 0;
        $div = '<div class="row">';
        foreach ($item['choices'] as $choice) {
            $temp = $item['id'];
            $item['id'] = $item['id'] . $i;
            $attributes = $this->generate_attribute_string($item);

            $defaultValue = $this->default_value($item, $item['default']);
            $checked = $choice->id === $defaultValue ? 'checked' : '';
            //@fix - span changed from div -> should be span because conditional looks for the closest div to "hide"/"show" stuff.
            $div .= '<span class="col-12 col-md-4">';
            $div .= '<label class="image-radio-label">';
            $div .= '<img src="' . esc_url($choice->fullUrl) . '" /> <input ' . $attributes . ' ' . $checked . ' value="' . esc_attr($choice->id) . '" />';
            $div .= '</label>';
            $div .= '</span>';
            $item['id'] = $temp;
            $i++;
        }
        $div .= '</div>';

        return $div;

    }
}
