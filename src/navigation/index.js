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

export const RoutesName = {
  Login: 'Login',
  Home1: 'Home',
  ForgetPassword: 'ForgetPassword',
  Register: 'Register',
};

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName="Login">
        <RootStack.Screen
          key={RoutesName.Login}
          name={RoutesName.Login}
          component={Login}
        />
        <RootStack.Screen
          // key={RoutesName.Home1}
          name={RoutesName.Home1}
          component={Home}
        />
        <RootStack.Screen name="Account" component={Account} />
        <RootStack.Screen name={RoutesName.Register} component={Register} />
        <RootStack.Screen
          // key={RoutesName.ForgetPassword}
          name={RoutesName.ForgetPassword}
          component={ForgetPassword}
        />
        <RootStack.Screen name="ResetPassword" component={ResetPassword} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
