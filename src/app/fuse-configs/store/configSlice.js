import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import instance from 'axiosinstance';

export const getConfigurations = createAsyncThunk('contactsApp/customer/getConfigurations', async () => {
	const response = await instance.get('/api/system-configurations');
	const data = await response.data;
	console.log('I am customerTypes', data);
	return data;
});


const configSlice = createSlice({
	name: 'configSlice',
	initialState: [],
	reducers: {},
	extraReducers: {
		[getConfigurations.fulfilled]: (state, action) => action.payload
	}
});

export default configSlice.reducer;
