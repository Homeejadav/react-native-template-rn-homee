import { reducerType } from '@constants';

var initialState = {
	init: 0,
	localize: 'en',
	colorScheme: 'light'
}

export default function reducer(state = initialState, action) {
	switch (action.type) {

		case reducerType.init:
			return { ...state, init: action.data }

		case reducerType.localize:
			return { ...state, localize: action.data }

		default:
			return { ...state }
	}
}