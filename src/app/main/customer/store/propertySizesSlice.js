import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { instance } from 'app/services/jwtService/jwtService';

export const getPropertySizes = createAsyncThunk(
	'contactsApp/customer/getPropertySizes',
	async (propertyTypeId, { dispatch, getState }) => {
		const response = await instance.get(`/api/property-sizes/${propertyTypeId}`);
		const data = await response.data.property_sizes;
		console.log('I am propertySizes', data);
		return data;
	}
);

const propertySizesSlice = createSlice({
	name: 'propertySizesSlice',
	initialState: [],
	reducers: {},
	extraReducers: {
		[getPropertySizes.fulfilled]: (state, action) => action.payload
	}
});

export default propertySizesSlice.reducer;
