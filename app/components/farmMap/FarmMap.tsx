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
      {farmZones.map((farmZone: object) => {
        console.log('farmzone', farmZone);
        return <FarmMapItem mapItem={farmZone} />;
      })}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default FarmMap;
