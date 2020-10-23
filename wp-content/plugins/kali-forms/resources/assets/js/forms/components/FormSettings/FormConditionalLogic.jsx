import { observer } from "mobx-react-lite";
import React, { useState } from 'react';
import { store } from "./../../store/store";
import ConditionalLogicComponent from './../ConditionalLogic/ConditionalLogicComponent';
import Container from './../LayoutComponents/Container';
import SectionTitle from './../Misc/SectionTitle';

const FormConditionalLogic = observer((props) => {
	return (
		<React.Fragment>
			<Container maxWidth="md">
				<SectionTitle title={KaliFormsObject.translations.conditionalLogic.conditionalLogic} />
				<ConditionalLogicComponent sidebar={false} />
			</Container>
		</React.Fragment>
	);
})
export default FormConditionalLogic;
