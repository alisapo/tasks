import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface TagState {
  id: number;
  name: string;
}

export interface PrioritiesState {
  rgb: string;
  id: number;
  name: string;
}

export interface TasksState {
  tasks: {
    id: number;
    name: string;
    description: string;
    createdAt: string;
    updatedAt: string;
    price: number;
    taskTypeId: number;
    taskTypeName: string;
    statusId: number;
    statusName: string;
    statusRgb: string;
    priorityId: number;
    priorityName: string;
    serviceId: number;
    serviceName: string;
    resolutionDatePlan: string;
    initiatorId: number;
    initiatorName: string;
    executorId: number;
    executorName: string;
    executorGroupId: number;
    executorGroupName: string;
    tags: TagState[];
  } | null;
  priorities: PrioritiesState[] | null;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: any = {
  tasks: null,
  priorities: null,
  status: 'idle',
};


export const getAllTasks = createAsyncThunk(
  'tasks/getTasks',
  async () => {
    return fetch('http://intravision-task.test01.intravision.ru/odata/tasks?tenantguid=505b90de-a32f-48cf-a6c6-56d8e65b9bd5')
      .then((res: any) => { return res.json() })
      .then((res: any) => { return res.value })
      .catch((err: {message: string}) => console.error(err));
  }
);

export const getAllPriorities = createAsyncThunk(
  'priorities/getPriorities',
  async () => {
    return fetch('http://intravision-task.test01.intravision.ru/api/505b90de-a32f-48cf-a6c6-56d8e65b9bd5/Priorities')
      .then((res: any) => { return res.json() })
      .catch((err: { message: string }) => console.error(err));
  }
);

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllTasks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getAllTasks.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(getAllTasks.fulfilled, (state, action) => {
        state.status = 'idle';
        state.tasks = action.payload;
      })
      .addCase(getAllPriorities.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getAllPriorities.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(getAllPriorities.fulfilled, (state, action) => {
        state.status = 'idle';
        state.priorities = action.payload;
      });
  },
});

export const tasks = (state: RootState) => state.tasks.tasks;
export const priorities = (state: RootState) => state.tasks.priorities;

export default tasksSlice.reducer;
