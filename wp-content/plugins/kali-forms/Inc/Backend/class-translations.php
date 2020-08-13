<?php

namespace KaliForms\Inc\Backend;

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Class Translations is used to translate stuff
 *
 * @package App\Libraries
 */
class Translations
{
    /**
     * Translations array
     *
     * @var array
     */
    public $translations = [];

    /**
     * Basic constructor
     *
     * Translations constructor
     */
    public function __construct()
    {
        $this->set_general_translations();
        $this->frontend();
        $this->backend();
    }

    /**
     * Set general translations
     *
     * @return array
     */
    public function set_general_translations()
    {
        $this->translations['alerts'] = [
            'duplicateFieldTitle'   => esc_html__('Duplicate field', 'kaliforms'),
            'duplcateFieldMessage'  => esc_html__('Are you sure you want to duplicate this field?', 'kaliforms'),
            'removeFieldTitle'      => esc_html__('Remove field', 'kaliforms'),
            'removeFieldMessage'    => esc_html__('Are you sure you want to delete this field?', 'kaliforms'),
            'removeEmailMessage'    => esc_html__('Are you sure you want to delete this notification', 'kaliforms'),
            'removeEmailTitle'      => esc_html__('Remove notification', 'kaliforms'),
            'duplicateEmailTitle'   => esc_html__('Duplicate notification', 'kaliforms'),
            'duplicateEmailMessage' => esc_html__('Are you sure you want to duplicate this notification', 'kaliforms'),
        ];
        $this->translations['general'] = [
            'yes'                   => esc_html__('Yes', 'kaliforms'),
            'no'                    => esc_html__('No', 'kaliforms'),
            'on'                    => esc_html__('On', 'kaliforms'),
            'off'                   => esc_html__('Off', 'kaliforms'),
            'back'                  => esc_html__('Back', 'kaliforms'),
            'next'                  => esc_html__('Next', 'kaliforms'),
            'finish'                => esc_html__('Finish', 'kaliforms'),
            'save'                  => esc_html__('Save', 'kaliforms'),
            'edit'                  => esc_html__('Edit', 'kaliforms'),
            'delete'                => esc_html__('Delete', 'kaliforms'),
            'duplicate'             => esc_html__('Duplicate', 'kaliforms'),
            'addChoice'             => esc_html__('Add choice', 'kaliforms'),
            'addMedia'              => esc_html__('Add media', 'kaliforms'),
            'bulkAdd'               => esc_html__('Bulk add', 'kaliforms'),
            'bulkAddDescription'    => esc_html__('Add multiple options at once, please make sure to separate each option by a comma(e.g one|One, two|Two)', 'kaliforms'),
            'addFromBulk'           => esc_html__('Add the following (%s) options', 'kaliforms'),
            'addFromPreset'         => esc_html__('Presets', 'kaliforms'),
            'defaultValue'          => esc_html__('Default value', 'kaliforms'),
            'checked'               => esc_html__('Checked', 'kaliforms'),
            'selected'              => esc_html__('Selected', 'kaliforms'),
            'selectAll'             => esc_html__('Select all', 'kaliforms'),
            'value'                 => esc_html__('Value', 'kaliforms'),
            'label'                 => esc_html__('Label', 'kaliforms'),
            'import'                => esc_html__('Import', 'kaliforms'),
            'getStarted'            => esc_html__('Get started', 'kaliforms'),
            'seeDemo'               => esc_html__('See demo', 'kaliforms'),
            'create'                => esc_html__('Create', 'kaliforms'),
            'createNew'             => esc_html__('Create new', 'kaliforms'),
            'price'                 => esc_html__('Price', 'kaliforms'),
            'addProduct'            => esc_html__('Add product', 'kaliforms'),
            'name'                  => esc_html__('Name', 'kaliforms'),
            'description'           => esc_html__('Description', 'kaliforms'),
            'actions'               => esc_html__('Actions', 'kaliforms'),
            'loadTemplate'          => esc_html__('Load template', 'kaliforms'),
            'upgradeToPro'          => esc_html__('Upgrade to Pro', 'kaliforms'),
            'ok'                    => esc_html__('OK', 'kaliforms'),
            'cancel'                => esc_html__('Cancel', 'kaliforms'),
            'accessRestrictedField' => esc_html__("Unfortunately, you can't edit this field anymore. This field is part of the PRO package.", 'kaliforms'),
            'images'                => esc_html__('Images', 'kaliforms'),
            'audio'                 => esc_html__('Audio', 'kaliforms'),
            'video'                 => esc_html__('Video', 'kaliforms'),
            'documents'             => esc_html__('Documents', 'kaliforms'),
            'mediaManager'          => esc_html__('Media Manager', 'kaliforms'),
            'selectImage'           => esc_html__('Select image', 'kaliforms'),
            'useImage'              => esc_html__('Use selected image', 'kaliforms'),
            'newsletter'            => esc_html__('Newsletter', 'kaliforms'),
            'selectAField'          => esc_html__('-- Select a field --', 'kaliforms'),
            'pleaseSelect'          => esc_html__('-- Please select --', 'kaliforms'),
            'formEntries'           => esc_html__('Entries', 'kaliforms'),
            'embed'                 => esc_html__('Embed', 'kaliforms'),
        ];
    }

    public function frontend()
    {
        $this->translations['frontend'] = [
            'general'  => [
                'loading'   => esc_html__('LOADING', 'kaliforms'),
                'recaptcha' => esc_html__('Please complete recaptcha challenge', 'kaliforms'),
            ],
            'filePond' => [
                'labelIdle'                      => sprintf(
                    '%s <span class="filepond--label-action"> %s </span>',
                    esc_html__('Drag & Drop your files or', 'kaliforms'),
                    esc_html__('Browse', 'kaliforms')
                ),
                'labelInvalidField'              => esc_html__('Field contains invalid files', 'kaliforms'),
                'labelFileWaitingForSize'        => esc_html__('Waiting for size', 'kaliforms'),
                'labelFileSizeNotAvailable'      => esc_html__('Size not available', 'kaliforms'),
                'labelFileLoading'               => esc_html__('Loading', 'kaliforms'),
                'labelFileLoadError'             => esc_html__('Error during load', 'kaliforms'),
                'labelFileProcessing'            => esc_html__('Uploading', 'kaliforms'),
                'labelFileProcessingComplete'    => esc_html__('Upload complete', 'kaliforms'),
                'labelFileProcessingAborted'     => esc_html__('Upload cancelled', 'kaliforms'),
                'labelFileProcessingError'       => esc_html__('Error during upload', 'kaliforms'),
                'labelFileProcessingRevertError' => esc_html__('Error during revert', 'kaliforms'),
                'labelFileRemoveError'           => esc_html__('Error during remove', 'kaliforms'),
                'labelTapToCancel'               => esc_html__('tap to cancel', 'kaliforms'),
                'labelTapToRetry'                => esc_html__('tap to retry', 'kaliforms'),
                'labelTapToUndo'                 => esc_html__('tap to undo', 'kaliforms'),
                'labelButtonRemoveItem'          => esc_html__('Remove', 'kaliforms'),
                'labelButtonAbortItemLoad'       => esc_html__('Abort', 'kaliforms'),
                'labelButtonRetryItemLoad'       => esc_html__('Retry', 'kaliforms'),
                'labelButtonAbortItemProcessing' => esc_html__('Cancel', 'kaliforms'),
                'labelButtonUndoItemProcessing'  => esc_html__('Undo', 'kaliforms'),
                'labelButtonRetryItemProcessing' => esc_html__('Retry', 'kaliforms'),
                'labelButtonProcessItem'         => esc_html__('Upload', 'kaliforms'),
            ],
        ];
    }

    public function backend()
    {
        $this->translations['fieldPropertiesGroup'] = [
            'general'     => esc_html__('General', 'kaliforms'),
            'addable'     => esc_html__('Options', 'kaliforms'),
            'advanced'    => esc_html__('Advanced', 'kaliforms'),
            'simple'      => esc_html__('Simple', 'kaliforms'),
            'conditional' => esc_html__('Conditional', 'kaliforms'),
            'style'       => esc_html__('Style', 'kaliforms'),
        ];
        $this->translations['footerBar'] = [
            'documentation' => esc_html__('Documentation', 'kaliforms'),
            'contactUs'     => esc_html__('Contact us', 'kaliforms'),
            'rateUs'        => esc_html__('Rate us on WordPress!', 'kaliforms'),
        ];
        $this->translations['appBar'] = [
            'backToWp'      => esc_html__('Close', 'kaliforms'),
            'formName'      => esc_html__('Form name', 'kaliforms'),
            'formBuilder'   => esc_html__('Builder', 'kaliforms'),
            'formSettings'  => esc_html__('Settings', 'kaliforms'),
            'notifications' => esc_html__('Notifications', 'kaliforms'),
        ];

        $this->translations['sidebar'] = [
            'addYourFirstField'        => esc_html__('Add your first form field!', 'kaliforms'),
            'formStyling'              => esc_html__('Form styling', 'kaliforms'),
            'formFields'               => esc_html__('Form fields', 'kaliforms'),
            'fieldProperties'          => esc_html__('Field properties', 'kaliforms'),
            'general'                  => esc_html__('General', 'kaliforms'),
            'integrations'             => esc_html__('Integrations', 'kaliforms'),
            'emailSettings'            => esc_html__('Email settings', 'kaliforms'),
            'pleaseSelectAFieldToEdit' => esc_html__('Please select a field to edit', 'kaliforms'),
            'spam'                     => esc_html__('Spam protection', 'kaliforms'),
            'email'                    => esc_html__('Email', 'kaliforms'),
            'sms'                      => esc_html__('SMS', 'kaliforms'),
            'addSms'                   => esc_html__('Create new SMS notification', 'kaliforms'),
        ];

        $this->translations['builder'] = [
            'placeholderTitle'  => esc_html__('Add fields to the builder by clicking the buttons in the sidebar', 'kaliforms'),
            'placeholderButton' => esc_html__('Or select a pre-defined template', 'kaliforms'),
        ];

        $this->translations['templateSelector'] = [
            'title'             => esc_html__('One-Click Forms', 'kaliforms'),
            'description'       => esc_html__('We prepared some templates for you! You can import one of them or create your own from scratch.', 'kaliforms'),
            'refreshTemplates'  => esc_html__('Refresh templates', 'kaliforms'),
            'suggestTemplate'   => esc_html__('Suggest a new template', 'kaliforms'),
            'show'              => esc_html__('Show: ', 'kaliforms'),
            'free'              => esc_html__('Free', 'kaliforms'),
            'premium'           => esc_html__('Premium', 'kaliforms'),
            'all'               => esc_html__('All', 'kaliforms'),
            'blank'             => esc_html__('Blank', 'kaliforms'),
            'blankDescription'  => esc_html__('Start a new form from scratch', 'kaliforms'),
            'placeholderTitle'  => esc_html__('Select a pre-defined form', 'kaliforms'),
            'placeholderButton' => esc_html__('Or build one from scratch', 'kaliforms'),
            'import'            => esc_html__('Import this information for your form', 'kaliforms'),
            'layout'            => esc_html__('Layout', 'kaliforms'),
            'emails'            => esc_html__('Notifications', 'kaliforms'),
            'settings'          => esc_html__('Settings', 'kaliforms'),
            'conditionalLogic'  => esc_html__('Conditional logic', 'kaliforms'),
            'formCalculator'    => esc_html__('Form calculator', 'kaliforms'),
            'style'             => esc_html__('Select the visual style', 'kaliforms'),
            'smtpButtonText'    => esc_html__('Set up SMTP now', 'kaliforms'),
            'smtpAlertTitle'    => esc_html__('SMTP Settings', 'kaliforms'),
            'smtpAlertMessage'  => esc_html__('We noticed that you did not setup your SMTP settings. We strongly suggest that you set this up before publishing your form as it will increase the deliverability of your email notifications.', 'kaliforms'),
        ];
        $this->translations['formStyling'] = [
            'title'    => esc_html__('Form styling', 'kaliforms'),
            'useStyle' => esc_html__('Use style', 'kaliforms'),
        ];
        $this->translations['formEmails'] = [
            'addEmail'                  => esc_html__('Create new email notification', 'kaliforms'),
            'selectEmail'               => esc_html__('Please select an email from the list', 'kaliforms'),
            'removeEmail'               => esc_html__('Remove email', 'kaliforms'),
            'duplicateEmail'            => esc_html__('Duplicate email', 'kaliforms'),
            'fromName'                  => esc_html__('Sender name', 'kaliforms'),
            'fromEmail'                 => esc_html__('Sender email', 'kaliforms'),
            'toEmail'                   => esc_html__('Send notification to', 'kaliforms'),
            'replyTo'                   => esc_html__('Reply to', 'kaliforms'),
            'message'                   => esc_html__('Email body', 'kaliforms'),
            'emailBody'                 => esc_html__('Start typing...', 'kaliforms'),
            'ccEmail'                   => esc_html__('Send copy to', 'kaliforms'),
            'bccEmail'                  => esc_html__('Send hidden copy to', 'kaliforms'),
            'subject'                   => esc_html__('Email subject', 'kaliforms'),
            'subjectPlaceholder'        => esc_html__('Hello World!', 'kaliforms'),
            'emailAttachmentFilePaths'  => esc_html__('Path (not URL) to file to be attached to email', 'kaliforms'),
            'emailAttachmentMediaIds'   => esc_html__('Attach files from media library', 'kaliforms'),
            'mediaAttachmentHelperText' => esc_html__('You can add multiple ids, separated by commas. e.g.: 1,3,5', 'kaliforms'),
            'fileUploadSelection'       => esc_html__('Attach the file(s) from the following fields to this email:', 'kaliforms'),
            'pathToYourWpIs'            => esc_html__('Path to your WordPress folder is:', 'kaliforms'),
            'addEmailPlaceholder'       => esc_html__('You currently do not have any emails configured.', 'kaliforms'),
            'addEmailPlaceholderButton' => esc_html__('Add your first email!', 'kaliforms'),
        ];

        $this->translations['conditionalEntity'] = [
            'conditionalSending' => esc_html__('Should send notification', 'kaliforms'),
            'always'             => esc_html__('Always', 'kaliforms'),
            'any'                => esc_html__('Any conditions met', 'kaliforms'),
            'all'                => esc_html__('All conditions met', 'kaliforms'),
            'formField'          => esc_html__('Form field', 'kaliforms'),
            'field'              => esc_html__('Field', 'kaliforms'),
            'operator'           => esc_html__('Operator', 'kaliforms'),
            'is'                 => esc_html__('Is', 'kaliforms'),
            'isNot'              => esc_html__('Is not', 'kaliforms'),
            'greaterThan'        => esc_html__('Greater than', 'kaliforms'),
            'lessThan'           => esc_html__('Less than', 'kaliforms'),
            'contains'           => esc_html__('Contains', 'kaliforms'),
            'equal'              => esc_html__('Equal', 'kaliforms'),
            'starts'             => esc_html__('Starts', 'kaliforms'),
            'ends'               => esc_html__('Ends', 'kaliforms'),
            'value'              => esc_html__('Value', 'kaliforms'),
            'addCondition'       => esc_html__('Add condition', 'kaliforms'),
            'removeCondition'    => esc_html__('Remove condition', 'kaliforms'),
        ];

        $this->translations['emailWizard'] = [
            'stepOne'            => esc_html__('What is this email for?', 'kaliforms'),
            'stepOneContent'     => esc_html__('Add the subject for this email in the field below. (You can click the <> icon in order to add placeholders for your form fields)', 'kaliforms'),
            'stepOneCompleted'   => esc_html__('This email is used for:'),
            'stepTwo'            => esc_html__('Who is sending this email?', 'kaliforms'),
            'stepTwoContent'     => esc_html__('Please specify the name and email of the sender in the fields below. (You can click the <> icon in order to add placeholders for your form fields)', 'kaliforms'),
            'stepTwoCompleted'   => esc_html__('The email sender is:', 'kaliforms'),
            'stepThree'          => esc_html__('Who will receive this email?', 'kaliforms'),
            'stepThreeContent'   => esc_html__('Please specify the email of the person that will receive this email in the field below. (You can click the <> icon in order to add placeholders for your form fields)', 'kaliforms'),
            'stepThreeCompleted' => esc_html__('The email will be sent to:', 'kaliforms'),
            'stepFour'           => esc_html__('What information is sent through this email?', 'kaliforms'),
            'stepFourContent'    => esc_html__('Please write the message of the email in the field below. (You can click the <> icon in order to add placeholders for your form fields)', 'kaliforms'),
        ];

        $this->translations['formInfo'] = [
            // First Section
            'generalSettings'            => esc_html__('General settings', 'kaliforms'),
            'requiredFieldMark'          => esc_html__('Required field mark', 'kaliforms'),
            'multipleSelectionSeparator' => esc_html__('Multiple selection separator', 'kaliforms'),
            'removeCaptcha'              => esc_html__('Remove captcha for logged user', 'kaliforms'),
            'showThankYou'               => esc_html__('Show thank you message', 'kaliforms'),
            'saveFormSubmissions'        => esc_html__('Save form submissions', 'kaliforms'),
            'globalErrorMessage'         => esc_html__('Global error message', 'kaliforms'),
            'hideFormName'               => esc_html__('Hide form name', 'kaliforms'),
            'conditionalThankYou'        => esc_html__('Conditional thank you message', 'kaliforms'),
            'addThankYouMessage'         => esc_html__('Add thank you message', 'kaliforms'),
            'conditionName'              => esc_html__('Condition name', 'kaliforms'),
            'conditioner'                => esc_html__('Condition field', 'kaliforms'),
            'operator'                   => esc_html__('Is', 'kaliforms'),
            'contains'                   => esc_html__('Contains', 'kaliforms'),
            'equal'                      => esc_html__('Equal', 'kaliforms'),
            'less'                       => esc_html__('Less', 'kaliforms'),
            'greater'                    => esc_html__('Greater', 'kaliforms'),
            'value'                      => esc_html__('Value', 'kaliforms'),
            'defaultThankYouMessage'     => esc_html__('Default thank you message', 'kaliforms'),
            'backToListing'              => esc_html__('Back to listing', 'kaliforms'),
            'selectField'                => esc_html__('Select a field', 'kaliforms'),

            // Second section
            'honeypot'                   => esc_html__('Honeypot anti-spam', 'kaliforms'),
            'afterFormSubmit'            => esc_html__('After form submit', 'kaliforms'),
            'thankYouMessage'            => esc_html__('Thank you message', 'kaliforms'),
            'redirectUrl'                => esc_html__('Redirect URL', 'kaliforms'),
            'formAction'                 => esc_html__('Form action', 'kaliforms'),
            'formMethod'                 => esc_html__('Form method', 'kaliforms'),
            'formActionHelp'             => esc_html__('The form action controls where the collected information will be submitted to (this is optional, and overrides the default form submission process).', 'kaliforms'),

            // Form class and id
            'formClassAndId'             => esc_html__('Form class and id', 'kaliforms'),
            'cssId'                      => esc_html__('CSS Id', 'kaliforms'),
            'cssClass'                   => esc_html__('CSS Class', 'kaliforms'),
        ];

        $this->translations['integrations'] = [
            'recaptchaSiteKey'      => esc_html__('reCAPTCHA site key', 'kaliforms'),
            'recaptchaSecretKey'    => esc_html__('reCAPTCHA secret key', 'kaliforms'),
            'paymentsGeneral'       => esc_html__('Payments', 'kaliforms'),
            'currency'              => esc_html__('Currency', 'kaliforms'),
            'paymentsLive'          => esc_html__('Live transactions', 'kaliforms'),
            'payPalClientId'        => esc_html__('PayPal client id', 'kaliforms'),
            'payPalClientIdSandBox' => esc_html__('PayPal sandbox client id', 'kaliforms'),
            'enableAkismet'         => esc_html__('Enable Akismet anti spam', 'kaliforms'),
            'akismetHelper'         => esc_html__('You can enable Akismet spam protection on your form by installing and activating the Akismet plugin and adding your API key in the settings.', 'kaliforms'),
            'firstName'             => esc_html__('First name', 'kaliforms'),
            'lastName'              => esc_html__('Last name', 'kaliforms'),
            'email'                 => esc_html__('Email', 'kaliforms'),
            'message'               => esc_html__('Message', 'kaliforms'),
        ];

        $this->translations['bottomDrawer'] = [
            'presets'           => esc_html__('Presets', 'kaliforms'),
            'mathHelper'        => esc_html__('Math helper', 'kaliforms'),
            'mathHelperInfo'    => esc_html__('We will try to help you in creating your first form calculation!', 'kaliforms'),
            'presetInfo'        => esc_html__('Add an entire list of options to your field based on a pre-defined category.', 'kaliforms'),
            'importPresets'     => esc_html__('Import Presets', 'kaliforms'),
            'createCalculation' => esc_html__('Create Calculation', 'kaliforms'),
            'selectTotalField'  => esc_html__('Select total field', 'kaliforms'),
        ];

        $this->translations['mathHelper'] = [
            'sum'               => esc_html__('Sum of selected fields', 'kaliforms'),
            'divide'            => esc_html__('Divide two fields', 'kaliforms'),
            'multiply'          => esc_html__('Multiply selected fields', 'kaliforms'),
            'subtract'          => esc_html__('Subtract two fields', 'kaliforms'),
            'speed'             => esc_html__('Speed', 'kaliforms'),
            'speedArgs'         => [
                'distance' => esc_html__('Distance', 'kaliforms'),
                'time'     => esc_html__('Time', 'kaliforms'),
            ],
            'hourMinuteSeconds' => esc_html__('Hour:Minute:Seconds to seconds', 'kaliforms'),
            'secondsToHour'     => esc_html__('Seconds to hours', 'kaliforms'),
            'secondsToMinute'   => esc_html__('Seconds to minutes', 'kaliforms'),
            'minutesToSeconds'  => esc_html__('Minutes to seconds', 'kaliforms'),
            'minutesToHours'    => esc_html__('Minutes to hours', 'kaliforms'),
            'arithmeticAverage' => esc_html__('Arithmetic average of fields', 'kaliforms'),
            'bmiMetric'         => esc_html__('BMI Formula (metric)', 'kaliforms'),
            'bmiImperial'       => esc_html__('BMI Formula (imperial)', 'kaliforms'),
            'bmiArgs'           => [
                'weight' => esc_html__('Weight', 'kaliforms'),
                'height' => esc_html__('Height', 'kaliforms'),
            ],
            'runningTime'       => esc_html__('Running time', 'kaliforms'),
            'runningTimeArgs'   => [
                'distance' => esc_html__('Distance', 'kaliforms'),
                'hours'    => esc_html__('Hours', 'kaliforms'),
                'minutes'  => esc_html__('Minutes', 'kaliforms'),
                'seconds'  => esc_html__('Seconds', 'kaliforms'),
            ],
            'runningDistance'   => esc_html__('Running distance', 'kaliforms'),
            'pace'              => esc_html__('Running pace', 'kaliforms'),
            'dayDifference'     => esc_html__('Day difference between dates', 'kaliforms'),
            'dayDiffArgs'       => [
                'startDate' => esc_html__('Start date', 'kaliforms'),
                'endDate'   => esc_html__('End date', 'kaliforms'),
            ],
            'args'              => esc_html__('Fields to calculate', 'kaliforms'),
        ];

        $this->translations['conditionalLogic'] = [
            'placeholder'              => sprintf(
                '%s <a href="https://kaliforms.com/docs/faq/how-to-hide-show-fields/" target="_blank"> %s </a>',
                esc_html__('You do not have any conditional statements configured at the moment.', 'kaliforms'),
                esc_html__('Learn how to create your first statement in our documentation.', 'kaliforms')
            ),
            'logicName'                => esc_html__('Add a name for your logical condition', 'kaliforms'),
            'logicalConditions'        => esc_html__('Your logical conditions', 'kaliforms'),
            'add'                      => esc_html__('Add', 'kaliforms'),
            'currentField'             => esc_html__('The current field', 'kaliforms'),
            'should'                   => esc_html__('Should', 'kaliforms'),
            'is'                       => esc_html__('Is', 'kaliforms'),
            'state'                    => esc_html__('What will happen to the field', 'kaliforms'),
            'ifThisField'              => esc_html__('If this field', 'kaliforms'),
            'operator'                 => esc_html__('Has the selected value', 'kaliforms'),
            'value'                    => esc_html__('Value', 'kaliforms'),
            'conditionalLogic'         => esc_html__('Conditional logic', 'kaliforms'),
            'conditionalLogicSettings' => esc_html__('Conditional logic settings', 'kaliforms'),
            'show'                     => esc_html__('Show', 'kaliforms'),
            'hide'                     => esc_html__('Hide', 'kaliforms'),
            'equalTo'                  => esc_html__('Equal to', 'kaliforms'),
            'differentThan'            => esc_html__('Different than', 'kaliforms'),
            'canBe'                    => esc_html__('Can be', 'kaliforms'),
            'thisField'                => esc_html__('This field', 'kaliforms'),
            'field'                    => esc_html__('Field', 'kaliforms'),
            'conditionedBy'            => esc_html__('Conditioned by', 'kaliforms'),
            'if'                       => esc_html__('If', 'kaliforms'),
            'value'                    => esc_html__('Value', 'kaliforms'),
            'action'                   => esc_html__('Action', 'kaliforms'),
            'noConditionerFields'      => esc_html__('There are no fields that allow conditionals (e.g. Dropdowns, Checkboxes, Radios).', 'kaliforms'),
        ];

        $this->translations['customScripting'] = [
            'customCss'     => esc_html__('Custom CSS', 'kaliforms'),
            'customJs'      => esc_html__('Custom JavaScript', 'kaliforms'),
            'customPhp'     => esc_html__('Custom PHP', 'kaliforms'),
            'phpBefore'     => esc_html__('Before form process PHP script', 'kaliforms'),
            'phpAfter'      => esc_html__('After form process PHP script', 'kaliforms'),
            'calculator'    => esc_html__('Calculator', 'kaliforms'),
            'text1'         => esc_html__('Perform calculations through your form fields, you can use the field names and standard math operators in your equations. For example:', 'kaliforms'),
            'text2'         => esc_html__('You can access a list of math functions by pressing CTRL+SPACE, for example calculating the cube root or exponent of a number.', 'kaliforms'),
            'useMathHelper' => esc_html__('Use our Math Helper', 'kaliforms'),
        ];

        $this->translations['placeholders'] = [
            'placeholders'           => esc_html__('Placeholders', 'kaliforms'),
            'search'                 => esc_html__('Search', 'kaliforms'),
            'actions'                => esc_html__('Actions', 'kaliforms'),
            'placeholder'            => esc_html__('Placeholder', 'kaliforms'),
            'formFields'             => esc_html__('Form field', 'kaliforms'),
            'description'            => esc_html__('Description', 'kaliforms'),
            'copyToClipboard'        => esc_html__('Copy to clipboard', 'kaliforms'),
            'copiedToClipboard'      => esc_html__('copied to clipboard', 'kaliforms'),
            'availablePlaceholders'  => esc_html__('Available placeholders', 'kaliforms'),
            'emptyDataSourceMessage' => esc_html__('No records to display', 'kaliforms'),
            'labelDisplayedRows'     => esc_html__('{from}-{to} of {count}', 'kaliforms'),
            'labelRowsSelect'        => esc_html__('rows', 'kaliforms'),
            'labelRowsPerPage'       => esc_html__('Rows per page:', 'kaliforms'),
            'firstAriaLabel'         => esc_html__('First page', 'kaliforms'),
            'firstTooltip'           => esc_html__('First page', 'kaliforms'),
            'previousAriaLabel'      => esc_html__('Previous page', 'kaliforms'),
            'previousTooltip'        => esc_html__('Previous page', 'kaliforms'),
            'nextAriaLabel'          => esc_html__('Next page', 'kaliforms'),
            'nextTooltip'            => esc_html__('Next page', 'kaliforms'),
            'lastAriaLabel'          => esc_html__('Last page', 'kaliforms'),
            'lastTooltip'            => esc_html__('Last page', 'kaliforms'),
            'siteTitle'              => esc_html__('Site title (set in Settings - General)', 'kaliforms'),
            'tagLine'                => esc_html__('Site tagline (set in Settings - General)', 'kaliforms'),
            'siteUrl'                => esc_html__('The WordPress address (URL) (set in Settings - General)', 'kaliforms'),
            'homeUrl'                => esc_html__('The Site address (URL) (set in Settings - General)', 'kaliforms'),
            'adminEmail'             => esc_html__('Admin email (set in Settings - General)', 'kaliforms'),
            'entryCounter'           => esc_html__('Show the current entry number', 'kaliforms'),
            'formName'               => esc_html__('Current form name', 'kaliforms'),
            'submissionLink'         => esc_html__('Returns a link to view the submission', 'kaliforms'),
        ];
    }
}
