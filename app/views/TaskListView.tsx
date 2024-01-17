import {StyleSheet, Text, View} from 'react-native';
import TaskListStore from '../stores/TaskListStore';
import React, {useEffect} from 'react';
import {observer} from 'mobx-react';

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
    <View>
      <Text>TaskListView</Text>
    </View>
  );
});

export default TaskListView;

const styles = StyleSheet.create({});
