import {StyleSheet, View, Dimensions} from 'react-native';
import React from 'react';
import appColors from '../../styles/colors';

const windowWidth: number = Dimensions.get('window').width;
const windowHeight: number = Dimensions.get('window').height;

const checkerSize: number = 50;

interface MapBackgroundGridProps {
  isEditMode: boolean;
}

const MapBackgroundGrid: React.FC<MapBackgroundGridProps> = ({isEditMode}) => {
  const numberRows: number = Math.floor(windowHeight / checkerSize) + 1;
  const numberCols: number = Math.floor(windowWidth / checkerSize) + 1;

  return (
    <View style={isEditMode ? styles.editGridContainer : styles.gridContainer}>
      {/* {isEditMode && (
        <View style={{flexDirection: 'row'}}>
          {[...Array(numberCols)].map((_e, index1) => (
            <View>
              {[...Array(numberRows)].map((_i, index2) => {
                if ((index1 + index2) % 2 === 0) {
                  return <View style={styles.gridLines} />;
                } else {
                  return <View style={styles.gridLinesFilled} />;
                }
              })}
            </View>
          ))}
        </View>
      )} */}
    </View>
  );
};

export default MapBackgroundGrid;

const styles = StyleSheet.create({
  editGridContainer: {
    position: 'absolute',
    height: windowHeight,
    width: windowWidth,
    backgroundColor: appColors.fadedGreen,
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
