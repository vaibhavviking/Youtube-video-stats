import React, { useState } from 'react'



import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Keyboard,
    TouchableWithoutFeedback,
    StatusBar,
    TextInput,
    Alert
  } from 'react-native';

  import {Formik} from 'formik';
  import Key from '../key';
  import {useAuth} from '../context/authContext'
import { NavigationContainer } from '@react-navigation/native';
import VideoData from './VideoData';
import { Container, Header, Content, Form, Button,Text, Item, Input, Label } from 'native-base';
export default function Profile({navigation}) {
    const {createUser, currentUser,logOut}  =  useAuth();
    const [email,setEmail] = useState();
    const [password,setPassword] = useState();
    const [url,setUrl] = useState();
    const [error , setError] = useState('');
    const [vdata,setVdata] = useState(null);
    if(currentUser == null){
        navigation.navigate('login');
        return null;
    }else{

        async function Handleurl(){
            setError('');
            console.log(url)
           
            if(!url || url.indexOf('you') == -1) {
                setError('Please Enter a valid url');
            }else{
                let r, rx = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;
                r = url.match(rx);
                let id = r[1];
                let apireq = 'https://www.googleapis.com/youtube/v3/videos?id='+ id + '&part=snippet,statistics,contentDetails&key='+Key;
                
                let res = await fetch(apireq);
                let data = await res.json();
                    setVdata(data);
                    Keyboard.dismiss();
                    console.log('VDATA',vdata);
                    console.log('caught err');
                
            }
            }

        async function Handlelogout() {
            try{
                
                await logOut();
                
            }catch{
                Alert('error in adding user')
            }
        }
        return (
            <ScrollView>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false} >
            <View style={{flex:1 , padding : 20}} > 
            <Text style={{alignSelf: "center"}} >Welcome {currentUser.email}</Text>
            {/* <Button title="LogOut" onPress={Handlelogout} /> */}
            <Button style={{marginVertical:10 , alignSelf:"center"}} onPress={Handlelogout} success>
            <Text>Log Out</Text>
            </Button>
            <TextInput onChange={e => setUrl(e.nativeEvent.text)} style={{backgroundColor : "white" , marginTop: 10}} placeholder="Enter url of the youtube video" />
            <Button   style={{marginVertical:10 , alignSelf:"center"}}onPress={Handleurl} success>
            <Text>Upload URL</Text>
            </Button>
            {error ? <Text style={styles.error} >{error}</Text> : null }
            { vdata ? <VideoData data={vdata} /> : null}
        </View>
            </TouchableWithoutFeedback>
            </ScrollView>
    
    )
}
}

const styles = {
    error : {
        color: "white",
        padding: 5 ,
        borderRadius: 5,
        alignSelf: 'center',
        margin: 10,
        backgroundColor: "red"
    }
}
