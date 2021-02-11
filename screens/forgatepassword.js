import React,{useState,useEffect} from 'react';
import {Text,View,StyleSheet,
  TextInput,Button, Alert,ActivityIndicator,ScrollView,
  ImageBackground,
  TouchableOpacity
} from 'react-native';
import {useSelector,useDispatch} from 'react-redux';
import * as Forgatt from '../store/action/forgatepassword';
import { LinearGradient } from 'expo-linear-gradient';
import Const from '../components/constant';
import Resetpassword from './resetpassword';
const Forgatepassword=({navigation})=>{

    const dispatch=useDispatch()
    const [enteredmobilenumber,setenteredmobilenumber]=useState("");
    const [isloadingm ,setisloadingm]=useState(false)
    const[isloading,setisloading]=useState(false)
    const [error,seterror]=useState();
    const [mobileErr,setMobileErr]=useState(false)
    const goalInputHandler5=(enteredText)=>{
        setenteredmobilenumber(enteredText)
    }

    const forgatepass= ()=>{
        seterror(null)
        setisloadingm(true)

        if(enteredmobilenumber == ""){
            setisloadingm(false)
            setMobileErr(true)
            return true
        }else{
            setMobileErr(false)
        }

        let details = {
            school_id:Const.school_id,
            mobile:enteredmobilenumber
        }

        let formBody = [];
        for (let property in details) {
            let encodedKey = encodeURIComponent(property);
            let encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");

        fetch('http://ais.omsai.info/api/v1/forgot_password', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/x-www-form-urlencoded'
              },
              body: formBody
        }).then(res => res.json()).then(res => {
          if(res.status != 200){
            seterror(JSON.stringify(res.message))
          }else{
            let credentials = res.data;
            dispatch({type:'FORGATE',st_id:credentials.st_id})
            navigation.navigate('Resetpassword')
          }
          setisloadingm(false)
        }).catch(err=>{
          seterror(err.message)
          setisloadingm(false)
        })
      }  
      useEffect(() => {
        if (error) {
          Alert.alert('An Error Occurred!', error, [{ text: 'Okay' }]);
        }
      }, [error]);
    return(
       
        <View style={styles.main}>
            
        <LinearGradient
           colors={['#016129', '#016129']}
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: 0,
              height:"100%"
              }}/>
          <ImageBackground  style={styles.backgroundimage} source={require("../assets/drawable-xxxhdpi/background.png")}>
  
       <View style={styles.dabba}>
          <Text style={styles.welcome}>Forget Password</Text>
          <Text style={styles.urnam}>Enter registered mobile number.</Text>
          <View style={styles.Vieweye}>
              <TextInput 
                style={styles.textinputstyle}
                placeholder="Mobile number"
                keyboardType={'numeric'}
                onChangeText={goalInputHandler5}
                value={enteredmobilenumber}/>
           </View>
           { mobileErr == true ? (
            <Text style={styles.errorMessage}>
            * Mobile number is required.
            </Text>
            ) : null  }
          
          <TouchableOpacity onPress={()=>forgatepass()} style={{
              position:'relative',
              marginTop:0,
              marginBottom:0,
              marginLeft:'auto',
              marginRight:'auto'
            }}>
          <LinearGradient
            colors={['#C53030', '#C53030']}
            start={[.9,.0]}
            style={{ padding: 7,
            alignItems: 'center',
              borderRadius: 5,
              width:150,
              marginTop:25 }}>
              {isloadingm?<ActivityIndicator color="#ffffff"/>:
            <Text
              style={{
                backgroundColor: 'transparent',
                fontSize: 16,
                color: '#fff',
                fontFamily:"Poppins-Bold"
              }}>
            Submit
            </Text>}
          </LinearGradient>
        </TouchableOpacity>
     </View>
    </ImageBackground>
    </View>
    )
}
const styles=StyleSheet.create({
        main:{
            flex:1,
        },
        logo:{
            backgroundColor:"white",
            height:72,
            width:72,
            justifyContent:"center",
            alignItems:'center',
            marginTop:90,
           marginLeft:158,
           borderRadius:40 
        },
        image:{
            width:72,
            height:72,
            borderRadius:40,
            borderWidth:3,
            borderColor:"#F1F9FF"
        },
        user:{
            justifyContent:"center",
            alignItems:"center",
            marginTop:10
        },
        username:{
            fontSize:22,
            fontFamily:"Poppins-Bold",
            color:"#F1F9FF"
        },
        backgroundimage:{
          height:"120%"
        },
        dabba:{
            backgroundColor:"white",
            height:'auto',
            marginHorizontal:20,
            borderRadius:5,
            shadowColor: "black",
            shadowOpacity: 0.26,
            shadowOffset: { width: 0, height: 2 },
            shadowRadius: 8,
            elevation: 5,
            marginTop:100,
            paddingHorizontal:15,
            borderColor:"#5EB668",
            borderWidth:.4,
            paddingTop:10,
            paddingBottom:15
        },
        welcome:{
          marginTop:15,
          color:'#1D2327',
          fontSize:16,
          fontFamily:"Poppins-Bold",
          textAlign:'center'
        },
        urnam:{
            fontFamily:"Poppins-Regular",
            marginTop:6,
            color:'#1D2327',
            fontSize:14
        },
        innput:{
            height:40,
            marginTop:20
        },
        logbutton:{
            marginTop:10,
            width:184,
            height:40
        },
        bulogin:{
            fontSize:16,
            fontFamily:"Poppins-Bold",
            color:"#FFFFFF"
        },
        afterdabba:{
            flexDirection:"row",
            justifyContent:"center",
            marginTop:20
        },
        newuserr:{
            color:"#2F4858",
            fontSize:10,
      
        },
        signup:{
            color:'#00AF50',
            fontFamily:"Poppins-Regular",
            fontSize:10
        },
        forgatepaas:{
            marginTop:20,
            justifyContent:'center',
            alignItems:"center"
        },
        fp:{
             fontSize:15,
             color:'#2F4858',
             fontFamily:"Poppins-Light"
        },
        eye:{
          flexDirection:"row",
       
           alignItems:"center",
       
           borderWidth:.5,
           borderColor:'#ADEEB4',
           borderRadius:5,
           
       },
        textinputstyle:{
            height:45,
            paddingLeft:5
        },
        Vieweye:{
          borderWidth:.5,
          borderColor:'#9AE6B4',
          borderRadius:5,
        },
        errorMessage: {
          fontSize: 12,
          color:"red",
          marginLeft:0,
        }
});
export default Forgatepassword;