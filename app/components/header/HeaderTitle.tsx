import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

interface HeaderTitleProps extends SelectedImageProps {
  text: string;
  imageFirst: boolean;
}

interface SelectedImageProps {
  image: 'task' | 'task-late' | 'harvest' | 'harvest-late';
}

const selectedImage: React.FC<SelectedImageProps> = ({image}) => {
  switch (image) {
    case 'task':
      return;
  }
};

const HeaderTitle: React.FC<HeaderTitleProps> = ({
  text,
  image,
  imageFirst = true,
}) => {
  return (
    <View>
      <Text>{text}</Text>
    </View>
  );
};

export default HeaderTitle;

const styles = StyleSheet.create({});
