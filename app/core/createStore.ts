import { createStore, applyMiddleware, Middleware, Reducer } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import thunk from 'redux-thunk';
import createSagaMiddlware from 'redux-saga';

export const sagaMiddleware = createSagaMiddlware();

const logger = store => next => action => {
	if (console && console.groupCollapsed) {
		console.group(action.type);
		console.info('dispatching', action);
	}
	const result = next(action);
	if (console && console.groupEnd) {
		console.log('next state', store.getState());
		console.groupEnd();
	}
	return result;
};

export default function initializeStore(initialState, reducer: Reducer) {
	const middlewares: Middleware[] = [
		thunk,
		promiseMiddleware(),
		sagaMiddleware
	];

	if (process.env.NODE_ENV !== 'production') {
		middlewares.push(logger);
	}

	const createStoreWithMiddleware = applyMiddleware(...middlewares)(
		createStore
	);
	return createStoreWithMiddleware(reducer, initialState);
}
