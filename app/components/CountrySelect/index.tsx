import * as React from 'react';
import * as countries from 'i18n-iso-countries';
import * as de from 'i18n-iso-countries/langs/de.json';
import { FormControlProps } from '@material-ui/core/FormControl';
import { SelectValidator } from './SelectValidator';
import { ValidatorForm } from 'react-material-ui-form-validator';
import { withTranslation, WithTranslation } from 'react-i18next';

countries.registerLocale(de);

ValidatorForm.addValidationRule('country_iso_code', value => {
	return countries.isValid(value);
});

interface CountrySelectProps {
	name: string;
	value: string;
	onChange: (value: string) => void;
	validators: string[];
	errorMessages: string[];
	label: React.ReactNode;
	disabled?: boolean;
	fullWidth?: FormControlProps['fullWidth'];
	margin?: FormControlProps['margin'];
	className?: string;
}

export class CountrySelect extends React.Component<CountrySelectProps> {
	render() {
		return (
			<SelectValidator
				name={this.props.name}
				label={this.props.label}
				value={this.props.value}
				disabled={this.props.disabled}
				onChange={e => this.props.onChange(e.currentTarget.value)}
				options={[{ value: null, label: '' }, ...getAvailableCountries()]}
				validators={this.props.validators}
				errorMessages={this.props.errorMessages}
				fullWidth={this.props.fullWidth}
				margin={this.props.margin}
				className={this.props.className}
			/>
		);
	}
}

function getAvailableCountries() {
	const countryNames = countries.getNames('de');
	return Object.keys(countryNames).map(value => ({
		value,
		label: countryNames[value]
	}));
}
