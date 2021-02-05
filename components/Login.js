import React, { useState } from 'react'
import { Container, Header, Content, Form,Toast, Button,Text, Item, Input, Label } from 'native-base';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    // Button,
    // Text,
    StatusBar,
    TextInput,
    Alert
  } from 'react-native';

  import {Formik} from 'formik';

  import {useAuth} from '../context/authContext'
import { ceil } from 'react-native-reanimated';

export default function Login({navigation}) {
    const {createUser, currentUser,logIn}  =  useAuth();
    const [email,setEmail] = useState();
    const [password,setPassword] = useState();
    const [error,setError] = useState('');
    
    async function HandleSubmit() {

        try{
            setError('');
            await logIn(email,password);
            
        }catch{
           setError('Wrong Username Or Password');
           console.log('Wrong Username Or Password');
          //  Toast.show({
          //   text: 'Wrong Username Or Password',
          //   buttonText: 'Okay'
          // })
        }
        
    }
    return (
        <>
        {/* <View>
            <TextInput placeholder="email"   type='email' title='Email' />
            <TextInput onChange={(e) => setPassword(e.nativeEvent.text)} type='password' placeholder="password" title='Password'/>
            <Button title="Log In" onPress={HandleSubmit} />
            <Button title="Go to Sign Up" onPress={() => navigation.navigate('signup' , {title:'welcome'})} />
        </View> */}
        {/* <Header/> */}
        <Container>
        
        <Content>
          <Form>
            <Item floatingLabel>
              <Label>Username</Label>
              <Input onChange={e => setEmail(e.nativeEvent.text)} />
            </Item>
            <Item floatingLabel last>
              <Label>Password</Label>
              <Input onChange={(e) => setPassword(e.nativeEvent.text)} />
            </Item>
            {error ? <Text style={styles.error} >{error}</Text> : null}
            <View style={styles.loginSection} >
            <Button onPress={HandleSubmit} success>
            <Text>Log In</Text>
            </Button>
            <Button onPress={() => navigation.navigate('signup' , {title:'Sign Up'})} danger >
            <Text>Go to Sign Up</Text>
          </Button>
            </View>
          </Form>
        </Content>
      </Container>
     </>
    )
}

const styles = StyleSheet.create({
  
  loginSection:{
    flex:1,
    flexDirection:"row",
    justifyContent: "space-evenly",
    marginTop: 30
  },
  error:{
    color: "white",
    padding: 5 ,
    borderRadius: 5,
    alignSelf: 'center',
    margin: 10,
    backgroundColor: "red"
  }
})
