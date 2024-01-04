import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import HeaderGreenEdit from '../../assets/icons/edit-green.svg';

interface HeaderEditButtonwProps {
  onSelect: Function;
}

const HeaderEditButton: React.FC<HeaderEditButtonwProps> = ({onSelect}) => {
  return (
    <TouchableOpacity
      hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
      style={styles.greenEditContainer}
      onPress={() => onSelect()}>
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
