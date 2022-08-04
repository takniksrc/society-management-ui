import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getUserData = createAsyncThunk('contactsApp/user/getUserData', async () => {
	// const response = await axios.get('http://localhost:8080/api/api/users', (req, res) => {
	// 	res.setHeader('Access-Control-Allow-Origin', '*');
	// 	res.setHeader('Access-Control-Allow-Credentials', 'true');
	// 	res.setHeader('Access-Control-Max-Age', '1800');
	// 	res.setHeader('Access-Control-Allow-Headers', 'content-type');
	// 	res.setHeader('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, PATCH, OPTIONS');
	// });
	const data = [
		{
			role: 'Accountant',
			id: '046b6c7f-0b8a-43b9-b35d-6489e6daee91',
			email: 'john.doe@acmestreet.com'
		},
		{
			role: 'Accountant',
			id: '046b6c7f-0b8a-43b9-b35d-6489e6daee91',
			email: 'john.doe@acmestreet.com'
		}
	];
	console.log('I am data',data)
	// const response = await axios.get('http://localhost:8080/api/api/users');
	// const data = await response.data;
	return data;
});

const userSlice = createSlice({
	name: 'userSlice',
	initialState: {},
	reducers: {},
	extraReducers: {
		[getUserData.fulfilled]: (state, action) => action.payload
	}
});

export default userSlice.reducer;
