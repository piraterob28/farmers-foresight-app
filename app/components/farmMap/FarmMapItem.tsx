import {StyleSheet, View, Animated, PanResponder, Text} from 'react-native';
import React, {useRef} from 'react';
import appColors from '../../styles/colors';

interface FarmMapItemProps {
  mapItem: object;
}

interface MapItemDataProps {
  length: number;
  width: number;
  mapX: number;
  mapY: number;
  zoneType: 'inside' | 'outside';
}

const FarmMapItem: React.FC<FarmMapItemProps> = ({mapItem}) => {
  const mapItemData: MapItemDataProps = Object.values(mapItem)[0];
  const pan1 = useRef(
    new Animated.ValueXY({x: mapItemData.mapX, y: mapItemData.mapY}),
  ).current;
  const panResponder1 = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderStart: () => {
        pan1.extractOffset();
      },
      onPanResponderMove: Animated.event([null, {dx: pan1.x, dy: pan1.y}], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: () => {
        console.log('Pan 1', pan1);
        pan1.extractOffset();
      },
    }),
  ).current;

  return (
    <Animated.View
      style={{
        transform: [{translateX: pan1.x}, {translateY: pan1.y}],
      }}
      {...panResponder1.panHandlers}>
      {mapItemData?.zoneType === 'outside' && (
        <View
          style={{
            ...styles.outsidePlot,
            height: mapItemData.length * 1.5,
            width: mapItemData.width * 1.5,
          }}
        />
      )}
      {mapItemData?.zoneType === 'inside' && (
        <View
          style={{
            ...styles.insidePlot,
            height: mapItemData.length * 1.5,
            width: mapItemData.width * 1.5,
          }}
        />
      )}
    </Animated.View>
  );
};

export default FarmMapItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 14,
    lineHeight: 24,
    fontWeight: 'bold',
  },
  outsidePlot: {
    backgroundColor: appColors.dirtBrown,
    borderRadius: 5,
  },
  insidePlot: {
    backgroundColor: appColors.white,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 5,
  },
});
