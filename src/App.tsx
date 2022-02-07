import React from 'react';
import { Tasks } from './features/tasks/Tasks';
import { TaskPanel } from './features/taskPanel/taskPanel';
import { MenuPanel } from './features/menuPanel/MenuPanel';
import { Header } from './features/header/Header';
import { useAppSelector, useAppDispatch } from './app/hooks';
import {
  getAllTasks,
  tasks,
  getAllPriorities,
  priorities
} from './features/tasks/tasksSlice';
import {
  getStatuses,
  getTask,
  closeTask,
  getUsers,
  statuses,
  executors
} from './features/taskPanel/taskPanelSlice';
import styles from './App.module.css';

export interface TagState {
  id: number;
  name: string;
}

export interface TasksState {
  id: number;
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
}

function App() {
  const [open, setOpenedModal] = React.useState<boolean>(false);

  const allTasks = useAppSelector(tasks);
  const allStatuses = useAppSelector(statuses);
  const allExecutors = useAppSelector(executors);
  const allPriorities = useAppSelector(priorities);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(getAllTasks());
    dispatch(getStatuses());
    dispatch(getUsers());
    dispatch(getAllPriorities());
  }, [])

  const closeModal = (id: number | undefined = undefined) => {
    console.log(id);
    setOpenedModal(prev => !prev);

    if (id) dispatch(getTask(id));
    if (!open) dispatch(closeTask());
  }

  console.log(allTasks);

  return (
    <div className={styles.App}>
      <MenuPanel />
      <section>
        <Header />
        <button
          className={styles.addNew}
          onClick={() => closeModal()}
        >
          Создать заявку
        </button>
        <Tasks
          tasks={allTasks}
          closeModal={closeModal}
          priorities={allPriorities}
        />
        <TaskPanel
          closeModal={closeModal}
          open={open}
          allStatuses={allStatuses}
          allExecutors={allExecutors}
        />
      </section>
      
    </div>
  );
}

export default App;
