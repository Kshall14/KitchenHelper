import React from 'react';
import { View, Text } from 'react-native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { RootStackParamList } from '../components/Types';

type MealCalenderScreenProps = {
  navigation: DrawerNavigationProp<RootStackParamList, 'MealCalender'>;
};

const MealCalenderScreenTs: React.FC<MealCalenderScreenProps> = ({ navigation }) => {
  return (
    <View>
      <Text>Welcome to Meal Calender Screen</Text>
    </View>
  );
};

export default MealCalenderScreenTs;