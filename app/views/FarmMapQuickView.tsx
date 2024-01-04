import {StyleSheet, Text, View} from 'react-native';
import FarmMapQuickStore from '../stores/FarmMapQuickStore';
import {observer} from 'mobx-react';
import React from 'react';

import FarmMap from '../components/farmMap/FarmMap';
import appColors from '../styles/colors';

interface FarmMapQuickViewProps {
  navigation: object;
  route: object;
  store: FarmMapQuickStore;
}

const FarmMapQuickView: React.FC<FarmMapQuickViewProps> = observer(
  ({navigation, route, store}) => {
    return (
      <View style={{}}>
        <FarmMap farmZones={store.tempZoneData} store={store} />
      </View>
    );
  },
);

export default FarmMapQuickView;

const styles = StyleSheet.create({
  FarmMapQuickViewContainer: {},
});
