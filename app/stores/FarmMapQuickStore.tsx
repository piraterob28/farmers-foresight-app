import {makeAutoObservable, observable, action, isObservableArray} from 'mobx';
import {RootStore} from './RootStore';
import {ZoneProps} from '../types/zoneTypes';
import {client} from '../util/apolloClient';
import {getZonesQuickView, setZonesQuickView} from '../graphql/zones';
import {objectWithoutKey} from '../util/objectUtils';

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
      getZoneData: action,
      setEditMode: action,
      updateZoneData: action,
      saveZoneData: action,
      rootStore: false,
    });
    this.rootStore = rootStore;

    this.getZoneData();
  }

  setEditMode = () => {
    if (this.isEditMode && this.editedZonesToSave.length > 0) {
      this.saveZoneData();
    }

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
      console.log('getZonesQuickView failed', err);
    }
    this.isLoading = false;
  };

  updateZoneData = async (updatedZone: ZoneProps) => {
    // update the local state of zones for collision recognition

    this.farmZoneData = this.farmZoneData.map(zone => {
      if (zone.farmZoneNumber === updatedZone.farmZoneNumber) {
        return updatedZone;
      }
      return zone;
    });

    // Add edited map zones to variable in state until edit mode is ended then update db strip out __typename

    const i = this.editedZonesToSave?.findIndex(
      zone => zone?.id === updatedZone.id,
    );

    const scrubbedUpdatedZone1 = objectWithoutKey(updatedZone, '__typename');
    const scrubbedUpdatedZone2 = objectWithoutKey(
      scrubbedUpdatedZone1,
      'zoneIcons',
    );

    if (i > -1) {
      this.editedZonesToSave[i] = scrubbedUpdatedZone2;
    } else {
      this.editedZonesToSave = [
        ...this.editedZonesToSave,
        scrubbedUpdatedZone2,
      ];
    }
  };

  saveZoneData = async () => {
    try {
      const queryResult = await client.mutate({
        errorPolicy: 'all',
        fetchPolicy: 'no-cache',
        mutation: setZonesQuickView,
        variables: {
          zonesToUpdate: this.editedZonesToSave,
        },
      });
    } catch (err) {
      console.log('setZonesQuickView failed', err);
    }
    this.editedZonesToSave = [];
  };
}

export default FarmMapQuickStore;
