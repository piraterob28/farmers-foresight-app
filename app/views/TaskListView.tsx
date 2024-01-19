import {StyleSheet, Text, View, FlatList} from 'react-native';
import TaskListStore from '../stores/TaskListStore';
import React, {useEffect} from 'react';
import {observer} from 'mobx-react';
import TaskListFilterPills from '../components/filterPills/TaskListFilterPills';
import appColors from '../styles/colors';
import TaskListCard from '../components/cards/taskListCards/TaskListCard';

interface TaskListViewProps {
  route: object;
  store: TaskListStore;
}

const TaskListView: React.FC<TaskListViewProps> = observer(({route, store}) => {
  useEffect(() => {
    store.setPageTitle(
      (title = route?.params?.pageTitle),
      (icon = route?.params?.pageTitleIcon),
    );
    store.getTaskList(
      (taskType = route?.params?.taskType),
      (taskScope = route?.params?.taskScope),
      (scopeId = route?.params?.scopeId),
    );
  }, [route.params, store]);

  return (
    <View style={styles.taskListViewContainer}>
      <TaskListFilterPills isDisabled={true} />
      <FlatList
        data={store?.choreData}
        renderItem={({item}) => <TaskListCard task={item} />}
        keyExtractor={item => item.id}
      />
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
