import { combineReducers } from 'redux';
import { constants } from './actions';
import { ModalQuestionState } from './interfaces';

const FULFILLED = '_FULFILLED';


export interface AdminState {
	isLoading: boolean;
	questions;
    modal: ModalQuestionState;
}
const defaultQuestionState = {
    hint: '',
    text: '',
    optionA: '',
    optionB: '',
    optionC: '',
    optionD: ''
};

export default combineReducers<AdminState>({
    isLoading: (state = true, action) => {
        switch (action.type) {
            case constants.FETCH_QUESTIONS + FULFILLED: {
                return false;
            }
            default:
                return state;
        }
    },
    questions: (state = [], action) => {
		switch (action.type) {
			case constants.FETCH_QUESTIONS + FULFILLED: {
				return action.payload;
			}
			case constants.CREATE_QUESTION + FULFILLED: {
			    return [...state, action.payload];
			}
			default:
				return state;
		}
	},
    modal: combineReducers<ModalQuestionState>({
        isOpen: (state = false, action) => {
            switch (action.type) {
                case constants.CHANGE_SHOWING_MODAL_FOR_QUESTION: {
                    return action.payload.isOpen;
                }
                case constants.CREATE_QUESTION + FULFILLED:
                case constants.DELETE_QUESTION + FULFILLED: {
                    return false;
                }
                default:
                    return state;
            }
        },
        content: (state = defaultQuestionState, action) => {
            switch (action.type) {
                case constants.CHANGE_SHOWING_MODAL_FOR_QUESTION: {
                    return action.payload.content || defaultQuestionState;
                }
                case constants.CREATE_QUESTION + FULFILLED:
                case constants.DELETE_QUESTION + FULFILLED: {
                    return defaultQuestionState;
                }
                default:
                    return state;
            }
        }
    })
});
