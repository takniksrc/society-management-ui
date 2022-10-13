// Internet Explorer 11 requires polyfills and partially supported by this project.
// import 'react-app-polyfill/ie11';
// import 'react-app-polyfill/stable';
import ReactDOM from 'react-dom';
import 'typeface-poppins';
import './i18n';
import './react-chartjs-2-defaults';
import './styles/app-base.css';
import './styles/app-components.css';
import './styles/app-utilities.css';
import App from 'app/App';
// import axios from 'axios';
import * as serviceWorker from './serviceWorker';
import reportWebVitals from './reportWebVitals';
import { instance } from 'app/services/jwtService/jwtService';
import JwtService from 'app/services/jwtService';

if (JwtService.getAccessToken()) {
	instance.defaults.headers.common.Authorization = `Bearer ${JwtService.getAccessToken()}`;
} else {
	console.log('Headers are set using default header. Fuction will keep track when page is refreshed');
}
// axios.defaults.baseURL = 'http://localhost:8000/';
// axios.interceptors.request.use(request => {
// 	console.log('THIS IS Req', request);
// 	request.headers.channelName = 'Usman';
// 	return request;
// });
// axios.interceptors.request.use(response => {
// 	console.log(response);
// 	return response;
// });

ReactDOM.render(<App />, document.getElementById('root'));

reportWebVitals();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
