import React ,{useState,useEffect}from 'react';
import {Text,View,StyleSheet,
    ImageBackground,Image,
    TouchableOpacity,
    ScrollView,
    ActivityIndicator,
    Alert,
    Modal,
    TextInput,
    Picker,
    Platform
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Button } from 'react-native-paper';
import Edit from '../assets/edit.tsx'

import Feather from 'react-native-vector-icons/Feather';
import Ionicons from "react-native-vector-icons/Ionicons";
import * as  donotallow from "../store/action/auth";
import * as profileee from   '../store/action/profile';
 import * as profileupdatee from '../store/action/profileupdate';

import DateTimePicker from '@react-native-community/datetimepicker';
import TopHeader from '../components/topheader';

import {useDispatch,useSelector} from 'react-redux';
const Profile=({navigation})=>{
    const dispatch=useDispatch();
     const [isloadingmm,setisloadingmm]=useState(false);
     const [isloadingm,setisloadingm]=useState(false)
     const [error,seterror]=useState();
     const [isloading,setisloading]=useState(false);//update profile loader
     const [isloadingg,setisloadingg]=useState(false);//update profile loader
     const [subscription,setSubscription]=useState([]);

    const user=useSelector(state=>state.Auth.userdata)
    const [profileobj, setProfileObj]=useState(null);//useSelector(state=>state.Profileofst.profiledetails)
    
    //  console.log("this is the profile detaills "+ profileobj.st_id)
     const [modalVisible, setModalVisible] = useState(false);
     const [enteredusername,setenteredusername]=useState('')
     const [enteredemail,setenteredemail]=useState('')
     const [enteredfathername,setenteredfathername]=useState('')
     const [enteredmothername,setenteredmothername]=useState('')
     const [date, setDate] = useState()
     const [show,setshow]=useState(false)
    
     const [enteredgender,setenteredgender]=useState('');
     const [enteredaddress,setenteredaddress]=useState('')
    //  console.log(date   +  enteredusername +enteredaddress +enteredemail +enteredgender +enteredfathername +enteredmothername)
    
    let maxdate = null;
    
    const doonotallow=async()=>{
        // seterror(null)
   
        setisloadingmm(true)
        try{
       await   dispatch(donotallow.donotallowuser(null))
        }catch(error){
        //  seterror(error.message)
          setisloadingmm(false)
        }
    }

    const Profiledetail=()=>{
        seterror(null)
        setisloading(true)

        let details = {
            student_id:user.st_id
        }

        let formBody = [];
        for (let property in details) {
            let encodedKey = encodeURIComponent(property);
            let encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");

        fetch('http://ais.omsai.info/api/v1/profile_detail', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formBody
        }).then(res => res.json()).then((res)=>{
            if(res.status != 200){
                seterror(JSON.stringify(res.message))
            }else{
                // console.log(res.data);
                setProfileObj(res.data)
            }
        }).catch((err)=>{
            seterror(err.message)
        })
    }

    const getSubscription=()=>{
        seterror(null)
        setisloading(true)

        let details = {
            student_id:user.st_id
        }

        let formBody = [];
        for (let property in details) {
            let encodedKey = encodeURIComponent(property);
            let encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");

        fetch('http://ais.omsai.info/api/v1/subscription_list', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formBody
        }).then(res => res.json()).then((res)=>{
            if(res.status != 200){
                //seterror(JSON.stringify(res.message))
                setSubscription([])
            }else{
                // console.log(res.data)
                if(res.data.length > 0){
                    setSubscription(res.data)
                }else{
                    setSubscription([])
                }
            }
            setisloading(false);
        }).catch((err)=>{
            seterror(err.message)
            setisloading(false);
        })
    }

    const Profileupdate = () => {
        seterror(null)
        setisloadingg(true)
        let details = {
            student_id:profileobj.st_id,
            student_name:enteredusername,
            student_email:enteredemail,
            father_name:enteredfathername,
            mother_name:enteredmothername,
            dob:formatDate(date,true),
            gender:enteredgender,
            address:enteredaddress
        }

        let formBody = [];
        for (let property in details) {
            let encodedKey = encodeURIComponent(property);
            let encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");

        fetch('http://ais.omsai.info/api/v1/profile_update', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formBody
        }).then(res => res.json()).then((res)=>{
            if(res.status != 200){
                seterror(JSON.stringify(res.message))
            }else{
                setModalVisible(!modalVisible)
                Profiledetail();
                Alert.alert('Success', "Profile saved successfully", [{ text: 'Okey' }]);
            }
            setisloadingg(false)
            
        }).catch((err)=>{
            seterror(err.message)
            setisloadingg(false)
        })
    }

    const formatDate = (date,t='') => {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
    
        if(t)
            return [year, month, day].join('-');
        else
            return [day, month, year].join('-');
    }

    useEffect(()=>{
        if (profileobj && Object.keys(profileobj).length > 0) {
            setenteredusername((profileobj.st_name != null)?profileobj.st_name:'')
            setenteredemail((profileobj.st_email != null)?profileobj.st_email:'')
            setenteredfathername((profileobj.st_father_name != null)?profileobj.st_father_name:'')
            setenteredmothername((profileobj.st_mother_name != null)?profileobj.st_mother_name:'')
            
            if(profileobj.st_dob != null && profileobj.st_dob != ''){setDate(new Date(Date.parse(profileobj.st_dob)))}else{setDate(maxdate)}
            setenteredgender((profileobj.st_gender != null)?profileobj.st_gender:'')
            setenteredaddress((profileobj.st_address != null)?profileobj.st_address:'')
        }
    },[profileobj])

    useEffect(() => {
        if (profileobj == null || Object.keys(profileobj).length==0) {
            Profiledetail()
        }
    }, [profileobj]);

    useEffect(()=>{
        if(maxdate == null){
            maxdate = new Date()
            maxdate.setFullYear(maxdate.getFullYear() - 3);
        }
    },[maxdate])
    
    useEffect(()=>{
        if(subscription.length == 0){
            getSubscription()
        }
    },[subscription])

    useEffect(() => {
        if (error) {
        Alert.alert('An Error Occurred!', error, [{ text: 'Okay' }]);
        }
    }, [error]);

    const selecteddate=(v)=>{
        const currentDate = v || date;
        setshow(Platform.OS === 'ios');
        setDate(currentDate);
    }

    return(
        <ScrollView>
            <View style={styles.main}>
            <TopHeader title="Profile"/>
            <Modal
                animationType="fade"
                transparent={false}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible)
                }}>
                <View style={styles.centeredview}>
                    <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={'handled'}>   
                        <View style={styless.main}>
                            <View style={[styless.dabba,{position:'relative'}]}>
                                <View style={{position:'absolute',right:5,top:-2}}>
                                    <TouchableOpacity onPress={()=>setModalVisible(false)}>
                                        <Text style={{padding:5,fontSize:20, color:'#ff0000'}}>x</Text>
                                    </TouchableOpacity>
                                </View>
                                <Text style={styless.urnam}>Student Name</Text>
                                <View style={styless.Vieweye}>
                                    <TextInput style={styless.textinputstyle}
                                        placeholder="Student name"
                                        onChangeText={(v)=>setenteredusername(v)}
                                        value={enteredusername}
                                    />
                                </View>
                                <Text style={styless.urnam}>Email</Text>
                                <View style={styless.Vieweye}>
                                    <TextInput style={styless.textinputstyle} placeholder="Enter email address"
                                        keyboardType={'email-address'}
                                        onChangeText={(v)=>setenteredemail(v)}
                                        value={enteredemail}/>
                                </View>
                                <Text style={styless.urnam}>
                                    Father Name
                                </Text>
                                <View style={styless.Vieweye}>
                                    <TextInput style={styless.textinputstyle} placeholder="Father Name"
                                        onChangeText={(v)=>setenteredfathername(v)}
                                        value={enteredfathername}
                                    />
                                </View>
                                <Text style={styless.urnam}>
                                    Mother Name
                                </Text>
                                <View style={styless.Vieweye}>
                                    <TextInput style={styless.textinputstyle} placeholder="Mother Name"
                                        onChangeText={(v)=>setenteredmothername(v)}
                                        value={enteredmothername}
                                    />
                                </View>
                                <Text style={styless.urnam}>
                                    DOB
                                </Text>
                                <View style={styless.Vieweye}>
                                    {show?        
                                        <DateTimePicker
                                            testID="dateTimePicker"
                                            format="YYYY-MM-DD"
                                            value={date}
                                            mode="date"
                                            display="default"
                                            onChange={(e,v)=>selecteddate(v)}
                                            maximumDate={maxdate}
                                        />:
                                        <Button mode="outlined" onPress={() => setshow(!show)}>
                                            {date != maxdate ? formatDate(date):'Select Dob'}
                                        </Button>
                                    }
                                </View>
                                <Text style={styless.urnam}>
                                    Gender
                                </Text>
                                <View style={styless.Vieweye}>
                                    <Picker selectedValue={enteredgender} style={{height:35 }} onValueChange={(v,i)=> setenteredgender(v)}>
                                        <Picker.Item label=" -select gender-" value="" />
                                        <Picker.Item label="Male" value="Male" />
                                        <Picker.Item label="Female" value="Female" />
                                    </Picker>
                                </View>
                                <Text style={styless.urnam}>
                                    Address
                                </Text>
                                <View style={styless.Vieweye}>
                                    <TextInput style={styless.textinputstyle} placeholder="Address"
                                        keyboardtype="default"
                                        onChangeText={(v)=>setenteredaddress(v)}
                                        value={enteredaddress}
                                    />
                                </View>
                                <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-around'}}>
                                    <TouchableOpacity onPress={()=>setModalVisible(false)}>
                                        <LinearGradient
                                            colors={['#C53030', '#C53030']}
                                            start={[.9,.0]}
                                            style={{ padding: 5,
                                            alignItems: 'center',
                                            borderRadius: 5,
                                            width:100,
                                            marginTop:20 }}>
                                            <Text
                                                style={{
                                                backgroundColor: 'transparent',
                                                fontSize: 16,
                                                color: '#fff',
                                                fontFamily:"Poppins-Bold"
                                                }}>
                                                Cancel
                                            </Text>
                                        </LinearGradient>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={()=>Profileupdate()}>
                                        <LinearGradient
                                            colors={['#00913d', '#008252']}
                                            start={[.9,.0]}
                                            style={{ padding: 5,
                                            alignItems: 'center',
                                            borderRadius: 5,
                                            width:150,
                                            marginTop:20 }}>
                                            {isloadingg?<ActivityIndicator color="#ffffff"/>:
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
                            </View>
                        </View>
                    </ScrollView>                 
                </View>                
            </Modal>

            <View style={styles.firstdaba}>
                <View style={styles.veryfirstchilddabba}>
                    <View style={{flexDirection:"row",
                        alignItems:"center",
                        width:"80%",
                        justifyContent:"space-around"
                    }}>
                        <View style={styles.pimage}>
                            <Image style={{width:84,height:84,
                            borderWidth:3.5,
                            borderColor:"#007E59",
                            borderRadius:40}} source={require('../assets/drawable-hdpi/student.png')}/>
                        </View>
                        <View style={styles.idd}>
                            <Text style={{
                                color:"#888888",
                                fontFamily:"Rubik-Regular",
                                fontSize:11
                            }}>ID NO.</Text>
                            <Text style={{
                                color:"#2F4858",
                                fontFamily:"Rubik-Bold",
                                fontSize:12
                            }}>{(profileobj)?profileobj.st_id:'...'}</Text>
                        </View>
                    </View>
                </View>
                <View>
                    <Text style={styles.username}>{(profileobj)?profileobj.st_name:'...'}</Text>
                </View>
                <View>
                    <Text style={styles.father}>{(profileobj)?profileobj.st_father_name:'...'}</Text>
                </View>
                <View>
                    <Text style={styles.mobile}>Mob. : +91{(profileobj)?profileobj.st_mobile_no:'...'}</Text>
                </View>
                <View style={styles.addd}>
                    <Text style={styles.address}>Address: </Text>
                    <Text style={styles.address} numberOfLines={4}>{(profileobj)?profileobj.st_address:'...'}</Text>
                </View>
            </View>
                <View style={styles.edit}>
                    <View style={{height:8}}><Feather name="edit" size={18} color="#888888" /></View> 
                    <TouchableOpacity onPress={()=>setModalVisible(true)} >
                        <Text style={{
                            color:"#888888",
                            fontFamily:"Rubik-Regular",
                            fontSize:12,
                            marginLeft:5
                        }}>Edit Profile</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    {subscription.length > 0 ? <View>
                        {subscription.map((v,i)=>
                            <View key={'subscription-'+i}>
                                <TouchableOpacity>
                                    <View style={styles.seconddabba}>
                                        <LinearGradient
                                            colors={['#2F4858', '#007E59']}
                                            start={[.9,.0]}
                                            style={{
                                                position: 'absolute',
                                                left: 0,
                                                right: 0,
                                                top: 0,
                                                height: 250,
                                                borderRadius:5
                                        }}/>
                                        <View style={styles.rightdabba}>
                                            <View>
                                                <Text style={styles.subs}>Subscription Plan</Text>
                                            </View>
                                            <View>
                                                <Text style={styles.stta}>{v.class_name}</Text>
                                            </View>
                                            <View>
                                                <Text style={styles.subs}>Subject</Text>
                                            </View>
                                            <View>
                                                <Text style={styles.subss}>{v.sub_name}</Text>
                                            </View>
                                            <View>
                                                <Text style={styles.subs}>Amount </Text>
                                            </View>
                                            <View>
                                                <Text style={styles.subsamt}>{v.total_price}</Text>
                                            </View>
                                            <View>
                                                <Text style={styles.subs}>Expire : {v.valid_to}</Text>
                                            </View>
                                            <View style={styles.upp}>
                                                <Button  mode="outlined"
                                                    loading={false}
                                                    labelStyle={{color:"white" ,fontFamily:"Rubik-Regular",fontSize:15}}
                                                    contentStyle={{backgroundColor:"#C53030"}}
                                                    style={{width:"100%"}}
                                                    onPress={()=>navigation.navigate("MathScreen",{
                                                        subject:Object.assign(v.subject,{pay_status:1})
                                                    })}>
                                                    View
                                                </Button>
                                            </View>
                                        </View>

                                        <View style={{marginTop:100}}>
                                            <Image style={{width:120,height:97,}} source={require('../assets/drawable-hdpi/book.png')}/>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>
                    :
                        <TouchableOpacity onPress={()=>navigation.navigate('home')} style={{
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
                              marginTop:30 ,
                              }}>
                                <Text style={{
                                      backgroundColor: 'transparent',
                                      fontSize: 16,
                                      color: '#fff',
                                      fontFamily:"Poppins-Bold"
                                  }}>Go To Home</Text>
                          </LinearGradient>
                      </TouchableOpacity>
                    }
                </View>
            </View>
        </ScrollView>
    )
}
const styles=StyleSheet.create({
     main:{
        flex:1,
        marginBottom:40
     },
     user:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-around",
        height:80,
        paddingTop:20
    },
    logo:{
        height:30,
        width:30,
        justifyContent:"center",
        alignItems:'center',
       marginLeft:10,
        marginRight:20
    },
    username:{
        marginLeft:40
     },
     logout:{
        marginLeft:"55%",
        marginRight:15
        
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
    },
     backgroundimage:{
         width:'100%',
         height:"100%",
         opacity:.7
     },
     firstdaba:{
         height:200,
        marginTop:60,
        borderColor:"#2F4858",
         borderWidth:1,
         marginHorizontal:20,
         borderRadius:5,
         alignItems:"center"
     },
     veryfirstchilddabba:{
         flexDirection:"row"
     },
     pimage:{
        marginLeft:"30%"
     },
     username:{
         fontFamily:"Rubik-Bold",
         fontSize:19,
         color:"#2F4858"
     },
     father:{
         fontFamily:'Rubik-Light',
         color:"#888888",
         fontSize:12
     },
     mobile:{
          fontFamily:'Rubik-Medium',
          color:"#00AF50",
          fontSize:12
     },
     addd:{
        flexDirection:"row",
        paddingHorizontal:30,
        marginRight:50,
        marginLeft:40,
        width:"90%"
     },
     address:{
         fontFamily:'Rubik-Light',
         color:"#2F4858",
         fontSize:12
     },
     idd:{
         flexDirection:"row"
     },
     seconddabba:{
         marginTop:10,
          height:250,
         borderColor:"#00AF50",
         marginHorizontal:20,
         borderRadius:5,
         alignItems:"center",
         flexDirection:"row",
          backgroundColor:"green",
          justifyContent:'space-around'
     },
     subs:{
         fontFamily:"Rubik-Regular",
         fontSize:11,
         color:"#FFFFFF"
     },
     subss:{
        fontFamily:"Roboto-Regular",
        fontSize:13,
        color:"#FFFFFF"
     },
     subsamt:{
        fontFamily:"Rubik-Bold",
        fontSize:14,
        color:"#FFFFFF"
     },
     stta:{
         fontFamily:"Rubik-Bold",
         fontSize:20,
         color:"#FFFFFF",
         marginTop:10,
         marginBottom:10
     },
     upp:{
         marginTop:10
     },
     edit:{
         flexDirection:"row",
         justifyContent:'flex-end',
         marginRight:20,
         marginTop:10,
         marginBottom:10,
         alignItems:"baseline"
     },
     rightdabba:{
         marginLeft:10
     },
     centeredview:{
         width:"100%"
     }
});
const styless=StyleSheet.create({
    main:{
      flex:1
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
      marginTop:10,
      marginBottom:10,
      paddingHorizontal:15,
      borderColor:"#5EB668",
      borderWidth:.4,
      paddingTop:10,
      paddingBottom:10
  },
  
  urnam:{
    fontFamily:"Poppins-Regular",
    marginTop:6,
    color:'#1D2327',
    fontSize:14
  },
  textinputstyle:{
      paddingLeft:5,
      height:45
  },
  Vieweye:{
    borderWidth:.5,
    borderColor:'#9AE6B4',
    borderRadius:5,
  }
});
export default Profile;