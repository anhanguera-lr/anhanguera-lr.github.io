import { observable, action, computed } from 'mobx'
import { computedFn } from "mobx-utils"
export default class SMS {
	@observable
	notifications = KaliFormsObject.hasOwnProperty('sms')
		? KaliFormsObject.sms === null
			? []
			: KaliFormsObject.sms
		: []

	@action
	addSms(item) {
		this.notifications.push(item);
	}

	@action
	removeSms(idx) {
		this.notifications = [...this.notifications].filter((notification, i) => idx !== i);
	}

	@action
	duplicateSms(idx) {
		let dupe = { ...this.notifications[idx] }
		this.addSms(dupe);
	}

	@action
	setSmsProp(idx, key, value) {
		this.notifications[idx][key] = value;
		this.notifications = [...this.notifications]
	}

	getPropertyValue = computedFn(function getPropertyValue(idx, propertyId) {
		if (!this.notifications.length || typeof this.notifications[idx] === 'undefined' || typeof this.notifications[idx][propertyId] === 'undefiend') {
			return null
		}

		return this.notifications[idx][propertyId];
	})
}
