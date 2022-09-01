import axios from 'axios';
import JwtService from 'app/services/jwtService';
// 'Content-Type': 'application/json', 
// 'Accept': 'application/json', 
// 'Authorization': 'Bearer {{bearer-token}}'

const instance = axios.create({
	baseURL: 'http://localhost:8000'
});
instance.defaults.headers.common.Authorization = `Bearer ${ JwtService.getAccessToken()}`;
instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

export default instance;
