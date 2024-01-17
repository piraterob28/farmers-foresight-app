import {makeAutoObservable, observable, action} from 'mobx';

import FarmMapQuickStore from './FarmMapQuickStore';
import ZoneStore from './ZoneStore';
import TaskListStore from './TaskListStore';

export class RootStore {
  farmMapQuickStore: FarmMapQuickStore;
  zoneStore: ZoneStore;
  taskListStore: TaskListStore;

  constructor() {
    makeAutoObservable(this, {
      farmMapQuickStore: observable,
      zoneStore: observable,
      taskListStore: observable,
    });
    this.farmMapQuickStore = new FarmMapQuickStore(this);
    this.zoneStore = new ZoneStore(this);
    this.taskListStore = new TaskListStore(this);
  }
}

export const store = new RootStore();
