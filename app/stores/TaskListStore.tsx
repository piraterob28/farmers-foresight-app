import {makeAutoObservable, observable, action} from 'mobx';
import {RootStore} from './RootStore';
import {ZoneProps, ZoneDataProps} from '../types/zoneTypes';
import tempZoneData from '../components/farmMap/tempZoneData';

class TaskListStore {
  isLoading: boolean = false;
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    makeAutoObservable(this, {
      isLoading: observable,
      getTaskList: action,
      rootStore: false,
    });
    this.rootStore = rootStore;
  }

  getTaskList = (taskType: string, taskScope: string, scopeId: number) => {
    this.isLoading = true;
    console.log('getTaskList', taskType, taskScope, scopeId);
  };
}

export default TaskListStore;
