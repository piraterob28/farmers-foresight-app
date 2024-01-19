import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {observer} from 'mobx-react';
import appColors from '../../../styles/colors';
import {ChoreData} from '../../../types/choreTypes';
import Weeding from '../../../assets/icons/weeding.svg';
import ArrowRight from '../../../assets/icons/arrow-right.svg';
import HourGlass from '../../../assets/icons/hourglass.svg';

interface TaskListCardProps {
  task: ChoreData;
}

const titleIcons = (iconStyle: string | undefined) => {
  if (iconStyle === 'weeding') {
    return <Weeding />;
  }
};

const TaskListCard: React.FC<TaskListCardProps> = observer(({task}) => {
  return (
    <View style={styles.taskListCardContainer}>
      <View style={styles.taskListInfoContainer}>
        <View style={styles.cardTitleContainer}>
          {titleIcons(task?.choreType?.choreType)}
          <Text style={styles.cardTitleText}>{task?.choreType?.choreType}</Text>
        </View>
        <View style={styles.cardBodyContainer}>
          <View style={styles.cardBodyZoneInfoContainer}>
            <Text>Zone:</Text>
            <Text>Row:</Text>
          </View>
          <View>
            <Text>Plant Info</Text>
          </View>
        </View>
        <View style={styles.cardFooterContainer}>
          <HourGlass />
          <Text style={styles.cardFooterTimeText}>
            {task.choreType?.averageChoreTime
              ? task.choreType?.averageChoreTime
              : ' No'}
          </Text>
        </View>
      </View>
      <ArrowRight />
    </View>
  );
});

export default TaskListCard;

const styles = StyleSheet.create({
  taskListCardContainer: {
    backgroundColor: appColors.offWhite,
    // width: '100%',
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderColor: appColors.darkGreen,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    alignItems: 'center',
  },
  taskListInfoContainer: {
    width: '100%',
  },
  cardTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardTitleText: {
    fontSize: 24,
    color: appColors.darkGreen,
    fontWeight: '700',
    textTransform: 'capitalize',
    marginLeft: 10,
  },
  cardBodyContainer: {},
  cardBodyZoneInfoContainer: {
    flexDirection: 'row',
  },
  cardFooterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  cardFooterTimeText: {
    fontSize: 14,
    marginLeft: 10,
    fontWeight: '700',
  },
});
