import React from 'react';

import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { createTask, editTask, task } from './taskPanelSlice';
import styles from './TaskPanel.module.css';

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

export interface StatusState {
  rgb: string;
  id:number;
  name: string;
}

export interface ExecutorState {
  id: number;
  name: string;
}

export interface LifetimeItemsState {
  "id": number,
  "userName": string,
  "lifetimeType": number,
  "createdAt": string,
  "comment": string | null,
  "fieldName": string | null,
  "oldFieldValue": string | null,
  "newFieldValue": string | null
}

export function TaskPanel(props: any) {
  const { open, closeModal, allStatuses, allExecutors } = props;

  const selectedTask = useAppSelector(task);
  const dispatch = useAppDispatch();

  const [taskName, setTaskName] = React.useState<string>('');
  const [taskDescription, setTaskDescription] = React.useState<string>('');
  const [taskComment, setTaskComment] = React.useState<string | undefined>('');
  const [taskId, setTaskId] = React.useState<number | null>(null);

  const [taskStatus, setStatus] = React.useState<string | undefined>('');
  const [taskExecutor, setTaskExecutor] = React.useState<string | undefined>('');

  const saveTask = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    if (taskName && taskDescription) {
      dispatch(createTask({
        "name": taskName,
        "description": taskDescription,
        "tags": [103428]
      }))
    }

    if (taskStatus || taskComment || taskExecutor) {
      const currentStatus = allStatuses.filter(
        (status: any) => { return status.name == taskStatus }
      );
      const currentExecutor = allExecutors.filter(
        (executor: any) => { return executor.name == taskExecutor }
      );

      dispatch(editTask({
        "id": selectedTask?.id,
        "statusId": currentStatus[0]?.id,
        "executorId": currentExecutor[0]?.id,
        "comment": taskComment
      }))
    }
  }

  const handleStatus = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStatus(e.target.value);
  }

  const handleExecutor = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskExecutor(e.target.value);
  }

  const handleComment = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskComment(e.target.value);
  }

  const getTime = (data: string) => {
    const year = new Date(data).getFullYear();
    const month = new Date(data).getMonth() + 1;
    const day = new Date(data).getDate();
    const hours = new Date(data).getHours();
    const minutes = new Date(data).getMinutes();

    return `${day}.${month}.${year}, ${hours}:${minutes}`;
  }

  return (
    <Dialog
      onClose={() => closeModal()}
      open={open}
      fullWidth={true}
      maxWidth='md'
      className={styles.dialog}
    >
      {(selectedTask || taskId) ?
        <div className={styles.fullForm}>
          <div className={styles.title}>
            <DialogTitle>№{selectedTask?.id} {selectedTask?.name}</DialogTitle>
          </div>
          <div className={styles.info}>
            <Box component='form' noValidate className={styles.editForm}>
              <p className={styles.formTitle}>Описание</p>
              <p className={styles.text}>{selectedTask?.description}</p>
              <div className={styles.addComment}>
                <p className={styles.formTitle}>Добавление комментариев</p>
                <TextField
                  multiline
                  rows={4}
                  value={taskComment}
                  onChange={handleComment}
                >
                </TextField>
                <button
                  className={styles.saveButton}
                  onClick={(e: React.MouseEvent<HTMLElement>) => saveTask(e)}
                >Сохранить</button>
              </div>
              <div className={styles.comments}>
                {selectedTask?.lifetimeItems ? selectedTask.lifetimeItems.map((item: LifetimeItemsState) => {
                  return item.comment ?
                    <div className={styles.userComment} key={item.id}>
                      <p className={styles.userName}>{item.userName}</p>
                      <p className={styles.createdAt}>
                        {getTime(item.createdAt)} прокомментировал
                      </p>
                      <p className={styles.comment}>{item.comment}</p>
                    </div> : null
                }) : null}
              </div>
            </Box>
            <div>
              <p className={styles.formTitle}>Статус</p>
              {allStatuses ?
                <TextField
                  id="standard-select-currency"
                  select
                  value={taskStatus ? taskStatus : selectedTask?.statusName}
                  onChange={handleStatus}
                  variant="standard"
                >
                  {allStatuses.map((status: StatusState) => (
                    <MenuItem key={status.id} value={status.name}>
                      {status.name}
                    </MenuItem>
                  ))}
                </TextField> : null}
              <p className={styles.formTitle}>Заявитель</p>
              <p className={styles.text}>{selectedTask?.executorGroupName}</p>
              <p className={styles.formTitle}>Создана</p>
              <p className={styles.text}>{selectedTask?.initiatorName}</p>
              <p className={styles.formTitle}>Исполнитель</p>
              {allExecutors ?
                <TextField
                  id="standard-select-currency"
                  select
                  value={taskExecutor ? taskExecutor : selectedTask?.executorName}
                  onChange={handleExecutor}
                  variant="standard"
                >
                  {allExecutors.map((executor: ExecutorState) => (
                    <MenuItem key={executor.id} value={executor.name}>
                      {executor.name}
                    </MenuItem>
                  ))}
                </TextField> : null}
              <p className={styles.formTitle}>Приоритет</p>
              <p className={styles.text}>{selectedTask?.priorityName}</p>
              <p className={styles.formTitle}>Срок</p>
              <p className={styles.text}>
                {selectedTask ? getTime(selectedTask.createdAt) : null}
              </p>
              <p className={styles.formTitle}>Теги</p>
              <div className={styles.tags}>
                {selectedTask?.tags ? selectedTask?.tags.map((tag: TagState) => {
                  return (<p key={tag.id}>{tag.name}</p>)
                }) : null}
              </div>
            </div>
          </div>
        </div>
        : <div className={styles.qqq}>
            <div className={styles.title}>
              <DialogTitle>Новая заявка</DialogTitle>
            </div>
            <Box component='form' noValidate className={styles.newForm}>
              <p className={styles.formTitle}>Название</p>
              <TextField
                className={styles.empty}
                id='outlined-basic'
                variant='outlined'
                value={taskName}
                onInput={(e: React.ChangeEvent<HTMLInputElement>) => setTaskName(e.target.value)}
              />
            <p className={styles.formTitle}>Описание</p>
            <TextField
              className={styles.empty}
              id='outlined-basic'
              variant='outlined'
              multiline
              rows={4}
              value={taskDescription}
              onInput={(e: React.ChangeEvent<HTMLInputElement>) => setTaskDescription(e.target.value)}
            />
            <button
              className={styles.saveButton}
              onClick={(e: React.MouseEvent<HTMLElement>) => saveTask(e)}
            >
              Сохранить
            </button>
          </Box>
        </div>
      }
    </Dialog>
  );
}
