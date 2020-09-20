import 'react-native-gesture-handler';
import React from 'react';
import { View, Text, TabBarIOS } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {getColors as AppColors} from '../styles/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
    Login,
    Signup,
    MapasTab,
    CitasTab,
    CochesTab,
    PerfilTab,
    CitaView,
    CocheView,
    AñadirCita,
    AñadirCoche,
    CitasCoche,
} from '../views';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function StackNavigator(params){
    return(
        <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Login" component={Login} options={{
                headerStyle: {
                    backgroundColor: AppColors.backgrounLogin,
                    elevation: 0,              
                },
                title: "Login",
                headerTitleStyle: {
                    color: AppColors.white,
                },
            }}/>
            <Stack.Screen name="Signup" component={Signup} options={{
                headerStyle: {
                    backgroundColor: AppColors.backgrounLogin,
                    elevation: 0,              
                },
                title: "Signup",
                headerTitleStyle: {
                    color: AppColors.white,
                },
            }}/>
            <Stack.Screen name="Cita" component={CitaView} options={{
                headerStyle: {
                    backgroundColor: AppColors.backgrounLogin,
                    elevation: 0,              
                },
                title: "Cita",
                headerTitleStyle: {
                    color: AppColors.white,
                },
            }}/>
            <Stack.Screen name="Coche" component={CocheView} options={{
                headerStyle: {
                    backgroundColor: AppColors.backgrounLogin,
                    elevation: 0,              
                },
                title: "Coche",
                headerTitleStyle: {
                    color: AppColors.white,
                },
            }}/>
            <Stack.Screen name="Cita_nueva" component={AñadirCita} options={{
                headerStyle: {
                    backgroundColor: AppColors.backgrounLogin,
                    elevation: 0,              
                },
                title: "Crear cita",
                headerTitleStyle: {
                    color: AppColors.white,
                },
            }}/>
            <Stack.Screen name="Coche_nuevo" component={AñadirCoche} options={{
                headerStyle: {
                    backgroundColor: AppColors.backgrounLogin,
                    elevation: 0,              
                },
                title: "Añadir coche",
                headerTitleStyle: {
                    color: AppColors.white,
                },
            }}/>
            <Stack.Screen name="Tabs" component={TabNavigator} options={{
                headerStyle: {
                    backgroundColor: AppColors.backgrounLogin,
                    elevation: 0,
                    
                },
                title: "Menú principal",
                headerTitleStyle: {
                    color: AppColors.white,
                },
            }}/>
            <Stack.Screen name="CitasCoche" component={CitasCoche} options={{
                headerStyle: {
                    backgroundColor: AppColors.backgrounLogin,
                    elevation: 0,
                    
                },
                title: "Citas de vehículo",
                headerTitleStyle: {
                    color: AppColors.white,
                },
            }}/>
        </Stack.Navigator>
    )
}

function TabNavigator(){
    return(
        <Tab.Navigator 
            screenOptions={({ route }) => ({
                tabBarOptions:{
                    style:{
                        backgroundColor: AppColors.backgrounLogin,
                    }
                },
                tabBarIcon: ({ focused, color, size }) => {
                let iconName;
    
                if (route.name === 'Mapas') {
                    iconName = 'ios-compass';
                } else if (route.name === 'Citas') {
                    iconName = 'ios-list';
                } else if (route.name === 'Coches') {
                    iconName = 'ios-car';
                } else if (route.name === 'Perfil') {
                    iconName = 'md-settings';
                }
    
                return <Ionicons name={iconName} size={size} color={color}/>;
                },
            })}
            tabBarOptions={{
                activeTintColor: AppColors.softOrangeIcons,
                inactiveTintColor: AppColors.gray,
            }}
        >
            <Tab.Screen name="Mapas" component={MapasTab}/>
            <Tab.Screen name="Citas" component={CitasTab}/>
            <Tab.Screen name="Coches" component={CochesTab}/>
            <Tab.Screen name="Perfil" component={PerfilTab}/>
        </Tab.Navigator>
    )
}

export default function AppNavigator() {
    return(
        <NavigationContainer>
            <StackNavigator/>
        </NavigationContainer>
    )
}