import React ,{useState,useEffect,useRef}from 'react';
import {Text,View,StyleSheet,
    ImageBackground,Image,
    TouchableOpacity,
    ScrollView,
    ActivityIndicator,
    Alert,
    Modal,
    TouchableHighlight,
    TextInput,
    Picker,
    FlatList,
    Dimensions,
    Animated
    
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Button } from 'react-native-paper';
import Edit from '../assets/edit.tsx';
const {width,height}=Dimensions.get('window');
const SPACING=10;
const ITEM_SIZE=width*0.72;
const SPACER_ITEM_SIZE=(width-ITEM_SIZE)/2;
import { Checkbox } from 'react-native-paper';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from "react-native-vector-icons/Ionicons";
import * as  donotallow from "../store/action/auth";
import {useDispatch,useSelector} from 'react-redux';
const Subplan=({navigation})=>{
    const dispatch=useDispatch();
    const [isloadingmm,setisloadingmm]=useState(false)
    const [checked, setChecked] = useState(false);
    const [checked1, setChecked1] = useState(false);
    const [selectedValue,setSelectedValue]=useState(false);
    const scrollx=useRef(new Animated.Value(0)).current;
    var [DATA,SETDATA]=useState([])
    const doonotallow=async()=>{
        // seterror(null)
   
        setisloadingmm(true)
        try{
       await   dispatch(donotallow.donotallowuser(null))
      //  SETDATA([{key:"left-spacer"},...DATA,{key:"right-spacer"}]);
        }catch(error){
        //  seterror(error.message)
          setisloadingmm(false)
        }
      }
       
   DATA = [
        {
          id: 'b1',
          title: 'First Item',
        },
        {
          id: 'b2',
          title: 'brijesh',
        },
        {
          id: 'b3',
          title: "67",
        },
        {
          id: 'b4',
          title: 'brijesh',
        },
        {
          id: 'b5',
          title: 'Second Item',
        },
        {
          id: 'b6',
          title: 'brijesh',
        },
        {
          id: 'b7',
          title: "3",
        },
        {
          id: 'b8',
          title: 'brijesh',
        },
        {
          id: 'b9',
          title: 'Third Item',
        },
      ];
      //  SETDATA([{key:"left-spacer"},...DATA,{key:"right-spacer"}]);
      const Item = ({ title }) => (
        
        <View style={styles.hexagon}>
        <View style={styles.hexagonInner} >
              <View style={styles.subject}>
                 <Text style={styles.subjectchild}>{title}</Text>
              </View>
              <View style={styles.betdabba}>
                  <View style={styles.ruppee}>
                         <Text style={styles.ruppeechild}>₹ 250</Text>
                  </View>
                  <View style={styles.pmonth}>
                           <Text style={styles.pmonthchild}>Per Month</Text>
                  </View>
                  <View style={styles.imgg}>
                           <Image style={styles.imggchild} source={require("../assets/drawable-mdpi/Image10.png")}/>
                  </View>
                  <View style={styles.checkk}>
                         <Checkbox
                                    status={checked ? 'checked' : 'unchecked'}
                                  onPress={() => {
                                    setChecked(!checked);
                                   }}
                             />
                             <Text style={styles.annual}>Annual</Text>
                         <Checkbox
                                    status={checked1 ? 'checked' : 'unchecked'}
                                  onPress={() => {
                                    setChecked1(!checked1);
                                   }}
                             />
                             <Text style={styles.monthly}>Monthly</Text>
                  </View>
               
              </View>
              <View style={styles.conditionrupee}>
                      <Text style={styles.conditionrupeechild}>₹ 2500</Text>
                  </View>
         </View>
       
        <View style={styles.hexagonAfter} >
            </View>
         </View>
      );


    

    return(
       <ScrollView>
        <View style={styles.main}>
        
       
          <View style={styles.user}>
            <LinearGradient
         // Background Linear Gradient
             colors={['#007E59', '#007E59']}
             start={[.9,.0]}
              style={{
                 position: 'absolute',
                left: 0,
                   right: 0,
                  top: 0,
                height: 80,
                
                }}
               />
                  <TouchableOpacity>
                 <View style={styles.logo}>
                 <Ionicons name="ios-arrow-back" size={24} color="white" onPress={()=>navigation.goBack()}/>
                  </View> 
               </TouchableOpacity>
                
                 <View style={styles.username}>
                          <Text style={styles.usernamechild}>Subscription Plan</Text>
                 </View>
                 <View style={styles.logout}>
                     {isloadingmm?<ActivityIndicator/>:
                       <Text 
                       style={styles.logoutchild}
                       onPress={doonotallow}

                       >Logout</Text>}
                 </View>
              
                 </View>
                 <View style={styles.subssubj}>
                     <Text style={styles.subssubjchild}>Subscribe Subject</Text>
                 </View>
                  <View style={styles.lorem}>
                      <Text numberOfLines={3} style={styles.loremchild}>
                      Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
                      </Text>
                  </View>
                  <View style={styles.picker}>
                  <Picker
                
                         selectedValue={selectedValue}
                          style={{    height:50 }}
                           onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                
                   >
                
       
                   <Picker.Item label={"selectclass"} value={0} />
         
       
                   </Picker>
                  </View>
             

                {/* flatlist  exp */}
 

               <View style={styles.fflatList}>
                <Animated.FlatList
                     data={DATA}
                     keyExtractor={item => item.id}
                     horizontal={true}
                     snapToInterval={ITEM_SIZE}
                     decelerationRate={0}
                     
                     onScroll={Animated.event(
                       [{nativeEvent:{contentOffset:{x:scrollx}}}],
                       {useNativeDriver:true}
                     )}
                     scrollEventThrottle={16}
                     renderItem={({ item ,index}) => {
                       if(!item.title=="brijesh"){
                         console.log('hi brijesh')
                         return(
                           <View style={{width:SPACER_ITEM_SIZE,backgroundColor:"red",height:400}}> </View>
                         )
                       }
                      const inputRange=[
                            (index-2)*ITEM_SIZE,
                            
                            index*ITEM_SIZE,
                            (index+2)*ITEM_SIZE,
                      ];
                      const Translatey=scrollx.interpolate({
                        inputRange,
                        outputRange:[0,+50,0]
                      })
                      return(
                        <View style={{width:ITEM_SIZE}}> 
                        <Animated.View
                         style={{
                        // transform:[{translatey}]
                        transform:[{ translateY: Translatey }]
                         }}
              
                        >
                      <Item title={item.title} />
                      </Animated.View>
                      </View>
                      )
                    }}
                  
                 />
                </View>

                    {/* flatlist  exp */}


                  <View style={styles.purchasesub}>
                    <Text style={styles.purchasesubchild}>Selected 3 Subject of 5</Text>
                  </View>
                  <View style={styles.button}>
                  <Button  mode="outlined"
                    // loading={false}
                  labelStyle={{color:"white" ,fontFamily:"Rubik-Regular",fontSize:15}}
                  contentStyle={{backgroundColor:"#C53030"}}
                     style={{width:"40%",
                    
                    }}
                     onPress={()=>console.log("pressed")}>
                   BUY NOW
                  </Button>
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
   marginLeft:5
   
//    borderRadius:40,

},
username:{
    marginLeft:"0%"
 },
 logout:{
    marginLeft:"30%",
    marginRight:5
    
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
subssubj:{
  marginLeft:20,
  justifyContent:"flex-start",
  marginTop:35
},
subssubjchild:{
   fontFamily:"Rubik-Bold",
   color:"#2F4858",
   fontSize:20
},
lorem:{
   marginHorizontal:20
},
loremchild:{
 color:"#9A9A9A",
 fontSize:12
},

hexagon: {
    width: 200,
    height: 305,
    marginLeft:8
  },
  hexagonInner: {
    width: 200,
  height: 305,
    backgroundColor: 'blue',
    borderTopLeftRadius:10,
    borderTopRightRadius:10
  },
  hexagonAfter: {
    position: 'absolute',
    bottom: -25,
    left: 0,
    width: 0,
    height: 0,
    borderStyle: 'solid',
    borderLeftWidth: 93,
    borderLeftColor: 'transparent',
    borderRightWidth: 106,
    borderRightColor: 'transparent',
    borderTopWidth: 25,
    borderTopColor: 'blue',
    
    
    
  },
  subject:{
        height:50,
        backgroundColor:"blue",
        borderTopEndRadius:10,
        borderTopLeftRadius:10,
        justifyContent:"center",
        alignItems:"center"
  },
  subjectchild:{
     fontFamily:"Rubik-Medium",
     fontSize:20,
     color:"#FFFFFF"
  },
  betdabba:{
      height:200,
      backgroundColor:"#FFFFFF"
  },
  ruppee:{
         justifyContent:"center",
         alignItems:"center",
         
  },
  ruppeechild:{
         color:"#048AC0",
         fontFamily:"Rubik-Medium",
         fontSize:20
  },
  pmonth:{
         justifyContent:"center",
         alignItems:"center"
  },
  pmonthchild:{
           color:"#888888",
           fontFamily:"Roboto-Light"
  },
  imgg:{
    alignItems:"center",
    justifyContent:"center",
    marginTop:20
  },
  imggchild:{
      width:120,
      height:80
  },
  checkk:{
      flexDirection:"row",
      alignItems:"center",
      justifyContent:"center",
      marginTop:20
  },
  annual:{
         fontFamily:"Roboto-Regular",
         color:"#2F4858",
         fontSize:14
  },
  monthly:{
    fontFamily:"Roboto-Regular",
    color:"#2F4858",
    fontSize:14
  },
  conditionrupee:{
       justifyContent:"center",
       alignItems:"center",
       marginTop:25
  },
  conditionrupeechild:{
          fontFamily:"Rubik-Bold",
          fontSize:26,
          color:"#FFFFFF"
  },
  picker:{
    width:'40%',
    borderWidth:2,
    borderColor:"#2F4858",
    borderRadius:5,
    marginLeft:20,
    marginTop:6
  },
  purchasesub:{
      justifyContent:"center",
      alignItems:"center"
  },
  purchasesubchild:{
      
      fontSize:10,
      color:"#888888"
  },
  button:{
    justifyContent:"center",
    alignItems:"center",
    marginTop:30,
    
  },
  fflatList:{

    justifyContent:"center",
    alignItems:"center",
  height:400,
  

  
  }



})
export default Subplan;