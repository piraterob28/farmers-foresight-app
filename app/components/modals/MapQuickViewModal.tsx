import {StyleSheet, Text, View, Modal, TouchableOpacity} from 'react-native';
import React from 'react';
import appColors from '../../styles/colors';

interface MapQuickViewModalProps {
  showModal: boolean;
  setShowModal: Function;
  modalItem: Object;
}

const MapQuickViewModal: React.FC<MapQuickViewModalProps> = ({
  showModal = false,
  setShowModal,
  modalItem,
}) => {
  const modalItemValues: Object = Object.values(modalItem)[0];
  return (
    <Modal animationType="slide" transparent={true} visible={showModal}>
      <View style={styles.modalContainerStyles}>
        <TouchableOpacity
          onPress={() => setShowModal(false)}
          style={styles.modalBackground}
        />
        <View style={styles.modalInfoCardcontainer}>
          <View style={styles.modalInfoTitleContainer}>
            <Text style={styles.modalInfoTitleText}>
              {Object.keys(modalItem)[0]}
            </Text>
          </View>
          <View style={styles.modalInfoOptionsContainer}>
            {modalItemValues?.zoneIcons?.lateChoreNumber > 0 && (
              <TouchableOpacity>
                <Text> {modalItemValues?.zoneIcons?.dayChoreNumber}</Text>
              </TouchableOpacity>
            )}
            {modalItemValues?.zoneIcons?.dayChoreNumber > 0 && (
              <TouchableOpacity>
                <Text> {modalItemValues?.zoneIcons?.dayChoreNumber}</Text>
              </TouchableOpacity>
            )}
            {modalItemValues?.zoneIcons?.lateHarvestNumber > 0 && (
              <View>
                <Text> {modalItemValues?.zoneIcons?.dayHarvestNumber}</Text>
              </View>
            )}
            {modalItemValues?.zoneIcons?.dayChoreNumber > 0 && (
              <TouchableOpacity>
                <Text> {modalItemValues?.zoneIcons?.dayChoreNumber}</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity>
              <Text> {modalItemValues?.zoneIcons?.dayChoreNumber}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default MapQuickViewModal;

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
  modalInfoCardcontainer: {flexDirection: 'column'},
  modalInfoTitleContainer: {
    backgroundColor: appColors.fadedGreen,
    width: '100%',
    paddingVertical: 8,
  },
  modalInfoTitleText: {
    fontSize: 30,
    fontWeight: '900',
    color: appColors.white,
    textAlign: 'center',
    textTransform: 'capitalize',
  },
  modalInfoOptionsContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
});
