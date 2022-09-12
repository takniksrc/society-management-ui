import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
// import instance from 'instance';
import instance from 'axiosinstance';
import { update } from 'lodash';

export const getDownloadFile = createAsyncThunk('reports/getDownloadFile', async (routeParams, { getState }) => {
	console.log('I am params in download', routeParams);
	routeParams = routeParams || getState().disconnectedmeterSlice.routeParams;
	// const response = await instance.get(`/api/reports/${routeParams}`, {
	// 	params: routeParams
	// });
	const response = await instance({
		url: `/api/reports/${routeParams}`,
		method: 'GET',
		responseType: 'blob',
	  }).then((response) => {
	console.log('I am response in download hh',response)
		 const url = window.URL.createObjectURL(new Blob([response.data]));
		 const link = document.createElement('a');
		 link.href = url;
		 link.setAttribute('download', 'Fabric Excel Format.xlsx');
		 document.body.appendChild(link);
		 link.click();
	  });
	}
	// const data = await response.data.disconnected_order;
	// const data = await response.data.permanent_disconnection_order;
	// const data = await response.data[routeParams];

	// const data = await response.data.blob().then(blob => {
	// 	let url = window.URL.createObjectURL(blob);
	// 	let a = document.createElement('a');
	// 	a.href = url;
	// 	a.download = 'employees.json';
	// 	a.click();
	// });
		
	// console.log('I am data', data);
	// return { data, routeParams };
// }
);
// export const getDownloadFile = createAsyncThunk('reports/getDownloadFile', async (params, { dispatch }) => {
// 	const response = await instance.get(`/api/reports/${params}`,{ params });
// 	const data = await response.data;
// 	console.log('I am getmeters', data);
// 	return data;
// });

const contactsAdapter = createEntityAdapter({});

export const { selectAll: selectUsers, selectById: selectUsersById } = contactsAdapter.getSelectors(
	// console.log('I am contactsApp',contactsApp)
	// state => ('what we write here')
	state => state.disconnectedmeterSlice
);

const disconnectedmeterSlice = createSlice({
	name: 'reports',
	initialState: contactsAdapter.getInitialState({
		searchText: '',
		routeParams: {},
		disconnectedmeterSlice: {
			type: 'new',
			props: {
				open: false
			},
			data: null
		}
	}),
	reducers: {
		setContactsSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		},
		resetValues: (state, action) => {
			// alert('i am here',disconnectedmeterSlice.data)
			// state.disconnectedmeterSlice.data = action.payload;
			state.disconnectedmeterSlice = {
				type: 'new',
				props: {
					open: false
				},
				data: null
			};
			// state.routeParams = {};
		}
	},
	extraReducers: {
		[getDownloadFile.fulfilled]: (state, action) => {
			// const { data, routeParams } = action.payload;
			// contactsAdapter.setAll(state, data);
			// state.routeParams = routeParams;
			// state.searchText = '';
		}
	}
});

export const { setContactsSearchText, resetValues } = disconnectedmeterSlice.actions;

export default disconnectedmeterSlice.reducer;
