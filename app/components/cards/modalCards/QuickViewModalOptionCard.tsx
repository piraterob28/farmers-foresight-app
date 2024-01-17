import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import CropsGreen from '../../../assets/icons/crops-green.svg';
import CropsRed from '../../../assets/icons/crops-red.svg';
import ChecksGreen from '../../../assets/icons/checks-green.svg';
import ChecksRed from '../../../assets/icons/checks-red.svg';
import EmptyRows from '../../../assets/icons/rows.svg';
import ArrowRight from '../../../assets/icons/arrow-right.svg';
import appColors from '../../../styles/colors';

interface QuickViewModalOptionCardProps {
  cardType:
    | 'lateChoreNumber'
    | 'dayChoreNumber'
    | 'lateHarvestNumber'
    | 'dayHarvestNumber'
    | 'emptyRowNumber';
  itemNumber: number;
  navigation: any;
  setShowModal: Function;
}

const QuickViewModalOptionCard: React.FC<QuickViewModalOptionCardProps> = ({
  cardType,
  itemNumber,
  navigation,
  setShowModal,
}) => {
  const cardRenderInfo: Object = {
    lateChoreNumber: {image: <ChecksRed />, text: 'Late Chores:'},
    dayChoreNumber: {image: <ChecksGreen />, text: "Day's Chores:"},
    lateHarvestNumber: {image: <CropsRed />, text: 'Late Harvests:'},
    dayHarvestNumber: {image: <CropsGreen />, text: "Day's Harvests:"},
    emptyRowNumber: {
      image: <EmptyRows />,
      text: itemNumber > 0 ? 'Empty Rows:' : 'Edit Rows',
    },
  };

  return (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={() => {
        navigation.navigate('ZoneView');
        setShowModal(false);
      }}>
      <View>{cardRenderInfo[cardType]?.image}</View>
      <View style={styles.cardInfoContainer}>
        <Text style={styles.cardInfoText}>
          {cardRenderInfo[cardType]?.text} {itemNumber > 0 && itemNumber}
        </Text>
      </View>
      <View>
        <ArrowRight height={20} />
      </View>
    </TouchableOpacity>
  );
};

export default QuickViewModalOptionCard;

const styles = StyleSheet.create({
  cardContainer: {
    width: '100%',
    paddingHorizontal: 30,
    paddingVertical: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardInfoText: {
    color: appColors.darkGreen,
    fontSize: 20,
    fontWeight: '700',
  },
});
