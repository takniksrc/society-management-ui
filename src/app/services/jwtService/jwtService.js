import FuseUtils from '@fuse/utils/FuseUtils';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { browserHistory } from 'react-router';
// import { instance } from 'app/services/jwtService/jwtService';
/* eslint-disable camelcase */

export const instance = axios.create({
	baseURL: 'https://smsstagingapi.norditsol.com'
	// baseURL: 'http://localhost:8000'
});

instance.interceptors.response.use(
	config => {
		console.info('Hey', config);

		return config;
	},
	error => {
		console.log('Hay ', error.response.status);
		if (error.response.status === 401) {
			console.log('401 dettected');
			window.location.replace('/login');
			//alert("Please Login again to access the data!")
		}

		return Promise.reject(error);
	}
);

class JwtService extends FuseUtils.EventEmitter {
	init() {
		this.handleAuthentication();
	}

	setInterceptors = () => {
		instance.interceptors.response.use(
			response => {
				return response;
			},
			err => {
				return new Promise((resolve, reject) => {
					if (err.response.status === 401 && err.config && !err.config.__isRetryRequest) {
						// if you ever get an unauthorized response, logout the user
						// alert("HERE")
						//	this.emit('onAutoLogout', 'Invalid access_token');
						this.setSession(null);
					}
					throw err;
				});
			}
		);
	};

	handleAuthentication = () => {
		const access_token = this.getAccessToken();

		if (!access_token) {
			this.emit('onNoAccessToken');

			return;
		}

		if (this.isAuthTokenValid(access_token)) {
			this.setSession(access_token);
			this.emit('onAutoLogin', true);
		} else {
			this.setSession(null);
			this.emit('onAutoLogout', 'access_token expired');
		}
	};

	createUser = data => {
		return new Promise((resolve, reject) => {
			instance.post('/api/register', data).then(response => {
				if (response.data.user) {
					this.setSession(response.data.access_token);
					resolve(response.data.user);
				} else {
					reject(response.data.error);
				}
			});
		});
	};
	// currently in use

	signInWithEmailAndPassword = (email, password) => {
		console.log('I am user ', { email, password });

		return new Promise((resolve, reject) => {
			const data = JSON.stringify({
				email,
				password
			});

			const config = {
				method: 'post',
				url: '/api/login',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json'
				},
				data
			};

			instance(config)
				.then(response => {
					console.log('response', response);
					if (response.data.access_token) {
						console.log('response.data.accessToken', response.data.access_token);
						this.setSession(response.data.access_token);
						instance.defaults.headers.common.Authorization = `Bearer ${response.data.access_token}`;
						instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

						resolve({
							message: 'Logged in successfully',

							user: {
								redirectUrl: '/dashboards/analytics',
								role: response.data.user.role,
								data: {
									name: response.data.user.name,
									email: response.data.user.email,
									photoURL: response.data.user.avatar
								}
							}
						});
					}
				})
				.catch(err => {
					console.log('err', err.response);
					reject({
						success: false,
						message: err.response.data.error
					});
				});
		});
	};

	updateUserData = user => {
		return instance.post('/api/auth/user/update', {
			user
		});
	};

	setSession = access_token => {
		if (access_token) {
			localStorage.setItem('jwt_access_token', access_token);
			instance.defaults.headers.common.Authorization = `Bearer ${access_token}`;
		} else {
			delete instance.defaults.headers.common.Authorization;
			localStorage.removeItem('user');
			localStorage.removeItem('jwt_access_token');
		}
	};

	logout = () => {
		instance.post('/api/logout');
		this.setSession(null);
	};

	isAuthTokenValid = access_token => {
		if (!access_token) {
			return false;
		}
		const decoded = jwtDecode(access_token);
		const currentTime = Date.now() / 1000;
		if (decoded.exp < currentTime) {
			console.warn('access token expired');
			return false;
		}
		console.log('access token valid', decoded.exp);
		return true;
	};

	getAccessToken = () => {
		return window.localStorage.getItem('jwt_access_token');
	};
}

const oldInstance = new JwtService();

export default oldInstance;
