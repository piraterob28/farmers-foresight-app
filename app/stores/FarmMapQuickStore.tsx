import {makeAutoObservable, observable, action} from 'mobx';
import {RootStore} from './RootStore';

import tempZoneData from '../components/farmMap/tempZoneData';

class FarmMapQuickStore {
  isLoading: boolean = false;
  rootStore: RootStore;
  testText: string;
  tempZoneData: typeof tempZoneData;

  constructor(rootStore: RootStore) {
    makeAutoObservable(this, {
      isLoading: observable,
      testText: observable,
      loadSellers: action,
      rootStore: false,
      tempZoneData: observable,
    });
    this.rootStore = rootStore;
    this.testText = 'test test 45 28';
    this.tempZoneData = tempZoneData;
  }

  loadSellers = async () => {
    this.isLoading = true;
  };
}

export default FarmMapQuickStore;
