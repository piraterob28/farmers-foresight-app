import {makeAutoObservable, observable, action} from 'mobx';
import {RootStore} from './RootStore';
import {ZoneProps, ZoneDataProps} from '../types/zoneTypes';
import tempZoneData from '../components/farmMap/tempZoneData';

class ZoneStore {
  isLoading: boolean = false;
  isEditMode: boolean = false;
  rootStore: RootStore;
  testText: string;
  zoneData: ZoneProps[];

  constructor(rootStore: RootStore) {
    makeAutoObservable(this, {
      isLoading: observable,
      isEditMode: observable,
      testText: observable,
      setEditMode: action,
      rootStore: false,
      zoneData: observable,
    });
    this.rootStore = rootStore;
    this.testText =
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do\
    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim\
    ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut\
    aliquip ex ea commodo consequat. Duis aute irure dolor in\
    reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla\
    pariatur. Excepteur sint occaecat cupidatat non proident, sunt in\
    culpa qui officia deserunt mollit anim id est laborum.';
    this.zoneData;
  }

  setEditMode = () => {
    this.isEditMode = !this.isEditMode;
  };
}

export default ZoneStore;
