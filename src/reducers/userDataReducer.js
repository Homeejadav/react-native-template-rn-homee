import { reducerType } from '@constants';

var initialState = {
	firstname: 'first name',

}

export default function reducer(state = initialState, action) {
	switch (action.type) {

		case reducerType.firstname:
			return { ...state, firstname: action.data }

		default:
			return { ...state }
	}
}