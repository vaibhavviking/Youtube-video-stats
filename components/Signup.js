import React, { useState } from 'react'
import { Container, Header, Content, Form,Toast, Button,Text, Item, Input, Label } from 'native-base';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    
    StatusBar,
    TextInput,
    Alert
  } from 'react-native';

  import {Formik} from 'formik';

  import {useAuth} from '../context/authContext'

export default function HandleSubmit({navigation}) {
    const {createUser, currentUser}  =  useAuth();
    const [email,setEmail] = useState();
    const [password,setPassword] = useState();
    const [error , setError] = useState('');
    async function HandleSubmit() {
        try{
            setError('');
            await createUser(email,password);
            // console.log(email,password);
        }catch{
            setError('Could not create User. ');
        }
    }
    return (
        <>
            <Container style={{padding: 10}}>
        
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
            <Text>Sign Up</Text>
            </Button>
            <Button onPress={() => navigation.navigate('login' , {title:'Login'})} danger >
            <Text>Go to Log In</Text>
          </Button>
            </View>
          </Form>
          <Text style={{alignSelf: 'center', marginTop: 10}} >Minimum Password Length is 6</Text>
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