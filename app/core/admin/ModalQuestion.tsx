import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { withTranslation, WithTranslation } from 'react-i18next';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import Modal from '../../components/Modal';
import { ModalQuestionState } from './interfaces';
import {
    changeShowingModalForQuestion,
    createQuestion,
    deleteQuestion
} from './actions';
import { State } from '../reducers';

const mapStateToProps = (state: State) => ({
    isOpen: state.admin.modal.isOpen,
    content: state.admin.modal.content
});
const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            changeShowingModalForQuestion,
            createQuestion,
            deleteQuestion
        },
        dispatch
    );

interface ModalQuestionProps
    extends WithTranslation,
        ReturnType<typeof mapStateToProps>,
        ReturnType<typeof mapDispatchToProps>,
        RouteComponentProps<{}> {}


class ModalQuestion extends React.Component<ModalQuestionProps, ModalQuestionState> {
    render() {
        const {
            t,
            isOpen,
            content,
            changeShowingModalForQuestion,
            createQuestion,
            deleteQuestion
        } = this.props;

        return (<Modal
            headerTitle={t('admin:title')}
            open={isOpen}
            onSubmit={() => createQuestion(content)}
            onDelete={content.id ? () => deleteQuestion(content.id) : undefined}
            onClose={() => changeShowingModalForQuestion(false)}
        >
            <DialogContent>
                <TextField
                    id="hint"
                    label={t('admin:hint')}
                    value={content.hint}
                    onChange={e => this.setState({hint: e.target.value})}
                    margin="normal"
                    fullWidth
                />
                <TextField
                    id="text"
                    label={t('admin:text')}
                    value={content.text}
                    onChange={e => this.setState({text: e.target.value})}
                    margin="normal"
                    fullWidth
                />
                <TextField
                    id="optionA"
                    label={t('admin:option', {number: 1})}
                    value={content.optionA}
                    onChange={e => this.setState({optionA: e.target.value})}
                    margin="normal"
                    fullWidth
                />
                <TextField
                    id="optionB"
                    label={t('admin:option', {number: 2})}
                    value={content.optionB}
                    onChange={e => this.setState({optionB: e.target.value})}
                    margin="normal"
                    fullWidth
                />
                <TextField
                    id="optionC"
                    label={t('admin:option', {number: 3})}
                    value={content.optionC}
                    onChange={e => this.setState({optionC: e.target.value})}
                    margin="normal"
                    fullWidth
                />
                <TextField
                    id="optionD"
                    label={t('admin:option', {number: 4})}
                    value={content.optionD}
                    onChange={e => this.setState({optionD: e.target.value})}
                    margin="normal"
                    fullWidth
                />
            </DialogContent>
        </Modal>);
    }
}

export default withTranslation()(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(ModalQuestion)
);
