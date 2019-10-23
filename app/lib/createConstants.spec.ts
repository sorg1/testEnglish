import { createAsyncConstants } from './createConstants';

describe('createConstants', function() {
	describe('.createAsyncConstants()', function() {
		it('should be an object of objects with async states', function() {
			const constants = createAsyncConstants(['GET_USERS', 'POST_USER']);
			expect(constants.GET_USERS.TYPE).toEqual('GET_USERS');
			expect(constants.GET_USERS.PENDING).toEqual('GET_USERS_PENDING');
			expect(constants.GET_USERS.REJECTED).toEqual('GET_USERS_REJECTED');
			expect(constants.GET_USERS.FULFILLED).toEqual('GET_USERS_FULFILLED');
			expect(constants.POST_USER.TYPE).toEqual('POST_USER');
			expect(constants.POST_USER.PENDING).toEqual('POST_USER_PENDING');
			expect(constants.POST_USER.REJECTED).toEqual('POST_USER_REJECTED');
			expect(constants.POST_USER.FULFILLED).toEqual('POST_USER_FULFILLED');
		});
		it('should work with prefix', function() {
			const constants = createAsyncConstants(['GET_USERS'], {
				prefix: 'ADMIN'
			});
			expect(constants.GET_USERS.TYPE).toEqual('ADMIN_GET_USERS');
			expect(constants.GET_USERS.PENDING).toEqual('ADMIN_GET_USERS_PENDING');
			expect(constants.GET_USERS.REJECTED).toEqual('ADMIN_GET_USERS_REJECTED');
			expect(constants.GET_USERS.FULFILLED).toEqual(
				'ADMIN_GET_USERS_FULFILLED'
			);
		});
	});
});
