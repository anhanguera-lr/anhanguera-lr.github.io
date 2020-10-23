import React from 'react';
import FieldComponentSelect from './FieldComponentSelect'
import Grid from '@material-ui/core/Grid'
import HubSpotProperties from './HubSpotProperties'
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
const AdditionalFormFields = (props) => {
	const selectChange = (data) => {
		let currentState = props.additionalFormFields;
		currentState[data.field].assignedFormField = data.value
		props.setAdditionalFormFields([...currentState]);
	}

	const hubSpotPropertyChange = (data) => {
		let currentState = props.additionalFormFields;
		currentState[data.field].hubspotProperty = data.value
		props.setAdditionalFormFields([...currentState]);
	}

	const setDefaultFormField = () => {
		let currentState = props.additionalFormFields;
		currentState[0] = { additionalFieldIndex: props.additionalFormFields.length, hubspotProperty: '', assignedFormField: '' }
		props.setAdditionalFormFields([...currentState]);
	}

	const addAdditionalFormField = () => {
		let currentState = props.additionalFormFields;
		props.setAdditionalFormFields(
			[
				...currentState,
				{ additionalFieldIndex: props.additionalFormFields.length, hubspotProperty: '', assignedFormField: '' }
			]
		)
	}

	const removeAdditionalFormField = (idx) => {
		let currentState = props.additionalFormFields;
		currentState.splice(idx, 1);
		props.setAdditionalFormFields([...currentState]);
	}

	return (
		<Grid container direction="row" spacing={4}>
			<Grid item xs={4}>
				<HubSpotProperties
					label={KaliFormsObject.translations.hubspot.misc.hubspotProperty}
					field={props.additionalFieldIndex}
					selectedValue={props.hubSpotProperty}
					onChange={hubSpotPropertyChange} />
			</Grid>
			<Grid item xs={4}>
				<FieldComponentSelect
					label={KaliFormsObject.translations.hubspot.misc.formField}
					field={props.additionalFieldIndex}
					selectedValue={props.assignedFormField}
					onChange={selectChange} />
			</Grid>
			<Grid item xs={4} style={{ paddingTop: 42 }}>
				<Button
					aria-label={KaliFormsObject.translations.hubspot.misc.addFormField}
					variant="text"
					onClick={() => addAdditionalFormField()}
				>
					<Icon className="icon-add" />
				</Button>
				<If condition={props.additionalFormFields.length === 1}>
					<Button
						aria-label={KaliFormsObject.translations.hubspot.misc.removeFormField}
						variant="text"
						onClick={() => setDefaultFormField()}
					>
						<Icon className="icon-remove" />
					</Button>
				</If>
				<If condition={props.additionalFormFields.length > 1}>
					<Button
						aria-label={KaliFormsObject.translations.hubspot.misc.removeFormField}
						variant="text"
						onClick={() => removeAdditionalFormField(props.additionalFieldIndex)}
					>
						<Icon className="icon-remove" />
					</Button>
				</If>
			</Grid>
		</Grid>
	);
}

export default AdditionalFormFields;
