import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Touchable,
} from 'react-native';
import React, {useState} from 'react';
import appColors from '../../styles/colors';

const pillSelection = {
  type: 'Type',
  zones: 'Zones',
  plants: 'Plants',
  time: 'Time',
};

interface TaskListFilterPillsProps {
  isDisabled: boolean;
}

const TaskListFilterPills: React.FC<TaskListFilterPillsProps> = ({
  isDisabled = true,
}) => {
  const [selectedPill, setSelectedPill] = useState(pillSelection.zones);

  return (
    <View
      style={
        isDisabled
          ? styles.filterPillsContainerDisabled
          : styles.filterPillsContainer
      }>
      {Object.values(pillSelection).map((value, index) => (
        <TouchableOpacity
          key={index}
          disabled={isDisabled}
          onPress={() => setSelectedPill(value)}
          style={
            selectedPill === value
              ? styles.filterPillContainerSelected
              : styles.filterPillContainer
          }>
          <Text
            style={
              selectedPill === value
                ? styles.filterPillTextSelected
                : styles.filterPillText
            }>
            {value}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default TaskListFilterPills;

const styles = StyleSheet.create({
  filterPillsContainer: {
    width: '100%',
    backgroundColor: appColors.offWhite,
    zIndex: 100,
    paddingVertical: 4,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  filterPillsContainerDisabled: {
    width: '100%',
    backgroundColor: appColors.offWhite,
    zIndex: 100,
    paddingVertical: 4,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    opacity: 0.5,
  },
  filterPillContainer: {
    backgroundColor: appColors.offWhite,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 7,
  },
  filterPillContainerSelected: {
    backgroundColor: appColors.darkGreen,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 7,
  },
  filterPillText: {
    color: appColors.darkGreen,
    fontSize: 14,
    fontWeight: '700',
  },
  filterPillTextSelected: {
    color: appColors.white,
    fontSize: 14,
    fontWeight: '700',
  },
});
