import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
// import { uproditApi } from '../features/search/uproditApi';
import searchReducer from '../features/search/searchSlice';

export const store = configureStore({
  reducer: {
    search: searchReducer,
    // counter: counterReducer,
    // [uproditApi.reducerPath]: uproditApi.reducer
  },
 /*  middleware: (getDefaultMiddleware) => 
      getDefaultMiddleware().concat(uproditApi.middleware)
  , */
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
