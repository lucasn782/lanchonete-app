import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';
import HomeScreen from './screens/HomeScreen';
import ProductsScreen from './screens/ProductsScreen';
import SalesScreen from './screens/SalesScreen';
import StockScreen from './screens/StockScreen';
import ReportsScreen from './screens/ReportsScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerShown: true }}>
        <Tab.Screen 
          name="Início" 
          component={HomeScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <Image 
                source={require('../assets/home.png')} 
                style={{ width: 24, height: 24, opacity: focused ? 1 : 0.5 }} 
              />
            ),
          }}
        />
        <Tab.Screen 
          name="Produtos" 
          component={ProductsScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <Image 
                source={require('../assets/produto.png')} 
                style={{ width: 24, height: 24, opacity: focused ? 1 : 0.5 }} 
              />
            ),
          }}
        />
        <Tab.Screen 
          name="Vendas" 
          component={SalesScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <Image 
                source={require('../assets/vendas.png')} 
                style={{ width: 24, height: 24, opacity: focused ? 1 : 0.5 }} 
              />
            ),
          }}
        />
        <Tab.Screen 
          name="Estoque" 
          component={StockScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <Image 
                source={require('../assets/estoque.png')} 
                style={{ width: 24, height: 24, opacity: focused ? 1 : 0.5 }} 
              />
            ),
          }}
        />
        <Tab.Screen 
          name="Relatórios" 
          component={ReportsScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <Image 
                source={require('../assets/relatório.png')} 
                style={{ width: 24, height: 24, opacity: focused ? 1 : 0.5 }} 
              />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
