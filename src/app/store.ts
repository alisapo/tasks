import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import tasksReducer from '../features/tasks/tasksSlice';
import taskPanelReducer from '../features/taskPanel/taskPanelSlice';

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    taskPanel: taskPanelReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
