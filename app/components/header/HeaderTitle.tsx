import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {observer} from 'mobx-react';
import ChecksRed from '../../assets/icons/checks-red.svg';
import ChecksGreen from '../../assets/icons/checks-green.svg';
import CropsRed from '../../assets/icons/crops-red.svg';
import CropsGreen from '../../assets/icons/crops-green.svg';
import Rows from '../../assets/icons/rows.svg';
import appColors from '../../styles/colors';

interface HeaderTitleProps extends SelectedImageProps {
  text: string;
  imageFirst: boolean;
  store: object;
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

const HeaderTitle: React.FC<HeaderTitleProps> = observer(
  ({imageFirst = true, store}) => {
    const [titleText, setTitleText] = useState(store?.pageTitle);
    const [titleImage, setTitleImage] = useState(store?.pageTitleIcon);
    useEffect(() => {
      setTitleText(store?.pageTitle);
      setTitleImage(store?.pageTitleIcon);
    }, [store]);
    if (imageFirst) {
      return (
        <View style={styles.headerTitleContainer}>
          <SelectedImage image={titleImage} />
          <Text style={styles.headerTitleText}>{titleText}</Text>
        </View>
      );
    } else {
      return (
        <View style={styles.headerTitleContainer}>
          <Text>{titleText}</Text>
          <SelectedImage image={titleImage} />
        </View>
      );
    }
  },
);

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
