import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import appColors from '../../styles/colors';
import CloseRound from '../../assets/icons/close_round.svg';
import Checks from '../../assets/icons/Checks.svg';
import {DailyChore} from '../../types/choreTypes';
import Weeding from '../../assets/icons/weeding.svg';
import Fertilize from '../../assets/icons/fertilize.svg';

interface CompleteTaskModalProps {
  isVisible: boolean;
  onClose: Function;
  onComplete: Function;
  task: DailyChore | undefined;
  navigation: object;
}

const taskImage = (taskType: string | undefined) => {
  if (taskType === 'weeding') {
    return <Weeding />;
  } else if (taskType === 'fertillize') {
    return <Fertilize />;
  }
};

const CompleteTaskModal: React.FC<CompleteTaskModalProps> = ({
  isVisible = false,
  onClose,
  onComplete,
  navigation,
  task,
}) => {
  const [isNotesOpen, setIsNotesOpen] = useState<boolean>(false);
  const [notesText, setNotesText] = useState<string | undefined>();

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
            <Text style={styles.titleText}>Complete Task</Text>
            <View
              style={
                isNotesOpen ? styles.infoSectionClosed : styles.infoSection
              }>
              <View style={styles.checksContainer}>
                <Checks />
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
            </View>
            <TouchableOpacity
              onPress={() => setIsNotesOpen(!isNotesOpen)}
              style={styles.notesButtonContainer}>
              <Text style={styles.startTimeText}>Notes</Text>
              <View
                style={
                  isNotesOpen
                    ? styles.notesContainer
                    : styles.notesContainerClosed
                }>
                <TouchableWithoutFeedback>
                  <TextInput
                    style={styles.notesInput}
                    multiline={true}
                    autoFocus={isNotesOpen}
                    onChangeText={text => setNotesText(text)}
                    value={notesText}
                  />
                </TouchableWithoutFeedback>
              </View>
            </TouchableOpacity>

            <View style={styles.completeButtonContainer}>
              <TouchableOpacity
                onPress={() => {
                  onComplete(task?.id, notesText);
                  onClose();
                  navigation.goBack();
                }}
                style={styles.completeButton}>
                <Text style={styles.completeButtonText}>Complete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </TouchableOpacity>
    </Modal>
  );
};

export default CompleteTaskModal;

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
  infoSection: {
    alignItems: 'center',
  },
  infoSectionClosed: {
    display: 'none',
  },
  checksContainer: {
    marginVertical: 25,
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
  notesButtonContainer: {
    marginTop: 25,
    paddingVertical: 15,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexGrow: 1,
  },
  startTimeText: {
    fontSize: 16,
    fontWeight: '700',
    color: appColors.darkGreen,
  },
  notesContainer: {
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 10,
    flexGrow: 1,
  },
  notesContainerClosed: {
    display: 'none',
  },
  notesInput: {
    width: '100%',
    height: 220,
    backgroundColor: appColors.offWhite,
    borderRadius: 5,
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  completeButtonContainer: {
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 25,
  },
  completeButton: {
    width: '100%',
    backgroundColor: appColors.buttonGreen,
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 10,
  },
  completeButtonText: {
    fontSize: 26,
    fontWeight: '900',
    color: appColors.white,
  },
});
