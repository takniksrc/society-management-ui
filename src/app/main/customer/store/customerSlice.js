import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getCustomerData = createAsyncThunk('contactsApp/customer/getCustomerData', async () => {
	
	const response = await axios.get('/api/api/users');
	const data = await response.data;
	// console.log('I am data',data)

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
