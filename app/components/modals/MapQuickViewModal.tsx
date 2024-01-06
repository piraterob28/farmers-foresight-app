import {StyleSheet, Text, View, Modal, TouchableOpacity} from 'react-native';
import React from 'react';
import appColors from '../../styles/colors';
import {ZoneProps, ZoneIconProps} from '../../types/zoneTypes';
import QuickViewModalOptionCard from '../cards/modalCards/QuickViewModalOptionCard';

interface MapQuickViewModalProps {
  showModal: boolean;
  setShowModal: Function;
  modalItem: ZoneProps;
  navigation: object;
}

const MapQuickViewModal: React.FC<MapQuickViewModalProps> = ({
  showModal = false,
  setShowModal,
  modalItem,
  navigation,
}) => {
  const zoneIcons: ZoneIconProps | undefined = modalItem?.zoneData?.zoneIcons;
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
              Zone {modalItem?.zoneNumber}
            </Text>
          </View>
          <View style={styles.modalInfoOptionsContainer}>
            {zoneIcons?.lateChoreNumber && zoneIcons?.lateChoreNumber > 0 && (
              <QuickViewModalOptionCard
                cardType={'lateChoreNumber'}
                itemNumber={zoneIcons?.lateChoreNumber}
              />
            )}
            {zoneIcons?.dayChoreNumber && zoneIcons?.dayChoreNumber > 0 && (
              <QuickViewModalOptionCard
                cardType={'dayChoreNumber'}
                itemNumber={zoneIcons?.dayChoreNumber}
              />
            )}
            {zoneIcons?.lateHarvestNumber &&
              zoneIcons?.lateHarvestNumber > 0 && (
                <QuickViewModalOptionCard
                  cardType={'lateHarvestNumber'}
                  itemNumber={zoneIcons?.lateHarvestNumber}
                />
              )}
            {zoneIcons?.dayHarvestNumber && zoneIcons?.dayHarvestNumber > 0 && (
              <QuickViewModalOptionCard
                cardType={'dayHarvestNumber'}
                itemNumber={zoneIcons?.dayHarvestNumber}
              />
            )}
            <QuickViewModalOptionCard
              cardType={'emptyrowNumber'}
              itemNumber={zoneIcons?.emptyrowNumber}
              navigation={navigation}
            />
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
  modalInfoCardcontainer: {
    flexDirection: 'column',
    backgroundColor: appColors.white,
  },
  modalInfoTitleContainer: {
    backgroundColor: appColors.darkGreen,
    width: '100%',
    paddingVertical: 8,
  },
  modalInfoTitleText: {
    fontSize: 36,
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
