import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

interface FarmMapQuickViewProps {
  text: string;
}

const FarmMapQuickView: React.FC<FarmMapQuickViewProps> = ({text}) => {
  return (
    <View>
      <Text>FarmMapQuickView {text}</Text>
    </View>
  );
};

export default FarmMapQuickView;

const styles = StyleSheet.create({});
