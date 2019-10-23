import * as React from 'react';
import {
	withStyles,
	createStyles,
	WithStyles,
	Theme
} from '@material-ui/core/styles';
import { RouteComponentProps, Switch, Route } from 'react-router';
import TestCard from './TestCard';
import LoggedOutView from '../../components/LoggedOutView';

const styles = (theme: Theme) =>
	createStyles({
		image: {
			height: 0,
			paddingTop: '36.25%',
			backgroundSize: 'contain',
			margin: theme.spacing(5)
		}
	});

interface QuestionsAppProps
	extends WithStyles<typeof styles>,
		RouteComponentProps<{}> {}

class TestApp extends React.Component<QuestionsAppProps> {
	render() {
		const { classes } = this.props;
		return (
			<LoggedOutView>
				<Switch>
					<Route path="/" component={TestCard} />
				</Switch>
			</LoggedOutView>
		);
	}
}

export default withStyles(styles)(TestApp);
