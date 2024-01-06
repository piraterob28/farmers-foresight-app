import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {observer} from 'mobx-react';

interface ZoneListViewProps {
  text: string;
  navigation: any;
}

const ZoneListView: React.FC<ZoneListViewProps> = observer(
  ({text, navigation}) => {
    return (
      <View>
        <Text>{text}</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Zone View');
          }}>
          <Text>hit me</Text>
        </TouchableOpacity>
      </View>
    );
  },
);

export default ZoneListView;

const styles = StyleSheet.create({});
