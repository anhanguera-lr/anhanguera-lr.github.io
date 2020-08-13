import React from 'react';
import { observer } from "mobx-react-lite";
import { store } from "./../../store/store";
import slackItemStyles from './SlackActionItemStyles';
import Box from '@material-ui/core/Box';
import Icon from '@material-ui/core/Icon';
const SlackActionItem = observer(props => {
	const classes = slackItemStyles(props);
	const setEditingContainer = () => {
		props.setActionBeingEdited(props.index);
		props.setEditingAction(true);
	}

	return (
		<React.Fragment>
			<Box className={classes.root}>
				<Box className={classes.label}>
					<span dangerouslySetInnerHTML={{ __html: props.label }}></span>
				</Box>
				<Box className={classes.actionBox}>
					<Box onClick={() => setEditingContainer()}>
						<Icon className={'icon-edit-2'} />
						{KaliFormsObject.translations.general.edit}
					</Box>
					<Box onClick={e => store._SLACK_.duplicateAction(props.action)}>
						<Icon className={'icon-copy'} />
						{KaliFormsObject.translations.general.duplicate}
					</Box>
					<Box onClick={() => store._SLACK_.removeAction(props.action)}>
						<Icon className={'icon-remove'} />
						{KaliFormsObject.translations.general.delete}
					</Box>
				</Box>
			</Box>
		</React.Fragment>
	)
})

export default SlackActionItem;
