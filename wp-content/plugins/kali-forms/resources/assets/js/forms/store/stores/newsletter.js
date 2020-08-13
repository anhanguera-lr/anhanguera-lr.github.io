import { observable, action, computed } from 'mobx'

export default class Newsletter {
	@observable
	newsletter = window.hasOwnProperty('KaliFormsNewsletter') ? KaliFormsNewsletter : {};

	@observable
	list = this.getSavedList();

	@observable
	form = this.getSavedForm();

	@observable
	fields = this.getSavedFields();

	@observable
	provider = this.getSavedProvider();

	@computed
	get data() {
		return {
			provider: this.provider,
			list: this.list,
			fields: this.fields,
			form: this.form,
		}
	}

	getSavedFields() {
		if (!KaliFormsObject.hasOwnProperty('newsletter')) {
			return {}
		}
		return KaliFormsObject.newsletter.fields || {};
	}

	getSavedList() {
		if (!KaliFormsObject.hasOwnProperty('newsletter')) {
			return {}
		}

		if (this.getSavedProvider() === 'mailerlite') {
			return parseFloat(KaliFormsObject.newsletter.list) || '';
		};

		return KaliFormsObject.newsletter.list || '';
	}

	getSavedForm() {
		if (!KaliFormsObject.hasOwnProperty('newsletter')) {
			return {}
		}
		return KaliFormsObject.newsletter.form || '';
	}

	getSavedProvider() {
		if (!KaliFormsObject.hasOwnProperty('newsletter')) {
			return {}
		}
		return KaliFormsObject.newsletter.provider || '';
	}
}
