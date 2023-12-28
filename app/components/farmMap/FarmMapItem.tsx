import {StyleSheet, View, Animated, PanResponder} from 'react-native';
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
}

const FarmMapItem: React.FC<FarmMapItemProps> = ({mapItem}) => {
  const mapItemData: MapItemDataProps = Object.values(mapItem)[0];
  console.log('Pooooooop', mapItemData.mapX, mapItem);
  const pan1 = useRef(
    new Animated.ValueXY({x: mapItemData.mapX, y: mapItemData.mapY}),
  ).current;

  const panResponder1 = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, {dx: pan1.x, dy: pan1.y}], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: () => {
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
      <View style={styles.box} />
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
  box: {
    height: 100,
    width: 30,
    backgroundColor: appColors.dirtBrown,
    borderRadius: 5,
  },
});
