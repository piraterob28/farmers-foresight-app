import React from 'react';
import {TouchableOpacity, Image, StyleSheet, Text} from 'react-native';
import Eye from '../../assets/icons/Eye.svg';
import Checks from '../../assets/icons/Checks.svg';

interface TabNavButtonProps {
  props: any;
  icon: 'eye' | 'checks';
}

const TabNavButton: React.FC<TabNavButtonProps> = ({props, icon}) => {
  return (
    <TouchableOpacity
      {...props}
      hitSlop={{
        top: 10,
        bottom: 10,
        left: 10,
        right: 10,
      }}>
      {icon === 'eye' && <Eye width={25} height={25} />}
      {icon === 'checks' && <Checks width={25} height={25} />}
    </TouchableOpacity>
  );
};

export default TabNavButton;

const styles = StyleSheet.create({
  imageSize: {
    height: 25,
    width: 25,
    marginBottom: 10,
  },
});
