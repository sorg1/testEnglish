import * as React from 'react';
import {
	withStyles,
	WithStyles,
	createStyles,
	Theme,
	Omit
} from '@material-ui/core';
import MuiAvatar, {
	AvatarProps as MuiAvatarProps
} from '@material-ui/core/Avatar';
import cx from 'classnames';

const styles = (theme: Theme) =>
	createStyles({
		small: {
			width: theme.spacing(3),
			height: theme.spacing(3),
			fontSize: '0.75rem'
		}
	});

interface AvatarProps
	extends Omit<MuiAvatarProps, 'classes'>,
		WithStyles<typeof styles> {
	size?: 'normal' | 'small';
}

class Avatar extends React.Component<AvatarProps> {
	static defaultProps = {
		size: 'normal'
	};
	render() {
		const { size, children, classes, className, ...props } = this.props;
		return (
			<MuiAvatar
				className={cx({ [classes.small]: size === 'small' }, className)}
				{...props}
			>
				{children}
			</MuiAvatar>
		);
	}
}

export default withStyles(styles)(Avatar);
