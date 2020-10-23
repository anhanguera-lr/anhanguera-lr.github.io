import React from 'react';
import paypalLogo from './../../../../img/paypal.svg';
import Box from '@material-ui/core/Box';
import builderFormFieldStyles from './BuilderFormFieldStyles';
import { observer } from "mobx-react-lite";
import { store } from "./../../store/store";

import Icon from '@material-ui/core/Icon';

const BuilderFormField = observer((props) => {
	const classes = builderFormFieldStyles(props);

	const previewField = (field, classes) => {
		switch (field.id) {
			case 'rating':
				var label = setComputedLabelFunc(field);
				var items = [];
				var defaultVal = field.properties.default;
				var max = parseFloat(field.properties.max) > 10 ? 10 : parseFloat(field.properties.max);
				for (var j = 0; j < max; j++) {
					items.push(<Icon className={'icon-star'} key={j} color={defaultVal <= j ? 'inherit' : 'primary'} />);
				}

				return (
					<React.Fragment>
						<Box component="label" className={classes.label}>
							{label} {required ? store._FORM_INFO_.requiredFieldMark || '(*)' : ''}
						</Box>
						<Box component="span" className={classes.rating}>
							{items}
						</Box>
						<Box component="small" className={classes.small}>
							{field.properties.description}
						</Box>
					</React.Fragment>
				)
			case 'choices':
			case 'dropdown':
				var label = setComputedLabelFunc(field);
				var checked = field.properties.default;
				var required = field.properties.required;
				var value = checked === '' ? '-- Select an option --' : checked.split(',')[0];
				return (
					<React.Fragment>
						<Box component="label" className={classes.label}>
							{label} {required ? store._FORM_INFO_.requiredFieldMark || '(*)' : ''}
						</Box>
						<Box component="span" className={classes.select}>
							<Box component="span" className={'select-value'}>
								{value}
							</Box>
							<Box component="span" className={'select-arrow'}>
								<Icon className={'icon-down'} />
							</Box>
						</Box>
						<Box component="small" className={classes.small}>{field.properties.description}</Box>
					</React.Fragment>
				)
			case 'freeText':
				var label = field.properties.id;
				var content = field.properties.content;
				if (content !== '') {
					return (<Box className={classes.freeText} ><span dangerouslySetInnerHTML={{ __html: field.properties.content }}></span></Box>);
				}

				return (<Box component="span">{label}</Box>)
			case 'radio':
				var label = setComputedLabelFunc(field);
				return (
					<React.Fragment>
						<Box className={classes.label} component="label">
							{label} {required ? store._FORM_INFO_.requiredFieldMark || '(*)' : ''}
						</Box>
						<Box className={classes.radioCheckbox}>
							<If condition={field.properties.hasOwnProperty('choices')}>
								{
									field.properties.choices.map((choice, idx) => {
										var checked = choice.value === field.properties.default;
										return (
											<Box component="label" className={classes.labelCheckbox} key={choice.value + idx}>
												<input type="radio" checked={checked} onChange={e => e} className={classes.checkbox} />
												<em>{choice.value}</em> / {choice.label}
											</Box>
										)
									})
								}
							</If>
						</Box>
						<Box component="small" className={classes.small}>{field.properties.description}</Box>
					</React.Fragment>
				);
			case 'checkbox':
				var label = setComputedLabelFunc(field);
				return (
					<React.Fragment>
						<Box className={classes.label} component="label">
							{label} {required ? store._FORM_INFO_.requiredFieldMark || '(*)' : ''}
						</Box>
						<Box className={classes.radioCheckbox}>
							<If condition={field.properties.hasOwnProperty('choices')}>
								{
									field.properties.choices.map((choice, idx) => {
										let checkedOptions = field.properties.default.split(',');
										let checked = checkedOptions.includes(choice.value);
										return (
											<Box component="label" className={classes.labelCheckbox} key={choice.value + idx}>
												<input type="checkbox" checked={checked} onChange={e => e} className={classes.checkbox} />
												<em>{choice.value}</em> / {choice.label}
											</Box>
										)
									})
								}
							</If>
						</Box>
						<Box component="small" className={classes.small}>{field.properties.description}</Box>
					</React.Fragment>
				);
			case 'textarea':
				var label = setComputedLabelFunc(field);
				var required = field.properties.required;
				var defaultVal = field.properties.default;
				var placeholder = field.properties.placeholder;
				return (
					<React.Fragment>
						<Box component="label" className={classes.label}>
							{label} {required ? store._FORM_INFO_.requiredFieldMark || '(*)' : ''}
						</Box>
						<textarea className={classes.textarea} placeholder={placeholder} value={defaultVal || ''} onChange={e => e} />
						<Box component="small" className={classes.small}>{field.properties.description}</Box>
					</React.Fragment>
				);
			case 'divider':
				return (
					<span className={classes.divider}>
						<span>{field.properties.type}</span>
						<hr />
					</span>
				);
			case 'fileUpload':
				return (
					<span className={classes.fileUpload}>
						<span dangerouslySetInnerHTML={{ __html: KaliFormsObject.translations.frontend.filePond.labelIdle }}>
						</span>
					</span>
				);
			case 'button':
			case 'submitButton':
				var label = setComputedLabelFunc(field);
				return (
					<React.Fragment>
						<If condition={typeof field.properties.style === 'undefined' || field.properties.style === 'default'}>
							<button className={classes.submitButton}>{label}</button>
						</If>
						<If condition={typeof field.properties.style !== 'undefined' && field.properties.style !== 'default'}>
							<button className={classes.submitButtonStripped + ' ' + field.properties.style}>{label}</button>
						</If>
						<Box component="small" className={classes.small}>{field.properties.description}</Box>
					</React.Fragment>
				)
			case 'hidden':
				var required = field.properties.required;
				var defaultVal = field.properties.default;
				var label = field.properties.name + ' field';
				return (
					<React.Fragment>
						<Box className={classes.label} component="label">
							{label} {required ? store._FORM_INFO_.requiredFieldMark || '(*)' : ''}
						</Box>
						<input className={classes.input} type="textbox" value={defaultVal || ''} onChange={e => e} />
						<Box className={classes.small} component="small">
							{field.properties.description}
						</Box>
					</React.Fragment>
				)
			case 'grecaptcha':
				return (
					<span className={classes.grecaptcha}>
						<img src={KaliFormsObject.assetsUrl + '/img/recaptcha.gif'} />
					</span>
				);
			case 'pageBreak':
				var label = setComputedLabelFunc(field);
				return (
					<span className={classes.pageBreak}>
						<div><button className="button">Back</button></div>
						<div> {label} </div>
						<div><button className="button">Next</button></div>
					</span>
				);
			case 'dateTimePicker':
			case 'date':
				var label = setComputedLabelFunc(field);
				var required = field.properties.required;
				var defaultVal = field.properties.default;
				var placeholder = field.properties.placeholder;
				return (
					<React.Fragment>
						<Box component="label" className={classes.label}>
							{label} {required ? store._FORM_INFO_.requiredFieldMark || '(*)' : ''}
						</Box>
						<input className={classes.input} type="date" placeholder={placeholder} value={defaultVal || ''} onChange={e => e} />
						{/* <Box component="span" className={'date-icon'}>
							<Icon className={'icon-data-picker'} />
						</Box> */}
						<Box className={classes.small} component="small">{field.properties.description}</Box>
					</React.Fragment>
				)
			case 'password':
				var label = setComputedLabelFunc(field);
				var required = field.properties.required;
				var defaultVal = field.properties.default;
				var placeholder = field.properties.placeholder;
				return (
					<React.Fragment>
						<Box className={classes.label} component="label">
							{label} {required ? store._FORM_INFO_.requiredFieldMark || '(*)' : ''}
						</Box>
						<input className={classes.input} type="textbox" placeholder="*******" onChange={e => e} />
						<Box className={classes.small} component="small">
							{field.properties.description}
						</Box>
					</React.Fragment>
				)
			case 'range':
				var label = setComputedLabelFunc(field);
				var required = field.properties.required;
				var defaultVal = field.properties.default;
				var placeholder = field.properties.placeholder;
				return (
					<React.Fragment>
						<Box className={classes.label} component="label">
							{label} {required ? store._FORM_INFO_.requiredFieldMark || '(*)' : ''}
						</Box>
						<input className={classes.input} min="0" max="100" type="range" placeholder={placeholder} value={defaultVal || ''} onChange={e => e} />
						<Box className={classes.small} component="small">
							{field.properties.description}
						</Box>
					</React.Fragment>
				)
			case 'product':
				var label = setComputedLabelFunc(field);
				return (<span>{label} - {field.properties.price}</span>)
			case 'paypal':
				return (<span className={classes.paypal}><img src={paypalLogo} /></span>)
			case 'smartTextOutput':
				return (<code className={classes.code}>{field.properties.content}</code>)
			case 'digitalSignature':
				var label = setComputedLabelFunc(field);
				return (
					<React.Fragment>
						<Box className={classes.label} component="label">
							{label} {required ? store._FORM_INFO_.requiredFieldMark || '(*)' : ''}
						</Box>
						<Box className={classes.imageRadio}>
							<Icon style={{ margin: '0 auto', lineHeight: '29px', fontSize: '2.65rem' }} className={'icon-digital-signature'} />
						</Box>
						<Box component="small" className={classes.small}>{field.properties.description}</Box>
					</React.Fragment>)
			case 'imageRadio':
				var label = setComputedLabelFunc(field);
				return (
					<React.Fragment>
						<Box className={classes.label} component="label">
							{label} {required ? store._FORM_INFO_.requiredFieldMark || '(*)' : ''}
						</Box>
						<Box className={classes.imageRadio}>
							<If condition={field.properties.hasOwnProperty('choices')}>
								{
									field.properties.choices.map((choice, idx) => {
										return (
											<Box component="div"
												key={choice.id + idx + Math.floor(Math.random() * 100)}>
												<Icon className={'icon-image-choices ' + classes.imageRadioIcon} />
											</Box>
										)
									})
								}
							</If>
						</Box>
						<Box component="small" className={classes.small}>{field.properties.description}</Box>
					</React.Fragment>
				);
			case 'colorPicker':
				var label = setComputedLabelFunc(field);
				var required = field.properties.required;
				var defaultVal = field.properties.default;
				var placeholder = field.properties.placeholder;
				return (
					<React.Fragment>
						<Box className={classes.label} component="label">
							{label} {required ? store._FORM_INFO_.requiredFieldMark || '(*)' : ''}
						</Box>
						<input className={classes.inputColor} type="color" placeholder={placeholder} value={defaultVal || ''} onChange={e => e} />
						<Box className={classes.small} component="small">
							{field.properties.description}
						</Box>
					</React.Fragment>
				)
			default:
				var label = setComputedLabelFunc(field);
				var required = field.properties.required;
				var defaultVal = field.properties.default;
				var placeholder = field.properties.placeholder;
				return (
					<React.Fragment>
						<Box className={classes.label} component="label">
							{label} {required ? store._FORM_INFO_.requiredFieldMark || '(*)' : ''}
						</Box>
						<input className={classes.input} type="textbox" placeholder={placeholder} value={defaultVal || ''} onChange={e => e} />
						<Box className={classes.small} component="small">
							{field.properties.description}
						</Box>
					</React.Fragment>
				)
		}
	}

	/**
	 * Better labels
	 * @return {*}
	 */
	const setComputedLabelFunc = (field) => {
		let compLabel = `${field.label} field`;
		if (field.properties.caption !== '') {
			compLabel = field.properties.caption;
		}

		return compLabel;
	}

	const getField = (id) => {
		let field = store._FIELD_COMPONENTS_.fieldComponents.filter(el => el.internalId === id)
		if (!field.length) {
			return null
		}
		return field[0];
	}

	const field = getField(props.field);

	return (
		<Box className={classes.container}>
			<Icon className={'KaliFormsBuilderDragHandle icon-move16 ' + classes.moveButton} />
			{<If condition={typeof props.field !== 'undefined'}>
				{previewField(field, classes)}
			</If>}
		</Box>
	);
});

export default BuilderFormField;
