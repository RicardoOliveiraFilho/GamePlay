import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { theme } from "../global/styles/theme";
import { AppointmentCreate } from "../screens/AppointmentCreate";
import { AppointmentDetails } from "../screens/AppointmentDetails";
import { Home } from '../screens/Home';

const { Screen, Navigator } = createNativeStackNavigator();

export function AppRoutes() {
  const optionsScreen = {
    headerShown: false,
    contentStyle: {
      backgroundColor: theme.colors.secondary100
    }
  }

  return (
    <Navigator>
      <Screen
        name="Home"
        component={Home}
        options={optionsScreen}
      />
      <Screen
        name="AppointmentDetails"
        component={AppointmentDetails}
        options={optionsScreen}
      />
      <Screen
        name="AppointmentCreate"
        component={AppointmentCreate}
        options={optionsScreen}
      />
    </Navigator>
  ); 
}