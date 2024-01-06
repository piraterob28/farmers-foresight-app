import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import ZoneStore from '../stores/ZoneStore';
import React from 'react';
import appColors from '../styles/colors';

interface ZoneViewProps {
  store: ZoneStore;
}

const ZoneView: React.FC<ZoneViewProps> = ({store, navigation}) => {
  return (
    <View style={styles.zoneViewContainer}>
      <View style={styles.desctiptionAreaContainer}>
        <Text style={styles.descriptionTitleText}>Description:</Text>
        <View>
          <Text style={styles.descriptionText}>{store.testText}</Text>
          <TouchableOpacity style={styles.readMoreContainer}>
            <Text style={styles.readMoreText}>Read More</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ZoneView;

const styles = StyleSheet.create({
  zoneViewContainer: {
    backgroundColor: appColors.white,
    height: '100%',
    width: '100%',
  },
  desctiptionAreaContainer: {
    paddingHorizontal: 20,
  },
  descriptionTitleText: {
    color: appColors.darkGreen,
    fontSize: 24,
    fontWeight: '900',
    marginVertical: 5,
  },
  descriptionText: {
    color: appColors.darkGreen,
    fontSize: 14,
    lineHeight: 24,
  },
  readMoreContainer: {
    alignSelf: 'flex-end',
  },
  readMoreText: {
    color: appColors.darkGreen,
    fontSize: 14,
    fontWeight: '900',
  },
});
