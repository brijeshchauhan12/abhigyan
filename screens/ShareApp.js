import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Share, Image, ActivityIndicator } from 'react-native';
import TopHeader from '../components/topheader';
import Const from '../components/constant'

const ShareApp = ({navigation}) => {
  const [sharedata, setShareData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const getShareData =()=>{
      setError(null)
      setLoading(true)
      let details = {
        school_id:Const.school_id
      }

      let formBody = [];
      for (let property in details) {
          let encodedKey = encodeURIComponent(property);
          let encodedValue = encodeURIComponent(details[property]);
          formBody.push(encodedKey + "=" + encodedValue);
      }
      formBody = formBody.join("&");

      fetch('http://ais.omsai.info/api/v1/share_url', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: formBody
      }).then(res => res.json()).then((res)=>{
          if(res.status != 200){
              setError(JSON.stringify(res.message))
          }else{
            setShareData(res.data);
          }
          setLoading(false)
          
      }).catch((err)=>{
          setError(err.message)
          setLoading(false)
      })
  }

  const Sharebtn = async () => {
    try {
      const result = await Share.share({
        message:sharedata ? sharedata.message+"\n"+sharedata.url :'',
        title:sharedata ? sharedata.title: '',
        url:sharedata ? sharedata.url : ''
      });

      if (result.action === Share.sharedAction) {
        Alert.alert('SUCCESS', 'Post Shared', [{ text: 'Okay' }]);
      } else if (result.action === Share.dismissedAction) {
        setError('Post Cancelled');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(()=>{
    if(sharedata == null){
      getShareData();
    }
  },[sharedata]);

  useEffect(()=>{
    if(error){
      Alert.alert('An Error Occurred!', error, [{ text: 'Okay' }]);
    }
  },[error])

  return (
    <View style={{flex:1}}>
      <TopHeader title="Share App"/>
      <View style={styles.container}>
        {loading ?
          <ActivityIndicator size="large"/>
          :
        <View style={styles.card}>
          <Image style={styles.thumb}  source={require('../assets/app_screen.png')}/>
          <Text style={styles.h1}>{sharedata && sharedata.title}</Text>
          <Text style={styles.body}>{sharedata && sharedata.message}</Text>
          <TouchableOpacity style={styles.shareBtn} onPress={()=>Sharebtn()}>
            <Text style={styles.shareTxt}>SHARE</Text>
          </TouchableOpacity>
        </View>
        }
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card:{
    width:"80%",
    borderRadius:10,
    borderColor:"lightgray",
    borderWidth:1,
    justifyContent:"center",
    alignItems: 'center',

  },
  h1:{
    fontWeight:"bold",
    fontSize:30,
    color:"#000",
    margin:15,
  },
  body:{
    color:"#000",
    paddingHorizontal:10,
    textAlign:"justify",
    padding:10
    
  },
  thumb:{
    // width:"100%",
    height:260,
    marginBottom:10,
    borderTopLeftRadius:10,
    borderTopRightRadius:10
  },
  shareBtn:{
    margin:10,
    backgroundColor:"#C53030",
    padding:10,
    width:"80%",
    borderRadius:20,
  },
  shareTxt:{
    fontSize:20,
    color:"#fff",
    alignSelf:"center"
  }
});

export default ShareApp;