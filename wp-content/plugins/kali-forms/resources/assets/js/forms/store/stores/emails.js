import { observable, action, computed } from 'mobx'
import { computedFn } from "mobx-utils"
export default class Emails {
	@observable
	emails = KaliFormsObject.formEmails;

	@observable
	emailWizardVisibility = false;

	@observable
	selectedEmail = 0;

	getPropertyValue = computedFn(function getPropertyValue(idx, propertyId) {
		if (!this.emails.length || typeof this.emails[idx] === 'undefined' || typeof this.emails[idx][propertyId] === 'undefiend') {
			return null
		}

		return this.emails[idx][propertyId];
	})

	@action
	addEmail(email) {
		this.emails.push(email)
	}

	@action
	removeEmail(idx) {
		this.emails = [...this.emails].filter((email, i) => idx !== i);
	}

	@action
	duplicateEmail(idx) {
		let dupe = { ...this.emails[idx] }
		dupe.emailSubject = dupe.emailSubject + ' duplicate';

		this.addEmail(dupe);
	}

	@action
	setEmailProp(idx, key, value) {
		this.emails[idx][key] = value;
		this.emails = [...this.emails]
	}

	@action
	addEmails(emails) {
		this.emails = [...this.emails, ...emails]
	}
	
	@action
	setEmails(emails) {
		this.emails = [...emails];
	}
}
