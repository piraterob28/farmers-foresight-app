import {StyleSheet, View, Dimensions, ImageBackground} from 'react-native';
import React from 'react';
import appColors from '../../styles/colors';
import CheckeredGrey from '../../assets/images/checkered-grey.png';

const windowWidth: number = Dimensions.get('window').width;
const windowHeight: number = Dimensions.get('window').height;

const checkerSize: number = 50;

interface MapBackgroundGridProps {
  isEditMode: boolean;
}

const MapBackgroundGrid: React.FC<MapBackgroundGridProps> = ({isEditMode}) => {
  return (
    <View style={styles.gridContainer}>
      <ImageBackground
        source={require('../../assets/images/checkered-grey.png')}
        resizeMode="repeat"
        style={isEditMode ? styles.editGridContainer : {display: 'none'}}
      />
    </View>
  );
};

export default MapBackgroundGrid;

const styles = StyleSheet.create({
  editGridContainer: {
    height: windowHeight,
    width: windowWidth,
    opacity: 0.4,
  },
  gridContainer: {
    position: 'absolute',
    height: windowHeight,
    width: windowWidth,
    backgroundColor: appColors.white,
  },
  gridLines: {
    height: checkerSize,
    width: checkerSize,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: appColors.fadedGreen,
  },
  gridLinesFilled: {
    height: checkerSize,
    width: checkerSize,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: appColors.fadedGreen,
    backgroundColor: appColors.fadedGreen,
  },
});
