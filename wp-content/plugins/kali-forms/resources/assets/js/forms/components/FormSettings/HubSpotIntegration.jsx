import React, { useState, useEffect } from 'react';
import HubSpotAction from './../HubSpotIntegration/HubSpotAction'
import Grid from '@material-ui/core/Grid'
import MaterialTable from 'material-table';
import AddBox from '@material-ui/icons/AddBox';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import { Typography } from '@material-ui/core';
import { observer } from "mobx-react-lite";
import { store } from "./../../store/store";
import Container from './../LayoutComponents/Container';
import SectionTitle from './../Misc/SectionTitle';

/**
 * Creates a default object ( action ) for our app
 *
 * @param {int} index
 */
const defaultObj = (index) => {
	return {
		'hubSpotAction': `${index + 1} - ${KaliFormsObject.translations.hubspot.general.action}`,
		'hubSpotFormName': `${index + 1} - ${KaliFormsObject.translations.hubspot.general.form}`,
		'leadStatus': '',
		'lifecycleStage': '',
		'contactOwnerOption': '',
		'contactOwner': '',
		'conditionalOwner': [],
		'formFieldsMap': {
			email: '',
			firstName: '',
			lastName: '',
		},
		'additionalFormFields': [
			{ additionalFieldIndex: 0, hubspotProperty: '', assignedFormField: '' }
		],
		'conditionalLogic': 'any',
		'conditionalLogicConditions': [
			{ conditionalIndex: 0, formField: '', condition: 'is', value: '' }
		],
		'guid': '',
		'portalId': '',
	}
};
/**
 * HubSpot Integration component
 *
 * @param {*} props
 * @returns
 */
const HubSpotIntegration = (props) => {
	const [hubspotData, setHubspotData] = useState(KaliFormsObject.hubspot.length ? KaliFormsObject.hubspot : []);
	const [deleteQueue, setDeleteQueue] = useState([]);
	const [selectedIdx, setSelectedIdx] = useState(null);

	/**
	 * State changers by index
	 */
	const setHubspotDataByIndex = (idx, data) => {
		let currentState = hubspotData;
		currentState[idx] = data;
		setHubspotData([...currentState]);
	};
	/**
	 * Debounce this function so we dont flood browser
	 */
	const debouncedHubspotDataByIndex = _.debounce(setHubspotDataByIndex, 500);
	/**
	 * All Hubspot actions that were created
	 */
	const hubSpotActions = () => {
		let actions = [];
		hubspotData.map(data => {
			actions.push({
				name: data.hubSpotAction,
				form: data.hubSpotFormName,
				idx: data.idx,
				leadStatus: data.leadStatus,
				lifecycleStage: data.lifecycleStage,
			});
		})
		return actions;
	}
	/**
	 * Add new action function
	 */
	const addNewAction = () => {
		let currentState = hubspotData;
		currentState.push({ ...defaultObj(currentState.length), idx: currentState.length });
		setHubspotData([...currentState]);
	};
	/**
	 * Removes an action based on its index (taken from the rowData object)
	 * @param {object} rowData
	 */
	const removeAction = (rowData) => {
		if (hubspotData[rowData.idx].hasOwnProperty('guid') && hubspotData[rowData.idx].guid !== '') {
			let currentDeleteQueue = deleteQueue;
			currentDeleteQueue.push(hubspotData[rowData.idx].guid);
			setDeleteQueue([...currentDeleteQueue]);
		}

		let currentState = hubspotData.filter(action => action.idx !== rowData.idx);
		currentState.map((data, index) => data.idx = index);
		setHubspotData([...currentState]);
	}
	useEffect(() => {
		store._FORM_INFO_.hubspotData = hubspotData;
		store._FORM_INFO_.deleteQueue = deleteQueue;
	}, [hubspotData, deleteQueue])
	return (
		<React.Fragment>
			<Container maxWidth="md">
				<SectionTitle title={'HubSpot'} />
				<Grid container direction="row" spacing={3}>
					<Grid item xs={12}>
						<If condition={KaliFormsHubSpot.error === '1'}>
							<Typography>
								{KaliFormsHubSpot.message}
							</Typography>
						</If>
						<If condition={KaliFormsHubSpot.error !== '1' && selectedIdx === null}>
							<MaterialTable
								components={{ Container: props => <div>{props.children}</div> }}
								columns={[
									{ title: KaliFormsObject.translations.hubspot.general.actionName, field: 'name' },
									{ title: KaliFormsObject.translations.hubspot.general.formName, field: 'form' },
									{ title: KaliFormsObject.translations.hubspot.general.leadStatus, field: 'leadStatus' },
									{ title: KaliFormsObject.translations.hubspot.general.lifecycle, field: 'lifecycleStage' }

								]}
								options={{
									search: false,
									paging: false,
									sorting: false,
								}}
								actions={[
									{
										icon: () => <Edit />,
										tooltip: KaliFormsObject.translations.hubspot.general.editAction,
										onClick: (event, rowData) => setSelectedIdx(rowData.idx)
									},
									{
										icon: () => <DeleteOutline />,
										tooltip: KaliFormsObject.translations.hubspot.general.deleteAction,
										onClick: (event, rowData) => removeAction(rowData)
									},
									{
										icon: () => <AddBox />,
										tooltip: KaliFormsObject.translations.hubspot.general.addAction,
										isFreeAction: true,
										onClick: (event) => addNewAction()
									}
								]}
								data={hubSpotActions()}
								title={KaliFormsObject.translations.hubspot.general.tableTitle}
							/>
						</If>
						<If condition={KaliFormsHubSpot.error !== '1' && hubspotData.length && selectedIdx !== null} >
							<HubSpotAction
								goBack={() => setSelectedIdx(null)}
								setHubspotDataByIndex={debouncedHubspotDataByIndex}
								hubspotData={hubspotData[selectedIdx]} idx={selectedIdx}
							/>
						</If>
					</Grid>
				</Grid>
			</Container>
		</React.Fragment>
	)
}

export default HubSpotIntegration;
