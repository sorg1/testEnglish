import { combineReducers, Reducer, AnyAction } from 'redux';
import { constants, NotificationVariant } from './actions';
import sidebar, { SidebarState } from './sidebar/reducers';
import test, { TestState } from './test/reducers';
import admin, { AdminState } from './admin/reducers';

export interface State {
    sidebar: SidebarState;
    notification: NotificationState;
    test: TestState;
    admin: AdminState;
}

interface NotificationState {
	open: boolean;
	message: string;
	variant: NotificationVariant;
}

const notification = combineReducers<NotificationState>({
	open: (state = false, action) => {
		switch (action.type) {
			case constants.HIDE_NOTIFICATION:
				return false;
			case constants.SHOW_NOTIFICATION:
				return true;
			default:
				return state;
		}
	},
	message: (state = '', action) => {
		switch (action.type) {
			case constants.SHOW_NOTIFICATION:
				return action.payload.message;
			default:
				return state;
		}
	},
	variant: (state = 'info', action) => {
		switch (action.type) {
			case constants.SHOW_NOTIFICATION:
				return action.payload.variant;
			default:
				return state;
		}
	}
});

const reducers: Reducer<State> = (state, action) => ({
    notification: notification(state.notification, action),
	sidebar: sidebar(state.sidebar, action),
    test: test(state.test, action),
    admin: admin(state.admin, action)
});

export default reducers;
