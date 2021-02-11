import React, { useEffect, useState } from 'react';
import { Video } from 'expo-av';
import VideoPlayer from 'expo-video-player'
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import TopHeader from '../components/topheader';
import Const from '../components/constant'

const ShortVideo = ({navigation}) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [video, setVideo] = useState(null);
  const getVideo = () =>{
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

    fetch('http://ais.omsai.info/api/v1/short_video', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: formBody
    }).then(res => res.json()).then((res)=>{
        if(res.status != 200){
            setError(JSON.stringify(res.message))
        }else{
          setVideo(res.data.video_path);
        }
        setLoading(false)
        
    }).catch((err)=>{
        setError(err.message)
        setLoading(false)
    })
  }
  useEffect(()=>{
    if(video == null){
      getVideo();
    }
  },[video]);

  useEffect(()=>{
    if(error){
      Alert.alert('An Error Occurred!', error, [{ text: 'Okay' }]);
    }
  },[error])

  return (
    <View style={{flex:1}}>
      {video &&
        <VideoPlayer
            videoProps={{
                shouldPlay: true,
                resizeMode: Video.RESIZE_MODE_CONTAIN,
                source: {uri: video},
            }}
            inFullscreen={true}
          />}
    </View>
  )
}

export default ShortVideo;