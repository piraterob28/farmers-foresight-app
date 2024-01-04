import {makeAutoObservable, observable, action} from 'mobx';
import {RootStore} from './RootStore';

import tempZoneData from '../components/farmMap/tempZoneData';

class FarmMapQuickStore {
  isLoading: boolean = false;
  isEditMode: boolean = false;
  rootStore: RootStore;
  testText: string;
  tempZoneData: Object[];

  constructor(rootStore: RootStore) {
    makeAutoObservable(this, {
      isLoading: observable,
      isEditMode: observable,
      testText: observable,
      setEditMode: action,
      updateZoneData: action,
      rootStore: false,
      tempZoneData: observable,
    });
    this.rootStore = rootStore;
    this.testText = 'test test 45 28';
    this.tempZoneData = tempZoneData;
  }

  setEditMode = () => {
    this.isEditMode = !this.isEditMode;
  };

  updateZoneData = (updatedZone: object, zoneKey: string) => {
    this.tempZoneData = this.tempZoneData.map(zone => {
      let tempZone: Object = {};
      if (Object.keys(zone)[0] === zoneKey) {
        tempZone[zoneKey] = updatedZone;
        return tempZone;
      }
      return zone;
    });
  };
}

export default FarmMapQuickStore;
