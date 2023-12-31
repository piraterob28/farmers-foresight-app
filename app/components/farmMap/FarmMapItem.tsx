import {StyleSheet, View, Animated, PanResponder} from 'react-native';
import React, {useRef, useState} from 'react';
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
  onUpdatePanResponder: any;
}

const FarmMapItem: React.FC<FarmMapItemProps> = ({
  mapItem,
  onUpdatePanResponder,
}) => {
  const [isDisabledState, setIsDisabledState] = useState(false);
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
      onPanResponderMove: (event, gestureState) => {
        Animated.event([null, {dx: pan1.x, dy: pan1.y}], {
          useNativeDriver: false,
        })(event, gestureState);
        onUpdatePanResponder({
          panRef: pan1,
          setPanState: setIsDisabledState,
          currentZone: mapItem,
        });
      },

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
      {mapItemData?.zoneType === 'outside' && (
        <View
          style={[
            {
              ...styles.outsidePlot,
              height: mapItemData.length * 1.5,
              width: mapItemData.width * 1.5,
            },
            !!isDisabledState && {
              backgroundColor: 'red',
              opacity: 0.5,
              zIndex: 1000,
            },
          ]}
        />
      )}
      {mapItemData?.zoneType === 'inside' && (
        <View
          style={[
            {
              ...styles.insidePlot,
              height: mapItemData.length * 1.5,
              width: mapItemData.width * 1.5,
            },
            !!isDisabledState && {backgroundColor: 'red'},
          ]}
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
    zIndex: 1,
    backgroundColor: appColors.dirtBrown,
    borderRadius: 5,
  },
  insidePlot: {
    zIndex: 1,
    backgroundColor: appColors.white,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 5,
  },
});
