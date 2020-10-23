import React from 'react';
import Button from './../Misc/MinimalButton';
import { observer } from "mobx-react-lite";
import { store } from "./../../store/store";
import FieldComponentSelect from './FieldComponentSelect';
import BootstrapInput from './../BootstrapInput';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';

const Calculator = observer(props => {
	const [simple, setSimple] = React.useState(false);
	const field = props.sidebar ? store._FIELD_COMPONENTS_.getFieldByIndex(store._UI_.activeFormFieldInSidebar) : '';
	const label = (typeof field.properties.caption !== 'undefined' && field.properties.caption !== '') ? field.properties.caption : field.properties.name

	return (
		<React.Fragment>
			<If condition={simple}>
				<FormControl>
					<InputLabel shrink>
						{KaliFormsObject.translations.conditionalLogic.currentField}
					</InputLabel>
					<BootstrapInput
						value={label}
						fullWidth={true}
						disabled={true}
					/>
				</FormControl>
			=
			<FieldComponentSelect />
			</If>
		</React.Fragment>
	)
})

export default Calculator;
