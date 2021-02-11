import React ,{useState,useEffect,}from 'react';
import {Text,View,StyleSheet,
    TouchableOpacity,Image,ImageBackground,
    TextInput,
    ScrollView,
    ActivityIndicator,
    Alert,
    Picker,
    Modal
} from 'react-native';
import Const from '../components/constant';
import UseTextInput from '../components/textinput';
//import PushNotification from 'react-native-push-notification'
import { LinearGradient } from 'expo-linear-gradient';
//import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';

import * as loginAction from '../store/action/auth';
import * as boarddetail from '../store/action/boardlist';
import Eye from '../assets/eye.tsx';
import {useSelector,useDispatch} from 'react-redux';

const Signup=({navigation})=>{
  
    const [modalVisible, setModalVisible] = useState(true);
    const [securer,setsecurer]=useState(false)
    // const [enteredschol0_id,setenteredschool_id]=useState("")
    // const [enteredboard_id,setenteredboard_id]=useState('');
    const [enteredmobile,setenteredmobile]=useState('');
    const [enteredPassword,setenteredpassword]=useState('');
    const [enteredname,setenteredname]=useState("");
    const [error,seterror]=useState();
    const [isloading, setisloading]=useState(false);
    const [isloadingm,setisloadingm]=useState(false);

    const [boardErr,setBoardErr]=useState(false)
    const [nameErr,setNameErr]=useState(false)
    const [mobileErr,setMobileErr]=useState(false)
    const [passwordErr,setPasswordErr]=useState(false)

    const dispatch=useDispatch();
    const data=useSelector(state=>state.Allboard.allboardlist)
    const [selectedValue, setSelectedValue] = useState(0);

    const AuthHandler = () => {
      seterror(null)
      setisloading(true)

      if(enteredname == ""){
          setisloading(false)
          setNameErr(true);
      }else{
          setNameErr(false);
      }
      if(selectedValue == ""){
          setisloading(false)
          setBoardErr(true);
      }else{
          setBoardErr(false);
      }
      if(enteredmobile == ""){
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
      if(mobileErr || passwordErr || nameErr || boardErr){
          setisloading(false)
          return;
      }

      let details = {
          school_id:Const.school_id,
          board_id:selectedValue,
          mobile:enteredmobile,
          password:enteredPassword,
          name:enteredname
      }

      let formBody = [];
      for (let property in details) {
          let encodedKey = encodeURIComponent(property);
          let encodedValue = encodeURIComponent(details[property]);
          formBody.push(encodedKey + "=" + encodedValue);
      }
      formBody = formBody.join("&");

      fetch('http://ais.omsai.info/api/v1/register', {
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
          dispatch({type:'AUTHENTICATEOTP',otp:credentials.otp})
          dispatch({type:'AUTHENTICATEUSER',stu_id:credentials.st_id})
          navigation.navigate("Confirmation",{mobile_no:enteredmobile})
        }
        setisloading(false)
      }).catch(err=>{
        seterror(err.message)
        setisloading(false)
      })
    }
  
    const BoardList= async()=>{
      setisloadingm(true)
      try{
        await dispatch(boarddetail.board_list(Const.school_id))
        setisloadingm(false) 
      }catch(err){
       seterror(err.message)
      }
    }

    useEffect(()=>{
      if(data.length == 0){
        BoardList()
      }
    },[data])

    useEffect(() => {
        if (error) {
          Alert.alert('An Error Occurred!', error, [{ text: 'Okay' }]);
        }
    }, [error]);
   
    const mobileinputhandler=(enteredText)=>{
        setenteredmobile(enteredText)
    }
    const passwordinputhandler=(enteredText)=>{
        setenteredpassword(enteredText);
    } 
    const nameinputhandler=(enteredText)=>{
        setenteredname(enteredText)
    }
    return(
        <ScrollView keyboardShouldPersistTaps={'handled'}>
        <View style={styles.main}>
          <LinearGradient
           // Background Linear Gradient
              colors={['#016129', '#016129']}
              style={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  top: 0,
                  height: 370,
                }}/>
      
          <ImageBackground  style={styles.backgroundimage} source={require("../assets/drawable-xxxhdpi/background.png")}>
            <View style={styles.dabba}>
                  <Text style={styles.welcome}>Join millions of students sharing their experience</Text>
                  <View style={{    height:40,
                      borderWidth:.5,
                      borderColor:'#ADEEB4',
                      borderRadius:5,  
                      paddingBottom:5
                    }}>
                
                      {isloadingm?<ActivityIndicator/>:      
                        <Picker
                          selectedValue={selectedValue}
                          style={{height:50 }}
                          onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}>
                          <Picker.Item label={" -Select Board- "} value={0} />
                          {data.map((dat,index)=> <Picker.Item  key={index} label={dat.name} value={dat.br_id} />)}
                        </Picker>
                      }
                  </View>
                  { boardErr == true ? (
                      <Text style={styles.errorMessage}>
                      * Select any board from lists.
                      </Text>
                      ) : null  }
              
                <Text style={styles.urnam}>Mobile*</Text>
              {/* <View style={styles.eye}> */}
                <TextInput 
                  style={styles.textinputstyle} 
                  placeholder="Mobile no." 
                  keyboardType={'number-pad'}
                  onChangeText={mobileinputhandler}
                  value={enteredmobile}
                  />
                  { mobileErr == true ? (
                    <Text style={styles.errorMessage}>
                    * Mobile number is required.
                    </Text>
                    ) : null  }
                  <Text style={styles.urnam}>Name*</Text>
                  <TextInput 
                    style={styles.textinputstyle}
                    placeholder="Full Name"
                    keyboardType="default"
                    onChangeText={nameinputhandler}
                    value={enteredname}
                    />
                    { nameErr == true ? (
                        <Text style={styles.errorMessage}>
                        * Name is required.
                        </Text>
                        ) : null  }

                <Text style={styles.urnam}>Password</Text>
                <View style={styles.eye}>
                  <TextInput 
                      style={{width:'100%',borderRightWidth:0,height:50, paddingLeft:5}}
                      placeholder="Password"
                      onChangeText={passwordinputhandler}
                      value={enteredPassword}
                      secureTextEntry={securer}
                  />
                  <TouchableOpacity onPress={()=>setsecurer(!securer)} style={{float:'right',marginLeft:-25, position:'relative'}}>
                    <View style={styles.eeeye} >
                      {securer?  <Ionicons name="md-eye-off" size={24} color="#C1C1C1" />:<Ionicons name="md-eye" size={24} color="#C1C1C1" />}
                    </View>   
                  </TouchableOpacity>
                </View>
                { passwordErr == true ? (
                  <Text style={styles.errorMessage}>
                  * Password is required.
                  </Text>
                  ) : null  }
                <TouchableOpacity onPress={()=>AuthHandler()} style={{
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
                      marginTop:55 }}>
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
            <View style={styles.afterdabba}>
                <Text style={styles.newuserr}>Registered User? </Text>
                <Text style={styles.signup} onPress={()=>navigation.navigate('Login')}>Login</Text>
            </View>
          </ImageBackground>
        </View>
      </ScrollView>
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
      marginTop:120,
      paddingHorizontal:15,
      borderColor:"#5EB668",
      borderWidth:.4,
      paddingBottom:15
  },
  welcome:{
      marginTop:20,
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
      height:40,

  },
  bulogin:{
      fontSize:16,
      fontFamily:"Poppins-Bold",
      color:"#FFFFFF"
  },
  afterdabba:{
      flexDirection:"row",
      justifyContent:"center",
      marginTop:20,
      marginBottom:10
  },
  newuserr:{
      color:"#1D2327",
      fontSize:10
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
  eye:{
    flexDirection:"row",
     alignItems:"center",
     borderWidth:.5,
     borderColor:'#ADEEB4',
     borderRadius:5
 },
  textinputstyle:{
      height:50,
      borderWidth:.5,
      borderColor:'#ADEEB4',
      borderRadius:5,
      paddingLeft:5
  },
  modell:{
    width:"5%",
    marginLeft:289,
    justifyContent:"center",
    alignItems:"center",
    backgroundColor:"yellow"
  },
  errorMessage: {
    fontSize: 12,
    color:"red",
    marginLeft:0,
  }
});
export default Signup;