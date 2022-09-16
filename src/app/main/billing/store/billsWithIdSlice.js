import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import instance from 'axiosinstance';

export const getBillsData = createAsyncThunk('contactsApp/user/getBillingData', async billsId => {
	console.log('billsId',billsId.billsId)
	const response = await instance.get(`/api/bills/${billsId.billsId}`);
	const data = await response.data.data;
	console.log('I am data in getBillsData', data);

	return data;
});

const billsWithIdSlice = createSlice({
	name: 'billsWithIdSlice',
	initialState: {},
	reducers: {},
	extraReducers: {
		[getBillsData.fulfilled]: (state, action) => action.payload
	}
});

export default billsWithIdSlice.reducer;
