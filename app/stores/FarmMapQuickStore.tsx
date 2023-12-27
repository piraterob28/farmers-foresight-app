import {makeAutoObservable, observable, action} from 'mobx';
import {RootStore} from './RootStore';

class FarmMapQuickStore {
  isLoading: boolean = false;
  rootStore: RootStore;
  testText: string;

  constructor(rootStore: RootStore) {
    makeAutoObservable(this, {
      isLoading: observable,
      testText: observable,
      loadSellers: action,
      rootStore: false,
    });
    this.rootStore = rootStore;
    this.testText = 'test test 28';
    this.loadSellers();
  }

  loadSellers = async () => {
    this.isLoading = true;
  };
}

export default FarmMapQuickStore;
