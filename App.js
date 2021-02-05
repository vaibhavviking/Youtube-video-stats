/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import React,{useState,useRef} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Button,
  Text,
  StatusBar,
  TextInput
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import Signup from './components/Signup'
import {AppNavigator} from './routes/AppNavigator'
import {NavigationContainer} from '@react-navigation/native'
import {AuthProvider} from './context/authContext'

const App = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef();

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState('');

  function HandleSubmit(){
    console.log(email,password);
    emailRef.current.value='joker';
    emailRef.current.focus();
    return;
  }

  function emailChange(e){
    setEmail(e.nativeEvent.text)
    return;
  }

  function passwordChange(e){
    setPassword(e.nativeEvent.text)
    return;
  }
  

  return (
    <>
      {/* <TextInput placeholder="email" onChange={e => console.log(e.nativeEvent.text)} type='email' title='Email' />
            <TextInput onChange={(e) => console.log(e.nativeEvent.text)} type='password' placeholder="password" title='Password'/>
          <Button title="sign up" onPress={HandleSubmit} /> */}
    <NavigationContainer>
    <AuthProvider>
          <AppNavigator></AppNavigator>
    </AuthProvider>
    </NavigationContainer>

    </>
  );
};



export default App;
