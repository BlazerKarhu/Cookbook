import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  getFocusedRouteNameFromRoute,
  NavigationContainer,
} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../views/Home';
import Profile from '../views/Profile';
import Single from '../views/Single';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const TabScreen = () => {
  return (
    // TODO: move content of <NavigationContainer> here
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

const StackScreen = () => {
  return (
    // TODO: make two stack screens:
    // 1st: name=Home, component=TabScreen
    //2nd: name=Single, component=Single
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={TabScreen}
        options={({route}) => ({
          headerTitle: getFocusedRouteNameFromRoute(route),
        })}
      />
      <Stack.Screen name="Recipe Info" component={Single} />
    </Stack.Navigator>
  );
};

const Navigator = () => {
  return (
    <NavigationContainer>
      <StackScreen />
    </NavigationContainer>
  );
};

export default Navigator;