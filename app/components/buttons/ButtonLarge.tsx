import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import appColors from '../../styles/colors';

interface TaskListViewProps {
  text: string;
  onSelect: Function;
}

const ButtonLarge: React.FC<TaskListViewProps> = ({text, onSelect}) => {
  return (
    <TouchableOpacity style={styles.buttonContainer} onPress={() => onSelect()}>
      <Text style={styles.buttonLargeText}>{text}</Text>
    </TouchableOpacity>
  );
};

export default ButtonLarge;

const styles = StyleSheet.create({
  buttonContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: appColors.buttonGreen,
    paddingVertical: 10,
    borderRadius: 10,
    marginVertical: 10,
  },
  buttonLargeText: {
    fontSize: 24,
    fontWeight: '800',
    color: appColors.white,
  },
});
