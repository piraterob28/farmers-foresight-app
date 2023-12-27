import {StyleSheet, Text, View} from 'react-native';
import FarmMapQuickStore from '../stores/FarmMapQuickStore';
import {observer} from 'mobx-react';
import React from 'react';

interface FarmMapQuickViewProps {
  navigation: object;
  route: object;
  store: FarmMapQuickStore;
}

const FarmMapQuickView: React.FC<FarmMapQuickViewProps> = observer(
  ({navigation, route, store}) => {
    const text: string = store.testText;
    return (
      <View>
        <Text>FarmMapQuickView {text} </Text>
      </View>
    );
  },
);

export default FarmMapQuickView;

const styles = StyleSheet.create({});
