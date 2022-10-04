import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { instance } from 'app/services/jwtService/jwtService';

import { showMessage } from 'app/store/fuse/messageSlice';

export const getCourse = createAsyncThunk('academyApp/course/getCourse', async params => {
	const response = await instance.get('/api/academy-app/course', { params });
	const data = await response.data;
	return data;
});

export const updateCourse = createAsyncThunk(
	'academyApp/course/updateCourse',
	async (_data, { getState, dispatch }) => {
		const { id } = getState().academyApp.course;

		const response = await instance.post('/api/academy-app/course/update', { id, ..._data });
		const data = await response.data;

		dispatch(showMessage({ message: 'Course Saved' }));

		return data;
	}
);

const courseSlice = createSlice({
	name: 'academyApp/course',
	initialState: null,
	reducers: {},
	extraReducers: {
		[getCourse.fulfilled]: (state, action) => action.payload,
		[updateCourse.fulfilled]: (state, action) => ({
			...state,
			...action.payload
		})
	}
});

export default courseSlice.reducer;
