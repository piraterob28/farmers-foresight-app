import FarmMapQuickStore from './FarmMapQuickStore';

export class RootStore {
  farmMapQuickStore: FarmMapQuickStore;

  constructor() {
    this.farmMapQuickStore = new FarmMapQuickStore(this);
  }
}

export const store = new RootStore();
