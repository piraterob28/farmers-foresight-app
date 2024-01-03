import {StyleSheet, View, Dimensions} from 'react-native';
import React from 'react';
import appColors from '../../styles/colors';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const MapBackgroundGrid: React.FC = () => {
  return (
    <View style={styles.gridContainer}>
      {/* {[...Array(100)].map(() => (
        <View style={styles.gridLines} />
      ))} */}
    </View>
  );
};

export default MapBackgroundGrid;

const styles = StyleSheet.create({
  gridContainer: {
    position: 'absolute',
    height: windowHeight,
    width: windowWidth,
    backgroundColor: appColors.white,
  },
  gridLines: {
    height: 10,
    width: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: appColors.fadedGreen,
  },
});
