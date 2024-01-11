import {makeAutoObservable, observable, action} from 'mobx';
import {RootStore} from './RootStore';
import {ZoneProps, ZoneDataProps} from '../types/zoneTypes';
import {client} from '../util/apolloClient';
import {gql} from '@apollo/client';
import tempZoneData from '../components/farmMap/tempZoneData';

class FarmMapQuickStore {
  isLoading: boolean = false;
  isEditMode: boolean = false;
  rootStore: RootStore;
  testText: string;
  farmZoneData: ZoneProps[];
  zoneData: object[];

  constructor(rootStore: RootStore) {
    makeAutoObservable(this, {
      isLoading: observable,
      isEditMode: observable,
      testText: observable,
      setEditMode: action,
      updateZoneData: action,
      rootStore: false,
      farmZoneData: observable,
      zoneData: observable,
    });
    this.rootStore = rootStore;
    this.testText = 'test test 45 28';
    this.farmZoneData = tempZoneData;
    this.zoneData = [];
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
        query: gql`
          query getZones {
            getZones {
              active
              covered
              farmId
              farmRowNumber
              id
              indoor
              insertedAt
              length
              mapX
              mapY
              updatedAt
              width
            }
          }
        `,
      });
      this.zoneData = queryResult.data;
      console.log('zoneDataStore', this.zoneData);
    } catch (err) {
      console.log('seller missed', err);
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
