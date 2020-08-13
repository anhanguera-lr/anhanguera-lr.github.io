import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles } from '@material-ui/core/styles';
import CodeIcon from '@material-ui/icons/Code';
import { ContentState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { observer } from "mobx-react-lite";
import MUIRichTextEditor from 'mui-rte';
import React from 'react';
import { store } from './../../store/store';
import MultipleThankYouMessage from './../MultipleThankYouMessage/MultipleThankYouMessage';
import Checkbox from './Checkbox';
import FormControlLabel from './FormControlLabel';
const styles = makeStyles(theme => {
	return {

	}
})

const ConditionalThankYouMessage = observer(() => {
	const classes = styles();
	const [thankYouMessage, setThankYouMessage] = React.useState('');

	React.useEffect(() => {
		let state = getEditorValue(store._FORM_INFO_.thankYouMessage);
		setThankYouMessage(JSON.stringify(state));

		return () => setThankYouMessage('');
	}, [])

	const getEditorValue = (val) => {
		let valFromStore = htmlToDraft(val)
		let state = convertToRaw(ContentState.createFromBlockArray(
			valFromStore.contentBlocks,
			valFromStore.entityMap
		))

		return state;
	}

	const setEditorToString = (val) => {
		debouncedSaveToStore(val);
	}

	const saveToStore = (value) => {
		let currentContent = value.getCurrentContent();
		let state = draftToHtml(convertToRaw(currentContent));
		store._FORM_INFO_.thankYouMessage = state;
	}

	const debouncedSaveToStore = _.debounce(saveToStore, 500);
	return (
		<React.Fragment>
			<Grid item xs={12}>
				<FormGroup>
					<FormControlLabel
						control={
							<Checkbox
								checked={store._FORM_INFO_.showThankYouMessage === '1'}
								onChange={e => store._FORM_INFO_.showThankYouMessage = e.target.checked ? '1' : '0'}
							/>
						}
						label={KaliFormsObject.translations.formInfo.showThankYou}
					/>
					<If condition={store._FORM_INFO_.showThankYouMessage === '1'}>
						<FormControlLabel
							control={
								<Checkbox
									checked={store._FORM_INFO_.conditionalThankYou === '1'}
									onChange={e => store._FORM_INFO_.conditionalThankYou = e.target.checked ? '1' : '0'}
								/>
							}
							label={KaliFormsObject.translations.formInfo.conditionalThankYou}
						/>
					</If>
				</FormGroup>
			</Grid>
			<If condition={store._FORM_INFO_.showThankYouMessage === '1'}>
				<If condition={store._FORM_INFO_.conditionalThankYou === '0'}>
					<Grid item xs={12}>
						<FormControl>
							<InputLabel shrink>
								{KaliFormsObject.translations.formInfo.thankYouMessage}
							</InputLabel>
							<MUIRichTextEditor
								label={KaliFormsObject.translations.formEmails.emailBody}
								value={thankYouMessage}
								customControls={[
									{
										name: "open-placeholder-dialog",
										icon: <CodeIcon />,
										type: "callback",
										onClick: (editorState, name, anchor) => store._UI_.setPlaceholderDialog(true)
									}
								]}
								controls={["title", "bold", "italic", "link", "numberList", "bulletList", "open-placeholder-dialog"]}
								onChange={e => setEditorToString(e)}
							/>
						</FormControl>
					</Grid>
				</If>
				<If condition={store._FORM_INFO_.conditionalThankYou === '1'}>
					<MultipleThankYouMessage />
				</If>
			</If>
		</React.Fragment>
	)
});

export default ConditionalThankYouMessage;
