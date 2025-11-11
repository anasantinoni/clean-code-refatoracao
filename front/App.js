import './gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { PaperProvider } from 'react-native-paper';

import HomeScreen from './screens/HomeScreen';
import FinanceiroAluno from './screens/FinancialReportScreen';
import PesquisaAluno from './screens/StudentSearchScreen';
import DetalhesAluno from './screens/StudentDetailsScreen';
import CadastrarAluno from './screens/StudentRegistrationScreen';
import Agenda from './screens/ScheduleScreen';
import Login from './screens/Login';
import Registro from './screens/RegisterScreen';

const Drawer = createDrawerNavigator();

const theme = {
  dark: false,
  colors: {
    primary: '#A9C9E0',
    secondary: '#0056b3',
    tertiary: '#2c2f22',
    background: 'white',
    card: 'white',
    text: 'black',
    border: 'black',
    notification: 'black',
    error: '#ff0000',
  },
};

export default function App() {
  console.log('Aplicação carregada no ambiente web (mock ativo).');

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Login">
          <Drawer.Screen name="Home" component={HomeScreen} />
          
          <Drawer.Screen name="FinancialReportScreen" component={FinanceiroAluno} />
          <Drawer.Screen name="StudentSearchScreen" component={PesquisaAluno} />
          
          <Drawer.Screen
            name="StudentDetailsScreen"
            component={DetalhesAluno}
            options={{ drawerItemStyle: { display: 'none' } }}
          />
          <Drawer.Screen
            name="StudentRegistrationScreen"
            component={CadastrarAluno}
            options={{ drawerItemStyle: { display: 'none' } }}
          />
          <Drawer.Screen name="ScheduleScreen" component={Agenda} />
          
          <Drawer.Screen
            name="Login"
            component={Login}
            options={{
              headerShown: false,
              drawerItemStyle: { display: 'none' },
            }}
          />
          <Drawer.Screen
            name="RegisterScreen"
            component={Registro}
            options={{
              headerShown: false,
              drawerItemStyle: { display: 'none' },
            }}
          />
        </Drawer.Navigator>

      </NavigationContainer>
    </PaperProvider>
  );
}