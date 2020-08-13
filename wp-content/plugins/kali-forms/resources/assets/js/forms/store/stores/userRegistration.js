import { observable, action, computed } from 'mobx'

if (!KaliFormsObject.hasOwnProperty('userRegistration')) {
	KaliFormsObject.userRegistration = {}
}

export default class UserRegistration {
	@observable
	enabled = KaliFormsObject.userRegistration.enabled || false
	@observable
	fields = KaliFormsObject.userRegistration.fields || []
	@observable
	customFields = KaliFormsObject.userRegistration.customFields || []
	@observable
	customFieldsValues = KaliFormsObject.userRegistration.customFieldsValues || []
	@observable
	role = KaliFormsObject.userRegistration.role || 'subscriber'
	@action
	setEnabled(state) {
		this.enabled = state;
	}
	@action
	setFields(fields) {
		this.fields = fields;
	}
	@action
	setCustomFields(fields) {
		this.customFields = fields
	}
	@action
	setCustomFieldsValues(fields) {
		this.customFieldsValues = fields
	}
	@action
	addCustomField(field) {
		this.customFields.push(field);
	}
	@action
	removeCustomField(idx) {
		this.customFields = this.customFields.filter((e, index) => idx !== index);
	}
	@action
	setRole(role) {
		this.role = role;
	}
	@computed
	get data() {
		return {
			enabled: this.enabled,
			role: this.role,
			fields: this.fields,
			customFields: this.customFields,
			customFieldsValues: this.customFieldsValues
		}
	}
}
