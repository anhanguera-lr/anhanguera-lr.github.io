import { observable, action, computed } from 'mobx'
import { computedFn } from "mobx-utils"
export default class FieldComponents {
	@observable
	fieldComponents = KaliFormsObject.fieldComponents;

	@observable
	formFieldTypes = KaliFormsObject.formFields

	@computed
	get lastIndex() {
		let returnItem = 0;
		this.fieldComponents.map(e => {
			let index = e.internalId;
			returnItem = parseFloat(index.replace(e.id.toLowerCase(), ''));
		})
		return returnItem + 1;
	}

	@computed
	get fieldComponentProperties() {
		const fields = {};
		this.formFieldTypes.map(group => {
			group.fields.map(field => {
				fields[field.id] = field.properties;
			})
		})
		return fields;
	}
	@computed
	get simplifiedFields() {
		let fieldComponentsSimplified = {};
		this.fieldComponents.map(e => {
			fieldComponentsSimplified[e.internalId] = {
				type: e.id,
				fieldName: e.properties.name,
				caption: typeof e.properties.caption !== 'undefined' && e.properties.caption !== ''
					? e.properties.caption
					: e.properties.id,
			}
		})
		return fieldComponentsSimplified;
	}
	@computed
	get fieldConditioners() {
		let fieldComponentsConditioners = {};

		this.fieldComponents.map(e => {
			if (e.id === 'select' || e.id === 'dropdown' || e.id === 'checkbox' || e.id === 'radio' || e.id === 'choices' || e.id === 'donation') {
				fieldComponentsConditioners[e.internalId] = {
					caption: typeof e.properties.caption !== 'undefined' && e.properties.caption !== ''
						? e.properties.caption
						: e.properties.id,
					values: e.properties.choices,
				}
			}
		})

		return fieldComponentsConditioners;
	};
	@computed
	get fieldConditionersByName() {
		let fieldComponentsConditioners = {};

		this.fieldComponents.map(e => {
			if (e.id === 'select' || e.id === 'dropdown' || e.id === 'checkbox' || e.id === 'radio' || e.id === 'choices' || e.id === 'donation') {
				fieldComponentsConditioners[e.properties.name] = {
					caption: typeof e.properties.caption !== 'undefined' && e.properties.caption !== ''
						? e.properties.caption
						: e.properties.id,
					values: e.properties.choices,
				}
			}
		})

		return fieldComponentsConditioners;
	};
	@computed
	get fieldNames() {
		let names = [];
		this.fieldComponents.map(e => names.push(e.properties.name))
		return names;
	}
	@computed
	get fieldIds() {
		let ids = [];
		this.fieldComponents.map(e => ids.push(e.properties.id))
		return ids;
	}
	getFieldsByType = computedFn(function getFieldsByType(id) {
		let fieldComponents = [];

		this.fieldComponents.map(e => {
			if (e.id === 'fileUpload') {
				fieldComponents.push({
					type: e.id,
					name: e.properties.caption !== '' ? e.properties.caption : e.properties.id,
					value: e.properties.name,
					checked: false,
				})
			}
		});
		return fieldComponents;
	});

	getActiveFieldComponent = computedFn(function getActiveFieldComponent(idx) {
		return this.fieldComponents[idx]
	})

	getPropertyValue = computedFn(function getPropertyValue(idx, propertyId) {
		if (!this.fieldComponents.length || typeof this.fieldComponents[idx] === 'undefined') {
			return null
		}
		return this.fieldComponents[idx].properties[propertyId];
	})

	getInternalIdByIndex = computedFn(function getInternalIdByIndex(idx) {
		if (!this.fieldComponents.length || typeof this.fieldComponents[idx] === 'undefined') {
			return null
		}

		return this.fieldComponents[idx].internalId;
	})

	getFieldByIndex = computedFn(function getFieldByIndex(idx) {
		if (!this.fieldComponents.length || typeof this.fieldComponents[idx] === 'undefined') {
			return null
		}

		return this.fieldComponents[idx];
	})

	getFieldByInternalId = computedFn(function getFieldByInternalId(id) {
		if (!this.fieldComponents.length) {
			return null
		}

		let field = this.fieldComponents.find(e => e.internalId === id);
		return field;
	})

	isRestrictedField = computedFn(function isRestrictedField(id) {
		let restricted = ['rating', 'smartTextOutput', 'dateTimePicker', 'choices', 'pageBreak', 'password', 'range']
		return restricted.includes(id);
	});

	@action
	addFieldComponent(field) {
		this.fieldComponents.push(field)
	}

	@action
	removeFieldComponent(id) {
		this.fieldComponents = [...this.fieldComponents.filter(e => e.internalId !== id)]
	}

	@action
	updatePropertyValue(idx, propertyId, value) {
		this.fieldComponents[idx].properties[propertyId] = value;
	}

	@action
	addMultipleComponents(components) {
		this.fieldComponents = [...this.fieldComponents, ...components];
	}
}
