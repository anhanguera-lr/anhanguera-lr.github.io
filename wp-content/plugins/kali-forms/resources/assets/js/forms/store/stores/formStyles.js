import { observable, action, computed } from 'mobx'
import { computedFn } from "mobx-utils"
export default class FormStyles {
	@observable
	styles = KaliFormsObject.formStyles;
	@observable
	selectedStyle = KaliFormsObject.selectedFormStyle;
	@action
	setSelectedStyle(key) {
		this.selectedStyle = key
	}
	@computed
	get pages() {
		return Math.ceil(this.styles.length / 8);
	}
	getStylesPage = computedFn(function getStylesPage(page = 1) {
		return this.styles.slice((page - 1) * 8, page * 8);
	})
}
