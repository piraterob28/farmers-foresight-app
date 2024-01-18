import {makeAutoObservable, observable, action} from 'mobx';
import {RootStore} from './RootStore';
import {client} from '../util/apolloClient';
import {getChoreListOneZone} from '../graphql/chores';

class TaskListStore {
  isLoading: boolean = false;
  rootStore: RootStore;
  choreData: object;

  constructor(rootStore: RootStore) {
    makeAutoObservable(this, {
      isLoading: observable,
      choreData: observable,
      getTaskList: action,
      rootStore: false,
    });
    this.rootStore = rootStore;
    this.choreData = {};
  }

  getTaskList = async (
    taskType: string,
    taskScope: string,
    scopeId: number,
  ) => {
    this.isLoading = true;
    if (taskScope === 'zone') {
      try {
        const queryResult = await client.query({
          errorPolicy: 'all',
          fetchPolicy: 'no-cache',
          query: getChoreListOneZone,
          variables: {
            choreCatagory: taskType,
            zoneId: scopeId,
          },
        });
        const result = queryResult.data.getChoreListOneZone;
        console.log('Result *************', result, result.length);
        this.choreData = result;
      } catch (err) {
        console.log('getZonesQuickView failed', err);
      }
      this.isLoading = false;
    }
  };
}

export default TaskListStore;
