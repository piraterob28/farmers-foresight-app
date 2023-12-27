import {useContext} from 'react';
import {StoreContext} from '../context/store';
import {RootStore} from '../stores/RootStore';

export const useStore = (): RootStore => useContext(StoreContext);
