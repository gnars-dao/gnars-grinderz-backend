import { redirectTo } from '@reach/router';
import { notification } from 'antd';
import 'antd/dist/antd.css';
import Axios from 'axios';

const clearStorage = async () => {
	localStorage.clear();
};

const axios = Axios.create({
	// baseURL: 'http://192.168.2.140:5000/',
	// baseURL: 'https://api.goldwaretech.com/',
	// baseURL: 'https://leaderboard.ogpass.23nv.xyz/v1/',
	baseURL: 'https://leaderboard.gnars.fun/v1/',
	timeout: 10000,
	// headers: {'Authorization': 'Bearer ' + getToken()}
});
axios.interceptors.request.use(
	async function (config) {
		const token = localStorage.getItem('token');
		if (token) config.headers.Authorization = token;
		return config;
	}
	// function (error) {
	// 	// Promise.reject(error)
	// 	Promise.reject(error)
	// }
);
axios.interceptors.response.use(
	(response) => response,
	(err) => {
		if (err.response == undefined) {
			notification.error({
				message: 'No Internet Connection!',
				duration: 3000,
			});
		} else {
			notification.error({
				message: 'There has been a problem with server please try again!',
				duration: 3000,
			});
			if (err.response.status == 401) {
				clearStorage();
				redirectTo('/login');
				// NavigationService.navigate('Login', {})
			}
		}
		return Promise.reject(err);
	}
);
export { axios };
