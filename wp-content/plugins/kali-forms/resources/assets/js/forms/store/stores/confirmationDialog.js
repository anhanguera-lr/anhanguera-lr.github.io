import { observable, action, computed } from 'mobx'

export default class ConfirmationDialog {
	@observable
	state = false
	@observable
	message = ''
	@observable
	title = ''
	@observable
	action = null;
	@observable
	actionProps = null;
	@observable
	additionalButton = null;
	@observable
	hideCancelButton = false;
	@action
	setHideCancelButton(state) {
		this.hideCancelButton = state;
	}
	@action
	setTitle(title) {
		this.title = title;
	}
	@action
	setMessage(message) {
		this.message = message;
	}
	@action
	setState(state) {
		this.state = state;
	}
	@action
	setAdditionalButton(buttonAction) {
		this.additionalButton = buttonAction;
	}
	@action
	resetState() {
		this.title = '';
		this.message = '';
		this.state = false;
		this.additionalButton = null;
		this.action = null;
		this.actionProps = null;
		this.hideCancelButton = false;
	}
	@action
	setAction(action) {
		this.action = action
	}
	@action
	setActionProps(props) {
		this.actionProps = props
	}
}
