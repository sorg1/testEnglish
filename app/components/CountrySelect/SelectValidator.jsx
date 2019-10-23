import * as React from 'react';
import { ValidatorComponent } from 'react-material-ui-form-validator';
import {
	FormControl,
	InputLabel,
	Select,
	FormHelperText
} from '@material-ui/core';

export class SelectValidator extends ValidatorComponent {
	getErrorText() {
		const { isValid } = this.state;
		if (isValid) return null;
		return <FormHelperText>{this.getErrorMessage()}</FormHelperText>;
	}
	render() {
		const {
			value,
			onChange,
			options,
			label,
			className,
			fullWidth,
			disabled,
			margin
		} = this.props;
		return (
			<FormControl
				className={className}
				fullWidth={fullWidth}
				margin={margin}
				error={!this.state.isValid}
				disabled={disabled}
			>
				<InputLabel>{label}</InputLabel>
				<Select native value={value} onChange={onChange}>
					{options.map(option => (
						<option key={option.value} value={option.value}>
							{option.label}
						</option>
					))}
				</Select>
				{this.getErrorText()}
			</FormControl>
		);
	}
}
