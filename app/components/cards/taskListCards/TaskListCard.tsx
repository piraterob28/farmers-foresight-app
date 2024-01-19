import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {observer} from 'mobx-react';
import appColors from '../../../styles/colors';
import {ChoreData, DailyChore} from '../../../types/choreTypes';
import Weeding from '../../../assets/icons/weeding.svg';
import Fertilize from '../../../assets/icons/fertilize.svg';
import ArrowRight from '../../../assets/icons/arrow-right.svg';
import HourGlass from '../../../assets/icons/hourglass.svg';

interface TaskListCardProps {
  task: DailyChore;
  navigation: any;
}

const titleIcons = (iconStyle: string | undefined) => {
  if (iconStyle === 'weeding') {
    return <Weeding />;
  } else if (iconStyle === 'fertilize') {
    return <Fertilize />;
  }
};

const TaskListCard: React.FC<TaskListCardProps> = observer(
  ({task, navigation}) => {
    return (
      <TouchableOpacity
        style={styles.taskListCardContainer}
        onPress={() => {
          navigation.navigate('TaskView', {
            taskId: task.id,
          });
        }}>
        <View style={styles.taskListInfoContainer}>
          <View style={styles.cardTitleContainer}>
            {titleIcons(task?.choreData?.choreType?.choreType)}
            <Text style={styles.cardTitleText}>
              {task?.choreData?.choreType?.choreType}
            </Text>
            {}
            <Text />
          </View>
          <View style={styles.cardBodyContainer}>
            <View style={styles.cardBodyZoneInfoContainer}>
              <Text style={styles.zoneInfo}>
                Zone {task?.choreData?.zoneNumber} :{' '}
              </Text>
              <Text style={styles.zoneInfo}>
                Row: {task?.choreData?.rowNumber}
              </Text>
            </View>
            <View>
              <Text style={styles.choreTypeText}>
                {task?.choreData?.choreType?.name}
              </Text>
            </View>
          </View>
          <View style={styles.cardFooterContainer}>
            <HourGlass />
            <Text style={styles.cardFooterTimeText}>
              {task?.choreData?.choreType?.averageChoreTime
                ? task?.choreData?.choreType?.averageChoreTime
                : ' No Record'}
            </Text>
            {!!task?.choreData?.choreType?.averageChoreTime && (
              <Text style={styles.averageText}>Average On Record</Text>
            )}
          </View>
        </View>
        <ArrowRight />
      </TouchableOpacity>
    );
  },
);

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
    paddingVertical: 5,
  },
  cardTitleText: {
    fontSize: 26,
    color: appColors.darkGreen,
    fontWeight: '700',
    textTransform: 'capitalize',
    marginLeft: 10,
  },
  cardBodyContainer: {},
  cardBodyZoneInfoContainer: {
    flexDirection: 'row',
  },
  zoneInfo: {
    fontSize: 16,
    paddingBottom: 3,
  },
  choreTypeText: {
    fontSize: 16,
    paddingBottom: 3,
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
  averageText: {
    fontSize: 11,
    marginLeft: 10,
  },
});
