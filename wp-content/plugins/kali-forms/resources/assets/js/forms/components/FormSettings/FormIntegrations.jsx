import FormGroup from '@material-ui/core/FormGroup';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import { observer } from "mobx-react-lite";
import { store } from "./../../store/store";
import Container from './../LayoutComponents/Container';
import SectionTitle from './../Misc/SectionTitle';
import Checkbox from './../Misc/Checkbox';
import FormControlLabel from './../Misc/FormControlLabel';
import BootstrapInput from './../BootstrapInput';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
const FormIntegrations = observer((props) => {
	/**
	 * Payment plugins installed?
	 */
	const paymentPluginsInstalled = () => KaliFormsObject.hasOwnProperty('payments');

	return (
		<React.Fragment>
			<Container maxWidth="md">
				<SectionTitle title={KaliFormsObject.translations.integrations.paymentsGeneral} />
				<Grid container direction="row" spacing={3}>
					<Grid item xs={4}>
						<FormControl>
							<InputLabel shrink>
								{KaliFormsObject.translations.integrations.currency}
							</InputLabel>
							<Select
								value={store._FORM_INFO_.currency}
								multiple={false}
								onChange={e => store._FORM_INFO_.currency = e.target.value}
								input={<BootstrapInput />}
							>
								<MenuItem value='USD'>USD</MenuItem>
								<MenuItem value='EUR'>EUR</MenuItem>
								<MenuItem value='AUD'>AUD</MenuItem>
								<MenuItem value='BRL'>BRL</MenuItem>
								<MenuItem value='CAD'>CAD</MenuItem>
								<MenuItem value='CZK'>CZK</MenuItem>
								<MenuItem value='DKK'>DKK</MenuItem>
								<MenuItem value='HKD'>HKD</MenuItem>
								<MenuItem value='HUF'>HUF</MenuItem>
								<MenuItem value='INR'>INR</MenuItem>
								<MenuItem value='ILS'>ILS</MenuItem>
								<MenuItem value='JPY'>JPY</MenuItem>
								<MenuItem value='MYR'>MYR</MenuItem>
								<MenuItem value='MXN'>MXN</MenuItem>
								<MenuItem value='TWD'>TWD</MenuItem>
								<MenuItem value='NZD'>NZD</MenuItem>
								<MenuItem value='NOK'>NOK</MenuItem>
								<MenuItem value='PHP'>PHP</MenuItem>
								<MenuItem value='PLN'>PLN</MenuItem>
								<MenuItem value='GBP'>GBP</MenuItem>
								<MenuItem value='RUB'>RUB</MenuItem>
								<MenuItem value='SGD'>SGD</MenuItem>
								<MenuItem value='SEK'>SEK</MenuItem>
								<MenuItem value='CHF'>CHF</MenuItem>
								<MenuItem value='THB'>THB</MenuItem>
							</Select>
						</FormControl>
					</Grid>
					<Grid item xs={12}>
						<FormGroup row>
							<FormControlLabel
								control={
									<Checkbox
										checked={store._FORM_INFO_.paymentsLive === '1'}
										onChange={e => store._FORM_INFO_.paymentsLive = e.target.checked ? '1' : '0'}
									/>
								}
								label={KaliFormsObject.translations.integrations.paymentsLive}
							/>
						</FormGroup>
					</Grid>
				</Grid>
				<SectionTitle title="PayPal" />
				<Grid container direction="row" spacing={3}>
					<Grid item xs={6}>
						<FormControl>
							<InputLabel shrink>
								{KaliFormsObject.translations.integrations.payPalClientId}
							</InputLabel>
							<BootstrapInput
								value={store._FORM_INFO_.payPalClientId}
								onChange={e => store._FORM_INFO_.payPalClientId = e.target.value}
								variant="filled"
								fullWidth={true}
							/>
						</FormControl>
					</Grid>
					<Grid item xs={6}>
						<FormControl>
							<InputLabel shrink>
								{KaliFormsObject.translations.integrations.payPalClientIdSandBox}
							</InputLabel>
							<BootstrapInput
								value={store._FORM_INFO_.payPalClientIdSandBox}
								onChange={e => store._FORM_INFO_.payPalClientIdSandBox = e.target.value}
								variant="filled"
								fullWidth={true}
							/>
						</FormControl>
					</Grid>
				</Grid>

				<If condition={paymentPluginsInstalled()}>
					<Grid container direction="row" spacing={8}>
						<Grid item>
							<Typography variant="h5">Stripe</Typography>
						</Grid>
					</Grid>
					<Grid container direction="row" spacing={8}>
						<Grid item xs={6}>
							<TextField
								label={KaliFormsObject.translations.integrations.stripeKey}
								value={store._FORM_INFO_.stripeKey}
								onChange={e => store._FORM_INFO_.stripeKey = e.target.value}
								variant="filled"
								fullWidth={true}
							/>
						</Grid>
						<Grid item xs={6}>
							<TextField
								label={KaliFormsObject.translations.integrations.stripeKeySandBox}
								value={store._FORM_INFO_.stripeKeySandBox}
								onChange={e => store._FORM_INFO_.stripeKeySandBox = e.target.value}
								variant="filled"
								fullWidth={true}
							/>
						</Grid>
					</Grid>
				</If>
			</Container>
		</React.Fragment>
	);
})

export default FormIntegrations;
