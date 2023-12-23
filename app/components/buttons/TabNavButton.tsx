import React from 'react';
import {TouchableOpacity, Image, StyleSheet} from 'react-native';

interface TabNavButtonProps {
  props: any;
  icon: Text;
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
      <Image style={[styles.imageSize]} source={icon} />
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
