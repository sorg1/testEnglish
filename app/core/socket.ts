import io from 'socket.io-client';
import { StrictEventEmitter } from 'strict-event-emitter-types';
import {
	ServerSocketEventEmitRecord,
	ClientSocketEventEmitRecord
} from '@api/socket.io';

let socket;

export const connectSocket = () => dispatch => {
	socket = io({
		transportOptions: {
			polling: {
				extraHeaders: {
					token: window.localStorage.getItem('jwt')
				}
			}
		}
	});
	dispatch({
		type: 'CONNECT_SOCKET'
	});
};

export const closeSocket = () => {
	socket.close();
	return {
		type: 'CLOSE_SOCKET'
	};
};

export function getSocket(): StrictEventEmitter<
	SocketIOClient.Socket,
	ServerSocketEventEmitRecord,
	ClientSocketEventEmitRecord
> {
	return socket;
}
