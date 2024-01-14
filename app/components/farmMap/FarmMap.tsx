import React, {useState} from 'react';
import {View, StyleSheet, Modal, Text, TouchableOpacity} from 'react-native';
import appColors from '../../styles/colors';
import FarmMapItem from './FarmMapItem';
import MapBackgroundGrid from '../grids/mapBackgroundGrid';
import FarmMapQuickStore from '../../stores/FarmMapQuickStore';
import MapQuickViewModal from '../modals/MapQuickViewModal';
import {observer} from 'mobx-react';
import {ZoneProps} from '../../types/zoneTypes';

interface FarmMapProps {
  store: FarmMapQuickStore;
  navigation: object;
}

interface onUpdatePanResponderProps {
  (panRef: any, setPanState: Function, currentZone: ZoneProps): void;
}

const FarmMap: React.FC<FarmMapProps> = observer(({store, navigation}) => {
  const [showModal, setShowModal] = useState(false);
  const [modalItem, setModalItem] = useState({});

  const onUpdatePanResponder: onUpdatePanResponderProps = ({
    panRef,
    setPanState,
    currentZone,
  }) => {
    let isInterSecting: boolean = false;
    store.farmZoneData.forEach(zone => {
      const zoneValues = zone;
      const currentZoneValues = currentZone;

      if (zone?.farmZoneNumber !== currentZone?.farmZoneNumber) {
        const zoneXExtended = zoneValues.mapX + (zoneValues.width * 1.5) / 12;
        const zoneYExtended = zoneValues.mapY + (zoneValues.length * 1.5) / 12;

        const currentZoneXExtended =
          panRef.x.__getValue() + (currentZoneValues.width * 1.5) / 12;
        const currentZoneYExtended =
          panRef.y.__getValue() + (currentZoneValues.length * 1.5) / 12;

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

  const onMapItemPress = (mapItem: Object) => {
    setModalItem(mapItem);
    setShowModal(true);
  };
  return (
    <View style={styles.container}>
      <MapQuickViewModal
        showModal={showModal}
        setShowModal={setShowModal}
        modalItem={modalItem}
        navigation={navigation}
      />
      <MapBackgroundGrid isEditMode={store.isEditMode} />
      {store.farmZoneData &&
        store.farmZoneData.map((farmZone, index: number) => {
          return (
            <FarmMapItem
              key={index}
              mapItem={farmZone}
              onItemSelect={onMapItemPress}
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
