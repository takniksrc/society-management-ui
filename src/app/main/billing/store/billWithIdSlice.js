import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import instance from 'axiosinstance';

export const getBillData = createAsyncThunk('contactsApp/user/getBillData', async billId => {
	console.log('billId', billId);
	const response = await instance.get(`/api/bills/${billId}`);
	const data = await response.data.data;
	console.log('I am data in getBillData', data);

	return data;
});

const billWithIdSlice = createSlice({
	name: 'billWithIdSlice',
	initialState: {},
	reducers: {},
	extraReducers: {
		[getBillData.fulfilled]: (state, action) => action.payload
	}
});

export default billWithIdSlice.reducer;
