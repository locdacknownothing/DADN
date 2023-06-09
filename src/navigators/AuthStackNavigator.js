import React from 'react';
import { View, Text, Button } from 'react-native';
import { createStackNavigator } from "@react-navigation/stack"
import {
  StartScreen,
  LoginScreen,
  RegisterScreen,
  ResetPasswordScreen,
  StatisticDetail,
  EmployeeInfo,
} from '../screens'
import DrawerNavigator from './DrawerNavigator';

export default function AuthStackNavigator() {
  const Stack = createStackNavigator()

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}> 
      <Stack.Screen name="StartScreen" component={StartScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
      <Stack.Screen name="ResetPasswordScreen" component={ResetPasswordScreen}/>
      <Stack.Screen
        name={"HomeScreen"}
        component={DrawerNavigator}
      />
      <Stack.Screen
        name={"StatisticDetail"}
        component={StatisticDetail}
        options={{
          headerShown: true,
          title: "Biểu đồ thống kê chi tiết",
        }}
      />
      <Stack.Screen
        name={"EmployeeInfo"}
        component={EmployeeInfo}
        options={{
          headerShown: true,
          title: "Bảng chấm công nhân viên",
        }}
      />
      {/* <Stack.Screen
        name={"Quản lý thiết bị"}
        component={DrawerNavigator}
      /> */}
      {/* <Stack.Screen
        name={"TimesheetScreen"}
        component={DrawerNavigator}
      />
      <Stack.Screen
        name={"EmployeeList"}
        component={DrawerNavigator}
      />
      <Stack.Screen
        name={"StatisticScreen"}
        component={DrawerNavigator}
      />
      <Stack.Screen
        name={"Settings"}
        component={DrawerNavigator}
      /> */}
    </Stack.Navigator>
  );
}