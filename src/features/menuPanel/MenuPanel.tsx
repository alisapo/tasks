import logo from '../../images/logo.png';
import { ReactComponent as Database } from '../../images/database.svg';
import { ReactComponent as Zayavki } from '../../images/zayavki.svg';
import { ReactComponent as Colleagues } from '../../images/colleagues.svg';
import { ReactComponent as Clients } from '../../images/clients.svg';
import { ReactComponent as Actives } from '../../images/actives.svg';
import { ReactComponent as Settings } from '../../images/settings.svg';
import styles from './MenuPanel.module.css';

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

export function MenuPanel() {
  return (
    <aside className={styles.aside}>
      <div>
        <img src={logo} alt='logo' />
      </div>
      <ul>
        <li>
          <Database />
          <p>База знаний</p>
        </li>
        <li>
          <Zayavki />
          <p>Заявки</p>
        </li>
        <li>
          <Colleagues />
          <p>Сотрудники</p>
        </li>
        <li>
          <Clients />
          <p>Клиенты</p>
        </li>
        <li>
          <Actives />
          <p>Активы</p>
        </li>
        <li>
          <Settings />
          <p>Настройки</p>
        </li>
      </ul>
    </aside>
  );
}
