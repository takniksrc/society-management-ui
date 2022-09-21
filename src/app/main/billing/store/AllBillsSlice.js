import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import instance from 'axiosinstance';

export const getBills = createAsyncThunk('contactsApp/user/AllBillsSlice', async sectorId => {
	console.log('sectorId', sectorId);
	const response = await instance.get(`/api/bills/get-bills/${sectorId}`);
	const data = await response.data.bills;
	console.log('data in getBills', data);
	return data;
});

const AllBillsSlice = createSlice({
	name: 'AllBillsSlice',
	initialState: [],
	reducers: {
		resetBills: (state, action) => action.payload
	},

	extraReducers: {
		[getBills.fulfilled]: (state, action) => action.payload
	}
});

export default AllBillsSlice.reducer;
export const { resetBills } = AllBillsSlice.actions;
