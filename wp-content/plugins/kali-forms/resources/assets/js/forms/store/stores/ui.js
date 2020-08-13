import { observable, action, computed } from 'mobx'

export default class Ui {
	@observable
	appBar = 'formBuilder';
	@observable
	sidebar = 'formFields';
	@observable
	drawerLoading = false;
	@observable
	pageLoading = false;
	@observable
	placeholderDialog = false;
	@observable
	emailWizardDialog = false;
	@observable
	activeTabInSidebar = 'formFields';
	@observable
	activeFormFieldInSidebar = 0;
	@observable
	activeFormFieldGroupTab = 'general';
	@observable
	templateSelecting = false;
	@observable
	activeEmailInSidebar = false;
	@observable
	activeFormSettingsItem = 'general';
	@observable
	bottomDrawer = false;
	@observable
	bottomDrawerCallback = null;
	@observable
	backDropComponent = null;
	@observable
	activeTabInNotificationSidebar = 'email';
	@observable
	activeSMSInSidebar = false;
	@action
	setBottomDrawerCallback(callback) {
		this.bottomDrawerCallback = callback;
	}
	@action
	setBottomDrawer(state) {
		this.bottomDrawer = state;
	}
	@action
	setActiveFormFieldGroupTab(key) {
		this.activeFormFieldGroupTab = key;
	}
	@action
	setTemplateSelecting(state) {
		document.getElementsByTagName('body')[0].style.background = state
			? '#fff'
			: this.appBar === 'formSettings' ? '#fff' : '#898989';

		this.templateSelecting = state;
	}
	@action
	setActiveFormFieldInSidebar(key) {
		this.activeFormFieldInSidebar = key;
	}
	@action
	setActiveFormSettingsItem(key) {
		this.activeFormSettingsItem = key;
	}
	@action
	setActiveEmailInSidebar(key) {
		this.activeEmailInSidebar = key;
	}
	@action
	setActiveSMSInSidebar(key) {
		this.activeSMSInSidebar = key;
	}
	@action
	setActiveTabInSidebar(string) {
		this.activeTabInSidebar = string
	}
	@action
	setActiveTabInNotificationSidebar(string) {
		this.activeTabInNotificationSidebar = string
	}
	@action
	setPlaceholderDialog(loading) {
		this.placeholderDialog = loading;
	}
	@action
	setEmailWizardDialog(loading) {
		this.emailWizardDialog = loading;
	}
	@action
	setPlaceholderDialog(state) {
		this.placeholderDialog = state
	}
	@action
	setPageLoading(loading) {
		this.pageLoading = loading;
	}
	@action
	setAppBar(string) {
		document.getElementsByTagName('body')[0].style.background = string === 'formSettings'
			? '#fff'
			: '#898989';

		this.appBar = string;
	}
	@action
	setSidebar(string) {
		this.sidebar = string
	}
	@action
	setDrawerLoading(loading) {
		this.drawerLoading = loading;
	}
	@action
	setBackDropComponent(component) {
		this.backDropComponent = component;
	}

	constructor() {
		const formId = KaliFormsObject.formId;
		const url = window.location.href;
		if (url.search(`post=${formId}`) === -1) {
			this.setTemplateSelecting(true);
		}
	}
}
