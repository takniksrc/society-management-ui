import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getBillingData = createAsyncThunk('contactsApp/user/getBillingData', async () => {
	
	const response = await axios.get('/api/api/bills');
	const data = await response.data;
	// console.log('I am data',data)

	return data;
});

const billingSlice = createSlice({
	name: 'billingSlice',
	initialState: {},
	reducers: {},
	extraReducers: {
		[getBillingData.fulfilled]: (state, action) => action.payload
	}
});

export default billingSlice.reducer;
