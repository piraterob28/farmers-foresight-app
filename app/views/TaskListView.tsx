import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {observer} from 'mobx-react';

const TaskListView = observer(() => {
  return (
    <View>
      <Text>TaskListView</Text>
    </View>
  );
});

export default TaskListView;

const styles = StyleSheet.create({});
