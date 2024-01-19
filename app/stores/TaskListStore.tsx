import {makeAutoObservable, observable, action, runInAction} from 'mobx';
import {RootStore} from './RootStore';
import {client} from '../util/apolloClient';
import {getChoreListOneZone} from '../graphql/chores';

class TaskListStore {
  isLoading: boolean = false;
  rootStore: RootStore;
  choreData: object[] = observable.array();
  pageTitle: string;
  pageTitleIcon: 'task' | 'task-late' | 'harvest' | 'harvest-late' | 'row';

  constructor(rootStore: RootStore) {
    makeAutoObservable(this, {
      isLoading: observable,
      choreData: observable,
      pageTitle: observable,
      pageTitleIcon: observable,
      getTaskList: action,
      setPageTitle: action,
      rootStore: false,
    });
    this.rootStore = rootStore;
    this.pageTitle = "Day's Tasks";
    this.pageTitleIcon = 'task';
  }

  setPageTitle = (
    title: string,
    icon: 'task' | 'task-late' | 'harvest' | 'harvest-late' | 'row',
  ) => {
    this.pageTitle = title;
    this.pageTitleIcon = icon;
  };

  getTaskList = async (
    taskType: string,
    taskScope: string,
    scopeId: number,
  ) => {
    this.isLoading = true;
    this.choreData = [];
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

        runInAction(() => {
          this.choreData = result;
        });
      } catch (err) {
        console.log('getZonesQuickView failed', err);
      }
      this.isLoading = false;
    }
  };
}

export default TaskListStore;
