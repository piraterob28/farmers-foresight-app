import React, {useRef} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import FarmMapQuickView from './app/views/FarmMapQuickView';
import FarmTaskListView from './app/views/FarmTaskListView';
import ZoneView from './app/views/ZoneView';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import TabNavButton from './app/components/buttons/TabNavButton';
import appColors from './app/styles/colors';
import HeaderTitle from './app/components/header/HeaderTitle';
import {StoreContext} from './app/context/store';
import {store} from './app/stores/RootStore';
import {useStore} from './app/hooks/useStore';
import HeaderEditButton from './app/components/header/HeaderEditButton';
import {observer} from 'mobx-react';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

function HomeTabNav(): React.JSX.Element {
  const stores = useStore();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: appColors.navBarGreen,
          height: 90,
          paddingBottom: 40,
        },
        // headerShown: false,
      }}>
      <Tab.Screen
        name="Quick View"
        options={{
          headerTitle: () => (
            <HeaderTitle text={'Map Quick View'} image={'task'} />
          ),
          headerRight: () => (
            <HeaderEditButton onSelect={store.farmMapQuickStore.setEditMode} />
          ),
          headerStyle: {
            backgroundColor: '#ffffff',
          },
          headerTintColor: appColors.darkGreen,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          tabBarShowLabel: false,
          tabBarIcon: ({focused}) => (
            <TabNavButton icon="eye" active={focused} />
          ),
        }}>
        {props => (
          <FarmMapQuickView {...props} store={stores.farmMapQuickStore} />
        )}
      </Tab.Screen>
      <Tab.Screen
        name="Farm List View"
        options={{
          headerTitle: () => (
            <HeaderTitle text={'Farm List View'} image={'task'} />
          ),
          headerStyle: {
            backgroundColor: '#ffffff',
          },
          headerTintColor: appColors.darkGreen,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          tabBarShowLabel: false,
          tabBarIcon: ({focused}) => (
            <TabNavButton icon="checks" active={focused} />
          ),
        }}>
        {() => <FarmTaskListView text={'Hello'} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

const ZoneStackNavigator = (): React.JSX.Element => {
  return (
    <Stack.Navigator
      screenOptions={
        {
          // headerShown: false,
        }
      }>
      <Stack.Screen
        name="Zone View"
        options={{
          headerStyle: {
            backgroundColor: '#ffffff',
          },
          headerTintColor: appColors.darkGreen,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}>
        {() => <ZoneView text={'Hello'} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

const Root = observer(() => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Drawer.Screen
        name="Home"
        component={HomeTabNav}
        options={{swipeEnabled: !store.farmMapQuickStore.isEditMode}}
      />
      <Drawer.Screen name="Zones" component={ZoneStackNavigator} />
    </Drawer.Navigator>
  );
});

function App(): React.JSX.Element {
  return (
    <StoreContext.Provider value={store}>
      <GestureHandlerRootView style={{flex: 1}}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="DrawerNav"
              component={Root}
              options={{headerShown: false}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </GestureHandlerRootView>
    </StoreContext.Provider>
  );
}

export default App;
