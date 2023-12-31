import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CropsGreen from '../../assets/icons/crops-green.svg';
import CropsRed from '../../assets/icons/crops-red.svg';
import ChecksGreen from '../../assets/icons/checks-green.svg';
import ChecksRed from '../../assets/icons/checks-red.svg';
import EmptyRows from '../../assets/icons/rows.svg';

interface MapZoneIconsProps {
  zoneIcons: {
    dayChoreNumber: number;
    lateChoreNumber: number;
    dayHarvestNumber: number;
    lateharvestNumber: number;
    emptyrowNumber: number;
  };
}

const MapZoneIcons: React.FC<MapZoneIconsProps> = ({zoneIcons}) => {
  return (
    <View style={styles.zoneIconsContainer}>
      {zoneIcons.emptyrowNumber > 0 && (
        <View style={styles.iconContainer}>
          <EmptyRows height={18} width={18} />
        </View>
      )}
      {zoneIcons.dayChoreNumber > 0 && (
        <View style={styles.iconContainer}>
          <ChecksGreen height={20} width={20} />
        </View>
      )}
      {zoneIcons.lateChoreNumber > 0 && (
        <View style={styles.iconContainer}>
          <ChecksRed height={20} width={20} />
        </View>
      )}
      {zoneIcons.dayHarvestNumber > 0 && (
        <View style={styles.iconContainer}>
          <CropsGreen height={20} width={20} />
        </View>
      )}
      {zoneIcons.lateharvestNumber > 0 && (
        <View style={styles.iconContainer}>
          <CropsRed height={20} width={20} />
        </View>
      )}
    </View>
  );
};

export default MapZoneIcons;

const styles = StyleSheet.create({
  zoneIconsContainer: {
    height: '100%',
    paddingVertical: 10,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  iconContainer: {
    marginVertical: 2,
  },
});
