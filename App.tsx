import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import FarmMapQuickView from './app/views/FarmMapQuickView';
import FarmTaskListView from './app/views/FarmTaskListView';
import TaskView from './app/views/TaskView';
import TaskAdminView from './app/views/TaskAdminView';
import TaskListView from './app/views/TaskListView';
import ZoneView from './app/views/ZoneView';
import ZoneListView from './app/views/ZoneListView';
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

// Bottom Tabs in Home Nav

function HomeTabNav(): React.JSX.Element {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: appColors.navBarGreen,
          height: 90,
          paddingBottom: 40,
        },
        headerShown: false,
      }}>
      <Tab.Screen
        name="FarmMapTab"
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({focused}) => (
            <TabNavButton icon="eye" active={focused} />
          ),
        }}
        component={HomeMapStackNavigator}
      />
      <Tab.Screen
        name="FarmListTab"
        component={HomeListStackNavigator}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({focused}) => (
            <TabNavButton icon="checks" active={focused} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

// Map Quick View Stack

const HomeMapStackNavigator = observer((): React.JSX.Element => {
  const stores = useStore();
  return (
    <Stack.Navigator
      screenOptions={{
        // headerShown: false,
        headerBackTitleVisible: false,
      }}>
      <Stack.Screen
        name="FarmMapView"
        options={{
          headerTitle: () => <HeaderTitle store={stores?.farmMapQuickStore} />,
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
        }}>
        {props => (
          <FarmMapQuickView store={stores.farmMapQuickStore} {...props} />
        )}
      </Stack.Screen>
      <Stack.Screen name="ZoneView" options={{}}>
        {props => <ZoneView store={stores.zoneStore} {...props} />}
      </Stack.Screen>
      <Stack.Screen
        options={{
          headerTitle: () => <HeaderTitle store={stores?.taskListStore} />,
        }}
        name="TaskListView">
        {props => <TaskListView store={stores.taskListStore} {...props} />}
      </Stack.Screen>
      <Stack.Screen
        options={{
          headerTitle: () => <HeaderTitle store={stores?.taskStore} />,
        }}
        name="TaskView">
        {props => <TaskView store={stores.taskStore} {...props} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
});

// Home Drawer Item

const HomeListStackNavigator = (): React.JSX.Element => {
  const stores = useStore();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
      }}>
      <Stack.Screen
        name="FarmListView"
        options={{
          headerTitle: () => <HeaderTitle store={stores.farmListStore} />,
          headerStyle: {
            backgroundColor: '#ffffff',
          },
          headerTintColor: appColors.darkGreen,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}>
        {props => (
          <FarmTaskListView text={'Hello Farm Task List View'} {...props} />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

// Task Admin Drawer Stack

const TaskAdminStackNavigator = (): React.JSX.Element => {
  return (
    <Stack.Navigator
      screenOptions={
        {
          // headerShown: false,
        }
      }>
      <Stack.Screen
        name="Task Admin View"
        options={{
          headerStyle: {
            backgroundColor: '#ffffff',
          },
          headerTintColor: appColors.darkGreen,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}>
        {props => <TaskAdminView text={'Hello ZonelistView'} {...props} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

// Zone Admin Drawer Stack

const ZoneStackNavigator = (): React.JSX.Element => {
  return (
    <Stack.Navigator
      screenOptions={
        {
          // headerShown: false,
        }
      }>
      <Stack.Screen
        name="Zone List View"
        options={{
          headerStyle: {
            backgroundColor: '#ffffff',
          },
          headerTintColor: appColors.darkGreen,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}>
        {props => <ZoneListView text={'Hello ZonelistView'} {...props} />}
      </Stack.Screen>
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
        {props => <ZoneView text={'Hello ZoneView'} {...props} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

// Drawer

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
      <Drawer.Screen name="Tasks" component={TaskAdminStackNavigator} />
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
