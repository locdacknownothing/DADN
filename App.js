import 'react-native-gesture-handler'
import React from 'react'
import { Provider } from 'react-native-paper'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { theme } from './src/core/theme'
import AuthStackNavigator from './src/navigators/AuthStackNavigator'

export default function App() {
  return (
    <Provider theme={theme}>
      <NavigationContainer>
        <AuthStackNavigator />
      </NavigationContainer>
    </Provider>
  )
}
