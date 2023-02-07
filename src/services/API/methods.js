import axios from 'axios';

const get = (endpoint, params, customHeaders = []) => {
	let rootHeaders = {
		// ApiKey: process.env['REACT_NATIVE_SERVER_API_KEY']
	};
	if (customHeaders && customHeaders.length > 0) {
		rootHeaders = { ...rootHeaders, ...customHeaders };
	}
	if (endpoint && endpoint.length > 0) {
		let response = axios.get(getFullApiUrl(endpoint), {
			params: params,
			headers: rootHeaders,
		});
		return response;
	}
	return false;
};

const post = (endpoint, data, customHeaders = []) => {
	let rootHeaders = {
		// ApiKey: process.env['REACT_NATIVE_SERVER_API_KEY']
	};
	if (customHeaders && customHeaders.length > 0) {
		rootHeaders = { ...rootHeaders, ...customHeaders };
	}
	if (endpoint && endpoint.length > 0) {
		let response = axios.post(getFullApiUrl(endpoint), data, {
			headers: rootHeaders,
		});
		return response;
	}
	return false;
};

const getFullApiUrl = (endpoint) => {
	if (endpoint && endpoint.length > 0) {
		return process.env['REACT_NATIVE_SERVER_API_FULL_URL'] + endpoint;
	}
};

export const APIMethods = {
	get,
	post,
};