import React from "react";
import {View,Text,StyleSheet} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from "react-native-vector-icons/Ionicons";
import PDFReader from 'rn-pdf-reader-js'
import TopHeader from '../components/topheader';
const PdfRead=({route,navigation})=>{
  const {id,url,name}=route.params
  // console.log(url)
    return(
        <View style={styles.main}>
          <TopHeader title={name}/>
          <PDFReader
            source={{
              uri: url,
            }}
            style={{
              flexDirection:'column',
              alignItems:'stretch'
            }}
          />
        </View>
    )
}
const styles=StyleSheet.create({
    main:{
      flex:1
    },
    user:{
      flexDirection:"row",
      alignItems:"center",
      paddingTop:20,
      height:80,
      justifyContent:"space-around"
  },
  logo:{
      height:30,
      width:30,
      justifyContent:"center",
      alignItems:'center',
     marginLeft:10
  },
  username:{
      marginLeft:20,
   },
   logout:{
      marginLeft:"60%",
      marginRight:"5%"
      
   },
   usernamechild:{
      color:"#FFFFFF",
      fontSize:14,
      fontFamily:"Rubik-Regular"
  },
  logoutchild:{
       color:"#FFFFFF",
       fontSize:9,
       fontFamily:"Rubik-Medium"
  }
});
export default PdfRead;