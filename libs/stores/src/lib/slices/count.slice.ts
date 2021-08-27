import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
  EntityState,
  PayloadAction,
} from '@reduxjs/toolkit';

export const COUNT_FEATURE_KEY = 'count';
export const COUNT_FETCH_STATUS = `${COUNT_FEATURE_KEY}/fetchStatus`;

export interface CountEntity {
  id: number;
}

export interface CountState extends EntityState<CountEntity> {
  loadingStatus: 'not loaded' | 'loading' | 'loaded' | 'error';
  error: string | null;
}

export const countAdapter = createEntityAdapter<CountEntity>();

/**
 * import React, { useEffect } from 'react';
 * import { useDispatch } from 'react-redux';
 *
 * const dispatch = useDispatch();
 * useEffect(() => {
 *   dispatch(fetchCount())
 * }, [dispatch]);
 */
export const fetchCount = createAsyncThunk(
  COUNT_FETCH_STATUS,
  async (_, thunkAPI) => {
    const url = 'https://jsonplaceholder.typicode.com/todos';

    const todos = await fetch(url);
    const response = await todos.json();

    // console.log(thunkAPI)

    return response;
  }
);

export const initialCountState: CountState = countAdapter.getInitialState({
  loadingStatus: 'not loaded',
  error: null,
});

export const countSlice = createSlice({
  name: COUNT_FEATURE_KEY,
  initialState: initialCountState,
  reducers: {
    add: countAdapter.addOne,
    remove: countAdapter.removeOne,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCount.pending, (state: CountState) => {
        state.loadingStatus = 'loading';
      })
      .addCase(
        fetchCount.fulfilled,
        (state: CountState, action: PayloadAction<CountEntity[]>) => {
          countAdapter.setAll(state, action.payload);
          state.loadingStatus = 'loaded';
        }
      )
      .addCase(fetchCount.rejected, (state: CountState, action) => {
        state.loadingStatus = 'error';
        state.error = action.error.message as string;
      });
  },
});

export const countReducer = countSlice.reducer;

/*
 * import React, { useEffect } from 'react';
 * import { useDispatch } from 'react-redux';
 *
 * const dispatch = useDispatch();
 * useEffect(() => {
 *   dispatch(countActions.add({ id: 1 }))
 * }, [dispatch]);
 */
export const countActions = countSlice.actions;

/*
 * import { useSelector } from 'react-redux';
 *
 * const entities = useSelector(selectAllCount);
 */
const { selectAll, selectEntities } = countAdapter.getSelectors();

export const getCountState = (
  rootState: Record<string, CountState>
): CountState => rootState[COUNT_FEATURE_KEY];

export const selectAllCount = createSelector(getCountState, selectAll);

export const selectCountEntities = createSelector(
  getCountState,
  selectEntities
);
