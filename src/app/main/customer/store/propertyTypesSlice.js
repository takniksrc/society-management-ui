import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import instance from 'axiosinstance';

export const getPropertyTypes = createAsyncThunk(
	'contactsApp/customer/getPropertyTypes',
	async (customerTypeId, { dispatch, getState }) => {
		const response = await instance.get(`/api/property-types/${customerTypeId}`);
		const data = await response.data.property_types;
		console.log('I am propertyType', data);
		return data;
	}
);

const propertyTypesSlice = createSlice({
	name: 'propertyTypesSlice',
	initialState: [],
	reducers: {},
	extraReducers: {
		[getPropertyTypes.fulfilled]: (state, action) => action.payload
	}
});

export default propertyTypesSlice.reducer;
