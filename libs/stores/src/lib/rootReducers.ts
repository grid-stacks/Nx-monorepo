import { combineReducers, Reducer } from "@reduxjs/toolkit";

import {
	countReducer, COUNT_FEATURE_KEY
} from "./slices/count.slice";
// import { jsonPlaceholder } from "../App/Components/Examples/post/post.slice";

// Prepare rootReducer for injecting into enhancer
export default function createReducer(injectedReducers = {}): Reducer {
	const rootReducer = combineReducers({
		[COUNT_FEATURE_KEY]: countReducer,
		// [jsonPlaceholder.reducerPath]: jsonPlaceholder.reducer,
		...injectedReducers,
	});

	return rootReducer;
}
