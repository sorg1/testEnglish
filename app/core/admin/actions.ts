import i18n from '../../i18n';
import api from '../../lib/api';
import createConstants from '../../lib/createConstants';
import { showNotification } from '../actions';
import { QuestionState } from './interfaces';

export const constants = createConstants([
    'CHANGE_SHOWING_MODAL_FOR_QUESTION',
    'CREATE_QUESTION',
    'DELETE_QUESTION',
    'FETCH_QUESTIONS'
]);

export const changeShowingModalForQuestion = (isOpen, content) => dispatch =>
    dispatch({
        type: constants.CHANGE_SHOWING_MODAL_FOR_QUESTION,
        payload: { isOpen, content }
    });

export const fetchQuestions = () => dispatch =>
    dispatch({
        type: constants.FETCH_QUESTIONS,
        payload: api
            .get('/questions')
            .then(({ data }) => {
                return data;
            })
            .catch(err => {
                dispatch(showNotification(i18n.t('admin:error'), 'error'));
                throw err;
            })
    });

export const createQuestion = (body: QuestionState) => dispatch =>
    dispatch({
        type: constants.CREATE_QUESTION,
        payload: api
            .post<QuestionState>('/questions', body)
            .then(({ data }) => {
                dispatch(showNotification(i18n.t('admin:success'), 'success'));
                return data;
            })
            .catch(err => {
                dispatch(showNotification(i18n.t('admin:error'), 'error'));
                throw err;
            })
    });

export const deleteQuestion = (questionId: number) => dispatch =>
    dispatch({
        type: constants.DELETE_QUESTION,
        payload: api
            .delete<QuestionState>(`/questions/${questionId}`)
            .then(({ data }) => {
                dispatch(showNotification(i18n.t('admin:success'), 'success'));
                fetchQuestions()(dispatch);
                return data;
            })
            .catch(err => {
                dispatch(showNotification(i18n.t('admin:error'), 'error'));
                throw err;
            })
    });
