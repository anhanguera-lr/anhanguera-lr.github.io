import { observable, action, computed } from 'mobx'

export default class Slack {
	@observable
	actions = KaliFormsObject.hasOwnProperty('slack') ? KaliFormsObject.slack : []

	@action
	addAction(item) {
		this.actions.push(item)
	}

	@action
	removeAction(action) {
		this.actions = [...this.actions].filter(field => JSON.stringify(field) !== JSON.stringify(action));
	}

	@action
	duplicateAction(action) {
		this.actions.map((e, idx) => {
			if (JSON.stringify(e) === JSON.stringify(action)) {
				let newAction = { ...e }
				newAction.name += ' (duplicate)';
				this.addAction(newAction)
			}
		})
	}
}
