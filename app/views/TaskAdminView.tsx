import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

interface TaskAdminViewProps {
  navigation: object;
  route: object;
  store: TaskListStore;
}

const TaskAdminView: React.FC<TaskListViewProps> = () => {
  return (
    <View>
      <Text>TaskAdminView</Text>
    </View>
  );
};

export default TaskAdminView;

const styles = StyleSheet.create({});
