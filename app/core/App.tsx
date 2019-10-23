import * as React from 'react';
import { Route, Switch, RouteComponentProps } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { hot } from 'react-hot-loader';
import Notification from './Notification';
import LoadingScreen from '../components/LoadingScreen';
import Sidebar from './sidebar/App';
import Test from './test/App';
import Admin from './admin/App';

class NoMatch extends React.Component {
	render() {
		return <div>404</div>;
	}
}

const mapDispatchToProps = dispatch =>
	bindActionCreators(
		{},
		dispatch
	);

interface CoreAppProps
	extends ReturnType<typeof mapDispatchToProps>,
		RouteComponentProps<{}> {}
interface CoreAppState {
	hasFiguredOut: boolean;
}

class CoreApp extends React.Component<CoreAppProps, CoreAppState> {
	state = {
		hasFiguredOut: false
	};
	componentDidMount() {
        this.props.history.replace('/app/admin');
        this.setState({ hasFiguredOut: true });
	}
	render() {
		if (this.state.hasFiguredOut) {
			return [
				<Sidebar />,
				<Switch key={0}>
					<Route path="/app/admin" component={Admin} />
					<Route path="/app/test" component={Test} />
					<Route component={NoMatch} />
				</Switch>,
				<Notification key={1} />
			];
		}
		return <LoadingScreen />;
	}
}

export default process.env.NODE_ENV === 'development'
	? hot(module)(
			connect(
				null,
				mapDispatchToProps
			)(CoreApp)
	  )
	: connect(
			null,
			mapDispatchToProps
	  )(CoreApp);
