import * as React from 'react';
import {
	FormGroup,
	FormControlLabel,
	Checkbox,
	FormHelperText,
	FormControl
} from '@material-ui/core';
import { ValidatorComponent } from 'react-material-ui-form-validator';

class CheckboxValidator extends ValidatorComponent {
	errorText() {
		const { isValid } = this.state;
		if (isValid) return null;
		return <FormHelperText>{this.getErrorMessage()}</FormHelperText>;
	}
	render() {
		const { value, onChange, label, color, classes } = this.props;
		return (
			<FormControl error={!this.state.isValid}>
				<FormGroup>
					<FormControlLabel
						control={
							<Checkbox value={value} onChange={onChange} color={color} />
						}
						classes={{
							root: classes ? classes.group : null,
							label: classes ? classes.label : null
						}}
						label={label}
					/>
					{this.errorText()}
				</FormGroup>
			</FormControl>
		);
	}
}

const wrapped = CheckboxValidator;
export { wrapped as CheckboxValidator };
