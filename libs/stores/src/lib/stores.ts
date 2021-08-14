import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import {
	configureStore,
	getDefaultMiddleware,
	Action,
	Store,
	applyMiddleware,
	EnhancedStore,
  createStore,
} from "@reduxjs/toolkit";

import { createLogger } from "redux-logger";
import { ThunkAction } from "redux-thunk";

import {createWrapper, Context} from 'next-redux-wrapper';

import createReducer from "./rootReducers";

export function configureAppStore(initialState = {}): EnhancedStore {
	// Logger configuration
	const logger = createLogger({
		collapsed: true,
		duration: true,
	});

	const middleware = [
		...getDefaultMiddleware(),
		logger,
	];

	const enhancers = [
		applyMiddleware(...middleware),
	];

	const store: Store = configureStore({
		reducer: createReducer(),
		preloadedState: initialState,
		devTools: process.env.NODE_ENV !== "production",
		enhancers,
	});

	return store;
}

export const store = configureAppStore();
export const rootReducers = createReducer();

export type RootState = ReturnType<typeof rootReducers>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;
export const useAppDispatch = (): AppDispatch => useDispatch<AppDispatch>();
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

// create a makeStore function
const makeStore = (context: Context) => store;

export const wrapper = createWrapper<Store<RootState>>(makeStore, {debug: true});
