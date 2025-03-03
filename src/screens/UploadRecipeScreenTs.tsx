import React from 'react';
import { View, Text } from 'react-native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { RootStackParamList } from '../components/Types';

type UploadRecipeScreenProps = {
  navigation: DrawerNavigationProp<RootStackParamList, 'UploadRecipe'>;
};

const UploadRecipeScreenTs: React.FC<UploadRecipeScreenProps> = ({ navigation }) => {
  return (
    <View>
      <Text>Welcome to Upload Recipe Screen</Text>
    </View>
  );
};

export default UploadRecipeScreenTs;