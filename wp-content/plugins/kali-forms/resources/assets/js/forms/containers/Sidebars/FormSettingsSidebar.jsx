import HubSpotLogo from '@img/hubspot.svg';
import SlackLogo from '@img/slack.svg';
import Badge from '@material-ui/core/Badge';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles, withStyles, withTheme } from '@material-ui/core/styles';
import { observer } from "mobx-react-lite";
import React from 'react';
import { store } from "./../../store/store";
import ArrowRightSvg from './../../../../img/arrow-right.svg';
import Icon from '@material-ui/core/Icon';

const StyledBadge = withStyles(theme => ({
	badge: {
		right: -30,
		top: 18,
		color: '#fff',
		borderRadius: 4,
		padding: '0 8px',
		fontWeight: 'bold',
		textTransform: 'uppercase',
		background: theme.palette.primary.main
	},
}))(Badge);

const useStyles = makeStyles(theme => {
	return {
		root: {
			background: theme.palette.background.default,
			padding: 0,
			position: 'relative',
			height: '100%',
			minHeight: 'calc(100vh - 52px)',
		},
		drawerList: {
			'& .MuiTypography-root': {
				fontSize: '18px'
			},
			'& .MuiListItemIcon-root': {
				minWidth: 40,
			},
			'& .Mui-selected': {
				background: '#fff',
				color: theme.palette.primary.main,
				position: 'relative',
				'&::after': {
					width: 12,
					height: 19,
					backgroundRepeat: 'no-repeat',
					background: 'url(' + ArrowRightSvg + ')',
					content: '""',
					position: 'absolute',
					right: 13,
					top: 15,
					opacity: .4,
				},
				'& .MuiListItemIcon-root': {
					color: theme.palette.primary.main,
				}
			}
		},
	}
});

const FormSettingsSidebar = observer((props) => {
	const classes = useStyles();

	const redirectToPricing = event => {
		window.open('https://www.kaliforms.com/pricing?utm_source=formSettings&utm_campaign=userInterests&utm_medium=proBadge', '_blank');
	}

	return (
		<List className={classes.drawerList}>
			<ListItem
				button
				selected={store._UI_.activeFormSettingsItem === 'general'}
				onClick={event => store._UI_.setActiveFormSettingsItem('general')}
			>
				<ListItemIcon>
					<Icon className={'icon-settings'} />
				</ListItemIcon>
				<ListItemText primary={KaliFormsObject.translations.sidebar.general} />
			</ListItem>
			<ListItem
				button
				selected={store._UI_.activeFormSettingsItem === 'styling'}
				onClick={event => store._UI_.setActiveFormSettingsItem('styling')}
			>
				<ListItemIcon>
					<Icon className={'icon-brush'} />
				</ListItemIcon>
				<ListItemText primary={KaliFormsObject.translations.sidebar.formStyling} />
			</ListItem>
			<ListItem
				button
				selected={store._UI_.activeFormSettingsItem === 'spam'}
				onClick={event => store._UI_.setActiveFormSettingsItem('spam')}
			>
				<ListItemIcon>
					<Icon className={'icon-spam'} />
				</ListItemIcon>
				<ListItemText primary={KaliFormsObject.translations.sidebar.spam} />
			</ListItem>
			<ListItem
				button
				selected={store._UI_.activeFormSettingsItem === 'integrations'}
				onClick={event => store._UI_.setActiveFormSettingsItem('integrations')}
			>
				<ListItemIcon>
					<Icon className={'icon-puzzle'} />
				</ListItemIcon>
				<ListItemText primary={KaliFormsObject.translations.sidebar.integrations} />
			</ListItem>
			<If condition={typeof KaliFormsObject.userRegistrationInstalled !== 'undefined'}>
				<ListItem
					button
					selected={store._UI_.activeFormSettingsItem === 'userRegistration'}
					onClick={event => store._UI_.setActiveFormSettingsItem('userRegistration')}
				>
					<ListItemIcon>
						<Icon className={'icon-add-user'} />
					</ListItemIcon>
					<ListItemText primary={'User registration'} />
				</ListItem>
			</If>
			<If condition={typeof KaliFormsObject.userRegistrationInstalled === 'undefined'}>
				<ListItem
					button
					selected={store._UI_.activeFormSettingsItem === 'userRegistration'}
					onClick={event => redirectToPricing()}
				>
					<ListItemIcon>
						<Icon className={'icon-add-user'} />
					</ListItemIcon>
					<StyledBadge badgeContent={'Pro'} color="secondary">
						<ListItemText primary={'User registration'} />
					</StyledBadge>
				</ListItem>
			</If>
			<If condition={typeof KaliFormsObject.conditionalLogic !== 'undefined'}>
				<ListItem
					button
					selected={store._UI_.activeFormSettingsItem === 'conditionalLogic'}
					onClick={event => store._UI_.setActiveFormSettingsItem('conditionalLogic')}
				>
					<ListItemIcon>
						<Icon className={'icon-logic'} />
					</ListItemIcon>
					<ListItemText primary={KaliFormsObject.translations.conditionalLogic.conditionalLogic} />
				</ListItem>
				<ListItem
					button
					selected={store._UI_.activeFormSettingsItem === 'formCalculator'}
					onClick={event => store._UI_.setActiveFormSettingsItem('formCalculator')}
				>
					<ListItemIcon>
						<Icon className={'icon-calculator'} />
					</ListItemIcon>
					<ListItemText primary={KaliFormsObject.translations.customScripting.calculator} />
				</ListItem>
				<ListItem
					button
					selected={store._UI_.activeFormSettingsItem === 'formCustomCss'}
					onClick={event => store._UI_.setActiveFormSettingsItem('formCustomCss')}
				>
					<ListItemIcon>
						<Icon className={'icon-css'} />
					</ListItemIcon>
					<ListItemText primary={KaliFormsObject.translations.customScripting.customCss} />
				</ListItem>
				<ListItem
					button
					selected={store._UI_.activeFormSettingsItem === 'formCustomJs'}
					onClick={event => store._UI_.setActiveFormSettingsItem('formCustomJs')}
				>
					<ListItemIcon>
						<Icon className={'icon-js'} />
					</ListItemIcon>
					<ListItemText primary={KaliFormsObject.translations.customScripting.customJs} />
				</ListItem>
				<ListItem
					button
					selected={store._UI_.activeFormSettingsItem === 'formCustomPhp'}
					onClick={event => store._UI_.setActiveFormSettingsItem('formCustomPhp')}
				>
					<ListItemIcon>
						<Icon className={'icon-php'} />
					</ListItemIcon>
					<ListItemText primary={KaliFormsObject.translations.customScripting.customPhp} />
				</ListItem>
			</If>

			<If condition={typeof KaliFormsObject.conditionalLogic === 'undefined'}>
				<ListItem
					button
					selected={store._UI_.activeFormSettingsItem === 'conditionalLogic'}
					onClick={event => redirectToPricing()}
				>
					<ListItemIcon>
						<Icon className={'icon-logic'} />
					</ListItemIcon>
					<StyledBadge badgeContent={'Pro'} color="secondary">
						<ListItemText primary={KaliFormsObject.translations.conditionalLogic.conditionalLogic} />
					</StyledBadge>
				</ListItem>
				<ListItem
					button
					selected={store._UI_.activeFormSettingsItem === 'formCalculator'}
					onClick={event => redirectToPricing()}
				>
					<ListItemIcon>
						<Icon className={'icon-calculator'} />
					</ListItemIcon>
					<StyledBadge badgeContent={'Pro'} color="secondary">
						<ListItemText primary={KaliFormsObject.translations.customScripting.calculator} />
					</StyledBadge>
				</ListItem>
				<ListItem
					button
					selected={store._UI_.activeFormSettingsItem === 'formCustomCss'}
					onClick={event => redirectToPricing()}
				>
					<ListItemIcon>
						<Icon className={'icon-css'} />
					</ListItemIcon>
					<StyledBadge badgeContent={'Pro'} color="secondary">
						<ListItemText primary={KaliFormsObject.translations.customScripting.customCss} />
					</StyledBadge>
				</ListItem>
				<ListItem
					button
					selected={store._UI_.activeFormSettingsItem === 'formCustomJs'}
					onClick={event => redirectToPricing()}
				>
					<ListItemIcon>
						<Icon className={'icon-js'} />
					</ListItemIcon>
					<StyledBadge badgeContent={'Pro'} color="secondary">
						<ListItemText primary={KaliFormsObject.translations.customScripting.customJs} />
					</StyledBadge>
				</ListItem>
				<ListItem
					button
					selected={store._UI_.activeFormSettingsItem === 'formCustomPhp'}
					onClick={event => redirectToPricing()}
				>
					<ListItemIcon>
						<Icon className={'icon-php'} />
					</ListItemIcon>
					<StyledBadge badgeContent={'Pro'} color="secondary">
						<ListItemText primary={KaliFormsObject.translations.customScripting.customPhp} />
					</StyledBadge>
				</ListItem>
			</If>
			<If condition={typeof KaliFormsObject.newsletterInstalled !== 'undefined'}>
				<ListItem
					button
					selected={store._UI_.activeFormSettingsItem === 'newsletter'}
					onClick={event => store._UI_.setActiveFormSettingsItem('newsletter')}>
					<ListItemIcon>
						<Icon className={'icon-email'} />
					</ListItemIcon>
					<ListItemText primary={KaliFormsObject.translations.general.newsletter} />
				</ListItem>
			</If>
			<If condition={typeof KaliFormsObject.newsletterInstalled === 'undefined'}>
				<ListItem
					button
					selected={store._UI_.activeFormSettingsItem === 'newsletter'}
					onClick={event => redirectToPricing()}
				>
					<ListItemIcon>
						<Icon className={'icon-email'} />
					</ListItemIcon>
					<StyledBadge badgeContent={'Pro'} color="secondary">
						<ListItemText primary={KaliFormsObject.translations.general.newsletter} />
					</StyledBadge>
				</ListItem>
			</If>
			<If condition={typeof KaliFormsObject.slackInstalled !== 'undefined'}>
				<ListItem
					button
					selected={store._UI_.activeFormSettingsItem === 'slack'}
					onClick={event => store._UI_.setActiveFormSettingsItem('slack')}>
					<ListItemIcon>
						<img src={SlackLogo} style={{ width: 35, position: 'relative', left: -5 }} />
					</ListItemIcon>
					<ListItemText primary={'Slack'} />
				</ListItem>
			</If>
			<If condition={typeof KaliFormsObject.slackInstalled === 'undefined'}>
				<ListItem
					button
					selected={store._UI_.activeFormSettingsItem === 'slack'}
					onClick={event => redirectToPricing()}
				>
					<ListItemIcon>
						<img src={SlackLogo} style={{ width: 35, position: 'relative', left: -5 }} />
					</ListItemIcon>
					<StyledBadge badgeContent={'Pro'} color="secondary">
						<ListItemText primary={'Slack'} />
					</StyledBadge>
				</ListItem>
			</If>
			<If condition={typeof KaliFormsObject.hubspotInstalled !== 'undefined'}>
				<ListItem
					button
					selected={store._UI_.activeFormSettingsItem === 'hubspotIntegration'}
					onClick={event => store._UI_.setActiveFormSettingsItem('hubspotIntegration')}>
					<ListItemIcon>
						<img src={HubSpotLogo} style={{ width: 35, position: 'relative', left: -5 }} />
					</ListItemIcon>
					<ListItemText primary="HubSpot" />
				</ListItem>
			</If>
			<If condition={typeof KaliFormsObject.hubspotInstalled === 'undefined'}>
				<ListItem
					button
					selected={store._UI_.activeFormSettingsItem === 'hubspotIntegration'}
					onClick={event => redirectToPricing()}>
					<ListItemIcon>
						<img src={HubSpotLogo} style={{ width: 35, position: 'relative', left: -5 }} />
					</ListItemIcon>
					<StyledBadge badgeContent={'Pro'} color="secondary">
						<ListItemText primary="HubSpot" />
					</StyledBadge>
				</ListItem>
			</If>
		</List>

	);
})

export default withTheme((FormSettingsSidebar));
