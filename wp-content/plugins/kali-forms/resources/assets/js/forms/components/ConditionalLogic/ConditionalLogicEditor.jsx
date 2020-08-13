import Box from '@material-ui/core/Box';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { observer } from "mobx-react-lite";
import React, { useState } from 'react';
import { store } from "./../../store/store";
import BootstrapInput from './../BootstrapInput';
import Icon from '@material-ui/core/Icon';
import ConditionalLogicItemCount from './../ConditionalLogic/ConditionalLogicItemCount';
import Button from './../Misc/MinimalButton';
import conditionalLogicEditorStyles from './ConditionalLogicEditorStyles';

const ConditionalLogicEditor = observer((props) => {
	const classes = conditionalLogicEditorStyles();
	const editedCondition = store._FORM_INFO_.conditionalLogic[props.conditionIdx];
	return (
		<React.Fragment>
			<Grid container direction="row" style={{ marginBottom: props.sidebar ? 10 : 30 }} alignItems="center">
				<FormControl>
					<InputLabel shrink>
						{KaliFormsObject.translations.conditionalLogic.logicName}
					</InputLabel>
					<BootstrapInput
						value={editedCondition.name || ''}
						onChange={e => editedCondition.name = e.target.value}
						fullWidth={true}
					/>
				</FormControl>
			</Grid>
			<Grid container direction="row" spacing={2} style={{ marginBottom: props.sidebar ? -5 : 10 }} alignItems="center">
				<Grid item xs={12}>
					<Box className={classes.conditionalLogicRow}>
						<ConditionalLogicItemCount count={1} />
						<FormControl>
							<InputLabel shrink>
								{KaliFormsObject.translations.conditionalLogic.currentField}
							</InputLabel>
							<Select
								value={editedCondition.field || ''}
								multiple={false}
								onChange={e => editedCondition.field = e.target.value}
								disabled={props.sidebar}
								input={<BootstrapInput />}
							>
								{
									Object.keys(store._FIELD_COMPONENTS_.simplifiedFields).map((key, index) => (
										<MenuItem key={index + key} value={key}>
											{store._FIELD_COMPONENTS_.simplifiedFields[key].caption}
										</MenuItem>
									))
								}
							</Select>
						</FormControl>
					</Box>
				</Grid>
			</Grid>
			<Grid container direction="row" spacing={2} style={{ marginBottom: props.sidebar ? -5 : 10 }} alignItems="center">
				<Grid item xs={12}>
					<Box className={classes.conditionalLogicRow}>
						<ConditionalLogicItemCount count={2} />
						<FormControl>
							<InputLabel shrink>
								{KaliFormsObject.translations.conditionalLogic.state}
							</InputLabel>
							<Select
								value={editedCondition.state || ''}
								multiple={false}
								onChange={e => editedCondition.state = e.target.value}
								input={<BootstrapInput />}
							>
								<MenuItem value={'show'}>
									{KaliFormsObject.translations.conditionalLogic.show}
								</MenuItem>
								<MenuItem value={'hide'}>
									{KaliFormsObject.translations.conditionalLogic.hide}
								</MenuItem>
							</Select>
						</FormControl>
					</Box>
				</Grid>
			</Grid>
			<Grid container direction="row" spacing={2} style={{ marginBottom: props.sidebar ? -5 : 10 }} alignItems="center">
				<Grid item xs={12}>
					<Box className={classes.conditionalLogicRow}>
						<ConditionalLogicItemCount count={3} />
						<FormControl>
							<InputLabel shrink>
								{KaliFormsObject.translations.conditionalLogic.ifThisField}
							</InputLabel>
							<Select
								value={editedCondition.conditioner || ''}
								multiple={false}
								onChange={e => editedCondition.conditioner = e.target.value}
								input={<BootstrapInput />}
							>
								{
									Object.keys(store._FIELD_COMPONENTS_.fieldConditioners).map((key, index) => {
										// A field cant condition itself
										if (editedCondition.field === key) {
											return;
										}
										return (
											<MenuItem key={index + key} value={key}>
												{store._FIELD_COMPONENTS_.fieldConditioners[key].caption}
											</MenuItem>
										)
									})
								}
							</Select>
						</FormControl>
					</Box>
				</Grid>
			</Grid>
			<Grid container direction="row" spacing={2} style={{ marginBottom: props.sidebar ? -5 : 10 }} alignItems="center">
				<Grid item xs={12}>
					<Box className={classes.conditionalLogicRow}>
						<ConditionalLogicItemCount count={4} />
						<FormControl>
							<InputLabel shrink>
								{KaliFormsObject.translations.conditionalLogic.operator}
							</InputLabel>
							<Select
								value={editedCondition.operator || ''}
								multiple={false}
								onChange={e => editedCondition.operator = e.target.value}
								input={<BootstrapInput />}
							>
								<MenuItem value={'equal'}>
									{KaliFormsObject.translations.conditionalLogic.equalTo}
								</MenuItem>
								<MenuItem value={'different'}>
									{KaliFormsObject.translations.conditionalLogic.differentThan}
								</MenuItem>
								<MenuItem value={'or'}>
									{KaliFormsObject.translations.conditionalLogic.canBe}
								</MenuItem>
							</Select>
						</FormControl>
					</Box>
				</Grid>
			</Grid>
			<Grid container direction="row" spacing={2} style={{ marginBottom: props.sidebar ? -5 : 10 }} alignItems="center">
				<Grid item xs={12}>
					<Box className={classes.conditionalLogicRow}>
						<ConditionalLogicItemCount count={5} />
						<FormControl>
							<InputLabel shrink>
								{KaliFormsObject.translations.conditionalLogic.value}
							</InputLabel>
							<Select
								value={editedCondition.value || ''}
								multiple={false}
								onChange={e => editedCondition.value = e.target.value}
								input={<BootstrapInput />}
							>
								{
									typeof store._FIELD_COMPONENTS_.fieldConditioners[editedCondition.conditioner] !== 'undefined'
									&& store._FIELD_COMPONENTS_.fieldConditioners[editedCondition.conditioner].values.map((e, index) => (
										<MenuItem key={index + e.value} value={e.value}>
											{e.label}
										</MenuItem>
									))
								}
							</Select>
						</FormControl>
					</Box>
				</Grid>
			</Grid>
			<Grid container direction="row">
				<Grid item xs={12}>
					<Button onClick={e => props.setEditingCondition(false)} style={{ paddingLeft: 16, paddingRight: 16 }}>
						<Icon className={'icon-back'} style={{ fontSize: 14, marginRight: 8 }} />
						{KaliFormsObject.translations.general.back}
					</Button>
				</Grid>
			</Grid>
		</React.Fragment>
	);
})
export default ConditionalLogicEditor;
