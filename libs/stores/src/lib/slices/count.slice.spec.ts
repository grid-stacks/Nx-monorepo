import { fetchCount, countAdapter, countReducer } from './count.slice';

describe('count reducer', () => {
  it('should handle initial state', () => {
    const expected = countAdapter.getInitialState({
      loadingStatus: 'not loaded',
      error: null,
    });

    expect(countReducer(undefined, { type: '' })).toEqual(expected);
  });

  it('should handle fetchCounts', () => {
    let state = countReducer(undefined, fetchCount.pending(null, null));

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'loading',
        error: null,
        entities: {},
      })
    );

    state = countReducer(state, fetchCount.fulfilled([{ id: 1 }], null, null));

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'loaded',
        error: null,
        entities: { 1: { id: 1 } },
      })
    );

    state = countReducer(
      state,
      fetchCount.rejected(new Error('Uh oh'), null, null)
    );

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'error',
        error: 'Uh oh',
        entities: { 1: { id: 1 } },
      })
    );
  });
});
