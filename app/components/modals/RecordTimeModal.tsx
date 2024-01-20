import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import React from 'react';
import appColors from '../../styles/colors';
import {DailyChore} from '../../types/choreTypes';
import CloseRound from '../../assets/icons/close_round.svg';
import HourGlass from '../../assets/icons/hourglass-filled.svg';
import Weeding from '../../assets/icons/weeding.svg';
import Fertilize from '../../assets/icons/fertilize.svg';

interface RecordTimeModalProps {
  isVisible: boolean;
  onTimeStart: Function;
  onTimeStop: Function;
  onRecordTime: Function;
  onClose: Function;
  task: DailyChore | undefined;
}

const taskImage = (taskType: string) => {
  if (taskType === 'weeding') {
    return <Weeding />;
  } else if (taskType === 'fertillize') {
    return <Fertilize />;
  }
};

const RecordTimeModal: React.FC<RecordTimeModalProps> = ({
  isVisible = false,
  task,
  onTimeStart,
  onTimeStop,
  onRecordTime,
  onClose,
}) => {
  return (
    <Modal visible={isVisible} transparent={true} animationType="slide">
      <TouchableOpacity
        onPress={() => onClose(false)}
        style={styles.modalBackgroundContainer}>
        <TouchableWithoutFeedback>
          <View style={styles.modalContainer}>
            <TouchableOpacity
              onPress={() => onClose(false)}
              style={styles.closeButtonContainer}>
              <CloseRound />
            </TouchableOpacity>
            <Text style={styles.titleText}>Record Time</Text>
            <View style={styles.hourglassContainer}>
              <HourGlass />
            </View>
            <Text style={styles.zoneInfoText}>
              Zone {task?.choreData?.zoneNumber} : Row{' '}
              {task?.choreData?.rowNumber}
            </Text>
            <Text style={styles.taskNameText}>
              {task?.choreData?.choreType?.name}
            </Text>
            <Text style={styles.taskTitleText}>Task</Text>
            <View style={styles.taskTypeContainer}>
              {taskImage(task?.choreData?.choreType?.choreType)}
              <Text style={styles.taskTypeText}>
                {task?.choreData?.choreType?.choreType}
              </Text>
            </View>
            <View style={styles.averageTimeContainer}>
              <Text style={styles.averageTimeText}>Average Time:</Text>
              <Text style={styles.averageTimeTextBold}>
                {task?.choreData?.choreType?.averageChoreTime
                  ? task?.choreData?.choreType?.averageChoreTime
                  : 'No Record'}
              </Text>
            </View>
            <TouchableOpacity style={styles.startTimeButtonContainer}>
              <Text style={styles.startTimeText}>Start Time</Text>
            </TouchableOpacity>
            <View style={styles.recordTimeButtonContainer}>
              <TouchableOpacity style={styles.recordTimeButton}>
                <Text style={styles.recordTimeButtonText}>Record Time</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </TouchableOpacity>
    </Modal>
  );
};

export default RecordTimeModal;

const styles = StyleSheet.create({
  modalBackgroundContainer: {
    height: '100%',
    width: '100%',
    flex: 1,
    paddingTop: 50,
    backgroundColor: appColors.modalBackground,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    zIndex: 1,
  },
  modalContainer: {
    width: '100%',
    backgroundColor: appColors.white,

    paddingVertical: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
  },
  closeButtonContainer: {
    alignSelf: 'flex-start',
    marginLeft: 20,
  },
  titleText: {
    fontSize: 26,
    fontWeight: '900',
    color: appColors.darkGreen,
  },
  hourglassContainer: {
    marginVertical: 15,
  },
  zoneInfoText: {
    fontSize: 26,
    fontWeight: '700',
    color: appColors.darkGreen,
  },
  taskNameText: {
    fontSize: 18,
    color: appColors.darkGreen,
    marginBottom: 18,
  },
  taskTitleText: {
    fontSize: 26,
    color: appColors.darkGreen,
    textDecorationLine: 'underline',
  },
  taskTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  taskTypeText: {
    fontSize: 22,
    textTransform: 'capitalize',
    fontWeight: '900',
    color: appColors.darkGreen,
    marginLeft: 5,
    marginVertical: 5,
  },
  averageTimeContainer: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
  },
  averageTimeText: {
    fontSize: 12,
    color: appColors.darkGreen,
  },
  averageTimeTextBold: {
    fontSize: 12,
    color: appColors.darkGreen,
    fontWeight: '900',
  },
  startTimeButtonContainer: {
    marginTop: 25,
    paddingVertical: 15,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  startTimeText: {
    fontSize: 16,
    fontWeight: '700',
    color: appColors.darkGreen,
  },
  recordTimeButtonContainer: {
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 25,
  },
  recordTimeButton: {
    width: '100%',
    backgroundColor: appColors.buttonGreen,
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 10,
  },
  recordTimeButtonText: {
    fontSize: 26,
    fontWeight: '900',
    color: appColors.white,
  },
});
