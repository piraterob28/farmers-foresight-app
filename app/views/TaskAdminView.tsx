import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ButtonLarge from '../components/buttons/ButtonLarge';
import appColors from '../styles/colors';

interface TaskAdminViewProps {
  navigation: object;
  route: object;
}

const TaskAdminView: React.FC<TaskAdminViewProps> = ({navigation, route}) => {
  return (
    <View style={styles.taskAdminViewContainer}>
      <View style={styles.tasksContainer}>
        <Text style={styles.titleText}>Tomorrow's Outlook:</Text>
        <View>
          <Text>Need To Plumb Through Task Number</Text>
        </View>
      </View>
      <View style={styles.tasksContainer}>
        <Text style={styles.titleText}>Manage Tasks:</Text>
        <ButtonLarge text={'Add Task'} onSelect={() => console.log('Hit')} />
      </View>
    </View>
  );
};

export default TaskAdminView;

const styles = StyleSheet.create({
  taskAdminViewContainer: {
    paddingHorizontal: 20,
    backgroundColor: appColors.white,
    height: '100%',
  },
  tasksContainer: {
    marginVertical: 15,
  },
  titleText: {
    fontSize: 20,
    color: appColors.darkGreen,
    fontWeight: '700',
  },
});
