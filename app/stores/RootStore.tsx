import {makeAutoObservable, observable, action} from 'mobx';

import FarmMapQuickStore from './FarmMapQuickStore';
import ZoneStore from './ZoneStore';

export class RootStore {
  farmMapQuickStore: FarmMapQuickStore;
  zoneStore: ZoneStore;

  constructor() {
    makeAutoObservable(this, {
      farmMapQuickStore: observable,
      zoneStore: observable,
    });
    this.farmMapQuickStore = new FarmMapQuickStore(this);
    this.zoneStore = new ZoneStore(this);
  }
}

export const store = new RootStore();
