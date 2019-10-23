import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { RouteComponentProps, Switch, Route } from 'react-router';
import { withTranslation, WithTranslation } from 'react-i18next';
import Button from '@material-ui/core/Button';
import {
	withStyles,
	createStyles,
	WithStyles,
	Theme
} from '@material-ui/core/styles';
import { State } from '../reducers';
import {
    changeShowingModalForQuestion,
    fetchQuestions
} from './actions';
import Table from '../../components/Table';
import ModalQuestion from './ModalQuestion';

const styles = (theme: Theme) =>
	createStyles({
		image: {
			height: 0,
			paddingTop: '36.25%',
			backgroundSize: 'contain',
			margin: theme.spacing(5)
		}
	});

const mapStateToProps = (state: State) => ({
    isLoading: state.admin.isLoading,
    questions: state.admin.questions
});
const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            changeShowingModalForQuestion,
            fetchQuestions
        },
        dispatch
    );

interface AdminProps
    extends WithStyles<typeof styles>,
        ReturnType<typeof mapStateToProps>,
        ReturnType<typeof mapDispatchToProps>,
        RouteComponentProps<{}> {}

class ListApp extends React.Component<AdminProps> {
    componentDidMount() {
        this.props.fetchQuestions();
    }
	render() {
		const {
			t,
			classes,
			questions,
            changeShowingModalForQuestion
		} = this.props;
		return (<div>
			<Button onClick={() => changeShowingModalForQuestion(true)}>
				{t('admin:new_test')}
			</Button>
			<Table
				rows={questions}
				onClickRow={changeShowingModalForQuestion}
			/>
			<ModalQuestion />
		</div>);
	}
}

export default withTranslation()(connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(ListApp)));
