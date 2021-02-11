import React, { useState, useEffect } from 'react';
import { Video } from 'expo-av';
import VideoPlayer from 'expo-video-player';
import {View,Text, TextInput,StyleSheet, ScrollView, Alert, Dimensions} from 'react-native';
import { Button, List, Modal, Portal, Provider } from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useSelector } from 'react-redux';
import {useOrientation} from '../components/useOrientation';
import { TouchableOpacity } from 'react-native-gesture-handler';

const PlayVideo=({route,navigation})=>{
    const user = useSelector(state=>state.Auth.userdata)
    const orientation = useOrientation()
    const [visible, setVisible] = useState(false)
    const [modalData, setModalData] = useState(null)
    const [error, setError]=useState();
    const [questions,setQuestions] = useState(null)
    const [question,setQuestion] = useState('')
    const [loading,setLoading] = useState(false)
    const [reply,setReply] = useState('');
    const [rploading,setRpLoading] = useState(false)
    const {id,videolink,video_name}=route.params

    const showModal = (q) =>{
        setModalData(q)
        setVisible(true)
    }
    const hideModal = () => {
        setModalData(null)
        setVisible(false)
    }

    const getComment = ()=>{
        let details = {
            user_type:'student',
            topic_id:id,
            id:user.st_id
        }
        let formBody = [];
        for (let property in details) {
            let encodedKey = encodeURIComponent(property);
            let encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");

        fetch('http://ais.omsai.info/api/v1/topic_comment', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/x-www-form-urlencoded'
              },
              body: formBody
        }).then(res => res.json()).then(res => {
          if(res.status != 200){
            setError(JSON.stringify(res.message))
          }else{
            // console.log(res.data)
            setQuestions(res.data)
          }
        }).catch(err=>{
          setError(err.message)
        })
    }

    const submit = () =>{
        setError(null)
        if(question== null || question ==''){
            return;
        }
        setLoading(true)
        let details = {
            user_type:'student',
            topic_id:id,
            question:question,
            id:user.st_id
        }

        let formBody = [];
        for (let property in details) {
            let encodedKey = encodeURIComponent(property);
            let encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");

        fetch('http://ais.omsai.info/api/v1/submit_topic_comment', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/x-www-form-urlencoded'
              },
              body: formBody
        }).then(res => res.json()).then(res => {
          if(res.status != 200){
            setError(JSON.stringify(res.message))
          }else{
            // let credentials = res.data;
            Alert.alert("Success" ,"Question saved.",[{ text: "OK"}])
            setQuestion('')
            getComment()
          }
          setLoading(false)
        }).catch(err=>{
          setError(err.message)
          setLoading(false)
        })
    }

    const submitReplay = () =>{
        setError(null)
        if(reply== null || reply ==''){
            return;
        }
        setRpLoading(true)
        let details = {
            user_type:'student',
            question_id:(modalData)?modalData.id:'',
            reply:reply,
            id:user.st_id
        }

        let formBody = [];
        for (let property in details) {
            let encodedKey = encodeURIComponent(property);
            let encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");

        fetch('http://ais.omsai.info/api/v1/submit_topic_comment_reply', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/x-www-form-urlencoded'
              },
              body: formBody
        }).then(res => res.json()).then(res => {
          if(res.status != 200){
            setError(JSON.stringify(res.message))
          }else{
            hideModal()
            setReply('')
            getComment()
          }
          setRpLoading(false)
        }).catch(err=>{
          setError(err.message)
          setRpLoading(false)
        })
    }

    useEffect(() => {
        if (questions == null) {
          getComment()
        }
    }, [questions]);

    useEffect(() => {
        if (error) {
          Alert.alert('An Error Occurred!', error, [{ text: 'Okay' }]);
        }
    }, [error]);

    return(
        <Provider>
            <Portal>
                <Modal visible={visible} onDismiss={()=>setVisible(false)} contentContainerStyle={styles.modal}>
                    <View style={{alignSelf:'stretch'}}>
                        <Text style={{fontSize:16,fontFamily:"Rubik-Bold",marginBottom:10}}>Reply</Text>
                        <View>
                            <Text style={{fontSize:14, fontFamily:"Rubik-Bold"}}>Question:-</Text>
                            <Text style={{fontSize:12}}>{(modalData)?modalData.question:''}</Text>
                        </View>
                        <View style={{marginTop:10, marginBottom:10}}>
                            <TextInput
                                style={{padding:5,borderRadius:4,borderColor:'#ccc', borderWidth: 1, textAlignVertical: 'top' }}
                                placeholder="Enter question replay.."
                                onChangeText={setReply}
                                value={reply}
                                numberOfLines={3}
                                multiline={true}
                                />
                        </View>
                    </View>
                    <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-around'}}>
                        <Button mode="contained" color="#C53030" onPress={()=>hideModal()}>Cancel</Button>
                        <Button loading={rploading} mode="contained" color="#00913d" onPress={()=>submitReplay()}>Submit</Button>
                    </View>
                </Modal>
            </Portal>
            <View style={styles.main}>
                <View style={{flexDirection:'row'}}>
                    <VideoPlayer
                        videoProps={{
                            shouldPlay: false,
                            resizeMode: Video.RESIZE_MODE_CONTAIN,
                            source: {uri: 'http://ais.omsai.info/'+video_name},
                        }}
                        // showControlsOnLoad={true}
                        inFullscreen={true}
                        showFullscreenButton={true}
                        width={Dimensions.get('window').width}
                        height={orientation == 'PORTRAIT'?(Dimensions.get('window').height*40/100):Dimensions.get('window').height}
                    />
                </View>
                <ScrollView keyboardShouldPersistTaps={'handled'}>
                    <View style={{paddingLeft:10, paddingRight:10,marginTop:10}}>
                        <View>
                            <Text style={{fontSize:16}}>Have any question?</Text>
                        </View>
                        <View style={{marginTop:10}}>
                            <TextInput
                                style={{padding:5,borderRadius:4,borderColor:'#ccc', borderWidth: 1, textAlignVertical: 'top' }}
                                placeholder="Enter question"
                                onChangeText={setQuestion}
                                value={question}
                                numberOfLines={3}
                                multiline={true}
                                />
                        </View>
                        <View style={{marginTop:10, flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                            <Button loading={loading} mode="contained" color="#C53030" onPress={()=>submit()}>
                                Submit
                            </Button>
                        </View>
                        {(questions != null && questions.length > 0) &&
                            <View style={{marginTop:10}}>
                                <List.Section style={styles.list} titleStyle={{fontSize:15}} title={"Questions ("+questions.length+")"}>
                                    {questions.map((q,qi)=>
                                        q.answers.length > 0 ? <List.Accordion key={'acc-'+qi} style={styles.listAccord} titleStyle={styles.listAccordTitle} title={q.question} left={props => <FontAwesome {...props} name="comment" />} >
                                            {q.answers.map((a,ai)=><List.Item key={'ans-'+ai} style={styles.listItem} titleStyle={styles.listItemTitle} title={a.reply} left={props => <FontAwesome {...props} style={{marginTop:10}} name="comments-o"/>} right={props => ai == 0 && <TouchableOpacity {...props} onPress={()=>showModal(q)}><FontAwesome name="reply" /></TouchableOpacity>} />)}
                                        </List.Accordion>
                                        :<List.Item key={'acc-'+qi} style={styles.listAccord} titleStyle={styles.listAccordTitle} title={q.question} left={props => <FontAwesome {...props} style={{marginTop:10}} name="comment"/>} right={props => <TouchableOpacity {...props} onPress={()=>showModal(q)}><FontAwesome style={{padding:5}} name="reply" /></TouchableOpacity>} />
                                    )}
                                </List.Section>
                            </View>
                        }
                    </View>
                </ScrollView>
         </View>
        </Provider>
    )
};
const styles=StyleSheet.create({
   main:{
       flex:1,
       backgroundColor:"#f2f2f2"
   },
   modal: {
    margin: 22,
    backgroundColor: 'white',
    padding: 20,
    borderRadius:4
  },
   video:{
       flexDirection:'row',
       width:'100%',
       height:'100%',
       backgroundColor:'#000'
   },
   activityIndicator: {
        position: 'absolute',
        top: 70,
        left: 70,
        right: 70,
        height: 50,
    },
    list:{
        backgroundColor:'#ffffff',
        borderColor:'#ddd',
        borderRadius:4,
        borderWidth:1
    },
    listAccord:{
        width:'100%'
    },
    listAccordTitle:{
        fontSize:14
    },
    listItem:{
        marginLeft:'4%',
        width:'95%',
        backgroundColor:'#eee',
        borderRadius:4,
        marginBottom:2
    },
    listItemTitle:{
        fontSize:13
    }
});
export default PlayVideo;
