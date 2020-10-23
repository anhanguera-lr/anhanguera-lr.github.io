import React from 'react';
import { observer } from 'mobx-react-lite';
import MediaManager from './../Misc/MediaManager';
import Box from '@material-ui/core/Box'
import Icon from '@material-ui/core/Icon'
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { makeStyles } from '@material-ui/core/styles'
import { sortableElement } from 'react-sortable-hoc';
import Grid from '@material-ui/core/Grid';
import AddableImageHandle from './AddableImageHandle';
const addableImageChoiceStyles = makeStyles(theme => {
	return {
		container: {
			position: 'relative',
		},
		buttonFullWidth: {
			width: '100%',
			'& .MuiIcon-root': {
				marginRight: theme.spacing(1),
			},
		},
		icon: {
			color: theme.palette.error.light,
			cursor: 'pointer',
			position: 'absolute',
			bottom: 10,
			right: 5,
			zIndex: 1000,
		},
		mediaManager: {
			marginTop: -12
		},
		actionFooter: {
			background: '#fff',
			border: '1px solid #E8EBF7',
			borderTop: 'none',
			borderRadius: '0 0 4px 4px',
			paddingLeft: theme.spacing(1),
			paddingRight: theme.spacing(1),
			position: 'relative',
			display: 'flex',
			flexDirection: 'row',
			alignItems: 'center',
			justifyContent: 'center',
		},
		radio: {
			marginRight: 0,
		},
		dragHandle: {
			cursor: 'move',
			position: 'absolute',
			bottom: 10,
			left: 5,
			zIndex: 1000,
		}
	}
});
const AddableImageChoice = observer((props) => {
	const classes = addableImageChoiceStyles()
	return (
		<Grid item xs={6}>
			<Box className={classes.container}>
				<MediaManager
					shrinkMargin={true}
					title={KaliFormsObject.translations.general.selectImage}
					buttonLabel={KaliFormsObject.translations.general.useImage}
					mediaValue={props.mediaValue}
					onChange={val => props.onChange(props.currentIndex, val)}
				/>
			</Box>
			<Box className={classes.actionFooter}>
				<AddableImageHandle className={'icon-move16 ' + classes.dragHandle} />
				<FormControlLabel
					className={classes.radio}
					value={props.value}
					control={<Radio
						color="primary"
						onChange={() => props.setSelectedImage(props.mediaValue.id)}
						checked={props.mediaValue.id === props.selectedImage}
					/>}
				/>
				<Icon className={'icon-remove ' + classes.icon} onClick={() => props.removeChoice(props.currentIndex)} />
			</Box>
		</Grid>
	);
});
export default sortableElement(AddableImageChoice);
