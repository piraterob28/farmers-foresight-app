import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import FarmMapQuickView from './app/views/FarmMapQuickView';
import FarmTaskListView from './app/views/FarmTaskListView';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import TabNavButton from './app/components/buttons/TabNavButton';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

function TabNav(): React.JSX.Element {
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: 'green',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        tabBarButton: props => <TabNavButton props={props} icon="eye" />,
      }}>
      <Tab.Screen
        name="Quick View"
        options={{
          title: 'Quick View',
          headerStyle: {
            backgroundColor: 'green',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          tabBarButton: props => <TabNavButton props={props} icon="checks" />,
        }}>
        {props => <FarmMapQuickView text={'poop'} />}
      </Tab.Screen>
      <Tab.Screen name="Sale List" options={{}}>
        {props => <FarmTaskListView text={'Hello'} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

function App(): React.JSX.Element {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="TabNav"
            component={TabNav}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

export default App;
