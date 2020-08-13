import React from 'react';
import FieldComponentSelect from './FieldComponentSelect'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import BootstrapInput from './../BootstrapInput';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
const ActionConditionalLogic = (props) => {
	const selectChange = (data) => {
		let currentState = props.conditionalLogicConditions;
		currentState[data.field].formField = data.value;
		props.setConditionalLogicConditions([...currentState]);
	}
	const changedCondition = data => {
		props.setConditionalLogic(data);
	}

	const changeFieldCondition = (idx, value) => {
		let currentState = props.conditionalLogicConditions;
		currentState[idx].condition = value;
		props.setConditionalLogicConditions([...currentState]);
	}
	const changedValue = (idx, value) => {
		let currentState = props.conditionalLogicConditions;
		currentState[idx].value = value;
		props.setConditionalLogicConditions([...currentState]);
	}
	const setDefaultCondition = () => {
		let currentState = props.conditionalLogicConditions;
		props.setConditionalLogicConditions(
			[
				{ conditionalIndex: currentState.length, formField: '', condition: 'is', value: '' }
			]
		)
	}
	const addCondition = () => {
		let currentState = props.conditionalLogicConditions;
		props.setConditionalLogicConditions(
			[
				...currentState,
				{ conditionalIndex: currentState.length, formField: '', condition: 'is', value: '' }
			]
		)
	}
	const removeCondition = (idx) => {
		let currentState = props.conditionalLogicConditions;
		currentState.splice(idx, 1);
		props.setConditionalLogicConditions([...currentState]);
	}
	return (
		<div style={{ marginBottom: 30 }}>
			<Grid container direction="row" spacing={4}>
				<Grid item>
					<Typography style={{ lineHeight: 2.1 }}>
						{KaliFormsObject.translations.hubspot.misc.processIf}
					</Typography>
				</Grid>
				<Grid item>
					<TextField value={props.conditionalLogic} select onChange={e => changedCondition(e.target.value)}>
						<MenuItem value="any">
							{KaliFormsObject.translations.hubspot.misc.any}
						</MenuItem>
						<MenuItem value="all">
							{KaliFormsObject.translations.hubspot.misc.all}
						</MenuItem>
					</TextField>
				</Grid>
			</Grid>
			{
				props.conditionalLogicConditions.map((condition, idx) => (
					<Grid container direction="row" key={idx} spacing={4}>
						<Grid item xs={3}>
							<FieldComponentSelect
								label={KaliFormsObject.translations.hubspot.misc.formField}
								field={idx}
								selectedValue={condition.formField}
								onChange={selectChange} />
						</Grid>
						<Grid item xs={2}>
							<FormControl>
								<InputLabel shrink>
									{KaliFormsObject.translations.hubspot.misc.field}
								</InputLabel>
								<Select
									multiple={false}
									input={<BootstrapInput />}
									value={condition.condition}
									onChange={e => changeFieldCondition(idx, e.target.value)}
									fullWidth={true}
								>
									<MenuItem value='is'>{KaliFormsObject.translations.hubspot.misc.is}</MenuItem>
									<MenuItem value='not'>{KaliFormsObject.translations.hubspot.misc.isNot}</MenuItem>
									<MenuItem value='greater'>{KaliFormsObject.translations.hubspot.misc.greaterThan}</MenuItem>
									<MenuItem value='less'>{KaliFormsObject.translations.hubspot.misc.lessThan}</MenuItem>
									<MenuItem value='contains'>{KaliFormsObject.translations.hubspot.misc.contains}</MenuItem>
									<MenuItem value='starts'>{KaliFormsObject.translations.hubspot.misc.starts}</MenuItem>
									<MenuItem value='ends'>{KaliFormsObject.translations.hubspot.misc.ends}</MenuItem>
								</Select>
							</FormControl>
						</Grid>
						<Grid item xs={3}>
							<FormControl>
								<InputLabel shrink>
									{KaliFormsObject.translations.hubspot.misc.value}
								</InputLabel>
								<BootstrapInput
									value={condition.value}
									onChange={e => changedValue(idx, e.target.value)}
									fullWidth={true}
									variant="filled"
									placeholder={KaliFormsObject.translations.hubspot.misc.hubSpotAction}
								/>
							</FormControl>
						</Grid>
						<Grid item xs={4} style={{ paddingTop: 42 }}>
							<Button
								aria-label={KaliFormsObject.translations.hubspot.misc.addCondition}
								variant="text"
								onClick={() => addCondition()}
							>
								<Icon className="icon-add" />
							</Button>
							<If condition={props.conditionalLogicConditions.length === 1}>
								<Button
									aria-label={KaliFormsObject.translations.hubspot.misc.removeCondition}
									variant="text"
									onClick={() => setDefaultCondition()}
								>
									<Icon className="icon-remove" />
								</Button>
							</If>
							<If condition={props.conditionalLogicConditions.length > 1}>
								<Button
									aria-label={KaliFormsObject.translations.hubspot.misc.removeCondition}
									variant="text"
									onClick={() => removeCondition(idx)}
								>
									<Icon className="icon-remove" />
								</Button>
							</If>
						</Grid>
					</Grid>
				))
			}
		</div>
	)
}

export default ActionConditionalLogic;
