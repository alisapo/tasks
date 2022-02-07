import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface TagState {
  id: number;
  name: string;
}

export interface StatusesState {
  rgb: string;
  id: number;
  name: string;
}

export interface LifetimeItemsState {
  id: number;
  userName: string;
  lifetimeType: number;
  createdAt: string;
  comment: string | null;
  fieldName: string | null;
  oldFieldValue: string | null;
  newFieldValue: string | null;
}

export interface ExecutorsState {
  id: number;
  name: string;
}

export interface TaskPanelState {
  statuses: StatusesState[] | null;
  executors: ExecutorsState[] | null;
  task: {
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
    lifetimeItems: LifetimeItemsState[];
  } | null;
  statusTask: 'idle' | 'loading' | 'failed';
  statusStatuses: 'idle' | 'loading' | 'failed';
  statusExecutors: 'idle' | 'loading' | 'failed';
}

const initialState: TaskPanelState = {
  statuses: null,
  executors: null,
  task: null,
  statusTask: 'idle',
  statusStatuses: 'idle',
  statusExecutors: 'idle',
};

export const createTask = createAsyncThunk(
  'tasks/createTask',
  async (data: any) => {
    console.log('send data', data);
    return fetch('http://intravision-task.test01.intravision.ru/api/505b90de-a32f-48cf-a6c6-56d8e65b9bd5/Tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)})
      .then((res: any) => { return res.json() })
      .catch((err: {message: string}) => console.error(err));
  }
);

export const getTask = createAsyncThunk(
  'task/getTask',
  async (id: number) => {
    return fetch(`http://intravision-task.test01.intravision.ru/api/505b90de-a32f-48cf-a6c6-56d8e65b9bd5/Tasks/${id}`)
      .then((res: any) => { return res.json() })
      .catch((err: {message: string}) => console.error(err));
  }
);

export const getStatuses = createAsyncThunk(
  'statuses/getStatuses',
  async () => {
    return fetch('http://intravision-task.test01.intravision.ru/api/505b90de-a32f-48cf-a6c6-56d8e65b9bd5/Statuses')
      .then((res: any) => { return res.json() })
      .catch((err: {message: string}) => console.error(err));
  }
);

export const getUsers = createAsyncThunk(
  'users/getUsers',
  async () => {
    return fetch('http://intravision-task.test01.intravision.ru/api/505b90de-a32f-48cf-a6c6-56d8e65b9bd5/Users')
      .then((res: any) => { return res.json() })
      .catch((err: {message: string}) => console.error(err));
  }
);

export const editTask = createAsyncThunk(
  'task/putTask',
  async (data: any) => {
    return fetch('http://intravision-task.test01.intravision.ru/api/505b90de-a32f-48cf-a6c6-56d8e65b9bd5/Tasks', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((res: any) => { return res.json() })
      .catch((err: {message: string}) => console.error(err));
  }
);

export const taskPanelSlice = createSlice({
  name: 'taskPanel',
  initialState,
  reducers: {
    closeTask: (state) => {
      state.task = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTask.pending, (state) => {
        state.statusTask = 'loading';
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.statusTask = 'idle';
        state.task = action.meta.arg;
      })
      .addCase(createTask.rejected, (state) => {
        state.statusTask = 'failed';
      })
      .addCase(getTask.pending, (state) => {
        state.statusTask = 'loading';
      })
      .addCase(getTask.fulfilled, (state, action) => {
        state.statusTask = 'idle';
        state.task = action.payload;
      })
      .addCase(getTask.rejected, (state) => {
        state.statusTask = 'failed';
      })
      .addCase(getStatuses.pending, (state) => {
        state.statusStatuses = 'loading';
      })
      .addCase(getStatuses.fulfilled, (state, action) => {
        state.statusStatuses = 'idle';
        state.statuses = action.payload;
      })
      .addCase(getStatuses.rejected, (state) => {
        state.statusStatuses = 'failed';
      })
      .addCase(getUsers.pending, (state) => {
        state.statusExecutors = 'loading';
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.statusExecutors = 'idle';
        state.executors = action.payload;
      })
      .addCase(getUsers.rejected, (state) => {
        state.statusExecutors = 'failed';
      })
      .addCase(editTask.pending, (state) => {
        state.statusTask = 'loading';
      })
      .addCase(editTask.rejected, (state) => {
        state.statusTask = 'failed';
      })
      .addCase(editTask.fulfilled, (state, action) => {
        state.statusTask = 'idle';
        state.task?.lifetimeItems.push(action.meta.arg);
      });
  },
});

export const { closeTask } = taskPanelSlice.actions;

export const task = (state: RootState) => state.taskPanel.task;
export const statuses = (state: RootState) => state.taskPanel.statuses;
export const executors = (state: RootState) => state.taskPanel.executors;

export default taskPanelSlice.reducer;
