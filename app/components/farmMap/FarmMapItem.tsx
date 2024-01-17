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
import {ZoneProps} from '../../types/zoneTypes';

interface FarmMapItemProps {
  mapItem: ZoneProps;
  onUpdatePanResponder: Function;
  onCompletePanResponder: Function;
  onItemSelect: Function;
  isEditMode: boolean;
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
    const [canEditZone, setCanEditZone] = useState(false);
    const [isWiderThanTall, setIsWiderThanTall] = useState(false);

    const isDisabledStateRef = React.useRef(isDisabledState);
    const canEditZoneRef = React.useRef(canEditZone);
    const mapItemRef = React.useRef(mapItem);

    React.useEffect(() => {
      isDisabledStateRef.current = isDisabledState;
      canEditZoneRef.current = canEditZone;
      mapItemRef.current = mapItem;
      if (mapItem.width > mapItem.length) {
        setIsWiderThanTall(true);
      } else if (mapItem.width < mapItem.length) {
        setIsWiderThanTall(false);
      }
    }, [isDisabledState, canEditZone, mapItem]);

    const pan1 = useRef(
      new Animated.ValueXY({x: mapItem.mapX, y: mapItem.mapY}),
    ).current;

    let tempPan: {x: number; y: number} = {
      x: pan1.x.__getValue(),
      y: pan1.y.__getValue(),
    };

    const panResponder1 = useRef(
      PanResponder.create({
        onStartShouldSetPanResponder: () => canEditZoneRef.current,
        onMoveShouldSetPanResponder: () => canEditZoneRef.current,
        onPanResponderStart: () => {},
        onPanResponderMove: (event, gestureState) => {
          Animated.event([null, {dx: pan1.x, dy: pan1.y}], {
            useNativeDriver: false,
          })(event, gestureState);
          onUpdatePanResponder({
            panRef: pan1,
            setPanState: setIsDisabledState,
            currentZone: mapItemRef.current,
          });
        },
        onPanResponderRelease: () => {
          if (isDisabledStateRef.current) {
            pan1.setOffset({x: 0, y: 0});
            pan1.setValue(tempPan);
            setIsDisabledState(false);
          } else {
            pan1.extractOffset();
            tempPan = {x: pan1.x.__getValue(), y: pan1.y.__getValue()};
            onCompletePanResponder({
              ...mapItemRef.current,
              mapX: pan1.x.__getValue(),
              mapY: pan1.y.__getValue(),
            });
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
        {!mapItem?.indoor && (
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => {
              if (!isEditMode) {
                onItemSelect(mapItem);
              } else if (!canEditZone && isEditMode) {
                onCompletePanResponder({
                  ...mapItem,
                  width: mapItem.length,
                  length: mapItem.width,
                });
              }
            }}
            onLongPress={() => {
              if (isEditMode) {
                setCanEditZone(true);
                pan1.extractOffset();
              }
            }}
            onPressOut={() => {
              setCanEditZone(false);
            }}
            style={[
              {
                ...styles.outsidePlot,
                height: (mapItem.length * 1.5) / 12,
                width: (mapItem.width * 1.5) / 12,
              },
              !!canEditZone && {
                opacity: 1,
              },
              !!isDisabledState && {
                backgroundColor: 'red',
                opacity: 0.5,
              },
            ]}>
            {!!mapItem.zoneIcons && (
              <MapZoneIcons
                zoneIcons={mapItem?.zoneIcons}
                isWiderThanTall={isWiderThanTall}
              />
            )}
          </TouchableOpacity>
        )}
        {mapItem?.indoor && (
          <TouchableOpacity
            disabled={isEditMode}
            onPress={() => {
              onItemSelect(mapItem);
            }}
            style={[
              {
                ...styles.insidePlot,
                height: (mapItem.length * 1.5) / 12,
                width: (mapItem.width * 1.5) / 12,
              },
              !!isDisabledState && {backgroundColor: 'red'},
            ]}>
            {!!mapItem.zoneIcons && (
              <MapZoneIcons
                zoneIcons={mapItem?.zoneIcons}
                isWiderThanTall={isWiderThanTall}
              />
            )}
          </TouchableOpacity>
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
