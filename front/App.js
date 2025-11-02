import './gesture-handler';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { PaperProvider } from 'react-native-paper';

import HomeScreen from './screens/HomeScreen';
import FinanceiroAluno from './screens/FinanceiroAluno';
import PesquisaAluno from './screens/PesquisaAluno';
import DetalhesAluno from './screens/DetalhesAluno';
import CadastrarAluno from './screens/CadastrarAluno';
import Agenda from './screens/Agenda';
import Login from './screens/Login';
import Registro from './screens/Registro';

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
          <Drawer.Screen name="FinanceiroAluno" component={FinanceiroAluno} />
          <Drawer.Screen name="PesquisaAluno" component={PesquisaAluno} />
          <Drawer.Screen
            name="DetalhesAluno"
            component={DetalhesAluno}
            options={{ drawerItemStyle: { display: 'none' } }}
          />
          <Drawer.Screen
            name="CadastrarAluno"
            component={CadastrarAluno}
            options={{ drawerItemStyle: { display: 'none' } }}
          />
          <Drawer.Screen name="Agenda" component={Agenda} />
          <Drawer.Screen
            name="Login"
            component={Login}
            options={{
              headerShown: false,
              drawerItemStyle: { display: 'none' },
            }}
          />
          <Drawer.Screen
            name="Registro"
            component={Registro}
            options={{
              headerShown: false,
              drawerItemStyle: { display: 'none' },
            }}
          />
        </Drawer.Navigator>

        {/* Placeholder para confirmar carregamento na web (visibilidade) */}
        <View style={styles.centerContent}>
          <Text>Expo Web!</Text>
        </View>
      </NavigationContainer>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
