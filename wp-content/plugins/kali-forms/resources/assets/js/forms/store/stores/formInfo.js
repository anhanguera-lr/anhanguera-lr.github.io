import { observable, action, computed } from 'mobx'
import { computedFn } from "mobx-utils"
import { store } from "./../../store/store";
export default class FormInfo {
	@observable
	formName = KaliFormsObject.formName;
	@observable
	requiredFieldMark = KaliFormsObject.requiredFieldMark;
	@observable
	globalErrorMessage = KaliFormsObject.globalErrorMessage
	@observable
	multipleSelectionsSeparator = KaliFormsObject.multipleSelectionsSeparator
	@observable
	cssId = KaliFormsObject.cssId
	@observable
	cssClass = KaliFormsObject.cssClass
	@observable
	thankYouMessage = KaliFormsObject.thankYouMessage
	@observable
	conditionalThankYou = KaliFormsObject.conditionalThankYou
	@observable
	conditionalThankYouMessage = KaliFormsObject.conditionalThankYouMessage
	@observable
	redirectUrl = KaliFormsObject.redirectUrl
	@observable
	honeypot = KaliFormsObject.honeypot
	@observable
	hideFormName = KaliFormsObject.hideFormName
	@observable
	removeCaptchaForLoggedUsers = KaliFormsObject.removeCaptchaForLoggedUsers
	@observable
	showThankYouMessage = KaliFormsObject.showThankYouMessage
	@observable
	saveFormSubmissions = KaliFormsObject.saveFormSubmissions
	@observable
	submissionViewPage = typeof KaliFormsObject.submissionViewPage !== 'undefined' ? KaliFormsObject.submissionViewPage : ''
	@observable
	akismet = KaliFormsObject.akismet
	@observable
	akismetFields = KaliFormsObject.akismetFields
	@observable
	googleSecretKey = KaliFormsObject.googleSecretKey
	@observable
	googleSiteKey = KaliFormsObject.googleSiteKey
	@observable
	currency = KaliFormsObject.currency
	@observable
	paymentsLive = KaliFormsObject.paymentsLive
	@observable
	payPalClientId = KaliFormsObject.payPalClientId
	@observable
	payPalClientIdSandBox = KaliFormsObject.payPalClientIdSandBox
	@observable
	stripeKey = typeof KaliFormsObject.stripeKey !== 'undefined' ? KaliFormsObject.stripeKey : ''
	@observable
	stripeKeySandBox = typeof KaliFormsObject.stripeKeySandBox !== 'undefined' ? KaliFormsObject.stripeKeySandBox : ''
	@observable
	conditionalLogic = KaliFormsObject.conditionalLogic
	@observable
	calculator = typeof KaliFormsObject.formScripting !== 'undefined' ? KaliFormsObject.formScripting.calculator : ''
	@observable
	customCss = typeof KaliFormsObject.formScripting !== 'undefined' ? KaliFormsObject.formScripting.css : ''
	@observable
	customJs = typeof KaliFormsObject.formScripting !== 'undefined' ? KaliFormsObject.formScripting.js : ''
	@observable
	customPhpAfter = typeof KaliFormsObject.formScripting !== 'undefined' ? KaliFormsObject.formScripting.phpAfter : ''
	@observable
	customPhpBefore = typeof KaliFormsObject.formScripting !== 'undefined' ? KaliFormsObject.formScripting.phpBefore : ''
	@observable
	hubspotData = typeof KaliFormsObject.hubspotData !== 'undefined' ? KaliFormsObject.hubspotData : ''
	@observable
	deleteQueue = typeof KaliFormsObject.deleteQueue !== 'undefined' ? KaliFormsObject.deleteQueue : ''
	@observable
	formAction = KaliFormsObject.formAction
	@observable
	formMethod = KaliFormsObject.formMethod

	@action
	setFormInfo(data) {
		for (let key in data) {
			if (this.hasOwnProperty(key) && key !== 'conditionalLogic') {
				this[key] = data[key];
			}
		}
	}

	@action
	setConditionalLogic(logic) {
		this.conditionalLogic = logic;
	}

	@action
	addConditional(item) {
		this.conditionalLogic.push(item)
	}

	@action
	duplicateCondition(index) {
		this.conditionalLogic.map((e, idx) => {
			if (idx === index) {
				let newCondition = { ...e }
				newCondition.name += ' (duplicate)';
				this.addConditional(newCondition)
			}
		})
	}

	@action
	removeThankYouMessage(index) {
		this.conditionalThankYouMessage = [...this.conditionalThankYouMessage].filter((el, idx) => idx !== index)
	}

	@action
	removeCondition(index) {
		this.conditionalLogic = [...this.conditionalLogic].filter((el, idx) => idx !== index)
	}

	@action
	removeConditionByAssertion(condition) {
		this.conditionalLogic = [...this.conditionalLogic].filter(field => JSON.stringify(field) !== JSON.stringify(condition));
	}
	@action
	duplicateConditionByAssertion(condition) {
		this.conditionalLogic.map((e, idx) => {
			if (JSON.stringify(e) === JSON.stringify(condition)) {
				let newCondition = { ...e }
				newCondition.name += ' (duplicate)';
				this.addConditional(newCondition)
			}
		})
	}

	getFieldConditionersByInternalId = computedFn(function getFieldConditionersByInternalId(internalId) {
		if (typeof this.conditionalLogic === 'undefined') {
			return [];
		}

		let conditions = [...this.conditionalLogic].filter(e => e.conditioner === internalId);
		return conditions;
	})

	getFieldConditionsByInternalId = computedFn(function getFieldConditionsByInternalId(internalId) {
		let conditions = [...this.conditionalLogic].filter(e => e.field === internalId);
		return conditions;
	})

	@computed
	get conditionsAvailable() {
		return Object.keys(store._FIELD_COMPONENTS_.fieldConditioners).length > 0;
	}
}
