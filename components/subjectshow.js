import React from 'react';
import {Text,View,StyleSheet ,Button ,Image} from 'react-native';

const SubShow=props=>{
    return (
           <View style={{...styles.main, ...props.style}}>
                <View style={{flexDirection:'row', justifyContent:'flex-start'}}>
                    <View style={styles.first}>
                        <Image source={props.source} style={{width:'70%'}}/>
                    </View>
                    <View style={styles.second}>
                        <View>
                            <Text style={{color:props.subcolor,
                                    fontFamily:"Rubik-Bold",
                                    fontSize:20,
                                    marginBottom:10
                                }}>
                                {(props.subject.length > 8) ? props.subject.substring(0,9)+"..":props.subject}
                                </Text>
                        </View>
                        <View style={styles.notess}>
                        <Text style={{color:props.notecolor,
                                fontFamily:"Rubik-Regular",
                                fontSize:10,
                            
                            }}>Notes - </Text>
                        <Text  style={{color:props.notecolor,
                                fontFamily:"Rubik-Bold",
                                fontSize:10
                            }}>{(props.noofnotes)?props.noofnotes:'0'}</Text>
                        </View>
                        <View style={styles.notess}>
                        <Text  style={{color:props.notecolor,
                                fontFamily:"Rubik-Regular",
                                fontSize:10
                            }}>Video - </Text>
                        <Text  style={{color:props.notecolor,
                            fontFamily:"Rubik-Bold",
                            fontSize:10
                        }}>{(props.noofvideo)?props.noofvideo:'0'}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.third}>
                {(props.timing != null && props.timing != 1) && <>
                    <Text style={{color:props.timingcolor,
                            fontFamily:"Rubik-Bold",
                            fontSize:18,
                        textAlign:"right"
                    }}>{props.timing}</Text>
                    <Text style={{
                        color:props.timingcolor,
                        fontFamily:"Rubik-Medium",
                        fontSize:10,
                        textAlign:"right"
                    }}
                    selectable={true}
                    >Live Session</Text>
                </>}
                {(props.nextlivesession != null && props.nextlivesession !=2) &&
                    <Text style={{
                        color:props.livesessioncolor,
                        fontFamily:"Rubik-Regular",
                        fontSize:8,
                        marginTop:20,
                        textAlign:"right"
                    }}>{props.nextlivesession}</Text>
                }
               </View>
           </View>
    )
}
const styles=StyleSheet.create({
   main:{
    flexDirection:"row",
    paddingHorizontal:10,
    paddingVertical:10,
    height:100,
    marginHorizontal:15,
    marginTop:10,
    borderRadius:5,
    alignItems:"center",
    borderWidth:.3,
    justifyContent:'space-between'
   },
   first:{
    marginLeft:1,
    width:70,
    height:70,
    borderRadius:40,
    backgroundColor:"white",
    alignItems:"center",
    justifyContent:"center"
   },
   second:{
    marginLeft:5
   },
   third:{
    marginLeft:5,
    width:"35%",
   },
   notess:{
       flexDirection:'row'
   }
});
export default SubShow;