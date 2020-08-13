import { observer } from "mobx-react-lite";
import React from 'react';
import { store } from "./../../store/store";
import SidebarFieldType from './SidebarFieldType';
import sidebarFormFieldEditStyles from './SidebarFormFieldEditItemStyles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import ConditionalLogic from './../ConditionalLogic/ConditionalLogicComponent';

const SidebarFormFieldEdit = observer((props) => {
	/**
	 * Change to array func
	 */
	const changeToArray = (obj) => {
		let properties = [];

		if (!store._FIELD_COMPONENTS_.fieldComponentProperties.hasOwnProperty(obj.id)) {
			return properties;
		}

		for (let sKey in store._FIELD_COMPONENTS_.fieldComponentProperties[obj.id]) {
			if (!obj.properties.hasOwnProperty(sKey)) {
				obj.properties[sKey] = store._FIELD_COMPONENTS_.fieldComponentProperties[obj.id][sKey].value
			}
		}

		for (const key in obj.properties) {
			properties.push({
				id: key,
				...store._FIELD_COMPONENTS_.fieldComponentProperties[obj.id][key],
				value: obj.properties[key],
			});
		}

		return properties;
	}

	const checkDependencies = (element, props) => {
		let dependentField = [...props].filter(el => el.id === element.dependent.field)
		if (!dependentField.length) {
			return true;
		}

		return dependentField[0].value === element.dependent.value;
	}

	const formatPropsInGroups = () => {
		let groups = {
			general: [],
			advanced: [],
			addable: [],
			style: [],
		}

		let properties = changeToArray(store._FIELD_COMPONENTS_.getActiveFieldComponent(store._UI_.activeFormFieldInSidebar));

		if (!properties.length) {
			return false;
		}
		properties.map(el => {
			let show = true;
			if (el.hasOwnProperty('dependent')) {
				show = checkDependencies(el, properties);
			}

			if (!el.hasOwnProperty('group') && show) {
				groups.general.push(el);
				return;
			}

			if (show) {
				groups[el.group].push(el);
			}
		})

		let returnArr = [];
		for (let key in groups) {
			if (!groups[key].length) {
				continue;
			}
			returnArr.push({
				id: key,
				fields: groups[key],
				label: KaliFormsObject.translations.fieldPropertiesGroup[key]
			})
		}

		if (typeof KaliFormsObject.conditionalLogic !== 'undefined') {
			if (
				!['hidden', 'pageBreak', 'grecaptcha'].includes(store._FIELD_COMPONENTS_.getActiveFieldComponent(store._UI_.activeFormFieldInSidebar).id)
			) {
				returnArr.push({
					id: 'conditional',
					label: KaliFormsObject.translations.fieldPropertiesGroup.conditional
				})
			}
		}

		return returnArr
	}

	const classes = sidebarFormFieldEditStyles();
	const groups = formatPropsInGroups();

	/**
	 *
	 * @return {*}
	 */
	return (
		<React.Fragment>
			{groups.length && groups.map((group, index) => (
				<ExpansionPanel key={group.id} className={classes.panel} defaultExpanded={index === 0}>
					<ExpansionPanelSummary
						expandIcon={<ExpandMoreIcon />}
					>
						<Typography variant="subtitle2">{group.label}</Typography>
					</ExpansionPanelSummary>
					<ExpansionPanelDetails className={classes.panelDetails}>
						<If condition={typeof group.fields !== 'undefined'}>
							{group.fields.map((field, idx) => <SidebarFieldType key={field.id + idx} field={field} />)}
						</If>
						<If condition={group.id === 'conditional'}>
							<If condition={typeof KaliFormsObject.conditionalLogic !== 'undefined'}>
								<ConditionalLogic sidebar={true} />
							</If>
						</If>
					</ExpansionPanelDetails>
				</ExpansionPanel>
			))}

		</React.Fragment>
	)
})

export default SidebarFormFieldEdit;
