import {makeAutoObservable, observable, action} from 'mobx';
import {RootStore} from './RootStore';
import {ZoneProps, ZoneDataProps} from '../types/zoneTypes';
import {client} from '../util/apolloClient';
import tempZoneData from '../components/farmMap/tempZoneData';
import {getZonesQuickView} from '../graphql/zones';

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
    this.farmZoneData = [];

    this.getZoneData();
  }

  setEditMode = () => {
    this.isEditMode = !this.isEditMode;
  };

  getZoneData = async () => {
    this.isLoading = true;
    try {
      const queryResult = await client.query({
        errorPolicy: 'all',
        fetchPolicy: 'no-cache',
        query: getZonesQuickView,
      });
      this.farmZoneData = queryResult.data.getZonesQuickView;
    } catch (err) {
      console.log('get_zones failed', err);
    }
    this.isLoading = false;
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
