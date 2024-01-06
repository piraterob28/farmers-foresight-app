import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {observer} from 'mobx-react';

interface FarmTaskListViewProps {
  text: string;
}

const FarmTaskListView: React.FC<FarmTaskListViewProps> = observer(({text}) => {
  return (
    <View>
      <Text>FarmTaskListView {text}</Text>
    </View>
  );
});

export default FarmTaskListView;

const styles = StyleSheet.create({});
