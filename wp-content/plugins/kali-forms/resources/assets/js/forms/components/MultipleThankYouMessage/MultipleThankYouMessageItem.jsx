import React from 'react';
import { store } from './../../store/store';
import { makeStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from './../Misc/FormControlLabel'
import Checkbox from './../Misc/Checkbox'
import InputLabel from '@material-ui/core/InputLabel';
import BootstrapInput from './../BootstrapInput';
import PlaceholderDialogOpener from './../PlaceholderDialog/PlaceholderDialogOpener';
import { ContentState, convertToRaw } from 'draft-js'
import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs'
import MUIRichTextEditor from 'mui-rte';
import CodeIcon from '@material-ui/icons/Code';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import MultipleThankYouMessageEditor from './MultipleThankYouMessageEditor';
import Box from '@material-ui/core/Box';
const styles = makeStyles(theme => {
	return {
		root: {
			border: '1px solid #E8EBF7',
			borderRadius: 4,
			padding: '0 12px',
			position: 'relative',
			fontSize: 14,
			display: 'flex',
			direction: 'row',
			lineHeight: '40px',
			background: 'transparent'
		},
		label: {
			width: '78%',
		},
		actionBox: {
			display: 'flex',
			direction: 'row',
			'& .MuiBox-root': {
				justifyContent: 'center',
				alignItems: 'center',
				display: 'flex',
				textAlign: 'center',
				padding: '0 15px',
				cursor: 'pointer',
				borderLeft: '1px solid #e8ebf7',
				'& .MuiIcon-root': {
					marginRight: theme.spacing(1),
					fontSize: '1.5rem',
				},
				'&:hover': {
					color: theme.palette.primary.main
				},
			}
		}
	}
})

const MultipleThankYouMessageItem = props => {
	const classes = styles();

	const openEditor = () => {
		props.default
			? props.setEditedCondition('default')
			: props.setEditedCondition(props.messageIndex);
		;
		props.setEditorOpen(true);
	}

	return (
		<React.Fragment>
			<Box className={classes.root}>
				<Box className={classes.label}>
					<If condition={props.default}>
						{KaliFormsObject.translations.formInfo.defaultThankYouMessage}
					</If>
					<If condition={!props.default}>
						{props.message.name}
					</If>
				</Box>
				<Box className={classes.actionBox}>
					<Box onClick={e => { openEditor() }}>
						<Icon className={'icon-edit-2'} />
						{KaliFormsObject.translations.general.edit}
					</Box>
					<If condition={!props.default}>
						<Box onClick={e => store._FORM_INFO_.removeThankYouMessage(props.messageIndex)}>
							<Icon className={'icon-remove'} />
							{KaliFormsObject.translations.general.delete}
						</Box>
					</If>
				</Box>
			</Box>
		</React.Fragment>
	)
};

export default MultipleThankYouMessageItem
