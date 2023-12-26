import React from 'react';
import {TouchableOpacity, View, Image, StyleSheet, Text} from 'react-native';
import Eye from '../../assets/icons/Eye.svg';
import EyeLight from '../../assets/icons/Eye-light.svg';
import Checks from '../../assets/icons/Checks.svg';
import ChecksLight from '../../assets/icons/Checks-light.svg';

interface TabNavButtonProps {
  props: any;
  icon: 'eye' | 'checks';
  active: boolean;
}

const TabNavButton: React.FC<TabNavButtonProps> = ({props, icon, active}) => {
  if (active) {
    return (
      <View {...props}>
        {icon === 'eye' && <Eye width={35} height={35} />}
        {icon === 'checks' && <Checks width={35} height={35} />}
      </View>
    );
  } else {
    return (
      <View {...props}>
        {icon === 'eye' && <EyeLight width={35} height={35} />}
        {icon === 'checks' && <ChecksLight width={35} height={35} />}
      </View>
    );
  }
};

export default TabNavButton;
