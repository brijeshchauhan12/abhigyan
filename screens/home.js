import React ,{useState,useEffect} from 'react';
import {Text,
  View,
  StyleSheet ,
    Image,
    Picker,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator,
    Dimensions,
    Alert
} from 'react-native';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import { LinearGradient,Button } from 'expo-linear-gradient';
import {useSelector,useDispatch} from 'react-redux';
import * as subjectdetaillist from '../store/action/subjectlist';
import * as donotallow from "../store/action/auth";
import Ionicons from "react-native-vector-icons/Ionicons";
import Const from '../components/constant';
import SubShow from '../components/subjectshow';

const Home=({navigation})=>{
    const  dispatch=useDispatch();
    const usernamelogged=useSelector(state=>state.Authname.usernamee)
    const [subjectarray, setSubjectArray] = useState([]);//useSelector(state=>state.Sub.subjectlist)
    const [classall, setClass]= useState([]);//useSelector(state=>state.Classlist.classlis);
    const user= useSelector(state => state.Auth.userdata)
    const [expoPushToken, setExpoPushToken] = useState('');

    const [error,seterror]=useState(null);
    const [isloadingm,setisloadingm]=useState(false)
    const [isloadingmm,setisloadingmm]=useState(false)
    const [selectedValue, setSelectedValue] = useState('');

    const toggleDrawer = () => {
      //Props to open/close the drawer
      navigation.toggleDrawer();
    };

    const setBackColor = (name) => {
      let subnm = {"maths":"#94E2FF33","english":"#fff0dd","hindi":"#fdedff","social":"#d6fde7","science":"#e5f3ff"};
      for (var key in subnm) {
          if (name.toLowerCase().startsWith(key)) {
              return subnm[key];
          }
          if(key == "science"){
            return "#94E2FF33";
          }
      }
    }

    const setBoarder = (name) => {
      let subnm = {"maths":"#0088BA","english":"#fda02e","hindi":"#9b5db5","social":"#58b782","science":"#55affc"};
      for (var key in subnm) {
        if (name.toLowerCase().startsWith(key)) {
          return subnm[key];
        }
        if(key == "science"){
          return "#0088BA";
        }
      }
    }

    const Classslistt= async()=>{
      seterror(null)
      let details = {
          school_id:Const.school_id,
          board_id:user.br_id
      };

      let formBody = [];
      for (let property in details) {
          let encodedKey = encodeURIComponent(property);
          let encodedValue = encodeURIComponent(details[property]);
          formBody.push(encodedKey + "=" + encodedValue);
      }
      formBody = formBody.join("&");

      fetch('http://ais.omsai.info/api/v1/class_list', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: formBody
      }).then(res => res.json()).then((res)=>{
            if(res.status != 200){
              //seterror(JSON.stringify(res.message))
            }else{
                if(res.data.length > 0){
                  setClass(res.data)
                }
            }
        }).catch((err)=>{
          seterror(err.message)
        })
    }

    const SubjectList = (c)=>{
        seterror(null) 
        setisloadingm(true)

        let details = {
            school_id:Const.school_id,
            board_id:user.br_id,
            class_id: c,
            student_id: user.st_id
        };

        let formBody = [];
        for (let property in details) {
            let encodedKey = encodeURIComponent(property);
            let encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");

        fetch('http://ais.omsai.info/api/v1/subject_list', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formBody
        }).then(res => res.json()).then((res)=>{
            if(res.status != 200){
              //seterror(JSON.stringify(res.message))
            }else{
                if(res.data.length > 0){
                    setSubjectArray(res.data)
                }
            }
            setisloadingm(false)
        }).catch((err)=>{
          setisloadingm(false)
        })
    }

    const doonotallow=async()=>{
        seterror(null)
        setisloadingmm(true)
        try{
          await dispatch(donotallow.donotallowuser(null))
        }catch(error){
          seterror(error.message)
          setisloadingmm(false)
        }
    }

    useEffect(() => {
      if(classall.length == 0){
          Classslistt();
          if(user.class){
          setSelectedValue(user.class.id);
          }else{
            SubjectList('');
          }
      }
    },[classall]);

    useEffect(() => {
      if (selectedValue) {
        SubjectList(selectedValue)
      }
    }, [selectedValue]);

    useEffect(() => {
      if (error) {
        Alert.alert('An Error Occurred!', error, [{ text: 'Okay' }]);
      }
    }, [error]);

    useEffect(() => {
      if(expoPushToken == ''){
        registerForPushNotificationsAsync().then((token) => {
          setExpoPushToken(token);
          let details = {
              student_id:user.st_id,
              token:token
          };

          let formBody = [];
          for (let property in details) {
              let encodedKey = encodeURIComponent(property);
              let encodedValue = encodeURIComponent(details[property]);
              formBody.push(encodedKey + "=" + encodedValue);
          }
          formBody = formBody.join("&");

          fetch('http://ais.omsai.info/api/v1/update_expo_token', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/x-www-form-urlencoded'
              },
              body: formBody
          }).then(res => res.json()).then((res)=>{
                // console.log(res)
            })
        });
      }
    },[expoPushToken])

    const showAlert = (data)=>{
      if(data.pay_status > 0){
          navigation.navigate("MathScreen",{
            subject:data
          })
      }else{
        Alert.alert(
          'Premium Package',
          'There have some premium contents, want to subscribe!',
          [
            { text: 'Ask me later', onPress: () => navigation.navigate("MathScreen",{
              subject: data
            }) },
            {
              text: 'Cancel',
              style: 'cancel',
            },
            { text: 'OK', onPress: () => navigation.navigate("BuyPackage",{subject:data}) },
          ],
          { cancelable: false }
        );
      }
    }

    return(
      <ScrollView>
        <View style={styles.main}>
            <View style={styles.usertop}>
              <LinearGradient
               colors={['#007E59', '#007E59']}
               start={[.9,.0]}
                style={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  top: 0,
                  height: 200
                  }}/>
                  <View style={styles.user}>
                    <View style={styles.logo}>
                      <TouchableOpacity onPress={()=>toggleDrawer()}>
                        <Ionicons name="ios-menu" size={30} color="white"/>
                        {/*<Image style={styles.image} source={require('../assets/drawable-hdpi/image5.png')}/>*/}
                      </TouchableOpacity>
                      </View>
                    <View style={styles.username}>
                      <Text style={styles.usernamechild}>{usernamelogged}</Text>
                    </View>
                    <View style={styles.logout}>
                      {isloadingmm?<ActivityIndicator/>:<Text style={styles.logoutchild} onPress={()=>doonotallow()}>Logout</Text>}
                    </View>
                  </View>
                  <View style={{ alignItems:'center'}}>
                     <Text style={{  
                        fontFamily:"Poppins-Bold",
                        fontSize:20,
                        color:"#FFFFFF"
                      }}>
                      Thought of the day</Text>
                  </View>
                  <View style={{alignItems:"center",justifyContent:"center",marginHorizontal:10}}>
                     <Text style={{
                       fontFamily:"Poppins-Regular",
                       color:"#FFFFFF"
                     }}
                     numberOfLines={3}
                     >"It was popularised in the 1960s containin"</Text>
                   </View>
            </View>
            <View style={styles.secondbox}>
                  {/*<View style={styles.notification}>
                    <View style={styles.nott}>
                      <LinearGradient
                          // Background Linear Gradient
                        colors={['#007E59', '#007E59']}
                        start={[.9,.0]}
                        style={{
                          position: 'absolute',
                          left: 0,
                          right: 0,
                          top: 0,
                          height: 40,
                        }}/>
                            <View><Ionicons name="md-notifications" size={24} color="#0bbd41" /></View>
                            <View><Text style={styles.notificationc}>Notification</Text></View>
                    </View>
                    <View style={styles.nottmsg}>
                        <Text style={styles.msssg}>Cras gravida bibend</Text>
                    </View>
                      </View> */}
                  <View style={styles.subb}>
                      <View style={{flexDirection:'row', alignItems:'center',justifyContent:'flex-start'}}>
                          <View>
                              <Text style={styles.subshow}>SUBJECTS </Text>
                          </View>
                          <View style={{marginLeft:10}}>
                              <Text style={styles.subcount}>({subjectarray.length})</Text>
                          </View>
                      </View>
                      <View style={styles.selectclass}>
                        <Picker selectedValue={selectedValue}
                          style={{height:35 }}
                          onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}>
                          <Picker.Item label="Select Class" value=""/>
                          {classall.map((dat,index)=> <Picker.Item  key={'class-'+index} label={dat.name} value={dat.id} />)}
                        </Picker>
                      </View>
                  </View>
              </View>
              {isloadingm?<ActivityIndicator/>:(
              <ScrollView style={{marginBottom:10}}>
              {subjectarray.map((data,index) =>
                  <TouchableOpacity key={'subject-'+index} onPress={()=>showAlert(data)}>
                  <SubShow
                    source={(data.sub_icon != null && data.sub_icon != '')?{uri:data.sub_icon}:require("../assets/subject.png")}
                    subject={data.sub_name}
                    noofnotes={data.totalNotes}
                    noofvideo={data.totalVideo}
                    timing={data.recentSession}
                    nextlivesession={data.nextSession}
                    style={{backgroundColor:setBackColor(data.sub_name),
                      borderColor:setBoarder(data.sub_name),
                      borderWidth:.2,
                      marginBottom:5,
                    }}
                    subcolor="#0088BA"
                    notecolor="#0088BA"
                    timingcolor="#0088BA"
                    livesessioncolor="#00C0D2"
                  />
                </TouchableOpacity>
              )}
              </ScrollView>
              )}
        </View>
      </ScrollView>
    )
}

async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      Alert.alert('An Error Occurred!', 'Failed to get push token for push notification!', [{ text: 'Okay' }]);
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    // console.log(token);
  } else {
    Alert.alert('An Error Occurred!', 'Must use physical device for Push Notifications', [{ text: 'Okay' }]);
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}

const styles=StyleSheet.create({
        main:{
           flex:1,
            backgroundColor:"white",
            flex:1
        },
        usertop:{
            height:200,
            paddingTop:20
        },
        user:{
            flexDirection:"row",
            alignItems:"center",
            justifyContent:"space-around",
            height:50
        },
        logo:{
            // backgroundColor:"white",
            height:30,
            width:30,
            justifyContent:"center",
            alignItems:'center',
           marginLeft:10,
          //  borderRadius:40,
           marginTop:20 
        },
        image:{
            width:30,
            height:30,
            borderRadius:40,
            borderWidth:2,
            borderColor:"#8D0EDB"
        },
        username:{
           marginLeft:5,
           marginTop:20,
           paddingRight:30
        },
        logout:{
           marginLeft:'30%',
           marginTop:20,
           marginRight:30
        },
        usernamechild:{
            color:"#FFFFFF",
            fontSize:14,
            fontFamily:"Poppins-Bold"
        },
        logoutchild:{
             color:"#FFFFFF",
             fontSize:9,
             fontFamily:"Rubik-Medium"
        },
        secondbox:{
            width:"100%",
            height:80,
            marginTop:5
        },
        notification:{
          display:'none',
            flexDirection:"row",
            borderColor:"#ADEEB4",
            borderWidth:.5,
            height:40
        },
        subject:{
            flexDirection:"row"
        },
        nott:{
            flexDirection:"row",
            width:"30%",
            alignItems:"center",
            justifyContent:'space-between',
          paddingHorizontal:10
        },
        nottmsg:{
          paddingLeft:5,
            width:"70%",
            justifyContent:"center"
        },
        notificationc:{
            color:"#F1F9FF",
            fontFamily:"Poppins-Regular",
            fontSize:12
        },
        msssg:{
            fontFamily:"Poppins-Regular",
            color:"#2F4858",
            fontSize:12
        },
        subb:{
           flexDirection:"row" ,
           marginHorizontal:15,
           alignItems:"center",
           height:50,
           justifyContent:"space-between"
        },
       
        subshow:{
            fontFamily:"Rubik-Bold",
            fontSize:14,
            color:"#2F4858"
        },
        subcount:{
           fontFamily:"Poppins-Light",
           color:"#A8A8A8",
           fontSize:10,
        },
        selectclass:{
            borderColor:"#2F4858",
            borderWidth:.5,
            width:170
        },
        picker: {
             height:30,
            backgroundColor: 'white',
            borderColor: '#2F4858',
            
            
          },
          pickerItem: {
            color: '#2F4858'
          },
          subsow:{
              height:90,
              backgroundColor:"green"
          }
     
});
export default Home;