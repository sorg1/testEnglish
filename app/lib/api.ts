import axios, { AxiosRequestConfig, AxiosPromise } from 'axios';
import _ from 'lodash';

export default {
	get<Response = any>(
		url: string,
		config?: AxiosRequestConfig
	): AxiosPromise<Response> {
		return axios.get(
			url,
			mergeConfig(_.merge(config, { params: { _: Date.now() } }))
		);
	},
	post<Body = any, Response = any>(
		url: string,
		data?: Body,
		config?: AxiosRequestConfig
	): AxiosPromise<Response> {
		return axios.post(url, data, mergeConfig(config));
	},
	put<Body = any, Response = any>(
		url: string,
		data?: Body,
		config?: AxiosRequestConfig
	): AxiosPromise<Response> {
		return axios.put(url, data, mergeConfig(config));
	},
	delete<Response = any>(
		url: string,
		config?: AxiosRequestConfig
	): AxiosPromise<Response> {
		return axios.delete(url, mergeConfig(config));
	},
	patch<Body = any, Response = any>(
		url: string,
		data?: Body,
		config?: AxiosRequestConfig
	): AxiosPromise<Response> {
		return axios.patch(url, data, mergeConfig(config));
	},
	uploadFile(file: File, config?: AxiosRequestConfig) {
		const data = new FormData();
		data.append('file', file);
		return axios.post('/api/v1/uploads', data, mergeConfig(config));
	}
};

function mergeConfig(config: AxiosRequestConfig): AxiosRequestConfig {
	const jwt = window.localStorage.getItem('jwt');
	const preconfig: AxiosRequestConfig = {
		headers: {
			Accept: 'application/json',
			Authorization: jwt ? `Bearer ${jwt}` : undefined
		}
	};
	return _.merge(preconfig, config);
}
