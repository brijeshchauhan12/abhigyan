import React,{useEffect,useState} from 'react';
import {View,Text,Button,StyleSheet, 
    Image,ImageBackground, Alert,
    ActivityIndicator
} from 'react-native';
import PDFReader from 'rn-pdf-reader-js';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import {useSelector,useDispatch} from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from "react-native-vector-icons/Ionicons";
import * as topicandvidd from '../store/action/topicandvideo';
import * as  donotallow from "../store/action/auth";
import TopHeader from '../components/topheader';

const MathScreen=({ route, navigation})=>{
    const {subject} = route.params;
    const subject_id = subject.sub_id;
    const sub_namee = subject.sub_name;
    const [error,seterror]=useState(null)
    const [isloadingmm,setisloadingmm]=useState(false)
    const [topLoader, setTopLoader] = useState(false);
    const [getFilter, setFilter]=useState('all');
    const dispatch=useDispatch()
    const [topicdetail, setTopicDetail]= useState([]);//useSelector(state=>state.Topic_Video.topiclist)
    
    const TopicandVideos= ()=>{
        seterror(null)
        setTopLoader(true)

        let details = {
            subject_id:subject_id
        };

        let formBody = [];
        for (let property in details) {
            let encodedKey = encodeURIComponent(property);
            let encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");

        fetch('http://ais.omsai.info/api/v1/topic_with_videos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formBody
        }).then(res => res.json()).then((res)=>{
            if(res.status != 200){
              // seterror(JSON.stringify(res.message))
            }else{
                if(res.data.length > 0){
                    setTopicDetail(res.data)
                }
            }
            setTopLoader(false)
        }).catch((err)=>{
          setTopLoader(false)
        })
      }

      const setMediaLink = (da) =>{
        if(subject.pay_status == 0 && da.is_paid==1){
          Alert.alert(
            'Paid Content',
            'This is paid content of subject if you subscribe subject you able to access all of content of this subjects!',
            [
              {
                text: 'Cancel',
                style: 'cancel',
              },
              { text: 'OK', onPress: () => navigation.navigate("BuyPackage",{subject:subject}) },
            ],
            { cancelable: false }
          );
        }else{
          if(da.type == 'pdf'){
            navigation.navigate("PdfRead",{
              id:da.v_id,
              url:da.v_path,
              name:da.title
            })
          }else if(da.type == 'video'){
            navigation.navigate("PlayVideo",{
              id:da.v_id,
              videolink:da.v_path,
              video_name: da.video_name
            })
          }
        }
      }

      useEffect(()=>{
        if(topicdetail && topicdetail.length == 0){
          TopicandVideos()
        }
      },[topicdetail])

      useEffect(() => {
        if (error) {
          Alert.alert('An Error Occurred!', error, [{ text: 'Okay' }]);
        }
      }, [error]);
    return(
      <ScrollView style={{marginBottom:5}}>
        <View style={styles.main}>
             <TopHeader title={sub_namee}/>
            <View style={styles.mathmain}>
              <View style={styles.first}>
                  <View style={{marginBottom:10}}><Text style={styles.mathsty}>{sub_namee}</Text></View>
                  <View><Text style={styles.vdchp}>
                    {topicdetail.map(v=>
                      v.contents.length > 0?1:0
                    ).reduce((acc, curr) => parseInt(acc) + parseInt(curr, 10), 0)} Chapters</Text></View>
                  <View><Text style={styles.vdchp}>
                  {topicdetail.map(v=>
                      v.contents.filter(x => x.type === 'video').length
                    ).reduce((acc, curr) => parseInt(acc) + parseInt(curr, 10), 0)+" "}
                    Videos|
                    {topicdetail.map(v=>
                      v.contents.filter(x => x.type === 'pdf').length
                    ).reduce((acc, curr) => parseInt(acc) + parseInt(curr, 10), 0)+" "} Documents</Text></View>
              </View>
              <View style={styles.second}>
                  <Image  source={require('../assets/drawable-hdpi/book.png')}/>
              </View>
            </View>
            <View style={styles.money}>
                <Text style={styles.chapter}>Chapters</Text>
                <View style={{flexDirection:'row', alignItems:'center',justifyContent:'flex-start', marginRight:15}}>
                  {/*<TouchableOpacity onPress={()=>setFilter('all')}><Text style={[styles.free, {color:'red'}, (getFilter == 'all') ? styles.activefreePrem : null]}>All</Text></TouchableOpacity>
                      <Text> | </Text>*/}
                  <TouchableOpacity onPress={()=>setFilter('free')}><Text style={[styles.free, (getFilter == 'free') ? styles.activefreePrem : null]}>Free</Text></TouchableOpacity>
                  <Text> | </Text>
                  <TouchableOpacity onPress={()=>setFilter('premium')}><Text style={[styles.premium, (getFilter == 'premium') ? styles.activefreePrem : null]}>Premium</Text></TouchableOpacity>
                </View>
            </View>
            <ScrollView>
              {topLoader?<ActivityIndicator size="large"/>:<>
                {topicdetail.length > 0 ? <View>
                  {topicdetail.filter(x => x.contents.length > 0 ).map((data,index) =>
                    <View key={'top-'+index} style={styles.videos}>
                      <View style={styles.chapdetail}>
                        <Text style={styles.chapter1}>Chapter-{(index+1)}</Text>
                        <Text style={styles.chapter2}>
                        {data.contents.filter(x => x.type === 'video').length} Video {data.contents.filter(x => x.type === 'pdf').length} Documents</Text>
                      </View>
                        <Text style={styles.videoupper}>{data.topic_name}</Text>
                        <ScrollView  horizontal={true} showsHorizontalScrollIndicator={false} zoomScale={1}>
                          {(data.contents).map((da,index)=>
                              <View key={'vid-'+index} style={styles.videocontainer}>
                                <Text style={[styles.videoupper,{marginLeft:5}]}>{da.title}</Text>
                                  {/* <TouchableOpacity onPress={()=>navigation.navigate("VideoPlayer",{
                                    videolink:'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4'
                                })}> */}
                                <ImageBackground style={styles.imagestyling} imageStyle={{borderRadius:5}} source={(da.thumbnail_path != null && da.thumbnail_path !=='')?{uri:da.thumbnail_path}:require('../assets/drawable-mdpi/Image20.png')}>
                                    <View style={[styles.freecourses,(da.is_paid==1)?{width:70,marginLeft:130}:{width:50}]}>
                                      <LinearGradient
                                        colors={['#ebdf36','#ebdf36']}
                                        style={{
                                          position: 'absolute',
                                          left: 0,
                                          right: 0,
                                          top: 0,
                                          width:(da.is_paid==1)?70:50,
                                          height:30,
                                          borderBottomLeftRadius:40,
                                          borderBottomRightRadius:40,
                                          borderColor:"#0af752",
                                          borderWidth:.3
                                          }}
                                        />
                                        <Text style={{
                                          color:"white",
                                          fontSize:12,
                                          marginBottom:4
                                        }}>{(da.is_paid==1)?'Premium':'Free'}</Text> 
                                    </View>
                                    <View style={styles.playvid}>
                                      <TouchableOpacity onPress={()=>setMediaLink(da)}>
                                        <FontAwesome name={(da.type=='video')?'play':'eye'} size={24} color="blue" />
                                      </TouchableOpacity>
                                    </View>
                                </ImageBackground>
                              </View>
                          )}
                        </ScrollView> 
                    </View>
                  )}
                </View>
                :<View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}><Text style={{fontSize:16}}>Videos/Document not found of {sub_namee} subject.</Text></View>}
              </>}
            </ScrollView>
        </View>
      </ScrollView>
    )
}
const styles=StyleSheet.create({
   main:{
       flex:1,
   },
   mathmain:{
      flexDirection:"row",
      height:150,
      marginTop:5,
      alignItems:"center",
      justifyContent:'space-between',
      marginRight:10
   },
   first:{
       marginLeft:10
   },
   second:{
      marginLeft:40
   },
   mathsty:{
      color:"#2F4858",
      fontFamily:"Rubik-Bold",
      fontSize:18
   },
   vdchp:{
      color:"#9A9A9A",
      fontFamily:"Rubik-Regular",
      fontSize:10
   },
   money:{
       flexDirection:"row",
       height:40,
       alignItems:"center",
       justifyContent:'space-between'
   },
   chapter:{
        color:"#2F4858",
        fontFamily:"Rubik-Bold",
        fontSize:16,
        marginLeft:15
   },
   free:{
       color:"#00AF50",
       fontFamily:"Rubik-Regular",
       fontSize:12,
       padding:3
   },
   premium:{
     color:"#CA8925",
     fontFamily:"Rubik-Regular",
     fontSize:12,
     padding:3
   },
   activefreePrem:{
     backgroundColor:'#ccc',
     borderColor:'#000',
     borderStyle:'solid',
     borderRadius:2,
     borderWidth:1
   },
   chapdetail:{
    flexDirection:"row",
    height:20,
    alignItems:"center",
    justifyContent:'space-between'
   },
   chapter1:{
       color:"#9A9A9A",
       fontFamily:"Rubik-Regular",
       fontSize:7,
       marginLeft:15
   },
   chapter2:{
    color:"#9A9A9A",
    fontFamily:"Rubik-Regular",
    fontSize:7,
    marginRight:15
   },
   videos:{
       height:210,
   },
   videocontainer:{
        marginLeft:10,
   },
   pdfcontainer:{
       marginLeft:10,
       marginTop:20,
       height:250,
   },
   videoupper:{
       fontFamily:"Rubik-Regular",
       color:'#2F4858',
       fontSize:13,
       marginLeft:15,
       marginBottom:5
   },
   imagestyling:{
       height:175,
       width:200,
       borderRadius:5,
       shadowColor: "black",
       shadowOpacity: 0.26,
       shadowOffset: { width: 0, height: 2 },
       shadowRadius: 4,
       backgroundColor: "white",
   },
   playvid:{
    flexDirection:'column',
    alignItems:"center",
    marginTop:25,
    borderColor:"white",
    borderWidth:1,
    borderRadius:40,
    width:50,
    height:50,
    marginLeft:"38%",
    justifyContent:"center",
    backgroundColor:"white",
    paddingLeft:5,
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation:6
   },
   freecourses:{
    position:'relative',
    backgroundColor:"#e4f714",
    width:50,
    height:30,
    borderBottomLeftRadius:40,
    borderBottomRightRadius:40,
    marginLeft:140,
    justifyContent:"center",
    alignItems:"center",
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation:6
   }
 
});
export default MathScreen;