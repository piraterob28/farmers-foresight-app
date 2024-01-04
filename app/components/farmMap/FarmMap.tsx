import React from 'react';
import {View, StyleSheet, Modal, Text, SafeAreaView} from 'react-native';
import appColors from '../../styles/colors';
import FarmMapItem from './FarmMapItem';
import MapBackgroundGrid from '../grids/mapBackgroundGrid';
import FarmMapQuickStore from '../../stores/FarmMapQuickStore';
import {observer} from 'mobx-react';

interface FarmMapProps {
  farmZones: object[];
  store: FarmMapQuickStore;
}

interface ZoneProps {
  length: number;
  width: number;
  mapX: number;
  mapY: number;
  zoneType: 'inside' | 'outside';
  onUpdatePanResponder: any;
}

const FarmMap: React.FC<FarmMapProps> = observer(({farmZones, store}) => {
  const onUpdatePanResponder = ({panRef, setPanState, currentZone}) => {
    let isInterSecting: boolean = false;
    store.tempZoneData.forEach((zone: ZoneProps) => {
      const zoneValues = Object.values(zone)[0];
      const currentZoneValues: ZoneProps = Object.values(currentZone)[0];
      if (Object.keys(zone)[0] !== Object.keys(currentZone)[0]) {
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
      <Modal
        animationType="slide"
        transparent={false}
        visible={true}
        onRequestClose={() => {
          console.log('Hey closed');
        }}>
        <View>
          <Text>Hey</Text>
        </View>
      </Modal>

      <MapBackgroundGrid isEditMode={store.isEditMode} />
      {farmZones.map((farmZone: object, index: number) => {
        return (
          <FarmMapItem
            key={index}
            mapItem={farmZone}
            onUpdatePanResponder={onUpdatePanResponder}
            onCompletePanResponder={store.updateZoneData}
            isEditMode={store.isEditMode}
          />
        );
      })}
    </View>
  );
});
const styles = StyleSheet.create({
  container: {
    flex: 1,
    opacity: 1,
  },
});

export default FarmMap;
