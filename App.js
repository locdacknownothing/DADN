import './polyfills';
// import 'react-native-gesture-handler'
import { Provider } from 'react-native-paper'
import { NavigationContainer } from '@react-navigation/native'
import { theme } from './src/core/theme'
import AuthStackNavigator from './src/navigators/AuthStackNavigator'
// import DrawerNavigator from './src/navigators/DrawerNavigator'
import { EmployeeList } from './src/screens';

export default function App() {
  return (
    <Provider theme={theme}>
      <NavigationContainer>
        <EmployeeList/>
        {/* <AuthStackNavigator /> */}
      </NavigationContainer>
    </Provider>
  )
}