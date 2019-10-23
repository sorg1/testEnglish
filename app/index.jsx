import 'babel-polyfill';
import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import qs from 'qs';
import { Button } from '@material-ui/core';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import CssBaseline from '@material-ui/core/CssBaseline';
import lightGreen from '@material-ui/core/colors/lightGreen';
import lightBlue from '@material-ui/core/colors/lightBlue';
import indigo from '@material-ui/core/colors/indigo';
import blueGrey from '@material-ui/core/colors/blueGrey';
import red from '@material-ui/core/colors/red';
import MomentUtils from '@date-io/moment';
import i18n from './i18n';
import 'moment/locale/de';
import App from './core/App';
import createStore, { sagaMiddleware } from './core/createStore';
import reducers from './core/reducers';
import history from './core/history';
import { initializeValidators } from './lib/validator';

const store = createStore({}, reducers);
initializeValidators();

const primary = (env => {
	switch (env) {
		default:
			return indigo;
	}
})(process.env.NODE_ENV);

const defaultTheme = createMuiTheme();
const theme = createMuiTheme({
	palette: {
		primary: {
			light: primary[50],
			main: primary[500],
			dark: primary[700],
			contrastText: '#FFF'
		},
		success: {
			light: lightGreen[100],
			main: lightGreen[500],
			dark: lightGreen[700],
			contrastText: 'rgba(0, 0, 0, 0.87)'
		}
	},
	orderStatus: {
		open: {
			light: blueGrey[200],
			main: blueGrey[500],
			dark: blueGrey[700],
			contrastText: '#FFF'
		},
		inProgress: {
			light: lightBlue[200],
			main: lightBlue[500],
			dark: lightBlue[700],
			contrastText: 'rgba(0, 0, 0, 0.87)'
		},
		finished: {
			light: lightGreen[200],
			main: lightGreen[500],
			dark: lightGreen[700],
			contrastText: 'rgba(0, 0, 0, 0.87)'
		},
		declined: {
			light: red[200],
			main: red[500],
			dark: red[700],
			contrastText: 'rgba(0, 0, 0, 0.87)'
		}
	},
	overrides: {
		MuiAvatar: {
			root: {
				transition: defaultTheme.transitions.create('background-color')
			}
		},
		MuiDialog: {
			paper: {
				width: 600
			}
		},
		MuiPickersDialog: {
			dialogRoot: {
				width: 'unset',
				minHeight: 504
			}
		}
	}
});

if (window.location.search) {
	const query = qs.parse(window.location.search, { ignoreQueryPrefix: true });
	if (query.lang) {
		i18n.changeLanguage(query.lang);
	}
}

class ErrorHandler extends React.Component {
	constructor(props) {
		super(props);
		this.state = { error: false };
	}
	componentDidCatch(error, errorInfo) {
		this.setState({ error });
	}
	render() {
		if (this.state.error) {
			//render fallback UI
			return (
				<Button onClick={() => {}}>
					Report feedback
				</Button>
			);
		} else {
			//when there's not an error, render children untouched
			return this.props.children;
		}
	}
}

render(
	<React.Fragment>
		<CssBaseline />
		<Provider store={store}>
			<I18nextProvider i18n={i18n}>
				<MuiThemeProvider theme={theme}>
					<MuiPickersUtilsProvider utils={MomentUtils}>
						<ErrorHandler>
							<Router history={history}>
								<Route path="/" component={App} />
							</Router>
						</ErrorHandler>
					</MuiPickersUtilsProvider>
				</MuiThemeProvider>
			</I18nextProvider>
		</Provider>
	</React.Fragment>,
	window.document.getElementById('app')
);
