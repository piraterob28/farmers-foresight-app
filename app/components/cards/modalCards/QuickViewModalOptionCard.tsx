import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import CropsGreen from '../../../assets/icons/crops-green.svg';
import CropsRed from '../../../assets/icons/crops-red.svg';
import ChecksGreen from '../../../assets/icons/checks-green.svg';
import ChecksRed from '../../../assets/icons/checks-red.svg';
import EmptyRows from '../../../assets/icons/rows.svg';
import ArrowRight from '../../../assets/icons/arrow-right.svg';
import appColors from '../../../styles/colors';
import {ZoneProps} from '../../../types/zoneTypes';

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
  modalItem: ZoneProps;
}

const QuickViewModalOptionCard: React.FC<QuickViewModalOptionCardProps> = ({
  cardType,
  itemNumber,
  navigation,
  setShowModal,
  modalItem,
}) => {
  const cardRenderInfo: Object = {
    lateChoreNumber: {
      image: <ChecksRed />,
      text: 'Late Chores:',
      nav_route: 'TaskListView',
      params: {
        taskType: 'late chores',
        taskScope: 'zone',
        scopeId: modalItem?.id,
      },
    },
    dayChoreNumber: {
      image: <ChecksGreen />,
      text: "Day's Chores:",
      nav_route: 'TaskListView',
      params: {
        taskType: 'day chores',
        taskScope: 'zone',
        scopeId: modalItem?.id,
      },
    },
    lateHarvestNumber: {
      image: <CropsRed />,
      text: 'Late Harvests:',
      nav_route: 'TaskListView',
      params: {
        taskType: 'late harvest',
        taskScope: 'zone',
        scopeId: modalItem?.id,
      },
    },
    dayHarvestNumber: {
      image: <CropsGreen />,
      text: "Day's Harvests:",
      nav_route: 'TaskListView',
      params: {
        taskType: 'day harvest',
        taskScope: 'zone',
        scopeId: modalItem?.id,
      },
    },
    emptyRowNumber: {
      image: <EmptyRows />,
      text: itemNumber > 0 ? 'Empty Rows:' : 'Edit Rows',
      nav_route: 'ZoneView',
    },
  };

  return (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={() => {
        navigation.navigate(
          cardRenderInfo[cardType]?.nav_route,
          cardRenderInfo[cardType]?.params,
        );
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
