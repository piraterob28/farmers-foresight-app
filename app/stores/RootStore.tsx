import {makeAutoObservable, observable, action} from 'mobx';

import FarmMapQuickStore from './FarmMapQuickStore';
import ZoneStore from './ZoneStore';
import TaskListStore from './TaskListStore';
import FarmListStore from './FarmListStore';

export class RootStore {
  farmMapQuickStore: FarmMapQuickStore;
  zoneStore: ZoneStore;
  taskListStore: TaskListStore;
  farmListStore: FarmListStore;

  constructor() {
    makeAutoObservable(this, {
      farmMapQuickStore: observable,
      zoneStore: observable,
      taskListStore: observable,
      farmListStore: observable,
    });
    this.farmMapQuickStore = new FarmMapQuickStore(this);
    this.zoneStore = new ZoneStore(this);
    this.taskListStore = new TaskListStore(this);
    this.farmListStore = new FarmListStore(this);
  }
}

export const store = new RootStore();
