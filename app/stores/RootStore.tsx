import {makeAutoObservable, observable, action} from 'mobx';

import FarmMapQuickStore from './FarmMapQuickStore';
import ZoneStore from './ZoneStore';
import TaskListStore from './TaskListStore';
import FarmListStore from './FarmListStore';
import TaskStore from './TaskStore';

export class RootStore {
  farmMapQuickStore: FarmMapQuickStore;
  zoneStore: ZoneStore;
  taskListStore: TaskListStore;
  farmListStore: FarmListStore;
  taskStore: TaskStore;

  constructor() {
    makeAutoObservable(this, {
      farmMapQuickStore: observable,
      zoneStore: observable,
      taskListStore: observable,
      farmListStore: observable,
      taskStore: observable,
    });
    this.farmMapQuickStore = new FarmMapQuickStore(this);
    this.zoneStore = new ZoneStore(this);
    this.taskListStore = new TaskListStore(this);
    this.farmListStore = new FarmListStore(this);
    this.taskStore = new TaskStore(this);
  }
}

export const store = new RootStore();
