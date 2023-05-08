import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Button, Image } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { 
  HomeScreen, 
  ProfileScreen, 
  TimesheetScreen, 
  EmployeeList, 
  StatisticScreen, 
  Settings,
  ManageDevice
} from '../screens'
import { theme } from '../core/theme'
import { Avatar, Icon } from 'react-native-elements'
import CustomDrawer from '../components/CustomDrawer'
import BackButton from '../components/BackButton'
// import TextInput from '../../components/TextInput'

const Drawer = createDrawerNavigator()

export default function DrawerNavigator({ route }) {
  const user = route.params.user;
  // console.log("Drawer: ", user)
  const userRole = user.role;

  return (
    <Drawer.Navigator 
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        drawerActiveBackgroundColor: theme.colors.primary,
        drawerActiveTintColor: theme.colors.white,
        drawerInactiveTintColor: theme.colors.text,
      }}
    >
      <Drawer.Screen 
        name="Trang chủ" 
        component={HomeScreen} 
        options={{
          drawerIcon: ({focused}) => (
            <Icon name="home" type='feather' size={18} color={focused ? theme.colors.white: theme.colors.text} />
          ),
        }}
        initialParams={user}
      />
      <Drawer.Screen 
        name="Thông tin cá nhân" 
        initialParams={user}
        component={ProfileScreen}
        options={({ navigation }) => ({
          drawerIcon: ({focused}) => (
            <Icon name="user" type='feather' size={18} color={focused ? theme.colors.white: theme.colors.text}/>
          ),
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.goBack()} style={{right: 20,}}>
              <Image
                style={{width: 24, height: 24,}}
                source={require('../assets/arrow_back.png')}
              />
            </TouchableOpacity>
          ),
        })}
        />
      <Drawer.Screen 
        name="Quản lý thiết bị" 
        initialParams={user}
        component={ManageDevice} 
        options={({ navigation }) => ({
          drawerIcon: ({focused}) => (
            <Icon name="bulb" type="ionicon" size={18} color={focused ? theme.colors.white: theme.colors.text}/>
          ),
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.goBack()} style={{right: 20,}}>
              <Image
                style={{width: 24, height: 24,}}
                source={require('../assets/arrow_back.png')}
              />
            </TouchableOpacity>
          ),
        })}
      />
      <Drawer.Screen 
        name="Bảng chấm công" 
        component={TimesheetScreen}
        initialParams={user}
        options={({ navigation }) => ({
          drawerIcon: ({focused}) => (
            <Icon name="calendar" type='feather' size={18} color={focused ? theme.colors.white: theme.colors.text}/>
            ),
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.goBack()} style={{right: 20,}}>
              <Image
                style={{width: 24, height: 24,}}
                source={require('../assets/arrow_back.png')}
              />
            </TouchableOpacity>
          ),
        })} />
      {userRole === 1 ? (
      <Drawer.Screen 
        name="Danh sách nhân viên" 
        component={EmployeeList}
        initialParams={user}
        options={({ navigation }) => ({
          drawerIcon: ({focused}) => (
            <Icon name="list" type='feather' size={18} color={focused ? theme.colors.white: theme.colors.text}/>
            ),
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.goBack()} style={{right: 20,}}>
              <Image
                style={{width: 24, height: 24,}}
                source={require('../assets/arrow_back.png')}
              />
            </TouchableOpacity>
          ),
        })} />
      ) : null}

      {userRole === 1 ? (
      <Drawer.Screen 
        name="Biểu đồ thống kê" 
        component={StatisticScreen}
        options={({ navigation }) => ({
          drawerIcon: ({focused}) => (
            <Icon name="bar-chart-2" type='feather' size={18} color={focused ? theme.colors.white: theme.colors.text}/>
            ),
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.goBack()} style={{right: 20,}}>
              <Image
                style={{width: 24, height: 24,}}
                source={require('../assets/arrow_back.png')}
              />
            </TouchableOpacity>
          ),
        })} />
      ) : null}
    
      <Drawer.Screen 
        name="Cài đặt" 
        initialParams={user}
        component={Settings} 
        options={({ navigation }) => ({
          drawerIcon: ({focused}) => (
            <Icon name="settings" type='feather' size={18} color={focused ? theme.colors.white: theme.colors.text}/>
            ),
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.goBack()} style={{right: 20,}}>
              <Image
                style={{width: 24, height: 24,}}
                source={require('../assets/arrow_back.png')}
              />
            </TouchableOpacity>
          ),
        })} />
    </Drawer.Navigator>
  )
}