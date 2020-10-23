import './plugin-deactivation.scss';
import UninstallFeedback from './uninstall-feedback';
jQuery(document).ready(_ => {
	const uninstallScript = UninstallFeedback;

	uninstallScript.slug = 'kaliforms';
	uninstallScript.template = KaliFormsPluginDeactivationObject.modalHtml;
	uninstallScript.form = 'kaliforms-deactivate-form';
	uninstallScript.deactivateUrl = jQuery('#kaliforms-deactivate-link-kaliforms').attr('href');
	uninstallScript.deactivate = false;
	uninstallScript.translations = KaliFormsPluginDeactivationObject.translations;
	uninstallScript.nonce = KaliFormsPluginDeactivationObject.ajax_nonce;
	uninstallScript.init(jQuery('#kaliforms-deactivate-link-kaliforms'));
});
