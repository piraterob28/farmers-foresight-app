import React, {useState} from 'react';
import {View, StyleSheet, Modal, Text, Touchable} from 'react-native';
import appColors from '../../styles/colors';
import FarmMapItem from './FarmMapItem';
import MapBackgroundGrid from '../grids/mapBackgroundGrid';
import FarmMapQuickStore from '../../stores/FarmMapQuickStore';
import {observer} from 'mobx-react';
import {TouchableOpacity} from 'react-native-gesture-handler';

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
  const [showModal, setShowModal] = useState(true);
  const [modalItem, setModalItem] = useState({});
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

  const onMapItemPress = (mapItem: Object) => {
    console.log('mapItem', mapItem);
    setModalItem(mapItem);
    setShowModal(true);
  };
  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={showModal}
        onRequestClose={() => {
          console.log('Hey closed');
        }}>
        <View style={styles.modalContainerStyles}>
          <TouchableOpacity
            onPress={() => setShowModal(false)}
            style={styles.modalBackground}
          />
          <View style={styles.modalInfoCardcontainer}>
            <Text>{Object.keys(modalItem)[0]}</Text>
            {/* start here plumbing through the aone info to the modal*/}
          </View>
        </View>
      </Modal>
      <MapBackgroundGrid isEditMode={store.isEditMode} />
      {farmZones.map((farmZone: object, index: number) => {
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
  modalContainerStyles: {
    height: '100%',
    justifyContent: 'flex-end',
    paddingBottom: 90,
  },
  modalBackground: {
    height: '100%',
    width: '100%',
    backgroundColor: 'transparent',
  },
  modalInfoCardcontainer: {
    backgroundColor: appColors.fadedGreen,
    width: '100%',
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  container: {
    flex: 1,
    opacity: 1,
  },
});

export default FarmMap;
