import {StyleSheet, Text, View, Modal, TouchableOpacity} from 'react-native';
import React from 'react';
import appColors from '../../styles/colors';
import {ZoneProps, ZoneIconProps} from '../../types/zoneTypes';
import QuickViewModalOptionCard from '../cards/modalCards/QuickViewModalOptionCard';

interface MapQuickViewModalProps {
  showModal: boolean;
  setShowModal: Function;
  modalItem: ZoneProps;
}

const MapQuickViewModal: React.FC<MapQuickViewModalProps> = ({
  showModal = false,
  setShowModal,
  modalItem,
}) => {
  const zoneIcons: ZoneIconProps = modalItem?.zoneData?.zoneIcons;
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
            {zoneIcons?.lateChoreNumber && zoneIcons?.lateChoreNumber > 0 && (
              // <TouchableOpacity>
              //   <Text> {zoneIcons?.dayChoreNumber}</Text>
              // </TouchableOpacity>
              <QuickViewModalOptionCard
                cardType={'lateChoreNumber'}
                itemNumber={zoneIcons?.lateChoreNumber}
              />
            )}
            {zoneIcons?.dayChoreNumber && zoneIcons?.dayChoreNumber > 0 && (
              // <TouchableOpacity>
              //   <Text> {zoneIcons?.dayChoreNumber}</Text>
              // </TouchableOpacity>
              <QuickViewModalOptionCard
                cardType={'dayChoreNumber'}
                itemNumber={zoneIcons?.dayChoreNumber}
              />
            )}
            {zoneIcons?.lateHarvestNumber &&
              zoneIcons?.lateHarvestNumber > 0 && (
                // <View>
                //   <Text> {zoneIcons?.lateHarvestNumber}</Text>
                // </View>
                <QuickViewModalOptionCard
                  cardType={'lateHarvestNumber'}
                  itemNumber={zoneIcons?.lateHarvestNumber}
                />
              )}
            {zoneIcons?.dayHarvestNumber && zoneIcons?.dayHarvestNumber > 0 && (
              // <TouchableOpacity>
              //   <Text> {zoneIcons?.dayHarvestNumber}</Text>
              // </TouchableOpacity>
              <QuickViewModalOptionCard
                cardType={'dayHarvestNumber'}
                itemNumber={zoneIcons?.dayHarvestNumber}
              />
            )}
            {/* <TouchableOpacity>
              <Text> {zoneIcons?.emptyrowNumber}</Text>
              <Text>See Row</Text>
            </TouchableOpacity> */}
            <QuickViewModalOptionCard
              cardType={'emptyrowNumber'}
              itemNumber={zoneIcons?.emptyrowNumber}
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
