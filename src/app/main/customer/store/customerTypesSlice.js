import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import instance from 'axiosinstance';

export const getCustomerTypes = createAsyncThunk('contactsApp/customer/getCustomerTypes', async () => {
	const response = await instance.get('/api/customer-types');
	const data = await response.data.customer_types;
	console.log('I am customerTypes', data);
	return data;
});

const customerTypesSlice = createSlice({
	name: 'customerTypesSlice',
	initialState: [],
	reducers: {},
	extraReducers: {
		[getCustomerTypes.fulfilled]: (state, action) => action.payload
	}
});

export default customerTypesSlice.reducer;
