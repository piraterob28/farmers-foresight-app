import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

interface TaskViewProps {
  route: object;
  store: TaskStore;
}

const TaskView: React.FC<TaskViewProps> = () => {
  return (
    <View>
      <Text>TaskView</Text>
    </View>
  );
};

export default TaskView;

const styles = StyleSheet.create({});
