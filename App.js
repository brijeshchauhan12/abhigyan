import { StatusBar } from 'expo-status-bar';
import React,{useEffect, useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
// import {Provider} from 'react-native-paper';
import {createStore,combineReducers,applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import ReduxThunk from 'redux-thunk';
import {AppLoading} from 'expo'
import * as Font from 'expo-font'
import App1 from "./navigation";
import AuthReducer from'./store/reducer/auth';
import Boardlist from './store/reducer/boardlist';
import OtpVerification from './store/reducer/otpverification';
import Fog from "./store/reducer/forgatepassword";
import Subjectlist from './store/reducer/subjectlist';
import  Topicandvideo from './store/reducer/topicandvideo';
import Authname from './store/reducer/authname';
import StudentId from './store/reducer/stduntidauth';
import Profileofst from './store/reducer/profile';
import Classlist from './store/reducer/classlist';

//import PushNotification from 'react-native-push-notification'
const rootReducer=combineReducers({
     Auth:AuthReducer,
     OTP:OtpVerification,
     Allboard:Boardlist,
     Fog:Fog,
     Sub:Subjectlist,
     Topic_Video:Topicandvideo,
     Authname:Authname,
     StudentId:StudentId,
     Profileofst:Profileofst,
     Classlist:Classlist
})
const store =createStore(rootReducer,applyMiddleware(ReduxThunk))
const fetchfonts=()=>{
  return  Font.loadAsync({
    'Poppins-Bold':require('./assets/fonts/Poppins-Bold.ttf') ,
    'Poppins-Regular':require("./assets/fonts/Poppins-Regular.ttf"),
    'Poppins-Black':require("./assets/fonts/Poppins-Black.ttf"),
    'Poppins-Light':require("./assets/fonts/Poppins-Light.ttf"),
    'Rubik-Bold':require("./assets/fonts/Rubik-Bold.ttf"),
    'Rubik-Medium':require("./assets/fonts/Rubik-Medium.ttf"),
    'Rubik-Regular':require("./assets/fonts/Rubik-Regular.ttf"),
    "Rubik-Light":require("./assets/fonts/Rubik-Light.ttf"),
    "Poppins-SemiBold":require("./assets/fonts/Poppins-SemiBold.ttf"),
    "PlayfairDisplay-Bold":require("./assets/fonts/PlayfairDisplay-Bold.ttf"),
    "Roboto-Regular":require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Light":require("./assets/fonts/Roboto-Light.ttf")
   })
 }

  
//  PushNotification.configure({
//   // (optional) Called when Token is generated (iOS and Android)
//   onRegister: function (token) {
//     console.log("TOKEN:", token);
//   },

//   // (required) Called when a remote is received or opened, or local notification is opened
//   onNotification: function (notification) {
//     console.log("NOTIFICATION:", notification);

//     // process the notification

//     // (required) Called when a remote is received or opened, or local notification is opened
//    // notification.finish(PushNotificationIOS.FetchResult.NoData);
//   },

//   // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
//   // onAction: function (notification) {
//   //   console.log("ACTION:", notification.action);
//   //   console.log("NOTIFICATION:", notification);

//   //   // process the action
//   // },

//   // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
//   // onRegistrationError: function(err) {
//   //   console.error(err.message, err);
//   // },

//   // IOS ONLY (optional): default: all - Permissions to register.
//   permissions: {
//     alert: true,
//     badge: true,
//     sound: true,
//   },

//   // Should the initial notification be popped automatically
//   // default: true
//   popInitialNotification: true,

//   /**
//    * (optional) default: true
//    * - Specified if permissions (ios) and token (android and ios) will requested or not,
//    * - if not, you must call PushNotificationsHandler.requestPermissions() later
//    * - if you are not using remote notification or do not have Firebase installed, use this:
//    *     requestPermissions: Platform.OS === 'ios'
//    */
//   requestPermissions: true,
// });


const Main=()=> {
  const [fontloaded,setfontloaded]=useState(false);
  if(!fontloaded){
    return <AppLoading startAsync={fetchfonts} onFinish={()=>{
      setfontloaded(true)
    }}/>
  }

  return (
    <Provider store={store}>
      <App1/>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default Main;
