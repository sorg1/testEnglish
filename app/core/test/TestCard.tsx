import * as React from 'react';
import { withTranslation, WithTranslation } from 'react-i18next';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import {
	createStyles,
	withStyles,
	WithStyles,
	CardHeader,
	CardContent,
	FormControl,
	FormLabel,
	FormControlLabel,
	RadioGroup,
	Radio,
	Button,
	CardActions
} from '@material-ui/core';
import { State } from '../reducers';
import {
	fetchQuestion,
    createAnswer
} from './actions';
import { TestCardState } from './interfaces';
import LoadingScreen from '../../components/LoadingScreen';

const styles = createStyles({
	actions: {
		justifyContent: 'flex-end'
	},
	buttonContainer: {
		display: 'flex',
		justifyContent: 'flex-end'
	},
	link: {
		textDecoration: 'none'
	},
    formControl: {}
});

const mapStateToProps = (state: State) => ({
    isLoading: state.test.isLoading,
	question: state.test.question
});
const mapDispatchToProps = dispatch =>
	bindActionCreators(
		{
            fetchQuestion,
            createAnswer
		},
		dispatch
	);

interface TestCardProps
	extends WithStyles<typeof styles>,
		WithTranslation,
		ReturnType<typeof mapStateToProps>,
		ReturnType<typeof mapDispatchToProps>,
		RouteComponentProps<{}> {}

class TestCard extends React.Component<TestCardProps, TestCardState> {
    state = {
        value: null
    };
    componentDidMount() {
        this.props.fetchQuestion();
    }
	onSubmit(event) {
		event.preventDefault();
		const {
			value
		} = this.state;
		this.props.createAnswer({
            value
		});
	}
	render() {
		const { t, classes, question, isLoading } = this.props;
		if (question) {
            return (
				<form onSubmit={this.onSubmit.bind(this)}>
					<CardHeader title={t('test:title')} />
					<CardContent>
						<FormControl component="fieldset" className={classes.formControl}>
							<FormLabel component="hint">{question.hint}</FormLabel>
							<FormLabel component="text">{question.text}</FormLabel>
							<RadioGroup
								aria-label="test"
								name="test1"
								value={this.state.value}
								onChange={e => this.setState({ value: e.target.value })}>
								{question.options.map(option => {
									return (<FormControlLabel value={option.id.toString()} control={<Radio />} label={option.text} />);
								})}
							</RadioGroup>
						</FormControl>
					</CardContent>
					<CardActions className={classes.buttonContainer}>
						<Button type="submit" color="primary" variant="contained">
                            {t('test:cta_submit')}
						</Button>
					</CardActions>
				</form>
            );
		} else if (!isLoading) {
            return (<CardHeader title={t('test:should_create_test')} />);
		} else {
            return <LoadingScreen />;
		}
	}
}

export default withTranslation()(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(withStyles(styles)(TestCard))
);
