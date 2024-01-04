import {makeAutoObservable, observable, action} from 'mobx';
import {RootStore} from './RootStore';

import tempZoneData from '../components/farmMap/tempZoneData';

class FarmMapQuickStore {
  isLoading: boolean = false;
  isEditMode: boolean = true;
  rootStore: RootStore;
  testText: string;
  tempZoneData: typeof tempZoneData;

  constructor(rootStore: RootStore) {
    makeAutoObservable(this, {
      isLoading: observable,
      isEditMode: observable,
      testText: observable,
      setEditMode: action,
      rootStore: false,
      tempZoneData: observable,
    });
    this.rootStore = rootStore;
    this.testText = 'test test 45 28';
    this.tempZoneData = tempZoneData;
  }

  setEditMode = async () => {
    this.isEditMode = !this.isEditMode;
    console.log('store', this.isEditMode);
  };
}

export default FarmMapQuickStore;
