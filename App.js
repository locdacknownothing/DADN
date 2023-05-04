import './polyfills';
// import 'react-native-gesture-handler'
import { Provider } from 'react-native-paper'
import { NavigationContainer } from '@react-navigation/native'
import { theme } from './src/core/theme'
import AuthStackNavigator from './src/navigators/AuthStackNavigator'
// import DrawerNavigator from './src/navigators/DrawerNavigator'
import { EmployeeList, StatisticScreen, EmployeeInfo, TimesheetScreen } from './src/screens';

export default function App() {
  return (
    <Provider theme={theme}>
      <NavigationContainer>
        <AuthStackNavigator />
        {/* <EmployeeList/> */}
        {/* <EmployeeInfo/> */}
        {/* <TimesheetScreen/> */}
      </NavigationContainer>
    </Provider>
  )
}