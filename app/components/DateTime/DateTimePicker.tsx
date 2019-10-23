import * as React from 'react';
import { DateTimePicker, DateTimePickerProps } from '@material-ui/pickers';

import {
	ClockIcon,
	CalendarIcon,
	LeftArrowIcon,
	RightArrowIcon
} from './Icons';

interface CustomDateTimePickerProps {
	value: DateTimePickerProps['value'];
	onChange: DateTimePickerProps['onChange'];
	label?: DateTimePickerProps['label'];
	clearable?: DateTimePickerProps['clearable'];
}

class CustomDateTimePicker extends React.Component<CustomDateTimePickerProps> {
	render() {
		return (
			<DateTimePicker
				value={this.props.value}
				onChange={this.props.onChange}
				label={this.props.label}
				clearable={this.props.clearable}
				ampm={false}
				leftArrowIcon={<LeftArrowIcon />}
				rightArrowIcon={<RightArrowIcon />}
				timeIcon={<ClockIcon />}
				dateRangeIcon={<CalendarIcon />}
			/>
		);
	}
}

export default CustomDateTimePicker;
