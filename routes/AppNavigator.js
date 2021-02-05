import React from 'react';
import {NavigationContainer, StackActions} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Signup from '../components/Signup';
import Profile from '../components/Profile';
import Login from '../components/Login';
import {useAuth} from '../context/authContext'

const Stack = createStackNavigator();

export const AppNavigator = ({navigation}) => {
    const {currentUser} = useAuth();
    return(
        currentUser?
            
                <Stack.Navigator>
                    <Stack.Screen
                    name="profile"
                    component={Profile}
                    options={{title : "Logged In"}}
                    >
                    </Stack.Screen>
                </Stack.Navigator>
            
        :
           
                <Stack.Navigator>
                    <Stack.Screen
                        name="login"
                        component = {Login}
                        options={{title : 'Login'}}
                    >
                    </Stack.Screen>
                    <Stack.Screen
                        name="signup"
                        component={Signup}
                        options={{title : 'Sign up'}}
                    >
                        
                    </Stack.Screen>
                </Stack.Navigator>
            
        
    )
}