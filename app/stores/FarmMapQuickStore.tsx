import {makeAutoObservable, observable, action} from 'mobx';
import {RootStore} from './RootStore';
import {ZoneProps, ZoneDataProps} from '../types/zoneTypes';
import tempZoneData from '../components/farmMap/tempZoneData';

class FarmMapQuickStore {
  isLoading: boolean = false;
  isEditMode: boolean = false;
  rootStore: RootStore;
  testText: string;
  farmZoneData: ZoneProps[];

  constructor(rootStore: RootStore) {
    makeAutoObservable(this, {
      isLoading: observable,
      isEditMode: observable,
      testText: observable,
      setEditMode: action,
      updateZoneData: action,
      rootStore: false,
      farmZoneData: observable,
    });
    this.rootStore = rootStore;
    this.testText = 'test test 45 28';
    this.farmZoneData = tempZoneData;
  }

  setEditMode = () => {
    this.isEditMode = !this.isEditMode;
  };

  updateZoneData = (updatedZone: ZoneDataProps, zoneKey: number) => {
    this.farmZoneData = this.farmZoneData.map(zone => {
      if (zone.zoneNumber === zoneKey) {
        zone.zoneData = updatedZone;
      }
      return zone;
    });
  };
}

export default FarmMapQuickStore;
