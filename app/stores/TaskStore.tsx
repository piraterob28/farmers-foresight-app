import {makeAutoObservable, observable, action, runInAction} from 'mobx';
import {RootStore} from './RootStore';
import {client} from '../util/apolloClient';

class TaskStore {
  isLoading: boolean = false;
  rootStore: RootStore;
  pageTitle: string;
  pageTitleIcon: 'weeding' | 'fertilize';

  constructor(rootStore: RootStore) {
    makeAutoObservable(this, {
      isLoading: observable,
      pageTitle: observable,
      pageTitleIcon: observable,
      setPageTitle: action,
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
}

export default TaskStore;
