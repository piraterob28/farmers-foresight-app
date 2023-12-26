import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

interface ZoneViewProps {
  text: string;
}

const ZoneView: React.FC<ZoneViewProps> = ({text}) => {
  return (
    <View>
      <Text>ZoneView {text}</Text>
    </View>
  );
};

export default ZoneView;

const styles = StyleSheet.create({});
