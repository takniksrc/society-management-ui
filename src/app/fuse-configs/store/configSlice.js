import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { instance } from 'app/services/jwtService/jwtService';
import { getBlocksStatus } from 'app/main/billing/store/billingBlocksSlice';
import { useDispatch } from 'react-redux';

export const getConfigurations = createAsyncThunk('contactsApp/customer/getConfigurations', async () => {
	const response = await instance.get('/api/system-configurations');

	return response.data;
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
