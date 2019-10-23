import { ValidatorForm } from 'react-material-ui-form-validator';

export function isWhiteSpaceOnly(value: string) {
	return !/\S/.test(value);
}

export function initializeValidators() {
	ValidatorForm.addValidationRule('required', value => {
		if (value instanceof Array) {
			return value.length !== 0;
		} else if (typeof value === 'string') {
			return value !== '';
		}
		return Boolean(value);
	});
	ValidatorForm.addValidationRule('passwordLength', value => {
		if (!value || value.length < 8) {
			return false;
		}
		return true;
	});
}

