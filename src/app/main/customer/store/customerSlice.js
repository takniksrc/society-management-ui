import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { instance } from 'app/services/jwtService/jwtService';

export const getCustomerData = createAsyncThunk('contactsApp/customer/getCustomerData', async (pageNumber = 1) => {
	// const response = await instance.get(`/api/customers?page=${pageNumber}`);
	const response = await instance.get('/api/customers');
	const data = await response.data;
	console.log('I am getCustomerData', data);
	return data;
});

const customerSlice = createSlice({
	name: 'customerSlice',
	initialState: {},
	reducers: {},
	extraReducers: {
		[getCustomerData.fulfilled]: (state, action) => action.payload
	}
});

export default customerSlice.reducer;
