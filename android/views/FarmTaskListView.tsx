import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

interface FarmTaskListViewProps {
  text: string;
}

const FarmTaskListView: React.FC<FarmTaskListViewProps> = ({text}) => {
  return (
    <View>
      <Text>FarmTaskListView {text}</Text>
    </View>
  );
};

export default FarmTaskListView;

const styles = StyleSheet.create({});
