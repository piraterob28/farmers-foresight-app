import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Dimensions,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import TaskStore from '../stores/TaskStore';
import {observer} from 'mobx-react';
import appColors from '../styles/colors';
import RecordTimeModal from '../components/modals/RecordTimeModal';
import CompleteTaskModal from '../components/modals/CompleteTaskModal';
import {millisecondsToTime} from '../util/timeUtils';

interface TaskViewProps {
  route: object;
  store: TaskStore;
  navigation: object;
}

const TaskView: React.FC<TaskViewProps> = observer(
  ({route, navigation, store}) => {
    const [descriptionOpen, setDescriptionOpen] = useState(false);
    const [isRecordTimeModalOpes, setIsRecordTimeModalOpen] = useState(false);
    const [isCompleteTaskModalOpen, setIsCompleteTaskModalOpen] =
      useState(false);

    const timeStart = new Date(store?.task.timeStart);
    const timeEnd = new Date(store?.task.timeEnd);

    const timeDiff = timeEnd - timeStart;

    useEffect(() => {
      store.setPageTitle(
        (title = route?.params?.pageTitle),
        (icon = route?.params?.pageTitleIcon),
      );
    }, [route.params, store]);
    return (
      <ScrollView style={styles.taskViewContainer}>
        <RecordTimeModal
          isVisible={isRecordTimeModalOpes}
          onClose={setIsRecordTimeModalOpen}
          onTimeStart={store.startRecordTaskTime}
          onTimeStop={store.endRecordTaskTime}
          onRecordTime={store.setRecordTaskTime}
          onDismissTime={store.dismissRecordTaskTime}
          task={store?.task}
        />
        <CompleteTaskModal
          isVisible={isCompleteTaskModalOpen}
          onClose={setIsCompleteTaskModalOpen}
          onComplete={store.completeTask}
          task={store?.task}
          navigation={navigation}
        />
        <View style={styles.taskTitleContainer}>
          <Text style={styles.titleText}>
            Zone {store?.task?.choreData?.zoneNumber} : Row{' '}
            {store?.task?.choreData?.rowNumber}
          </Text>
          <Text style={styles.taskNameText}>
            {store?.task?.choreData?.choreType?.name}
          </Text>
        </View>
        <View style={styles.taskToolContainer}>
          <Text style={styles.taskToolTitleText}>Tools:</Text>
          {!!store?.task?.choreData?.choreType?.tools?.length &&
          store?.task?.choreData?.choreType?.tools?.length > 0 ? (
            store?.task?.choreData?.choreType?.tools?.map((tool, index) => (
              <Text style={styles.taskToolText}>- {tool.name}</Text>
            ))
          ) : (
            <Text style={styles.taskToolText}>- No tools Needed</Text>
          )}
        </View>
        <View style={styles.taskDescriptionContainer}>
          <Text style={styles.taskDescriptionTitleText}>Description:</Text>
          <Text
            numberOfLines={descriptionOpen ? 100 : 3}
            style={styles.taskDescriptionText}>
            {store?.task?.choreData?.choreType?.description}
          </Text>
          {store?.task?.choreData?.choreType?.description?.length >= 130 && (
            <TouchableOpacity
              hitSlop={{top: 5, bottom: 5, left: 5, right: 5}}
              style={styles.readMoreContainer}
              onPress={() => setDescriptionOpen(!descriptionOpen)}>
              <Text style={styles.readMoreText}>
                {descriptionOpen ? 'Read Less' : 'Read More'}
              </Text>
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.timeContainer}>
          <Text style={styles.timeTitleText}>Time:</Text>
          <View style={styles.averageTimeContainer}>
            <Text style={styles.averageTimeText}>Average Time:</Text>
            <Text style={styles.timeText}>
              {store?.task?.choreData?.choreType?.averageChoreTime
                ? store?.task?.choreData?.choreType?.averageChoreTime
                : 'No Record'}
            </Text>

            <TouchableOpacity
              disabled={store?.task?.recordTime}
              onPress={() => setIsRecordTimeModalOpen(true)}
              style={
                store?.task?.recordTime
                  ? styles.recordTimeButtonContainerDisabled
                  : styles.recordTimeButtonContainer
              }>
              <Text style={styles.recordTimeButtonText}>
                {store?.task?.recordTime ? 'Recorded' : 'Record Time'}
              </Text>
            </TouchableOpacity>
          </View>
          {store?.task?.recordTime && (
            <View style={styles.averageTimeContainer}>
              <Text style={styles.averageTimeText}>Recorded Time:</Text>
              <Text style={styles.timeText}>
                {millisecondsToTime(timeDiff)}
              </Text>
            </View>
          )}
        </View>
        <View style={styles.completeTaskButtonContainer}>
          <TouchableOpacity
            onPress={() => setIsCompleteTaskModalOpen(true)}
            style={styles.completeTaskButton}>
            <Text style={styles.completeTaskText}>Complete Task</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  },
);

export default TaskView;

const styles = StyleSheet.create({
  taskViewContainer: {
    backgroundColor: appColors.white,
    paddingHorizontal: 20,
    width: '100%',
    height: '100%',
  },
  taskTitleContainer: {},
  titleText: {
    fontSize: 32,
    fontWeight: '800',
    color: appColors.darkGreen,
    marginTop: 20,
  },
  taskNameText: {
    fontSize: 24,
    color: appColors.darkGreen,
  },
  taskToolContainer: {},
  taskToolTitleText: {
    fontSize: 24,
    fontWeight: '700',
    color: appColors.darkGreen,
    marginTop: 25,
  },
  taskToolText: {
    paddingHorizontal: 10,
    fontSize: 14,
    color: appColors.darkGreen,
  },
  taskDescriptionContainer: {
    marginTop: 25,
  },
  taskDescriptionTitleText: {
    fontSize: 24,
    fontWeight: '700',
    color: appColors.darkGreen,
  },
  taskDescriptionText: {
    fontSize: 14,
    color: appColors.darkGreen,
    paddingHorizontal: 10,
    marginTop: 5,
    lineHeight: 20,
  },
  readMoreContainer: {
    alignSelf: 'flex-end',
    marginTop: 10,
  },
  readMoreText: {
    color: appColors.darkGreen,
    fontSize: 16,
    fontWeight: '700',
  },
  timeContainer: {
    marginTop: 25,
  },
  timeTitleText: {
    fontSize: 24,
    fontWeight: '700',
    color: appColors.darkGreen,
  },
  averageTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  averageTimeText: {
    color: appColors.darkGreen,
    fontSize: 14,
    marginHorizontal: 10,
  },
  timeText: {
    color: appColors.darkGreen,
    fontSize: 14,
    fontWeight: '700',
  },
  recordTimeButtonContainer: {
    marginLeft: 'auto',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: appColors.buttonGreen,
    borderRadius: 10,
  },
  recordTimeButtonContainerDisabled: {
    marginLeft: 'auto',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: appColors.buttonGreen,
    opacity: 0.5,
    borderRadius: 10,
  },
  recordTimeButtonText: {
    color: appColors.white,
    fontWeight: '700',
  },
  completeTaskButtonContainer: {
    marginTop: 50,
    marginBottom: 50,
  },
  completeTaskButton: {
    width: '100%',
    backgroundColor: appColors.buttonGreen,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 10,
  },
  completeTaskText: {
    fontSize: 26,
    fontWeight: '900',
    color: appColors.white,
  },
});
