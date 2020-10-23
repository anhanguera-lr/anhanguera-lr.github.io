import React from 'react';
import Typography from '@material-ui/core/Typography';
import { observer } from "mobx-react-lite";
import { store } from "./../../store/store";
import Container from './../LayoutComponents/Container';
import SectionTitle from './../Misc/SectionTitle'
import Grid from '@material-ui/core/Grid';
import FormControlLabel from './../Misc/FormControlLabel';
import BootstrapInput from './../BootstrapInput';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FieldComponentSelect from './../HubSpotIntegration/FieldComponentSelect';
import Checkbox from './../Misc/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormFieldMapper from './../Misc/FormFieldMapper';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import is from 'is_js';
const UserRegistration = observer(props => {
	const [newCustomFieldKey, setNewCustomFieldKey] = React.useState('');
	const [newCustomFieldLabel, setNewCustomFieldLabel] = React.useState('');
	const [fieldsToMap, setFieldsToMap] = React.useState([
		{ id: 'user_login', label: KaliFormsObject.translations.userRegistration.username },
		{ id: 'user_email', label: KaliFormsObject.translations.userRegistration.email },
		{ id: 'first_name', label: KaliFormsObject.translations.userRegistration.firstName },
		{ id: 'last_name', label: KaliFormsObject.translations.userRegistration.lastName },
		{ id: 'display_name', label: KaliFormsObject.translations.userRegistration.displayName },
		{ id: 'nickname', label: KaliFormsObject.translations.userRegistration.nickname },
		{ id: 'user_url', label: KaliFormsObject.translations.userRegistration.website },
		{ id: 'user_pass', label: KaliFormsObject.translations.userRegistration.password },
	]);

	const addCustomField = () => {
		let newCustomField = {
			id: newCustomFieldKey,
			label: newCustomFieldLabel,
			removable: true,
		}

		store._USER_REGISTRATION_.addCustomField(newCustomField);

		setNewCustomFieldKey('');
		setNewCustomFieldLabel('');
	}

	return (
		<React.Fragment>
			<Container maxWidth="md">
				<SectionTitle title="User registration" />
				<Grid container direction="row" spacing={3}>
					<Grid item xs={12}>
						<FormGroup row>
							<FormControlLabel
								control={
									<Checkbox
										checked={store._USER_REGISTRATION_.enabled === '1'}
										onChange={e => store._USER_REGISTRATION_.setEnabled(e.target.checked ? '1' : '0')}
									/>
								}
								label={KaliFormsObject.translations.userRegistration.enableUserRegistration}
							/>
						</FormGroup>
					</Grid>
				</Grid>
				<If condition={store._USER_REGISTRATION_.enabled === '1'}>
					<Grid container direction="row" spacing={3}>
						<Grid item xs={12}>
							<FormFieldMapper
								fieldsToMap={fieldsToMap}
								values={store._USER_REGISTRATION_.fields || []}
								onChange={val => store._USER_REGISTRATION_.setFields(val)}
							/>
						</Grid>
						<Grid item xs={6}>
							<InputLabel shrink>
								{KaliFormsObject.translations.userRegistration.role}
							</InputLabel>
							<Select
								multiple={false}
								input={<BootstrapInput />}
								value={store._USER_REGISTRATION_.role || 'subscriber'}
								onChange={e => store._USER_REGISTRATION_.setRole(e.target.value)}
								fullWidth={true}
							>
								{
									Object.keys(KaliFormsUserRegistration.roles).map(e => (
										<MenuItem key={e} value={e}>
											{KaliFormsUserRegistration.roles[e]}
										</MenuItem>
									))
								}
							</Select>
						</Grid>
					</Grid>

					<Grid container direction="row" spacing={3} style={{ marginBottom: 16, marginTop: 16 }}>
						<Grid item xs={12}>
							<Typography variant="body1">{KaliFormsObject.translations.userRegistration.customFields}</Typography>
						</Grid>
					</Grid>

					<If condition={is.not.empty(store._USER_REGISTRATION_.customFields)}>
						<Grid container direction="row" spacing={3}>
							<Grid item xs={12}>
								<FormFieldMapper
									fieldsToMap={store._USER_REGISTRATION_.customFields}
									values={store._USER_REGISTRATION_.customFieldsValues || []}
									removableFunc={store._USER_REGISTRATION_.removeCustomField.bind(store._USER_REGISTRATION_)}
									onChange={val => store._USER_REGISTRATION_.setCustomFieldsValues(val)}
								/>
							</Grid>
						</Grid>
					</If>

					<Grid container direction="row" spacing={3}>
						<Grid item xs={5}>
							<FormControl>
								<InputLabel shrink>
									{KaliFormsObject.translations.userRegistration.customFieldKey}
								</InputLabel>
								<BootstrapInput
									value={newCustomFieldKey}
									onChange={e => setNewCustomFieldKey(e.target.value)}
									fullWidth={true}
								/>
							</FormControl>
						</Grid>
						<Grid item xs={5}>
							<FormControl>
								<InputLabel shrink>
									{KaliFormsObject.translations.userRegistration.customFieldLabel}
								</InputLabel>
								<BootstrapInput
									value={newCustomFieldLabel}
									onChange={e => setNewCustomFieldLabel(e.target.value)}
									fullWidth={true}
								/>
							</FormControl>
						</Grid>
						<Grid item xs={2} style={{ paddingTop: 38 }}>
							<Button
								variant="text"
								onClick={() => addCustomField()}
							>
								<Icon className="icon-add" />
							</Button>
						</Grid>
					</Grid>
				</If>
			</Container>
		</React.Fragment >
	);
})
export default UserRegistration;
