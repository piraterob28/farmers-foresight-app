import {makeAutoObservable, observable, action, runInAction} from 'mobx';
import {RootStore} from './RootStore';
import {client} from '../util/apolloClient';
import {getChoreListOneZone} from '../graphql/chores';

class FarmListStore {
  isLoading: boolean = false;
  rootStore: RootStore;
  pageTitle: string;
  pageTitleIcon: 'task' | 'task-late' | 'harvest' | 'harvest-late' | 'row';

  constructor(rootStore: RootStore) {
    makeAutoObservable(this, {
      isLoading: observable,
      pageTitle: observable,
      pageTitleIcon: observable,
      rootStore: false,
    });
    this.rootStore = rootStore;
    this.pageTitle = 'Farm List View';
    this.pageTitleIcon = 'task';
  }
}

export default FarmListStore;
