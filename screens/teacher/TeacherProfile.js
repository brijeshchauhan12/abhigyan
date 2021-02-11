import React ,{useState,useEffect} from 'react';
import {Text,
  View,
  StyleSheet ,
    Image,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator,
    Alert
} from 'react-native';
import { useSelector } from 'react-redux';
import TopHeader from '../../components/topheader';

const TeacherProfile = () => {
  const user=useSelector(state=>state.Auth.userdata);
  const [error,seterror]=useState();
  const [profileobj, setProfileObj]=useState(null);

  const Profiledetail=()=>{
    seterror(null)

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

  useEffect(() => {
    if (profileobj == null || Object.keys(profileobj).length==0) {
        Profiledetail()
    }
  }, [profileobj]);

  return (
    <View style={{flex:1}}>
      <TopHeader title="Profile"/>
      <View style={{padding:5}}>
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
                    borderRadius:40}} source={require('../../assets/drawable-hdpi/student.png')}/>
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
      </View>
    </View>
  )
};

const styles=StyleSheet.create({
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

export default TeacherProfile;