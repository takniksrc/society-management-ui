import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { instance } from 'app/services/jwtService/jwtService';


export const getBillingData = createAsyncThunk('contactsApp/user/getBillingData', async () => {
	const response = await instance.get('/api/bills');
	const data = await response.data;
	console.log('Bills', data);

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
