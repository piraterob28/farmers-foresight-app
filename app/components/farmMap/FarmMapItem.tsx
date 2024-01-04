import {
  StyleSheet,
  View,
  Animated,
  PanResponder,
  TouchableOpacity,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {observer} from 'mobx-react';
import appColors from '../../styles/colors';
import MapZoneIcons from './MapZoneIcons';

interface FarmMapItemProps {
  mapItem: object;
  onUpdatePanResponder: Function;
  onCompletePanResponder: Function;
  onItemSelect: Function;
  isEditMode: boolean;
}

interface MapItemDataProps {
  length: number;
  width: number;
  mapX: number;
  mapY: number;
  zoneType: 'inside' | 'outside';
  zoneIcons: object;
}

const FarmMapItem: React.FC<FarmMapItemProps> = observer(
  ({
    mapItem,
    onUpdatePanResponder,
    onCompletePanResponder,
    isEditMode,
    onItemSelect,
  }) => {
    const [isDisabledState, setIsDisabledState] = useState(false);
    const mapItemData: MapItemDataProps = Object.values(mapItem)[0];
    const isDisabledStateRef = React.useRef(isDisabledState);
    const isEditModeRef = React.useRef(isEditMode);
    React.useEffect(() => {
      isDisabledStateRef.current = isDisabledState;
      isEditModeRef.current = isEditMode;
    }, [isDisabledState, isEditMode]);
    let tempPan: Object;
    const pan1 = useRef(
      new Animated.ValueXY({x: mapItemData.mapX, y: mapItemData.mapY}),
    ).current;
    const panResponder1 = useRef(
      PanResponder.create({
        onStartShouldSetPanResponder: () => isEditModeRef.current,
        onMoveShouldSetPanResponder: () => isEditModeRef.current,
        onPanResponderStart: () => {
          pan1.extractOffset();
          tempPan = {x: pan1.x.__getValue(), y: pan1.y.__getValue()};
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
          if (isDisabledStateRef.current) {
            pan1.setOffset({x: 0, y: 0});
            pan1.setValue(tempPan);
            setIsDisabledState(false);
          } else {
            pan1.extractOffset();

            onCompletePanResponder(
              {
                ...mapItemData,
                mapX: pan1.x.__getValue(),
                mapY: pan1.y.__getValue(),
              },
              Object.keys(mapItem)[0],
            );
          }
        },
      }),
    ).current;

    return (
      <Animated.View
        style={[
          {
            transform: [{translateX: pan1.x}, {translateY: pan1.y}],
          },
          isDisabledState ? {zIndex: 100} : {zIndex: 1},
        ]}
        {...panResponder1.panHandlers}>
        {mapItemData?.zoneType === 'outside' && (
          <TouchableOpacity
            disabled={isEditMode}
            onPress={() => {
              onItemSelect(mapItem);
            }}
            style={[
              {
                ...styles.outsidePlot,
                height: mapItemData.length * 1.5,
                width: mapItemData.width * 1.5,
              },
              !!isDisabledState && {
                backgroundColor: 'red',
                opacity: 0.5,
              },
            ]}>
            {!!mapItemData.zoneIcons && (
              <MapZoneIcons zoneIcons={mapItemData?.zoneIcons} />
            )}
          </TouchableOpacity>
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
            ]}>
            {!!mapItemData.zoneIcons && (
              <MapZoneIcons zoneIcons={mapItemData?.zoneIcons} />
            )}
          </View>
        )}
      </Animated.View>
    );
  },
);

export default FarmMapItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 14,
    lineHeight: 24,
    fontWeight: 'bold',
  },
  outsidePlot: {
    zIndex: -1,
    backgroundColor: appColors.dirtBrown,
    borderRadius: 5,
  },
  insidePlot: {
    zIndex: -1,
    backgroundColor: appColors.white,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 5,
  },
});
