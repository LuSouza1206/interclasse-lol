import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'; // Biblioteca de ícones mágica do Expo!

// Importando as nossas 4 telas
import Calendario from './src/screens/Calendario';
import Tabela from './src/screens/Tabela';
import Times from './src/screens/Times';
import Perfil from './src/screens/Perfil';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          // Isso aqui DESLIGA aquele cabeçalho gigante feio de todas as telas!
          headerShown: false, 
          
          // Configurando os ícones de cada aba
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Calendário') {
              iconName = focused ? 'calendar' : 'calendar-outline';
            } else if (route.name === 'Tabela') {
              iconName = focused ? 'trophy' : 'trophy-outline';
            } else if (route.name === 'Times') {
              iconName = focused ? 'shield' : 'shield-outline';
            } else if (route.name === 'Perfil') {
              iconName = focused ? 'person' : 'person-outline';
            }

            // Retorna o ícone escolhido com a cor e tamanho corretos
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          
          // Cores da barra de navegação
          tabBarActiveTintColor: '#C89B3C', // Dourado quando está selecionado
          tabBarInactiveTintColor: '#A09B8C', // Cinza/dourado escuro quando inativo
          tabBarStyle: {
            backgroundColor: '#091428', // Fundo azul escuro padrão LoL
            borderTopColor: '#1E2328', // Cor da linha divisória
            height: 60,
            paddingBottom: 8,
            paddingTop: 8,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: 'bold',
          }
        })}
      >
        <Tab.Screen name="Calendário" component={Calendario} />
        <Tab.Screen name="Tabela" component={Tabela} />
        <Tab.Screen name="Times" component={Times} />
        <Tab.Screen name="Perfil" component={Perfil} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}