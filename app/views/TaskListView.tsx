import {StyleSheet, Text, View} from 'react-native';
import TaskListStore from '../stores/TaskListStore';
import React, {useEffect} from 'react';
import {observer} from 'mobx-react';
import TaskListFilterPills from '../components/filterPills/TaskListFilterPills';
import appColors from '../styles/colors';

interface TaskListViewProps {
  route: object;
  store: TaskListStore;
}

const TaskListView: React.FC<TaskListViewProps> = observer(({route, store}) => {
  store.getTaskList(
    (taskType = route?.params?.taskType),
    (taskScope = route?.params?.taskScope),
    (scopeId = route?.params?.scopeId),
  );

  return (
    <View style={styles.taskListViewContainer}>
      <TaskListFilterPills />
      <Text>TaskListView</Text>
    </View>
  );
});

export default TaskListView;

const styles = StyleSheet.create({
  taskListViewContainer: {
    backgroundColor: appColors.white,
    width: '100%',
    height: '100%',
  },
});
