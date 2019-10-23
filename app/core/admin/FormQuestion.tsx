import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { withTranslation, WithTranslation } from 'react-i18next';
import {
	createStyles,
	withStyles,
	WithStyles,
	CardContent,
	TextField
} from '@material-ui/core';
import { State } from '../reducers';
import {
    createQuestion,
    deleteQuestion
} from './actions';
import { QuestionState } from './interfaces';

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
	deleteButton: {
		float: 'left'
	}
});

const mapStateToProps = (state: State) => ({});
const mapDispatchToProps = dispatch =>
	bindActionCreators(
		{
			createQuestion,
			onDelete: deleteQuestion
		},
		dispatch
	);

interface FormQuestionProps
	extends WithStyles<typeof styles>,
		WithTranslation,
		ReturnType<typeof mapStateToProps>,
		ReturnType<typeof mapDispatchToProps>,
		RouteComponentProps<{}> {}


class FormQuestion extends React.Component<FormQuestionProps, QuestionState> {
	state = {
        hint: '',
		text: '',
        optionA: '',
        optionB: '',
        optionC: '',
        optionD: ''
	};
	onSubmit(event) {
		event.preventDefault();
		const {
			hint,
			text,
			optionA,
            optionB,
            optionC,
            optionD
		} = this.state;
		this.props.createQuestion({
            hint,
            text,
            optionA,
            optionB,
            optionC,
			optionD
		});
	}
	render() {
		const { t, classes, onCancel, onDelete } = this.props;
		return (<CardContent>
			<TextField
				id="hint"
				label={t('admin:hint')}
				value={this.state.hint}
				onChange={e => this.setState({ hint: e.target.value })}
				margin="normal"
				fullWidth
			/>
			<TextField
				id="text"
				label={t('admin:text')}
				value={this.state.text}
				onChange={e => this.setState({ text: e.target.value })}
				margin="normal"
				fullWidth
			/>
			<TextField
				id="optionA"
				label={t('admin:option', {number: 1})}
				value={this.state.optionA}
				onChange={e => this.setState({ optionA: e.target.value })}
				margin="normal"
				fullWidth
			/>
			<TextField
				id="optionB"
				label={t('admin:option', {number: 2})}
				value={this.state.optionB}
				onChange={e => this.setState({ optionB: e.target.value })}
				margin="normal"
				fullWidth
			/>
			<TextField
				id="optionC"
				label={t('admin:option', {number: 3})}
				value={this.state.optionC}
				onChange={e => this.setState({ optionC: e.target.value })}
				margin="normal"
				fullWidth
			/>
			<TextField
				id="optionD"
				label={t('admin:option', {number: 4})}
				value={this.state.optionD}
				onChange={e => this.setState({ optionD: e.target.value })}
				margin="normal"
				fullWidth
			/>
		</CardContent>);
	}
}

export default withTranslation()(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(withStyles(styles)(FormQuestion))
);
