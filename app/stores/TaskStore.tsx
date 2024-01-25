import {makeAutoObservable, observable, action, runInAction} from 'mobx';
import {RootStore} from './RootStore';
import {client} from '../util/apolloClient';
import {DailyChore} from '../types/choreTypes';
import {startTaskTime, endTaskTime} from '../graphql/chores';

class TaskStore {
  isLoading: boolean = false;
  rootStore: RootStore;
  pageTitle: string;
  pageTitleIcon: 'weeding' | 'fertilize';
  task: DailyChore | undefined;

  constructor(rootStore: RootStore) {
    makeAutoObservable(this, {
      isLoading: observable,
      pageTitle: observable,
      pageTitleIcon: observable,
      setPageTitle: action,
      startRecordTaskTime: action,
      rootStore: false,
    });
    this.rootStore = rootStore;
    this.pageTitle = 'Weeding';
    this.pageTitleIcon = 'weeding';
  }

  setPageTitle = (title: string, icon: 'weeding' | 'fertilize') => {
    this.pageTitle = title;
    this.pageTitleIcon = icon;
  };

  startRecordTaskTime = async (taskId: number) => {
    try {
      const startTimeResult = await client.mutate({
        errorPolicy: 'all',
        fetchPolicy: 'no-cache',
        mutation: startTaskTime,
        variables: {
          dailyChoreId: taskId,
        },
      });
      const timeStart = startTimeResult?.data?.startRecordTaskTime;
      console.log('Store startTime', timeStart);

      runInAction(() => {
        this.task.timeStart = timeStart;
      });
    } catch (err) {
      console.log('setZonesQuickView failed', err);
    }
  };

  endRecordTaskTime = async (taskId: number) => {
    try {
      const endTimeResult = await client.mutate({
        errorPolicy: 'all',
        fetchPolicy: 'no-cache',
        mutation: endTaskTime,
        variables: {
          dailyChoreId: taskId,
        },
      });
      const timeEnd = endTimeResult?.data?.endRecordTaskTime;
      console.log('Store startTime', timeEnd);

      runInAction(() => {
        this.task.timeEnd = timeEnd;
      });
    } catch (err) {
      console.log('setZonesQuickView failed', err);
    }
  };
}

export default TaskStore;
