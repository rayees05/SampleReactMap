import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MapViewPage from '../screens/map';
import LocationList from '../screens/locationlist';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {View} from 'react-native';
const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="MapViewPage"
      screenOptions={({route}) => ({
        activeTintColor: '#383CC1',
        inactiveTintColor: '#E8BD0D',
        activeBackgroundColor: '#fff',
        inactiveBackgroundColor: '#000000',
        tabBarShowLabel: false,
        // tabBarLabelStyle: {fontSize: 20, paddingBottom: 10},
        labelStyle: {fontSize: 15},
        // tabBarBadge: 'retr',
        header: () => null,
        tabBarIcon: () => null,
        tabBarIcon: ({focused, size, color}) => {
          let iconname;
          if (route.name === 'MapViewPage') {
            iconname = 'map';
            size = focused ? 25 : 22;
            color = focused ? '#383CC1' : '#000000';
          } else if (route.name === 'LocationList') {
            iconname = 'list';
            size = focused ? 25 : 22;
            color = focused ? '#383CC1' : '#000000';
          }
          return <FontAwesome name={iconname} size={size} color={color} />;
        },
      })}
      tabBarOption={{
        activeTintColor: 'black',
        showLabel: false,
      }}>
      <Tab.Screen name="MapViewPage" component={MapViewPage} />
      <Tab.Screen name="LocationList" component={LocationList} />
    </Tab.Navigator>
  );
}

export default MyTabs;
