import React from 'react';
import {View, StyleSheet} from 'react-native';
import appColors from '../../styles/colors';
import FarmMapItem from './FarmMapItem';

interface FarmMapProps {
  farmZones: object[];
}

const FarmMap: React.FC<FarmMapProps> = ({farmZones}) => {
  return (
    <View style={styles.container}>
      {farmZones.map((farmZone: object, index: number) => {
        return <FarmMapItem key={index} mapItem={farmZone} />;
      })}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
    backgroundColor: appColors.white,
  },
});

export default FarmMap;
