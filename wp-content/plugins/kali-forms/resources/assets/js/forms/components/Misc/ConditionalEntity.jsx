import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { observer } from "mobx-react-lite";
import React from 'react';
import BootstrapInput from './../BootstrapInput';
import FieldComponentSelect from './../HubSpotIntegration/FieldComponentSelect';
import { store } from './../../store/store';
const ConditionalEntity = observer((props) => {
	const [conditionalLogic, setConditionalLogic] = React.useState(
		props.conditions.conditionalLogic || 'always'
	);
	const [conditions, setConditions] = React.useState(
		props.conditions.conditions || [{ conditionalIndex: 0, formField: '', formFieldType: '', condition: 'is', value: '' }]
	);
	const [ref, setRef] = React.useState(props.changer || '');
	const selectableTypes = ['select', 'dropdown', 'checkbox', 'radio', 'choices', 'imageRadio'];

	const selectChange = obj => {
		conditions[obj.field].formField = obj.value;
		conditions[obj.field].formFieldType = obj.type;

		if (selectableTypes.includes(obj.type)) {
			conditions[obj.field].value = '';
		}

		setConditions([...conditions])
	}

	const changeFieldCondition = (idx, value) => {
		conditions[idx].condition = value;
		setConditions([...conditions])
	}

	const changedValue = (idx, value) => {
		conditions[idx].value = value;
		setConditions([...conditions])
	}

	const addCondition = () => {
		setConditions([...conditions, { conditionalIndex: conditions.length, formField: '', formFieldType: '', condition: 'is', value: '' }])
	}

	const removeCondition = idx => {
		let currentState = conditions.filter((condition, index) => idx !== index)
		setConditions([...currentState]);
	}

	const setDefaultCondition = () => {
		setConditions([{ conditionalIndex: conditions.length, formField: '', formFieldType: '', condition: 'is', value: '' }]);
	}

	React.useEffect(() => {
		props.onChange({ conditions, conditionalLogic });
	}, [conditions, conditionalLogic])

	React.useEffect(() => {
		if (props.changer !== ref) {
			setConditionalLogic(props.conditions.conditionalLogic);
			setConditions(props.conditions.conditions);
			setRef(props.changer)
		}
	}, [props.conditions])

	return (
		<React.Fragment>
			<Grid container direction="row" spacing={4} internalref={ref}>
				<Grid item xs={12}>
					<FormControl>
						<InputLabel shrink>
							{KaliFormsObject.translations.conditionalEntity.conditionalSending}
						</InputLabel>
						<Select
							multiple={false}
							input={<BootstrapInput />}
							value={conditionalLogic || 'always'}
							onChange={e => setConditionalLogic(e.target.value)}
							fullWidth={true}
						>
							<MenuItem value="always">
								{KaliFormsObject.translations.conditionalEntity.always}
							</MenuItem>
							<MenuItem value="any">
								{KaliFormsObject.translations.conditionalEntity.any}
							</MenuItem>
							<MenuItem value="all">
								{KaliFormsObject.translations.conditionalEntity.all}
							</MenuItem>
						</Select>
					</FormControl>
				</Grid>
			</Grid>
			<If condition={conditionalLogic !== 'always' && conditions.length}>
				{conditions.map((condition, idx) => (
					<Grid container direction="row" key={idx} spacing={3}>
						<Grid item xs={3}>
							<FieldComponentSelect
								label={KaliFormsObject.translations.conditionalEntity.formField}
								field={idx}
								selectedValue={condition.formField || ''}
								onChange={selectChange} />
						</Grid>
						<Grid item xs={3}>
							<FormControl>
								<InputLabel shrink>
									{KaliFormsObject.translations.conditionalEntity.operator}
								</InputLabel>
								<Select
									multiple={false}
									input={<BootstrapInput />}
									value={condition.condition}
									onChange={e => changeFieldCondition(idx, e.target.value)}
									fullWidth={true}
								>
									<MenuItem value='is'>{KaliFormsObject.translations.conditionalEntity.is}</MenuItem>
									<MenuItem value='not'>{KaliFormsObject.translations.conditionalEntity.isNot}</MenuItem>
									<MenuItem value='greater'>{KaliFormsObject.translations.conditionalEntity.greaterThan}</MenuItem>
									<MenuItem value='less'>{KaliFormsObject.translations.conditionalEntity.lessThan}</MenuItem>
									<MenuItem value='contains'>{KaliFormsObject.translations.conditionalEntity.contains}</MenuItem>
									<MenuItem value='starts'>{KaliFormsObject.translations.conditionalEntity.starts}</MenuItem>
									<MenuItem value='ends'>{KaliFormsObject.translations.conditionalEntity.ends}</MenuItem>
								</Select>
							</FormControl>
						</Grid>
						<Grid item xs={3}>
							<FormControl>
								<InputLabel shrink>
									{KaliFormsObject.translations.conditionalEntity.value}
								</InputLabel>
								<Choose>
									<When condition={selectableTypes.includes(condition.formFieldType)}>
										<Select
											multiple={false}
											input={<BootstrapInput />}
											value={condition.value}
											onChange={e => changedValue(idx, e.target.value)}
											fullWidth={true}
										>
											{
												typeof store._FIELD_COMPONENTS_.fieldConditionersByName[condition.formField] !== 'undefined'
												&& store._FIELD_COMPONENTS_.fieldConditionersByName[condition.formField].values.map((e, index) => (
													<MenuItem key={index + e.value} value={e.value}>
														{e.label}
													</MenuItem>
												))
											}
										</Select>
									</When>
									<Otherwise>
										<BootstrapInput
											value={condition.value}
											onChange={e => changedValue(idx, e.target.value)}
											fullWidth={true}
										/>
									</Otherwise>
								</Choose>
							</FormControl>
						</Grid>

						<Grid item xs={3} style={{ paddingTop: 38 }}>
							<Button
								aria-label={KaliFormsObject.translations.conditionalEntity.addCondition}
								variant="text"
								onClick={() => addCondition()}
							>
								<Icon className="icon-add" />
							</Button>
							<If condition={conditions.length === 1}>
								<Button
									aria-label={KaliFormsObject.translations.conditionalEntity.removeCondition}
									variant="text"
									onClick={() => setDefaultCondition()}
								>
									<Icon className="icon-remove" />
								</Button>
							</If>
							<If condition={conditions.length > 1}>
								<Button
									aria-label={KaliFormsObject.translations.conditionalEntity.removeCondition}
									variant="text"
									onClick={() => removeCondition(idx)}
								>
									<Icon className="icon-remove" />
								</Button>
							</If>
						</Grid>
					</Grid>
				))}
			</If>
		</React.Fragment>
	)
});
export default ConditionalEntity;
