import React from 'react';
import Icon from '@material-ui/core/Icon';
import { makeStyles } from '@material-ui/core/styles';
const styles = makeStyles(theme => {
	return {
		icon: {
			color: '#fff',
			position: 'relative',
			top: 5,
			marginRight: 10,
		},
		root: {
			background: theme.palette.primary.main,
			color: '#fff !important',
			padding: '0 20px',
		}
	}
})

const AppBarSaveButton = () => {
	const classes = styles();
	const save = (e) => {
		e.preventDefault()
		document.getElementById('publish').click();
	}
	return (
		<React.Fragment>
			<a href="#" onClick={e => save(e)} className={classes.root}>
				<Icon className={classes.icon + ' icon-save'} />
				{KaliFormsObject.translations.general.save}
			</a>
		</React.Fragment>
	)
}
export default AppBarSaveButton;
