import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Drawer from '@material-ui/core/Drawer';
import { observer } from "mobx-react-lite";
import { useSnackbar } from 'notistack';
import React, { useEffect } from 'react';
import AppBar from './../components/AppBar';
import FooterBar from './../components/FooterBar';
import EmailEditorContainer from './../containers/EmailEditorContainer';
import SmsEditorContainer from './../components/SmsEditor/SmsEditorContainer';
import SaveDataComponent from './../components/SaveDataComponent/SaveDataComponent';
import CustomSnack from './../components/Snackbars/CustomSnack';
import SnackBarAction from './../components/SnackBars/SnackBarAction';
import { store } from "./../store/store";
import appStyles from './AppStyles';
import FormBuilder from './FormBuilder';
import FormSettings from './FormSettings';
import EmailBuilderSidebar from './Sidebars/EmailBuilderSidebar';
import FormBuilderSidebar from './Sidebars/FormBuilderSidebar';
import FormSettingsSidebar from './Sidebars/FormSettingsSidebar';
import TemplateSelector from './TemplateSelector';
import ConfirmationDialog from '../components/ConfirmationDialog/ConfirmationDialog';
import BottomDrawer from './../components/LayoutComponents/BottomDrawer'
/**
 * App created as a hook
 *
 * @param {*} props
 * @returns
 */
const App = observer(props => {
	const { enqueueSnackbar } = useSnackbar();
	const classes = appStyles(props);
	const queueSnack = (props) => {
		props.tip === true
			?
			enqueueSnackbar(props.message, {
				persist: true,
				preventDuplicate: true,
				content: (key) => (
					<CustomSnack id={key} message={props.message} title={props.title} type={props.type} actions={props.actions} />
				),
			})
			:
			enqueueSnackbar(props.message,
				{
					preventDuplicate: true,
					variant: props.type,
					action: (key) => <SnackBarAction snackKey={key} />
				}
			)
	}

	useEffect(() => {
		KaliFormsObject.notices.map(e => {
			queueSnack(e);
		});

		if (store._UI_.templateSelecting) {
			document.getElementsByTagName('body')[0].style.background = '#fff';
			return;
		}

		document.getElementsByTagName('body')[0].style.background = store._UI_.appBar === 'formSettings'
			? '#fff'
			: '#898989';

	}, [])

	return (
		<React.Fragment>
			{/* Application Bar (Header) */}
			<AppBar />
			{/* Drawer, it changes based on "where" we are in the component (builder, email builder, form settings) */}
			<Drawer className={classes.drawer}
				variant="permanent"
				classes={{
					paper: classes.drawerPaper,
				}}>
				<Box className={classes.toolbar} />
				<Choose>
					<When condition={store._UI_.appBar === 'formBuilder'}>
						<FormBuilderSidebar />
					</When>
					<When condition={store._UI_.appBar === 'emailBuilder'}>
						<EmailBuilderSidebar />
					</When>
					<When condition={store._UI_.appBar === 'formSettings'}>
						<FormSettingsSidebar />
					</When>
				</Choose>
				<Box className={classes.toolbar} />
			</Drawer>
			{/* The main component array, should load whatever we need at a given time */}
			<Box component="main" className={classes.content}>
				<Box className={classes.appBarSpacer} />
				<Choose>
					<When condition={store._UI_.templateSelecting}>
						<Container className={classes.container} fixed={true} maxWidth="lg" disableGutters={true}>
							<TemplateSelector />
						</Container>
					</When>
					<Otherwise>
						<If condition={store._UI_.appBar === 'formBuilder'}>
							<FormBuilder />
						</If>
						<If condition={store._UI_.appBar === 'emailBuilder'}>
							<Choose>
								<When condition={store._UI_.activeTabInNotificationSidebar === 'sms'}>
									<SmsEditorContainer />
								</When>
								<Otherwise>
									<EmailEditorContainer />
								</Otherwise>
							</Choose>
						</If>
						<If condition={store._UI_.appBar === 'formSettings'}>
							<FormSettings />
						</If>
					</Otherwise>
				</Choose>
				<Box className={classes.appBarSpacer} />
			</Box>
			{/* Footer bar component */}
			<FooterBar />
			{/* Save Data component creates hidden inputs that save data directly through WP (easiest solution to the problem) */}
			<SaveDataComponent />
			{/* Confirmation Dialog (handles alerts like duplicate/remove with confirmation) */}
			<ConfirmationDialog />
			{/* Bottom drawer used through out the app */}
			<BottomDrawer />
		</React.Fragment>
	)
});

export default App;

