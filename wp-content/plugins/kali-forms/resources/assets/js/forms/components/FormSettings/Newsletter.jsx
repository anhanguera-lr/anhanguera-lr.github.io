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
import is from 'is_js';
const Newsletter = observer(props => {
	const [mailChimpData] = React.useState(
		is.falsy(KaliFormsNewsletter.mailchimp) ? { error: 'Somthing went wrong' } : KaliFormsNewsletter.mailchimp
	);
	const [convertKit] = React.useState(
		is.falsy(KaliFormsNewsletter.convertkit) ? { error: 'Somthing went wrong' } : KaliFormsNewsletter.convertkit
	);
	const [activeCampaign] = React.useState(
		is.falsy(KaliFormsNewsletter.activecampaign) ? { error: 'Somthing went wrong' } : KaliFormsNewsletter.activecampaign
	);
	const [mailerLiteData] = React.useState(
		is.falsy(KaliFormsNewsletter.mailerlite) ? { error: 'Somthing went wrong' } : KaliFormsNewsletter.mailerlite
	);

	const selectableTypes = ['select', 'dropdown', 'checkbox', 'radio', 'choices', 'imageRadio'];

	const getActiveCampaignList = id => {
		let data = false;

		activeCampaign.lists.map(list => {
			if (list.id === id) {
				data = list;
			}
		})

		return data;
	}
	const getListData = id => {
		let data = false;

		mailChimpData.lists.map(list => {
			if (list.id === id) {
				data = list;
			}
		})

		return data;
	}

	const getMailerLiteListData = id => {
		let data = false;

		mailerLiteData.lists.map(list => {
			if (list.id === id) {
				data = list;
			}
		})

		return data;
	}

	const getFormData = id => {
		let data = false;
		convertKit.forms.map(form => {
			if (parseFloat(form.id) === parseFloat(id)) {
				data = form;
			}
		})

		return data;
	}

	const fieldChanged = data => {
		store._NEWSLETTER_.fields[data.field] = data.value
		store._NEWSLETTER_.fields['userConsentFieldType'] = data.type
	}

	const providerChanged = provider => {
		store._NEWSLETTER_.fields = {};
		store._NEWSLETTER_.list = '';
		store._NEWSLETTER_.form = '';

		if (store._NEWSLETTER_.provider === provider) {
			store._NEWSLETTER_.provider = '0';

			return;
		}

		store._NEWSLETTER_.provider = provider;
	}

	const keysFound = () => {
		let response = false;
		const obj = {
			mailChimp: !mailChimpData.hasOwnProperty('error'),
			convertKit: !convertKit.hasOwnProperty('error'),
			activeCampaign: !activeCampaign.hasOwnProperty('error'),
			mailerLite: !mailerLiteData.hasOwnProperty('error'),
		}

		Object.keys(obj).map(e => {
			response = response ? true : obj[e]
		})

		return response
	}


	return (
		<React.Fragment>
			<Container maxWidth="md">
				<SectionTitle title={'Newsletter settings'} />
				<If condition={!keysFound()}>
					<Grid container direction="row" spacing={3}>
						<Grid item xs={12}>
							<Typography>{KaliFormsObject.translations.newsletter.noKeyFound}</Typography>
						</Grid>
					</Grid>
				</If>
				<Grid container direction="row" spacing={3}>
					<If condition={!mailChimpData.hasOwnProperty('error')}>
						<Grid item xs={3}>
							<FormGroup row>
								<FormControlLabel
									control={
										<Checkbox
											checked={store._NEWSLETTER_.provider === 'mailchimp'}
											onChange={e => providerChanged('mailchimp')}
										/>
									}
									label={KaliFormsObject.translations.newsletter.enableMailChimp}
								/>
							</FormGroup>
						</Grid>
					</If>
					<If condition={!convertKit.hasOwnProperty('error')}>
						<Grid item xs={3}>
							<FormGroup row>
								<FormControlLabel
									control={
										<Checkbox
											checked={store._NEWSLETTER_.provider === 'convertkit'}
											onChange={e => providerChanged('convertkit')}
										/>
									}
									label={KaliFormsObject.translations.newsletter.enableConvertKit}
								/>
							</FormGroup>
						</Grid>
					</If>
					<If condition={!activeCampaign.hasOwnProperty('error')}>
						<Grid item xs={3}>
							<FormGroup row>
								<FormControlLabel
									control={
										<Checkbox
											checked={store._NEWSLETTER_.provider === 'activecampaign'}
											onChange={e => providerChanged('activecampaign')}
										/>
									}
									label={KaliFormsObject.translations.newsletter.enableActiveCampaign}
								/>
							</FormGroup>
						</Grid>
					</If>
					<If condition={!mailerLiteData.hasOwnProperty('error')}>
						<Grid item xs={3}>
							<FormGroup row>
								<FormControlLabel
									control={
										<Checkbox
											checked={store._NEWSLETTER_.provider === 'mailerlite'}
											onChange={e => providerChanged('mailerlite')}
										/>
									}
									label={KaliFormsObject.translations.newsletter.enableMailerLite}
								/>
							</FormGroup>
						</Grid>
					</If>
				</Grid>
				<Grid container direction="row" spacing={3}>
					<If condition={
						!activeCampaign.hasOwnProperty('error')
						&& store._NEWSLETTER_.provider === 'activecampaign'
					}>
						<If condition={activeCampaign.lists.length}>
							<Grid item xs={12}>
								<FormControl>
									<InputLabel shrink>
										{KaliFormsObject.translations.newsletter.list}
									</InputLabel>
									<Select
										value={store._NEWSLETTER_.list}
										multiple={false}
										onChange={e => store._NEWSLETTER_.list = e.target.value}
										input={<BootstrapInput />}
									>
										{activeCampaign.lists.map(list => <MenuItem key={list.id} value={list.id}>{list.name}</MenuItem>)}
									</Select>
								</FormControl>
							</Grid>
						</If>
						<If condition={activeCampaign.lists.length === 0}>
							<Grid item xs={12}><Typography>{KaliFormsObject.translations.newsletter.noLists}</Typography></Grid>
						</If>
						<If condition={store._NEWSLETTER_.list !== '' && getActiveCampaignList(store._NEWSLETTER_.list) !== false}>
							{
								getActiveCampaignList(store._NEWSLETTER_.list).fields.map(field =>
									<Grid item xs={6} key={field.tag}>
										<FieldComponentSelect
											label={field.name}
											help={field.info}
											selectedValue={store._NEWSLETTER_.fields[field.tag] || ''}
											field={field.tag}
											onChange={fieldChanged}
										/>
									</Grid>
								)
							}
						</If>
						<If condition={store._NEWSLETTER_.list !== '' && getActiveCampaignList(store._NEWSLETTER_.list).tags.length}>
							<Grid item xs={12}>
								<Typography>
									{KaliFormsObject.translations.newsletter.tagsExplanation}
								</Typography>
							</Grid>
							<Grid item xs={6}>
								<FieldComponentSelect
									label={KaliFormsObject.translations.newsletter.tagSelector}
									selectedValue={store._NEWSLETTER_.fields['acTags'] || ''}
									field="acTags"
									onChange={fieldChanged}
								/>
							</Grid>
						</If>
					</If>
					<If condition={
						!convertKit.hasOwnProperty('error')
						&& store._NEWSLETTER_.provider === 'convertkit'
					}>
						<If condition={convertKit.forms.length}>
							<Grid item xs={12}>
								<FormControl>
									<InputLabel shrink>
										{KaliFormsObject.translations.newsletter.form}
									</InputLabel>
									<Select
										value={store._NEWSLETTER_.form}
										multiple={false}
										onChange={e => store._NEWSLETTER_.form = e.target.value}
										input={<BootstrapInput />}
									>
										{convertKit.forms.map(form => <MenuItem key={form.id} value={form.id}>{form.name}</MenuItem>)}
									</Select>
								</FormControl>
							</Grid>
						</If>
						<If condition={convertKit.forms.length === 0}>
							<Grid item xs={12}><Typography>{KaliFormsObject.translations.newsletter.noLists}</Typography></Grid>
						</If>
						<If condition={store._NEWSLETTER_.form !== '' && getFormData(store._NEWSLETTER_.form) !== false}>
							{
								getFormData(store._NEWSLETTER_.form).fields.map(field =>
									<Grid item xs={6} key={field.id}>
										<FieldComponentSelect
											label={field.label}
											help={field.info}
											selectedValue={store._NEWSLETTER_.fields[field.key] || ''}
											field={field.key}
											onChange={fieldChanged}
										/>
									</Grid>
								)
							}
						</If>
						<If condition={store._NEWSLETTER_.form !== '' && getFormData(store._NEWSLETTER_.form).tags.length}>
							<Grid item xs={12}>
								<Typography>
									{KaliFormsObject.translations.newsletter.tagsExplanationCk}
								</Typography>
							</Grid>
							<Grid item xs={6}>
								<FieldComponentSelect
									label={KaliFormsObject.translations.newsletter.tagSelector}
									selectedValue={store._NEWSLETTER_.fields['acTags'] || ''}
									field="acTags"
									onChange={fieldChanged}
								/>
							</Grid>
						</If>
					</If>
					<If condition={
						!mailChimpData.hasOwnProperty('error')
						&& store._NEWSLETTER_.provider === 'mailchimp'
					}>
						<If condition={mailChimpData.lists.length}>
							<Grid item xs={12}>
								<FormControl>
									<InputLabel shrink>
										{KaliFormsObject.translations.newsletter.list}
									</InputLabel>
									<Select
										value={store._NEWSLETTER_.list}
										multiple={false}
										onChange={e => store._NEWSLETTER_.list = e.target.value}
										input={<BootstrapInput />}
									>
										{mailChimpData.lists.map(list => <MenuItem key={list.id} value={list.id}>{list.name}</MenuItem>)}
									</Select>
								</FormControl>
							</Grid>
						</If>
						<If condition={mailChimpData.lists.length === 0}>
							<Grid item xs={12}><Typography>{KaliFormsObject.translations.newsletter.noLists}</Typography></Grid>
						</If>
						<If condition={store._NEWSLETTER_.list !== '' && getListData(store._NEWSLETTER_.list) !== false}>
							{
								getListData(store._NEWSLETTER_.list).fields.map(field =>
									<Grid item xs={6} key={field.tag}>
										<Choose>
											<When condition={field.type === 'enum'}>
												<FormControl>
													<InputLabel shrink>
														{field.name}
													</InputLabel>
													<Select
														value={store._NEWSLETTER_.fields[field.tag] || 'subscribed'}
														multiple={false}
														onChange={e => store._NEWSLETTER_.fields[field.tag] = e.target.value}
														input={<BootstrapInput />}
													>
														{
															field.choices.map(choice => <MenuItem value={choice.value} key={choice.value}>{choice.label}</MenuItem>)
														}
													</Select>
												</FormControl>
											</When>
											<Otherwise>
												<FieldComponentSelect
													label={field.name}
													help={field.info}
													selectedValue={store._NEWSLETTER_.fields[field.tag] || ''}
													field={field.tag}
													onChange={fieldChanged}
												/>
											</Otherwise>
										</Choose>
									</Grid>
								)
							}
						</If>
						<If condition={store._NEWSLETTER_.list !== '' && getListData(store._NEWSLETTER_.list).tags.length}>
							<Grid item xs={12}>
								<Typography>
									{KaliFormsObject.translations.newsletter.tagsExplanation}
								</Typography>
							</Grid>
							<Grid item xs={6}>
								<FieldComponentSelect
									label={KaliFormsObject.translations.newsletter.tagSelector}
									selectedValue={store._NEWSLETTER_.fields['acTags'] || ''}
									field="acTags"
									onChange={fieldChanged}
								/>
							</Grid>
						</If>
					</If>
					<If condition={
						!mailerLiteData.hasOwnProperty('error')
						&& store._NEWSLETTER_.provider === 'mailerlite'
					}>
						<If condition={mailerLiteData.lists.length}>
							<Grid item xs={12}>
								<FormControl>
									<InputLabel shrink>
										{KaliFormsObject.translations.newsletter.list}
									</InputLabel>
									<Select
										value={isNaN(store._NEWSLETTER_.list) ? parseFloat(store._NEWSLETTER_.list) : store._NEWSLETTER_.list}
										multiple={false}
										onChange={e => store._NEWSLETTER_.list = e.target.value}
										input={<BootstrapInput />}
									>
										{mailerLiteData.lists.map(list => <MenuItem key={list.id} value={list.id}>{list.name}</MenuItem>)}
									</Select>
								</FormControl>
							</Grid>
						</If>
						<If condition={mailerLiteData.lists.length === 0}>
							<Grid item xs={12}><Typography>{KaliFormsObject.translations.newsletter.noLists}</Typography></Grid>
						</If>
						<If condition={store._NEWSLETTER_.list !== '' && getMailerLiteListData(store._NEWSLETTER_.list) !== false}>
							{
								getMailerLiteListData(store._NEWSLETTER_.list).fields.map(field =>
									<Grid item xs={6} key={field.key}>
										<FieldComponentSelect
											label={field.name}
											help={field.info}
											selectedValue={store._NEWSLETTER_.fields[field.key] || ''}
											field={field.key}
											onChange={fieldChanged}
										/>
									</Grid>
								)
							}
						</If>
					</If>

				</Grid>
				<If condition={store._NEWSLETTER_.provider !== '0' && store._NEWSLETTER_.provider !== ''}>
					<Grid container direction="row" spacing={3}>
						<Grid item xs={12}>
							<Typography>
								{KaliFormsObject.translations.newsletter.userConsentExplanation}
							</Typography>
						</Grid>
						<Grid item xs={6}>
							<FieldComponentSelect
								label={KaliFormsObject.translations.newsletter.userConsent}
								selectedValue={store._NEWSLETTER_.fields.userConsent || ''}
								field="userConsent"
								onChange={fieldChanged}
							/>
						</Grid>
						<Grid item xs={6}>
							<InputLabel shrink>
								{KaliFormsObject.translations.formEmails.userConsentValue}
							</InputLabel>
							<If condition={typeof store._NEWSLETTER_.fields.userConsentFieldType !== 'undefined' && selectableTypes.includes(store._NEWSLETTER_.fields.userConsentFieldType)}>
								<Select
									multiple={false}
									input={<BootstrapInput />}
									value={store._NEWSLETTER_.fields.userConsentValue || ''}
									onChange={e => store._NEWSLETTER_.fields.userConsentValue = e.target.value}
									fullWidth={true}
								>
									{
										typeof store._FIELD_COMPONENTS_.fieldConditionersByName[store._NEWSLETTER_.fields.userConsent] !== 'undefined'
										&& store._FIELD_COMPONENTS_.fieldConditionersByName[store._NEWSLETTER_.fields.userConsent].values.map((e, index) => (
											<MenuItem key={index + e.value} value={e.value}>
												{e.label}
											</MenuItem>
										))
									}
								</Select>
							</If>
							<If condition={
								typeof store._NEWSLETTER_.fields.userConsentFieldType === 'undefined'
								|| !selectableTypes.includes(store._NEWSLETTER_.fields.userConsentFieldType)}>
								<BootstrapInput
									value={store._NEWSLETTER_.fields.userConsentValue || ''}
									fullWidth={true}
									onChange={e => store._NEWSLETTER_.fields.userConsentValue = e.target.value} />
							</If>
						</Grid>
					</Grid>
				</If>
			</Container>
		</React.Fragment >
	);
})
export default Newsletter;
