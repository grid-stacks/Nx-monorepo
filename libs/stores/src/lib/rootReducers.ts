import { combineReducers, Reducer } from "@reduxjs/toolkit";

import {
	countReducer, COUNT_FEATURE_KEY
} from "./slices/count.slice";
import { todoApi } from "./api/todo.api";

// Prepare rootReducer for injecting into enhancer
export default function createReducer(injectedReducers = {}): Reducer {
	const rootReducer = combineReducers({
		[COUNT_FEATURE_KEY]: countReducer,
		[todoApi.reducerPath]: todoApi.reducer,
		...injectedReducers,
	});

	return rootReducer;
}
