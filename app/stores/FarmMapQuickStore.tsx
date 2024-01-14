import {makeAutoObservable, observable, action, isObservableArray} from 'mobx';
import {RootStore} from './RootStore';
import {ZoneProps} from '../types/zoneTypes';
import {client} from '../util/apolloClient';
import {getZonesQuickView, setZonesQuickView} from '../graphql/zones';

class FarmMapQuickStore {
  isLoading: boolean = false;
  isEditMode: boolean = false;
  rootStore: RootStore;
  farmZoneData: ZoneProps[] = observable.array();
  editedZonesToSave: ZoneProps[] | [] = [];

  constructor(rootStore: RootStore) {
    makeAutoObservable(this, {
      isLoading: observable,
      isEditMode: observable,
      farmZoneData: observable,
      editedZonesToSave: observable,
      setEditMode: action,
      updateZoneData: action,
      rootStore: false,
    });
    this.rootStore = rootStore;

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
      const result = queryResult.data.getZonesQuickView;
      this.farmZoneData = result;
    } catch (err) {
      console.log('get_zones failed', err);
    }
    this.isLoading = false;
  };

  updateZoneData = async (updatedZone: ZoneProps) => {
    console.log('updatedZone', updatedZone);

    // update the local state of zones for collision recognition
    this.farmZoneData = this.farmZoneData.map(zone => {
      if (zone.farmZoneNumber === updatedZone.farmZoneNumber) {
        return updatedZone;
      }
      return zone;
    });

    // Add edited map zones to variable in state until edit mode is ended then update db
    const i = this.editedZonesToSave?.findIndex(
      zone => zone?.id === updatedZone.id,
    );

    if (i > -1) {
      this.editedZonesToSave[i] = updatedZone;
    } else {
      this.editedZonesToSave = [...this.editedZonesToSave, updatedZone];
    }
  };

  saveZoneData = async (zonesToUpdate: ZoneProps[]) => {
    try {
      const queryResult = await client.mutate({
        errorPolicy: 'all',
        fetchPolicy: 'no-cache',
        mutation: setZonesQuickView,
        variables: {
          zonesToUpdate,
        },
      });
      const result = queryResult.data.getZonesQuickView;
      this.farmZoneData = result;
    } catch (err) {
      console.log('get_zones failed', err);
    }
    this.isLoading = false;
  };
}

export default FarmMapQuickStore;
