import React from 'react';
import { View, Text } from 'react-native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { RootStackParamList } from '../components/Types';

type ShoppingListScreenProps = {
  navigation: DrawerNavigationProp<RootStackParamList, 'ShoppingList'>;
};

const ShoppingListScreenTs: React.FC<ShoppingListScreenProps> = ({ navigation }) => {
  return (
    <View>
      <Text>Welcome to Shopping List Screen</Text>
    </View>
  );
};

export default ShoppingListScreenTs;