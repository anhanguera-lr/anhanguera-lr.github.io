import React from 'react';
import FormInfo from './../components/FormSettings/FormInfo';
import FormIntegrations from './../components/FormSettings/FormIntegrations';
import FormConditionalLogic from './../components/FormSettings/FormConditionalLogic';
import FormCustomPhp from './../components/FormSettings/FormCustomPhp';
import FormCustomCss from './../components/FormSettings/FormCustomCss';
import FormCustomJs from './../components/FormSettings/FormCustomJs';
import FormCalculator from './../components/FormSettings/FormCalculator';
import FormStyling from './../components/FormSettings/FormStyling';
import FormSpam from './../components/FormSettings/FormSpam';
import HubSpotIntegration from './../components/FormSettings/HubSpotIntegration';
import Newsletter from './../components/FormSettings/Newsletter';
import SlackContainer from './../components/FormSettings/SlackContainer';
import { observer } from "mobx-react-lite";
import { store } from "./../store/store";
import UserRegistration from './../components/FormSettings/UserRegistration';
const FormSettings = observer(props => {
	return (
		<React.Fragment>
			<If condition={store._UI_.activeFormSettingsItem === 'general'}>
				<FormInfo />
			</If>
			<If condition={store._UI_.activeFormSettingsItem === 'integrations'}>
				<FormIntegrations />
			</If>
			<If condition={store._UI_.activeFormSettingsItem === 'styling'}>
				<FormStyling />
			</If>
			<If condition={store._UI_.activeFormSettingsItem === 'spam'}>
				<FormSpam />
			</If>
			<If condition={store._UI_.activeFormSettingsItem === 'userRegistration'}>
				<UserRegistration />
			</If>
			<If condition={typeof KaliFormsObject.hubspotInstalled !== 'undefined' && store._UI_.activeFormSettingsItem === 'hubspotIntegration'}>
				<HubSpotIntegration />
			</If>
			<If condition={typeof KaliFormsObject.newsletterInstalled !== 'undefined' && store._UI_.activeFormSettingsItem === 'newsletter'}>
				<Newsletter />
			</If>
			<If condition={typeof KaliFormsObject.slackInstalled !== 'undefined' && store._UI_.activeFormSettingsItem === 'slack'}>
				<SlackContainer />
			</If>
			<If condition={typeof KaliFormsObject.conditionalLogic !== 'undefined' && store._UI_.activeFormSettingsItem === 'conditionalLogic'}>
				<FormConditionalLogic />
			</If>
			<If condition={typeof Kali !== 'undefined' && Kali.hasOwnProperty('components') && typeof Kali.components.CodeEditor === 'function'}>
				<If condition={store._UI_.activeFormSettingsItem === 'formCalculator'}>
					<FormCalculator />
				</If>
				<If condition={store._UI_.activeFormSettingsItem === 'formCustomCss'}>
					<FormCustomCss />
				</If>
				<If condition={store._UI_.activeFormSettingsItem === 'formCustomJs'}>
					<FormCustomJs />
				</If>
				<If condition={store._UI_.activeFormSettingsItem === 'formCustomPhp'}>
					<FormCustomPhp />
				</If>
			</If>
		</React.Fragment>
	);
})

export default FormSettings;
