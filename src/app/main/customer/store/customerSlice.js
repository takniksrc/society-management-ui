import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import instance from 'axiosinstance';

export const getCustomerData = createAsyncThunk('contactsApp/customer/getCustomerData', async () => {
	const response = await instance.get('/api/users');
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
