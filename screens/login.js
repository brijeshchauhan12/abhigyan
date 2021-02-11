import React,{useState,useEffect} from 'react';
import {Text,View,StyleSheet,
    TouchableOpacity,
    Image,
    ImageBackground,
    ScrollView,
    TextInput,
    ActivityIndicator,
    Alert
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import UseTextInput from '../components/textinput';
import {Button} from 'react-native-paper';
import {useDispatch} from 'react-redux';
import * as loginAction from '../store/action/auth';
import  Const from '../components/constant';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as ScreenOrientation from 'expo-screen-orientation';


import Bacck from '../assets/back.tsx';
import Eye from '../assets/eye.tsx';
import Forgatepassword from './forgatepassword';
//import Svg from 'react-native-svg';
// import SearchIcon from '../components/searchsvg'; 
 
const Login=({navigation})=>{

    const [securer,setsecurer]=useState(true)
    const [enteredPassword,setEnteredGoal]=useState('');
    const [enteredUserName,setenteredUserName]=useState('');
    const [enteredmobilenumber,setenteredmobilenumber]=useState('')
    const [error,seterror]=useState();
    const [isloading,setisloading]=useState(false)
    const [mobileErr,setMobileErr]=useState(false)
    const [passwordErr,setPasswordErr]=useState(false)
    const [loggedIn, setLoggedIn] = useState(null)
    const dispatch=useDispatch();
    
    async function changeScreenOrientation() {
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    }

    const AuthHandler=async()=>{
      seterror(null)
      setisloading(true)
        if(enteredmobilenumber == ""){
            setisloading(false)
            setMobileErr(true);
        }else{
            setMobileErr(false);
        }
        if(enteredPassword == ""){
            setisloading(false)
            setPasswordErr(true);
        }else{
            setPasswordErr(false);
        }
        if(mobileErr || passwordErr){
            return;
        }
        try{
            await dispatch(loginAction.login(Const.school_id,enteredmobilenumber,enteredPassword))
        }catch(err){
            seterror(err.message)
            setisloading(false)
        }
    }

    useEffect(() => {
        if (error) {
          Alert.alert('An Error Occurred!', error, [{ text: 'Okay' }]);
        }
    }, [error])
    
    const goalInputHandler=(enteredText)=>{
        setenteredUserName(enteredText);
    }

    const goalInputHandler1=(enteredText)=>{
        setEnteredGoal(enteredText);
    }
    
    const goalInputHandler2=(enteredText)=>{
        setenteredmobilenumber(enteredText)
    }

    return(
        <ScrollView keyboardShouldPersistTaps={'handled'}>
        <View style={styles.main}>
              <LinearGradient
           // Background Linear Gradient
               colors={['#016129', '#016129']}
            //    start={[.9,.0]}
                style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    top: 0,
                    height: 370
                  }}/>
           
            <ImageBackground  style={styles.backgroundimage} source={require("../assets/drawable-xxxhdpi/background.png")}>
            <View style={styles.logo}>
                <Image style={styles.image} source={require('../assets/drawable-hdpi/image5.png')}/>
            </View>
            <View>
                <View style={styles.user}>
                    <Text style={styles.username}> ABHIGYAAN</Text>
                </View>
            </View>
            <View style={styles.dabba}>
                <Text style={styles.welcome}>Welcome</Text>
                <Text style={styles.urnam}>Moblie NO.</Text>
                <View style={styles.useeye}>
                    <TextInput keyboardType={'numeric'}
                        style={{height:50,
                        paddingLeft:5
                    }}
                    placeholder="Mobile No."
                    onChangeText={goalInputHandler2}
                    value={enteredmobilenumber}
                />
                </View>
            { mobileErr == true ? (
                <Text style={styles.errorMessage}>
                * Mobile number is required.
                </Text>
                ) : null  }
            <Text style={styles.urnam}>Password</Text>
            <View style={styles.eye}>
               <TextInput
                    style={{
                        width:'100%',
                        borderRightWidth:0,
                        height:50,
                        paddingLeft:5
                    }} 
                    placeholder="Password"
                    onChangeText={goalInputHandler1}
                    value={enteredPassword}
                    secureTextEntry={securer}
                />
                <TouchableOpacity onPress={()=>setsecurer(!securer)} style={{float:'right',marginLeft:-25, position:'relative'}}>
                    <View style={styles.eeeye} >
                        {securer?<Ionicons name="md-eye-off" size={24} color="#C1C1C1" />:<Ionicons name="md-eye" size={24} color="#C1C1C1" />}
                    </View>   
                </TouchableOpacity>
            </View>
            { passwordErr == true ? (
                <Text style={styles.errorMessage}>
                * Password is required.
                </Text>
                ) : null  }
        <TouchableOpacity onPress={AuthHandler} style={{
            position:'relative',
            marginTop:0,
            marginBottom:0,
            marginLeft:'auto',
            marginRight:'auto'
        }}>
            <LinearGradient
            // Button Linear Gradient
            colors={['#C53030', '#C53030']}
            start={[.9,.0]}
            style={{ padding: 10,
                alignItems: 'center',
                borderRadius: 5,
                width:200,
                marginTop:30 ,
                }}>
                {isloading?<ActivityIndicator color="#ffffff"/>:(     
                <Text
                    style={{
                        backgroundColor: 'transparent',
                        fontSize: 16,
                        color: '#fff',
                        fontFamily:"Poppins-Bold"
                    }}>
                Login
                </Text>)}
            </LinearGradient>
        </TouchableOpacity>
         </View>
           <View style={styles.afterdabba}>
              <Text style={styles.newuserr}>New User? </Text>
              <Text style={styles.signup} onPress={()=> navigation.navigate("Signup")}>Sign Up</Text>
           </View>
           <View style={styles.forgatepaas} >
                <TouchableOpacity onPress={()=>navigation.navigate('Forgatepassword')}>
                    <Text style={styles.fp}>Forgot Password ?</Text>
                </TouchableOpacity>
            </View>
           </ImageBackground>
        </View>
        </ScrollView>
    )
}
const styles=StyleSheet.create({
  main:{
      flex:1,
    //   backgroundColor:"green"
  },
  logo:{
    backgroundColor:"white",
    height:72,
    width:72,
    justifyContent:"center",
    alignItems:'center',
    marginTop:70,
    borderRadius:40,
    marginLeft:'auto',
    marginRight:'auto'
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
      marginTop:30,
      paddingHorizontal:15,
      borderColor:"#9AE6B4",
      borderWidth:.5,
      paddingBottom:15
  },
  welcome:{
      marginTop:20,
      color:'#1D2327',
      fontSize:18,
      fontFamily:"Poppins-Bold",
      textAlign:'center'
  },
  urnam:{
      fontFamily:"Poppins-Regular",
      marginTop:20,
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
      height:40,

  },
  butto:{
      marginTop:30,
      width:100,
      marginLeft:110
    
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
      color:"#1D2327",
      fontSize:10,

  },
  signup:{
      color:'#007E59',
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
       color:'#1D2327',
       fontFamily:"Poppins-Light"
  },
  eye:{
    flexDirection:"row",
    alignItems:"center",
    borderWidth:.5,
    borderColor:'#C6F6D5',
    borderRadius:5
  },
  eeeye:{
   paddingRight:10
  },
  useeye:{
    borderWidth:.5,
    borderColor:'#C6F6D5',
    borderRadius:5,
  },
  errorMessage: {
    fontSize: 12,
    color:"red",
    marginLeft:0,
  }
});
export default Login;