import { createStackNavigator } from "@react-navigation/stack"
import {
  StartScreen,
  LoginScreen,
  RegisterScreen,
  ResetPasswordScreen,
} from '../screens'
import DrawerNavigator from './DrawerNavigator';

export default function AuthStackNavigator() {
  const Stack = createStackNavigator()

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}> 
      <Stack.Screen name="StartScreen" component={StartScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
      <Stack.Screen
        name="ResetPasswordScreen"
        component={ResetPasswordScreen}
      />
      <Stack.Screen
        name={"HomeScreen"}
        component={DrawerNavigator}
      />
      <Stack.Screen
        name={"ProfileScreen"}
        component={DrawerNavigator}
      />
    </Stack.Navigator>
  );
}