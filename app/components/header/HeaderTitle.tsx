import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ChecksRed from '../../assets/icons/checks-red.svg';
import ChecksGreen from '../../assets/icons/checks-green.svg';
import CropsRed from '../../assets/icons/crops-red.svg';
import CropsGreen from '../../assets/icons/crops-green.svg';
import Rows from '../../assets/icons/rows.svg';
import appColors from '../../styles/colors';

interface HeaderTitleProps extends SelectedImageProps {
  text: string;
  imageFirst: boolean;
}

interface SelectedImageProps {
  image: 'task' | 'task-late' | 'harvest' | 'harvest-late' | 'row';
}

const SelectedImage: React.FC<SelectedImageProps> = ({image}) => {
  switch (image) {
    case 'task':
      return <ChecksGreen width={30} />;
    case 'task-late':
      return <ChecksRed width={30} />;
    case 'harvest':
      return <CropsGreen width={30} />;
    case 'harvest-late':
      return <CropsRed width={30} />;
    case 'row':
      return <Rows width={30} />;
  }
};

const HeaderTitle: React.FC<HeaderTitleProps> = ({
  text,
  image,
  imageFirst = true,
}) => {
  if (imageFirst) {
    return (
      <View style={styles.headerTitleContainer}>
        <SelectedImage image={image} />
        <Text style={styles.headerTitleText}>{text}</Text>
      </View>
    );
  } else {
    return (
      <View style={styles.headerTitleContainer}>
        <Text>{text}</Text>
        <SelectedImage image={image} />
      </View>
    );
  }
};

export default HeaderTitle;

const styles = StyleSheet.create({
  headerTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  headerTitleText: {
    fontSize: 20,
    fontWeight: '900',
    color: appColors.darkGreen,
  },
});
