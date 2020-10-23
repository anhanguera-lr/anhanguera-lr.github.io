<?php

namespace KaliForms\Inc\Utils;

class Emailer
{
    /**
     * Plugin slug
     *
     * @var string
     */
    public $slug = 'kaliforms';
    /**
     * Current form id
     *
     * @var [Number]
     */
    public $form = null;
    /**
     * Submission id
     *
     * @var [type]
     */
    public $submission = null;
    /**
     * Placeholders
     *
     * @var array
     */
    public $placeholders = [];
    /**
     * Field type map
     *
     * @var array
     */
    public $field_type_map = [];
    /**
     * Data
     *
     * @var [type]
     */
    public $data = [];
    /**
     * Class constructor
     *
     * @param [type] $form_id
     */
    public function __construct($form_id = null, $rawData = null, $placeholders = null)
    {
        $this->form = $form_id;
        if ($this->form === null) {
            return new \WP_Error(500, esc_html__('Something went wrong', 'kaliforms'));
        }
        $this->data         = $rawData;
        $this->placeholders = $placeholders;
        // In case we have a fail log "ready" - use this
        $fail_log = get_option($this->slug . '_email_fail_log', 0);
        if (checked($fail_log, '1', false)) {
            add_action('wp_mail_failed', [$this, 'email_error'], 10, 1);
        }
    }

    /**
     * Email error logger
     *
     * @return void
     */
    public function email_error($wp_error)
    {
        $temp_dir = get_temp_dir();
        $fn       = $temp_dir . $this->slug . '-mail.log';
        $fp       = fopen($fn, 'a');
        fputs($fp, "(" . date('Y-m-d H:i:s') . ") Mailer Error -> " . $wp_error->get_error_message() . "\n");
        fclose($fp);
    }
    /**
     * Email ok logger
     *
     * @return void
     */
    public function email_ok($message)
    {
        $temp_dir = get_temp_dir();
        $fn       = $temp_dir . $this->slug . '-mail.log';
        $fp       = fopen($fn, 'a');
        fputs($fp, "(" . date('Y-m-d H:i:s') . ") Mailer INFO (sent)-> " . $message . "\n");
        fclose($fp);
    }

    /**
     * Attaches a submission id and popuplates 'data' and 'placeholders' with its values
     *
     * @param [type] $id
     * @return void
     */
    public function attach_submission($id)
    {
        $this->submission = $id;
        if ($this->submission === null) {
            return new \WP_Error(500, esc_html__('Something went wrong', 'kaliforms'));
        }

        $this->prepare_data();
        $this->prepare_placeholders();
    }

    /**
     * Prepares data to be used in the email
     *
     * @return void
     */
    public function prepare_data()
    {
        $components = $this->get('form', true, 'field_components', '[]');
        if ($components === null || $components === '' && $components !== null) {
            return $columns;
        }

        $components = json_decode($components);
        $arr        = [];

        foreach ($components as $component) {
            $name = $this->pluck_value_from_properties('name', $component);
            if ($name !== null) {
                $arr[$name] = esc_html($this->get('submission', false, $name, ''));
            }
        }

        $this->data = $arr;
    }

    /**
     * Prepares placeholders
     *
     * @return void
     */
    public function prepare_placeholders()
    {
        $prepared_maps            = $this->setup_field_map();
        $this->field_type_map     = $prepared_maps['map'];
        $this->advanced_field_map = $prepared_maps['advanced'];

        // @todo just like on thankyou message
        foreach ($this->data as $k => $v) {
            $type = 'textbox';
            if (isset($this->field_type_map[$k]) && !empty($this->field_type_map[$k])) {
                $type = $this->field_type_map[$k];
            }

            switch ($type) {
                case 'radio':
                    $this->placeholders['{' . $k . '}'] = sanitize_text_field($v);

                    $choice_labels = [];
                    foreach ($this->advanced_field_map[$k]->choices as $choice) {
                        $choice_labels[$choice->value] = $choice->label;
                    }

                    $this->placeholders['{' . $k . ':value}'] = $this->placeholders['{' . $k . '}'];
                    $this->placeholders['{' . $k . ':label}'] = sanitize_text_field($choice_labels[$v]);
                    break;
                case 'checkbox':
                case 'dropdown':
                case 'choices':
                case 'donation':
                    $this->placeholders['{' . $k . '}'] = sanitize_text_field(implode($this->get('multiple_selections_separator', ','), $v));

                    $choice_labels = [];
                    foreach ($this->advanced_field_map[$k]->choices as $choice) {
                        $choice_labels[$choice->value] = $choice->label;
                    }

                    if (is_array($v)) {
                        $newVal = [];
                        foreach ($v as $value) {
                            $newVal[] = $choice_labels[$value];
                        }
                    }

                    $this->placeholders['{' . $k . ':value}'] = $this->placeholders['{' . $k . '}'];
                    $this->placeholders['{' . $k . ':label}'] = sanitize_text_field(implode($this->get('multiple_selections_separator', ','), $newVal));
                    break;

                case 'fileUpload':
                case 'imageRadio':
                    $img                                      = wp_get_attachment_url($v);
                    $this->placeholders['{' . $k . ':image}'] = '<img style="width:100%" src="' . esc_url($img) . '" />';
                    $this->placeholders['{' . $k . ':id}']    = sanitize_text_field($v);
                    $this->placeholders['{' . $k . ':url}']   = esc_url($img);
                    break;
                case 'digitalSignature':
                    $validB64 = preg_match("/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).base64,.*/", $v);
                    if ($validB64 > 0) {
                        $this->placeholders['{' . $k . ':signature}'] = '<img style="width:100%" src="' . sanitize_text_field($v) . '" />';
                        $this->placeholders['{' . $k . ':src}']       = sanitize_text_field($v);
                        break;
                    }
                    $img = wp_get_attachment_url($v);

                    $this->placeholders['{' . $k . ':signature}'] = '<img style="width:100%" src="' . esc_url($img) . '" />';
                    $this->placeholders['{' . $k . ':id}']        = sanitize_text_field($v);
                    break;
                default:
                    $this->placeholders['{' . $k . '}'] = is_array($v)
                    ? implode($this->get('form', true, 'multiple_selections_separator', ','), $v)
                    : $v;
                    break;
            }
        }

        $this->placeholders = array_merge((new GeneralPlaceholders())->general_placeholders, $this->placeholders);
        if (isset($this->placeholders['{entryCounter}'])) {
            $this->placeholders['{entryCounter}'] = call_user_func($this->placeholdered_data['{entryCounter}'], $this->form);
        }

        if (isset($this->placeholders['{submission_link}'])) {
            $this->placeholders['{submission_link}'] = call_user_func(
                $this->placeholders['{submission_link}'],
                $this->get('form', true, 'submission_view_page', get_bloginfo('url')),
                $this->submission,
                $this->form,
                true
            );
        }
    }
    /**
     * Sets up field map ( field id -> field type )
     *
     * @return void
     */
    public function setup_field_map()
    {
        $map         = [];
        $advancedMap = [];
        $fields      = json_decode($this->get('field_components', '[]'), false, 512, JSON_HEX_QUOT);
        foreach ($fields as $field) {
            if (empty($field->properties->name)) {
                continue;
            }
            $map[$field->properties->name]         = $field->id;
            $advancedMap[$field->properties->name] = $field->properties;
        }
        return ['advanced' => $advancedMap, 'map' => $map];
    }
    /**
     * Return all data as formatted string
     *
     * @param array $data
     * @return string
     */
    public function get_all_field_data($data)
    {
        $str = '';
        foreach ($data as $key => $value) {
            $label = $this->get_field_label($key);
            if (!in_array($key, ['formId', 'nonce', 'ip_address'])) {
                $str .= $label . ' : ' . $value . '<br />';
            }
        }
        return $str;
    }
    /**
     * Get field label
     *
     * @param string $key
     * @return string
     */
    public function get_field_label($key)
    {
        $fields = json_decode($this->get('field_components', '[]'), false, 512, JSON_HEX_QUOT);
        $label  = '';
        foreach ($fields as $idx => $field) {
            if ($field->properties->name === $key) {
                $label = !empty($field->properties->caption) ? $field->properties->caption : $field->properties->name;
                break;
            }
        }
        return $label;
    }
    /**
     * Plucks values from the properties array
     *
     * @param [String] $key
     * @param [stdClass] $obj
     * @return String
     */
    public function pluck_value_from_properties($key, $obj)
    {
        if (isset($obj->properties->{$key})) {
            return $obj->properties->{$key};
        }
    }

    /**
     * Send emails
     *
     * @return void
     */
    public function send()
    {
        $emails = json_decode($this->get('form', true, 'emails', '[]'));

        $sent = [];
        foreach ($emails as $email) {
            $sent[] = $this->_send($email);
        }

        if (count($sent) === count($emails)) {
            return 'ok';
        }

        return new \WP_Error();
    }
    /**
     * Is smtp check
     *
     * @return boolean
     */
    public function is_smtp()
    {
        $auth     = get_option('kaliforms_smtp_auth', 0);
        $host     = get_option('kaliforms_smtp_host', '');
        $port     = get_option('kaliforms_smtp_port', '');
        $ssl      = get_option('kaliforms_smtp_secure', 'None');
        $username = get_option('kaliforms_smtp_username', '');
        $password = get_option('kaliforms_smtp_password', '');

        if (empty($host)) {
            return false;
        }
        if ($auth !== 0 && (empty($username) || empty($password))) {
            return false;
        }

        return true;
    }
    /**
     * Send emails one by one
     */
    private function _send($email)
    {
        $props = [];
        foreach ($email as $prop => $value) {
            $initialParse = is_string($value) ? strtr($value, $this->placeholders) : $value;
            if ($prop === 'emailAttachmentMediaIds' && is_array($value)) {
                $res = [];
                foreach ($value as $media) {
                    $res[] = $media->id;
                };
                $initialParse = implode(',', $res);
            }

            $arr      = [];
            $previews = $this->get_strings_between($initialParse, '{', '}');
            foreach ($previews as $preview) {
                $arr[$preview] = $this->get_image_html($preview);
            }

            $props[$prop] = strtr($initialParse, $arr);
        }

        if (!isset($props['emailAttachmentFilePaths'])) {
            $props['emailAttachmentFilePaths'] = '';
        }
        if (!isset($props['emailAttachmentMediaIds'])) {
            $props['emailAttachmentMediaIds'] = '';
        }

        add_filter('wp_mail_from_name', function () use ($props) {
            return $props['fromName'];
        });
        add_filter('wp_mail_from', function () use ($props) {
            return $props['fromEmail'];
        });
        add_filter('wp_mail_content_type', function () use ($props) {
            return 'text/html';
        });

        $headers = $this->_get_headers($props);

        $smtp = $this->is_smtp();
        if ($smtp) {
            add_action('phpmailer_init', function ($phpmailer) use ($props) {
                $auth     = get_option('kaliforms_smtp_auth', 0);
                $host     = get_option('kaliforms_smtp_host', '');
                $port     = get_option('kaliforms_smtp_port', '');
                $ssl      = get_option('kaliforms_smtp_secure', 'None');
                $username = get_option('kaliforms_smtp_username', '');
                $password = get_option('kaliforms_smtp_password', '');

                $phpmailer->isSMTP();
                $phpmailer->Host       = $host;
                $phpmailer->SMTPAuth   = $auth === '1';
                $phpmailer->Port       = absint($port);
                $phpmailer->SMTPSecure = strtolower($ssl);
                $phpmailer->Username   = $username;
                $phpmailer->Password   = $password;
                $phpmailer->From       = $username;
                $phpmailer->FromName   = $props['fromName'];
            });
        }

        $attachments = [];

        $fileUploads   = explode(',', $props['emailAttachment']);
        $filePaths     = explode(',', $props['emailAttachmentFilePaths']);
        $fileFromMedia = explode(',', $props['emailAttachmentMediaIds']);

        foreach ($fileUploads as $upload) {
            $validB64 = preg_match("/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).base64,.*/", $upload);
            if ($validB64 > 0) {
                continue;
            }
            if (isset($this->data[$upload]) && $this->data[$upload] !== '') {
                $attachments[] = get_attached_file((int) $this->data[$upload]);
            }
        }

        foreach ($fileFromMedia as $media) {
            $attachments[] = get_attached_file((int) $media);
        }

        foreach ($filePaths as $path) {
            if (!empty($path) && file_exists(ABSPATH . $path)) {
                $attachments[] = ABSPATH . $path;
            }
        }

        $attachments = array_filter($attachments);
        $email_sent  = wp_mail($props['toEmail'], $props['emailSubject'], $props['emailBody'], $headers, $attachments);

        $fail_log = get_option($this->slug . '_email_fail_log', 0);
        if (checked($fail_log, '1', false) && $email_sent) {
            $this->email_ok($props['toEmail'] . ' - ' . $props['emailSubject']);
        }
        return $email_sent;
    }

    /**
     * Get email headers
     *
     * @param [type] $props
     * @return void
     */
    protected function _get_headers($props)
    {
        $headers = [];
        if (!empty($props['ccEmail'])) {
            $arr = explode(',', $props['ccEmail']);
            foreach ($arr as $email) {
                $headers[] = 'CC: <' . $email . '>;';
            }
        }
        if (!empty($props['bccEmail'])) {
            $arr = explode(',', $props['bccEmail']);
            foreach ($arr as $email) {
                $headers[] = 'BCC: <' . $email . '>;';
            }
        }
        if (!empty($props['replyTo'])) {
            $arr = explode(',', $props['replyTo']);
            foreach ($arr as $email) {
                $headers[] = 'Reply-to: <' . $email . '>;';
            }
        }
        return $headers;
    }
    /**
     * Shortcut for get_post_meta
     *
     * @param string $key
     * @param mixed  $default
     *
     * @return mixed
     */
    public function get($entity = 'form', $prefix = true, $key = '', $default = null)
    {
        $string = $prefix ? $this->slug . '_' . $key : $key;
        $value  = get_post_meta($this->{$entity}, $string, true);
        if ($value === null || $value === '' && $default !== null) {
            return $default;
        }

        return $value;
    }

    /**
     * Get images and render them as previews
     */
    public function get_image_html($string)
    {
        $trimmed      = substr($string, 1, -1);
        $trimmedArray = explode(':', $trimmed);
        $id           = end($trimmedArray);

        return '<img src="' . esc_url(wp_get_attachment_url($id)) . '" />';
    }

    /**
     * Gets strings between delimiters
     *
     * @param [type] $str
     * @param string $start
     * @param string $end
     * @param boolean $with_from_to
     * @return void
     */
    public function get_strings_between($str, $start = '[', $end = ']', $with_from_to = true)
    {
        $arr      = [];
        $last_pos = 0;
        $last_pos = strpos($str, $start, $last_pos);
        while ($last_pos !== false) {
            $t        = strpos($str, $end, $last_pos);
            $arr[]    = ($with_from_to ? $start : '') . substr($str, $last_pos + 1, $t - $last_pos - 1) . ($with_from_to ? $end : '');
            $last_pos = strpos($str, $start, $last_pos + 1);
        }
        return $arr;
    }
}
