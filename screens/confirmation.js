import React ,{useState, useEffect} from 'react';
import {Text,View,
    StyleSheet,TouchableOpacity,TextInput,
    ImageBackground,
    Alert,
    ActivityIndicator
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
import {useSelector,useDispatch} from 'react-redux';
import * as Otpverification from '../store/action/otpverification';
const Confirmation=({route,navigation})=>{
    const hidemobilechar = (str) => {
        if(str){
            let f_val = str.replace(/\D[^\.]/g, "");
            return f_val.slice(0,2)+"xxxxxx"+f_val.slice(8);
        }
        return ''
    }
    const [error,seterror]=useState();
    const [isloading, setisloading]=useState(false);
    const {mobile_no} = route.params;
    const Userotp=useSelector(state=>state.Auth.Otp)
    const student_id=useSelector(state=>state.Auth.userId)
    //console.log( "this is the new" +Userotp+student_id)
    const [enteredotp,setenteredotp]=useState(null)

    const goalInputHandler=(enteredText)=>{
        setenteredotp(enteredText)
    }

    const Otphandler=()=>{
        if(enteredotp==Userotp){
            console.log("done!")
        }else{
            console.log("error")
        }
    }
    const dispatch=useDispatch();

    const sendOrderhandler = () => {
        seterror(null)
        setisloading(true)
        let details = {
            student_id:student_id,
            otp:enteredotp
        }

        let formBody = [];
        for (let property in details) {
            let encodedKey = encodeURIComponent(property);
            let encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");

        fetch('http://ais.omsai.info/api/v1/verify_reg_otp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formBody
        }).then(res => res.json()).then(res => {
            if(res.status != 200){
                seterror(JSON.stringify(res.message))
            }else{
                Alert.alert("Account Create Successfully." ,"Login to enter the app",[
                    { text: "OK", onPress: () => navigation.navigate("Login") }
                ])
            }
            setisloading(false)
        }).catch(err=>{
            seterror(err.message)
            setisloading(false)
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
                    height:"100%",
                }}/>
            <ImageBackground  style={styles.backgroundimage} source={require("../assets/drawable-xxxhdpi/background.png")}>
      
           <View style={styles.dabba}>
                <Text style={styles.welcome}>OTP send on registered Mobile No. {hidemobilechar(mobile_no)}</Text>
                <Text style={styles.urnam}>Enter OTP</Text>
                <View style={styles.Vieweye}>
                    <TextInput
                        style={styles.textinputstyle}
                        placeholder="Enter otp here"
                        keyboardType="number-pad"
                        onChangeText={goalInputHandler}
                        value={enteredotp}
                    />
               </View>
             <TouchableOpacity onPress={sendOrderhandler} style={{
                    position:'relative',
                    marginTop:0,
                    marginBottom:0,
                    marginLeft:'auto',
                    marginRight:'auto'
                }}>
                <LinearGradient
                    colors={['#C53030', '#C53030']}
                    start={[.9,.0]}
                    style={{ padding: 10,
                    alignItems: 'center',
                        borderRadius: 5,
                        width:200,
                        marginTop:25 }}>
                        {isloading?<ActivityIndicator color="#ffffff"/>:(
                        <Text
                            style={{
                            backgroundColor: 'transparent',
                            fontSize: 16,
                            color: '#fff',
                            fontFamily:"Poppins-Bold"
                            }}>
                        Submit
                    </Text>)}
                </LinearGradient>
            </TouchableOpacity>
         </View>
        </ImageBackground>
    </View>
    )
}
const styles=StyleSheet.create({
  main:{
      flex:1
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
      marginTop:200,
      paddingHorizontal:15,
      borderColor:"#5EB668",
      borderWidth:.4,
      paddingBottom:15
  },
  welcome:{
      marginTop:20,
      color:'#1D2327',
      fontSize:18,
      fontFamily:"Poppins-Bold",
      justifyContent:"center",
      alignItems:"center",
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
      fontSize:10
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
     borderRadius:5
 },
  textinputstyle:{
      height:45,
      paddingLeft:5
  },
  Vieweye:{
    borderWidth:.5,
    borderColor:'#9AE6B4',
    borderRadius:5,
  }
  
});
export default Confirmation;