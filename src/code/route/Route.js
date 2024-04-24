import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';
import { COLOR_CODE } from '../constants/general-css';
import PaymentDetails from '../screens/PaymentDetails';
import UpdateGuess from '../screens/UpdateGuess';

const Navigator = () => {
    const Stack = createNativeStackNavigator();

    const headerOptions = (title) => ({
        title,
        headerTintColor: 'white',
        headerStyle: {
            color: 'white',
            backgroundColor: COLOR_CODE.primary,
        },
        headerTitleAlign: 'center',
    });

    return (
        <NavigationContainer>
            <Stack.Navigator initialNavigatorName="Home">
                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    options={headerOptions('Home')}

                />
                <Stack.Screen
                    name="Details"
                    component={PaymentDetails}
                    options={headerOptions('Payment Details')}
                />
                <Stack.Screen
                    name="Update"
                    component={UpdateGuess}
                    options={headerOptions('Tambah Data Tamu')}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Navigator;
