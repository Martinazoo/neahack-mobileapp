import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const _Layout = () => {
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: '#007AFF',   // color cuando está activo (azul)
                tabBarInactiveTintColor: '#8E8E93', // color cuando está inactivo (gris)
                tabBarStyle: {
                    backgroundColor: '#1e1e1e', // color de fondo oscuro para la barra
                    borderTopWidth: 0,          // elimina el borde superior
                    paddingTop: 5,          // padding superior para la barra
                },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    headerShown: false,
                    tabBarIcon: ({ focused, color, size }) => (
                        <Ionicons name={focused ? 'home' : 'home-outline'} size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="model"
                options={{
                    title: 'Model',
                    headerShown: false,
                    tabBarIcon: ({ focused, color, size }) => (
                        <Ionicons name={focused ? 'airplane' : 'airplane-outline'} size={size} color={color} />
                    ),
                }}
            />

            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Profile',
                    headerShown: false,
                    tabBarIcon: ({ focused, color, size }) => (
                        <Ionicons name={focused ? 'person' : 'person-outline'} size={size} color={color} />
                    ),
                }}
            />

            <Tabs.Screen
                name="logout"
                options={{
                    title: 'Logout',
                    headerShown: false,
                    tabBarIcon: ({ focused, color, size }) => (
                        <Ionicons name={focused ? 'log-out' : 'log-out-outline'} size={size} color={color} />
                    ),
                }}
            />
        </Tabs>
    );
};

export default _Layout;
