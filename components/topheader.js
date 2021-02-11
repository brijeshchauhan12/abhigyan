import React, { useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {useSelector,useDispatch} from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from "react-native-vector-icons/Ionicons";
import * as  donotallow from "../store/action/auth";

const TopHeader=props=>{
  const dispatch=useDispatch()
  const navigation = useNavigation();
  const toggleDrawer = () => {
    //Props to open/close the drawer
    navigation.toggleDrawer();
  };
  const doonotallow=async()=>{
    try{
      await dispatch(donotallow.donotallowuser(null))
    }catch(error){
    }
  }
  return (
    <View style={{...styles.main, ...props.style}}>
        <LinearGradient
          colors={['#007E59', '#007E59']}
          start={[.9,.0]}
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            height: 80
            }}
          />
        <View style={styles.top}>
          <View style={styles.logo}>
              {props.page == 'tab' ?
                <TouchableOpacity onPress={()=>toggleDrawer()}>
                  <Ionicons name="ios-menu" size={30} color="white"/>
                  {/*<Image style={styles.image} source={require('../assets/drawable-hdpi/image5.png')}/>*/}
                </TouchableOpacity>
              :
                <TouchableOpacity style={{padding:5}} onPress={()=>navigation.goBack(null)}>
                  <Ionicons name="ios-arrow-back" size={24} color="white"/>
                </TouchableOpacity>
              }
              {props.title && <View style={{marginLeft:10}}>
                  <Text style={{color:"#FFFFFF",fontSize:14,fontFamily:"Rubik-Regular"}}>{props.title}</Text>
                </View>}
          </View>

          <View style={styles.logout}>
            <TouchableOpacity onPress={()=>doonotallow()}>
              <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
        {props.children}
    </View>
  );
}
const styles=StyleSheet.create({
  main:{
    paddingTop:20,
    height:70
  },
  top:{
    flexDirection:"row",
    alignItems:"center",
    justifyContent:'space-between',
    height:50
  },
  logo:{
    flexDirection:'row',
    justifyContent:'flex-start',
    alignItems:'center',
    marginLeft:20
  },
  image:{
    width:30,
    height:30,
    borderRadius:40,
    borderWidth:2,
    borderColor:"#8D0EDB"
  },
  logout:{
    flexDirection:'row',
    justifyContent:'flex-start',
    marginRight:20
  },
  logoutText:{
    color:"#FFFFFF",
    fontSize:9,
    fontFamily:"Rubik-Medium"
  }
});

export default TopHeader;