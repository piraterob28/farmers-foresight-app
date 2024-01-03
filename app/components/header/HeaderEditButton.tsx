import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import HeaderGreenEdit from '../../assets/icons/edit-green.svg';
import {TouchableOpacity} from 'react-native-gesture-handler';

const HeaderEditButton = () => {
  return (
    <TouchableOpacity
      hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
      style={styles.greenEditContainer}>
      <HeaderGreenEdit height={25} width={25} />
    </TouchableOpacity>
  );
};

export default HeaderEditButton;

const styles = StyleSheet.create({
  greenEditContainer: {
    marginRight: 20,
  },
});
