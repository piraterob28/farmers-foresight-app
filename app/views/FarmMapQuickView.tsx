import {StyleSheet, Text, View} from 'react-native';
import FarmMapQuickStore from '../stores/FarmMapQuickStore';
import {observer} from 'mobx-react';
import React from 'react';
import FarmMap from '../components/farmMap/FarmMap';

interface FarmMapQuickViewProps {
  navigation: object;
  store: FarmMapQuickStore;
}

const FarmMapQuickView: React.FC<FarmMapQuickViewProps> = observer(
  ({navigation, store}) => {
    return (
      <View style={{}}>
        <FarmMap store={store} navigation={navigation} />
      </View>
    );
  },
);

export default FarmMapQuickView;

const styles = StyleSheet.create({
  FarmMapQuickViewContainer: {},
});
