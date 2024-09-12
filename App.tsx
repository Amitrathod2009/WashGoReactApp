import React, { useEffect } from 'react';
import SignIn from './src/components/SignIn';
import SignUp from './src/components/SignUp';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from './src/components/WelcomeScreen';
import StartScreen from './src/components/StartScreen';
import SplashScreen from 'react-native-splash-screen';

const Stack = createNativeStackNavigator();
const App = () => {

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName="StartScreen" >
      <Stack.Screen name="SignIn" component={SignIn} options={{headerShown: false}}  />
      <Stack.Screen name="SignUp" component={SignUp} options={{headerShown: false}} />
      <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} options={{headerShown: false}} />
      <Stack.Screen name="StartScreen" component={StartScreen} options={{headerShown: false}} />
    </Stack.Navigator>
  </NavigationContainer>
  );
};
export default App;