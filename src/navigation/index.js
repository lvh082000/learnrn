import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import Home from '../screens/home';
import Login from '../screens/login';
import Account from '../screens/account';
import Register from '../screens/register';
import ForgetPassword from '../screens/forgetPassword';
import ResetPassword from '../screens/resetPassword';

const RootStack = createNativeStackNavigator();

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName="ForgetPassword">
        <RootStack.Screen name="Login" component={Login} />
        <RootStack.Screen name="Home" component={Home} />
        <RootStack.Screen name="Account" component={Account} />
        <RootStack.Screen name="Register" component={Register} />
        <RootStack.Screen name="ForgetPassword" component={ForgetPassword} />
        <RootStack.Screen name="ResetPassword" component={ResetPassword} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
