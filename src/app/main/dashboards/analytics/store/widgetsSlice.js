import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import { instance } from 'app/services/jwtService/jwtService';

export const getCharts = createAsyncThunk('analyticsDashboardApp/widgets/getCharts', async () => {
	const response = await instance.get('/api/dashboard');

	return response.data;
});

const widgetsAdapter = createEntityAdapter({});

export const { selectEntities: selectWidgetsEntities, selectById: selectWidgetById } = widgetsAdapter.getSelectors(
	state => state.analyticsDashboardApp.widgets
);

const widgetsSlice = createSlice({
	name: 'analyticsDashboardApp/widgets',
	initialState: widgetsAdapter.getInitialState({}),
	reducers: {},
	extraReducers: {
		[getCharts.fulfilled]: (state, action) => action.payload
	}
});

export default widgetsSlice.reducer;
