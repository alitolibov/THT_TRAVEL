import { createSlice } from '@reduxjs/toolkit';
import { ISettings } from '@/types';

interface InitialStateType {
	settings: object | ISettings
}

const initialState: InitialStateType = {
	settings: {}
};


export const settings = createSlice({
	name: 'settings',
	initialState,
	reducers: {
		update: (state, action: {payload: ISettings, type: string}) => {
			state.settings = action.payload;
		}
	}
});

export const {update} = settings.actions;

export default settings.reducer;