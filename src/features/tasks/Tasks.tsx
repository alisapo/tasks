import React from 'react';
import styles from './Task.module.css';

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

export interface PrioritiesState {
  rgb: string;
  id: number;
  name: string;
}

export function Tasks(props: any) {
  const { tasks, priorities, closeModal } = props;

  const getPriorityColor = (id: number) => {
    const color = priorities.filter((priority: PrioritiesState) => {
      return priority.id === id
    });

    return color[0].rgb;
  }

  return (
    <div className={styles.field}>
      {tasks ?
        <ul>{tasks.map((task: TasksState) => {
          return (
            <li
             className={styles.tableLine}
              key={task.id}
              onClick={(e: React.MouseEvent<HTMLElement>) => closeModal(task.id)}
            >
              <div
                className={styles.priority}
                style={{ backgroundColor: getPriorityColor(task.priorityId)}}
              >&nbsp;</div>
              <div className={styles.id}>{task.id}</div>
              <div className={styles.description}>{task.description}</div>
              <div
                className={styles.status}
                style={{ backgroundColor: task.statusRgb }}
              >
                {task.statusName}
              </div>
              <div className={styles.executor}>{task.executorName}</div>
            </li>
          )
        })}</ul> : <div className={styles.loading}>Загрузка...</div>
      }
    </div>
  );
}
