import React,{useState, useEffect} from 'react'
var moment = require('moment');
import { Container, Header, Content, List, ListItem, Text } from 'native-base';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Button,
    Image,
    StatusBar,
    TextInput,
    Alert
  } from 'react-native';
export default function VideoData({data}) {
  // console.log('here',data);
    if(data['items'].length == 0){
      return (
        <Text style={styles.error} >Please Enter a valid url</Text>
      );
    }else{
      let durationiso = data['items'][0]['contentDetails']['duration'];
      let temp = moment.duration(durationiso);
      let duration = '';
      if(temp.hours() > 0){
        if(temp.hours() <10){
          duration += '0';
        }
        duration += temp.hours() + ':';
      }
      if(temp.minutes() < 10){
        duration += '0'
      }
      duration += temp.minutes() + ':';

      if(temp.seconds() <10){
        duration+= '0';
      }
      duration += temp.seconds();

      console.log('duration',duration);
      return (
        
        < View style= {{marginTop:30}}>
        <Image 
             style={{ width: 125, height: 125, alignSelf: "center" }}
             source={{uri : data['items'][0]['snippet']['thumbnails']['default']['url']}} />
               <Text style={styles.info}>
               Title :  { data['items'][0]['snippet']['title']}
            </Text > 
            <Text style={styles.header} >
            STATISTICS
            </Text>
            <Text style={styles.info}>
            Views :  { data['items'][0]['statistics']['viewCount'].replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </Text> 
            <Text style={styles.info}>
               Likes :  { data['items'][0]['statistics']['likeCount'].replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </Text> 
            <Text style={styles.info}>
               Dislikes :  { data['items'][0]['statistics']['dislikeCount'].replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </Text> 
            <Text style={styles.info}>
               Comments :  { data['items'][0]['statistics']['commentCount'].replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </Text>
             <View style={{borderBottomWidth:1}} ></View>
             <Text style={styles.header} >
                MISCELLANEOUS
            </Text>
             <Text style={styles.info}>
               Uploaded By :  { data['items'][0]['snippet']['channelTitle']}
            </Text> 
             <Text style={styles.info}>
               Uploaded On :  { data['items'][0]['snippet']['publishedAt'].slice(0,10)}
            </Text> 
             <Text style={styles.info}>
               Duration :  { duration}
            </Text> 
           
             
        </View>
      
      )
    }
}

const styles = StyleSheet.create({
    info:{
        alignSelf:"center",
        margin: 5
    },
    header:{
        fontSize: 25, 
        margin: 10 ,
         alignSelf: "center",
          textDecorationLine:"underline" ,
          fontWeight: "bold"
    },
    error : {
      color: "white",
      padding: 5 ,
      borderRadius: 5,
      alignSelf: 'center',
      margin: 10,
      backgroundColor: "red"
  }
})

