import { observable, action, computed } from 'mobx'
import { computedFn } from "mobx-utils"
export default class GlobalNotifications {
	@observable
	notifications = KaliFormsObject.globalNotifications;
	@action
	pushNotification(notification) {
		this.notifications.push(notification);
	}
	@action
	removeNotification(id) {
		this.notifications = this.notifications.filter(e => e.id !== id);
	}
	@computed
	get count() {
		return this.notifications.length;
	}
	@computed
	get notificationsExist() {
		return this.notifications.length > 0;
	};
	getNotification = computedFn(function getNotification(id) {
		return this.notifications.find(e => e.id === id);
	})
}
