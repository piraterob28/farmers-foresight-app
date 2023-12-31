import React from 'react';
import {View, StyleSheet} from 'react-native';
import appColors from '../../styles/colors';
import FarmMapItem from './FarmMapItem';

interface FarmMapProps {
  farmZones: object[];
}

interface ZoneProps {
  length: number;
  width: number;
  mapX: number;
  mapY: number;
  zoneType: 'inside' | 'outside';
  onUpdatePanResponder: any;
}

const FarmMap: React.FC<FarmMapProps> = ({farmZones}) => {
  const onUpdatePanResponder = ({
    panRef,
    setPanState,
    currentZone,
  }): boolean => {
    let isInterSecting: boolean = false;
    farmZones.forEach((zone: ZoneProps) => {
      const zoneValues = Object.values(zone)[0];
      const currentZoneValues = Object.values(currentZone)[0];
      if (zone !== currentZone) {
        const zoneXExtended = zoneValues.mapX + zoneValues.width * 1.5;
        const zoneYExtended = zoneValues.mapY + zoneValues.length * 1.5;
        const currentZoneXExtended =
          panRef.x.__getValue() + currentZoneValues.width * 1.5;
        const currentZoneYExtended =
          panRef.y.__getValue() + currentZoneValues.length * 1.5;

        {
          /*Check for the cases where the rectangles are definitely not intersecting.
          If none of these cases are true then the rectangles must intersect.
        */
        }
        const currentZoneLeftOfZone: boolean =
          currentZoneXExtended < zoneValues.mapX;
        const currentZoneRightOfZone: boolean =
          panRef.x.__getValue() > zoneXExtended;
        const currentZoneBelowZone: boolean =
          currentZoneYExtended < zoneValues.mapY;
        const currentZoneAboveZone: boolean =
          panRef.y.__getValue() > zoneYExtended;

        if (
          !(
            currentZoneLeftOfZone ||
            currentZoneRightOfZone ||
            currentZoneBelowZone ||
            currentZoneAboveZone
          )
        ) {
          isInterSecting = true;
        }
      }
    });

    setPanState(isInterSecting);
  };
  return (
    <View style={styles.container}>
      {farmZones.map((farmZone: object, index: number) => {
        return (
          <FarmMapItem
            key={index}
            mapItem={farmZone}
            onUpdatePanResponder={onUpdatePanResponder}
          />
        );
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