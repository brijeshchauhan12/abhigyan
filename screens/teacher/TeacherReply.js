import React ,{useState,useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Alert
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSelector } from 'react-redux';
import TopHeader from '../../components/topheader';

const TeacherReply = ({route,navigation}) => {
  const {question} = route.params;
  const user = useSelector(state => state.Auth.userdata);
  const [reply,setReply] = useState('');
  const [error, setError]=useState(null);
  const [loading,setLoading] = useState(false);
  const [comments, setComments]=useState([]);

  useEffect(() => {
      if (error) {
        Alert.alert('An Error Occurred!', error, [{ text: 'Okay' }]);
      }
  }, [error]);

  useEffect(() => {
    if (comments.length == 0) {
      getComment();
    }
  }, [comments]);

  const getComment = ()=>{
    let details = {
        question_id:question.id
    }
    let formBody = [];
    for (let property in details) {
        let encodedKey = encodeURIComponent(property);
        let encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    fetch('http://ais.omsai.info/api/v1/teacher_questions_reply_list', {
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
        setComments(res.data)
      }
    }).catch(err=>{
      setError(err.message)
    })
  };

  const submitReplay = () =>{
    setError(null)
    if(reply== null || reply ==''){
        return;
    }
    setLoading(true)
    let details = {
        user_type:'teacher',
        question_id:question.id,
        reply:reply,
        id:user.st_id
    };

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
        setReply('')
        getComment()
      }
      setLoading(false)
    }).catch(err=>{
      setError(err.message)
      setLoading(false)
    })
  };

  const ItemSeparatorView = () => {
    return (
      // Flat List Item Separator
      <View
        style={{
          height: 0.5,
          width: '100%',
          backgroundColor: '#C8C8C8',
        }}
      />
    );
  };

  const ItemView = ({item}) => {
    return (
      // Flat List Item
      <View style={{
          flexDirection: "row",
          marginVertical:5
        }}>
        <View style={{flex:1, paddingHorizontal:5}}>
          <Text style={{
            color: "#444",
            fontSize: 14
          }}>{item.reply}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={{flex: 1}}>
      <TopHeader title="Question Reply" />
      <View style={{flex:1,marginTop:10, paddingHorizontal:10}}>
        <Text>{question.question}</Text>
        <View style={{marginTop:10, marginBottom:10}}>
            <TextInput
                style={{padding:5,borderRadius:4,borderColor:'#ccc', borderWidth: 1, textAlignVertical: 'top' }}
                placeholder="Enter question replay.."
                onChangeText={setReply}
                value={reply}
                numberOfLines={3}
                multiline={true}
                />
            <View style={{marginTop:10, marginBottom:10, flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
              <TouchableOpacity onPress={()=>submitReplay()}>
                <LinearGradient
                    colors={['#00913d', '#008252']}
                    start={[.9,.0]}
                    style={{ padding: 5,
                    alignItems: 'center',
                    borderRadius: 5,
                    width:150,
                    marginTop:20 }}>
                    {loading?<ActivityIndicator color="#ffffff"/>:
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
        <Text style={{padding:5,color: "#444",fontSize: 17,fontWeight: "bold"}}>Reply Lists</Text>
        <SafeAreaView style={{flex: 1}}>
          <View style={{justifyContent: 'center',flex: 1,backgroundColor:'#F0F0F0'}}>
            <FlatList
              data={comments}
              keyExtractor={(item, index) => index.toString()}
              ItemSeparatorComponent={ItemSeparatorView}
              enableEmptySections={true}
              renderItem={ItemView}
            />
          </View>
        </SafeAreaView>
      </View>
    </View>
  );
};

export default TeacherReply;