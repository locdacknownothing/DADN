import React from 'react'
import { View, StyleSheet } from 'react-native'
import { 
  createDrawerNavigator, 
  DrawerContentScrollView,
  DrawerItemList  
} from '@react-navigation/drawer'
import { 
  HomeScreen, 
  ProfileScreen, 
  TimesheetScreen, 
  EmployeeList, 
  StatisticScreen, 
  Settings,
  ManageDevice
} from '../screens'
import CustomDrawer from '../components/CustomDrawer'
import { theme } from '../core/theme'

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <View style={{ flex: 1 }}>
        <DrawerItemList {...props} />
      </View>
    </DrawerContentScrollView>
  )
}

const Drawer = createDrawerNavigator()

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Trang chủ" component={HomeScreen} />
      <Drawer.Screen name="Thông tin cá nhân" component={ProfileScreen} />
      <Drawer.Screen name="Bảng chấm công" component={TimesheetScreen} />
      <Drawer.Screen name="Danh sách nhân viên" component={EmployeeList} />
      <Drawer.Screen name="Biểu đồ thống kê" component={StatisticScreen} />
      <Drawer.Screen name="Cài đặt" component={Settings} />
      <Drawer.Screen name="Quản lý thiết bị" component={ManageDevice} />
    </Drawer.Navigator>
  )
}