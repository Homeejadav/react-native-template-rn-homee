import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { APIMethods } from '../../services/API/methods';
import { GET_PRODUCTS } from '../../services/API/endpoints';

interface DataState {
	items: any[]; // Replace 'any[]' with the actual type of your items
	status: 'idle' | 'loading' | 'succeeded' | 'failed';
	error: string | undefined;
	isRefresh: boolean;
}

const initialState: DataState = {
	items: [],
	status: 'idle',
	error: undefined,
	isRefresh: false,
};

const dataSlice = createSlice({
	name: 'data',
	initialState,
	reducers: {

	},

	extraReducers: (builder) => {
		builder
			.addCase(fetchLatestProducts.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(fetchLatestProducts.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.items = action.payload;
				state.isRefresh = false;
			})
			.addCase(fetchLatestProducts.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message;
				state.isRefresh = false;
			});
	},
});

export const fetchLatestProducts = createAsyncThunk(
	'data/fetchLatestProducts', async () => {
		try {
			const response: any = await APIMethods.get(GET_PRODUCTS, '', []);
			console.log('latest products ----->', response.data);
			return response.data;
		} catch (err) {
			throw err;
		} finally {
			console.log('finally')
		}
	}
);

export default dataSlice.reducer;
