import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  ActivityIndicator
} from 'react-native';
import {useSelector,useDispatch} from 'react-redux';
import TopHeader from '../components/topheader';

export default Notifications=({route,navigation})=>{
  const [selectedId, setSelectedId] = useState(null);
  const [notification, setNotification] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const user = useSelector(state => state.Auth.userdata);

  const getNotifications = () =>{
    setLoading(null)
    setError(null)
    let details = {
      student_id: user.st_id
    }

    let formBody = [];
    for (let property in details) {
        let encodedKey = encodeURIComponent(property);
        let encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    fetch('http://ais.omsai.info/api/v1/notification_list', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formBody
      }).then(res => res.json()).then(res => {
        if(res.status != 200){
          setError(JSON.stringify(res.message))
        }else{
          setNotification(res.data)
        }
        setLoading(false)
      }).catch(err=>{
        setError(err.message)
        setLoading(false)
      })
  }

  useEffect(()=>{
    if(notification.length == 0){
      getNotifications()
    }
  },[notification])

    return (
      <View>
      <TopHeader page="tab" title="Notifications"/>
        {loading ?
          <ActivityIndicator size="large" />
          :
        <FlatList
          style={styles.root}
          data={notification}
          extraData={selectedId}
          ItemSeparatorComponent={() => {
            return (
              <View style={styles.separator}/>
            )
          }}
          keyExtractor={(item)=>{
            return item.id.toString();
          }}
          renderItem={(item) => {
            const Notification = item.item;
            let attachment = <View/>;

            let mainContentStyle;
            if(Notification.attachment) {
              mainContentStyle = styles.mainContent;
              attachment = <Image style={styles.attachment} source={{uri:Notification.attachment}}/>
            }
            return(
              <TouchableOpacity onPress={() => setSelectedId(item.id)}>
                <View style={styles.container}>
                  <Image source={require('../assets/notification.png')} style={styles.avatar}/>
                  <View style={styles.content}>
                    <View style={mainContentStyle}>
                      <View style={styles.text}>
                        <Text style={styles.name}>{Notification.title}</Text>
                        <Text>{Notification.body}</Text>
                      </View>
                      <Text style={styles.timeAgo}>
                        2 hours ago
                      </Text>
                    </View>
                    {attachment}
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}/>
        }
        </View>
    );
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: "#FFFFFF"
  },
  container: {
    padding: 16,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: "#FFFFFF",
    alignItems: 'flex-start'
  },
  avatar: {
    width:50,
    height:50,
    borderRadius:25,
  },
  text: {
    marginBottom: 5,
    flexDirection: 'row',
    flexWrap:'wrap'
  },
  content: {
    flex: 1,
    marginLeft: 16,
    marginRight: 0
  },
  mainContent: {
    marginRight: 60
  },
  img: {
    height: 50,
    width: 50,
    margin: 0
  },
  attachment: {
    position: 'absolute',
    right: 0,
    height: 50,
    width: 50
  },
  separator: {
    height: 1,
    backgroundColor: "#CCCCCC"
  },
  timeAgo:{
    fontSize:12,
    color:"#696969"
  },
  name:{
    fontSize:16,
    color:"#1E90FF"
  }
}); 