import FarmMapQuickStore from './FarmMapQuickStore';
import ZoneStore from './ZoneStore';

export class RootStore {
  farmMapQuickStore: FarmMapQuickStore;
  zoneStore: ZoneStore;

  constructor() {
    this.farmMapQuickStore = new FarmMapQuickStore(this);
    this.zoneStore = new ZoneStore(this);
  }
}

export const store = new RootStore();
