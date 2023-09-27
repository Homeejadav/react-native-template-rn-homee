import NetInfo from '@react-native-community/netinfo';
import axios, { AxiosResponse } from 'axios';
import Toast from 'react-native-toast-message';
import { getFullApiUrl } from '../../config';

const _showToast = (msg: string, type: string = 'error') => {
	Toast.show({ type, text1: msg });
};

const _checkInternetConnectivity = async (): Promise<any> => {
	const netInfoState = await NetInfo.fetch();
	return netInfoState.isConnected;
};

const get = async (endpoint: any, params: any, customHeaders: any[] = []): Promise<AxiosResponse | false> => {
	const isConnected = await _checkInternetConnectivity();

	if (!isConnected) {
		_showToast('No Internet Connection', 'error');
		return false;
	}

	let rootHeaders: any = {
		// ApiKey: Config.REACT_NATIVE_SERVER_API_KEY // Uncomment this line if needed
	};

	if (customHeaders && customHeaders.length > 0) {
		rootHeaders = { ...rootHeaders, ...customHeaders };
	}

	if (endpoint && endpoint.length > 0) {
		try {
			const response = await axios.get(getFullApiUrl(endpoint) as any, {
				headers: rootHeaders,
				params: params,
			});
			return response;
		} catch (error) {
			// Handle error if needed
		}
	}
	return false;
};

const post = async (endpoint: any, data: any, customHeaders: any[] = []): Promise<AxiosResponse | false> => {
	const isConnected = await _checkInternetConnectivity();

	if (!isConnected) {
		_showToast('No Internet Connection', 'error');
		return false;
	}

	let rootHeaders: any = {
		// ApiKey: Config.REACT_NATIVE_SERVER_API_KEY // Uncomment this line if needed
	};
	if (customHeaders && customHeaders.length > 0) {
		rootHeaders = { ...rootHeaders, ...customHeaders };
	}
	if (endpoint && endpoint.length > 0) {
		try {
			const response = await axios.post(getFullApiUrl(endpoint) as any, data, {
				headers: rootHeaders,
			});
			return response;
		} catch (error) {
			// Handle error if needed
		}
	}
	return false;
};

export const APIMethods = {
	get,
	post,
};
