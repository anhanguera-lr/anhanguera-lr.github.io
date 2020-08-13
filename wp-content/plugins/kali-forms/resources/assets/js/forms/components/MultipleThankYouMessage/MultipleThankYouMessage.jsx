import React from 'react';
import Box from '@material-ui/core/Box';
import { observer } from "mobx-react-lite";
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
import MultipleThankYouMessageItem from './MultipleThankYouMessageItem';
import Button from './../Misc/MinimalButton';

const MultipleThankYouMessage = observer(() => {
	const [editorOpen, setEditorOpen] = React.useState(false);
	const [editedCondition, setEditedCondition] = React.useState(false);

	const addNewConditionalMesssage = () => {
		store._FORM_INFO_.conditionalThankYouMessage.push({
			message: '',
			name: 'New thank you message',
			condition: {
				if: '',
				operator: '',
				value: ''
			}
		});
	}
	return (
		<React.Fragment>
			<If condition={!editorOpen}>
				<Grid item xs={12}>
					<MultipleThankYouMessageItem
						message={store._FORM_INFO_.thankYouMessage}
						default={true}
						setEditedCondition={setEditedCondition}
						setEditorOpen={setEditorOpen}
					/>
				</Grid>
				{
					store._FORM_INFO_.conditionalThankYouMessage.map((message, idx) =>
						<Grid item xs={12} key={idx + Math.floor(Math.random() * 100)}>
							<MultipleThankYouMessageItem
								message={message}
								setEditorOpen={setEditorOpen}
								setEditedCondition={setEditedCondition}
								messageIndex={idx}
								editedCondition={editedCondition}
							/>
						</Grid>
					)
				}
				<Grid item xs={12}>
					<Button onClick={e => addNewConditionalMesssage()}>
						{KaliFormsObject.translations.formInfo.addThankYouMessage}
					</Button>
				</Grid>
			</If>
			<If condition={editorOpen}>
				<MultipleThankYouMessageEditor editedCondition={editedCondition} setEditorOpen={setEditorOpen} />
			</If>
		</React.Fragment>
	)
});

export default MultipleThankYouMessage
