import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getUserData = createAsyncThunk('contactsApp/user/getUserData', async () => {
	
	const response = await axios.get('/api/api/users');
	const data = await response.data;
	// console.log('I am data',data)

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
