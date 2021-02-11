import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Alert, TouchableOpacity, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSelector } from 'react-redux';
import TopHeader from '../components/topheader';

const HelpFacility = ({navigation}) => {
  const user = useSelector(state=>state.Auth.userdata);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [titleErr, setTitleErr] = useState(false);
  const [description, setDescription] = useState('');
  const [descriptionErr, setDescriptionErr] = useState(false);

  const submit = () =>{
    setError(null)
    setLoading(true)
    if(title == ''){
      setTitleErr(true);
    }else{
      setTitleErr(false)
    }
    if(description == ''){
      setDescriptionErr(true);
    }else{
      setDescriptionErr(false)
    }
    if(title == '' || description == ''){
      setLoading(false)
      return false;
    }
    let details = {
      student_id:user.st_id,
      title:title,
      description:description
    }

    let formBody = [];
    for (let property in details) {
        let encodedKey = encodeURIComponent(property);
        let encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    fetch('http://ais.omsai.info/api/v1/student_enquiry', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: formBody
    }).then(res => res.json()).then((res)=>{
        if(res.status != 200){
            setError(JSON.stringify(res.message))
        }else{
          setTitle('');
          setDescription('');
            Alert.alert('Success', res.message, [{ text: 'Okey' }]);
        }
        setLoading(false)
        
    }).catch((err)=>{
        setError(err.message)
        setLoading(false)
    })
  }
  useEffect(()=>{
    if(error){
      Alert.alert('An Error Occurred!', error, [{ text: 'Okay' }]);
    }
  },[error])

  return (
    <View style={{flex:1}}>
      <TopHeader title="Help Facility"/>
      <View style={{flex:1, padding:20}}>
          <View>
            <Text style={{
              fontFamily:"Poppins-Regular",
              marginTop:20,
              color:'#1D2327',
              fontSize:14}}>Title</Text>
              <TextInput
                style={{padding:5,borderRadius:4,borderColor:'#ccc', borderWidth: 1, textAlignVertical: 'top' }}
                placeholder="Title"
                onChangeText={setTitle}
                value={title}
            />
            { titleErr == true ? (
              <Text style={{
                fontSize: 12,
                color:"red",
                marginLeft:0,
              }}>
              * Title is required.
              </Text>
              ) : null  }
          </View>
          
          <View style={{marginBottom:10}}>
            <Text style={{
              fontFamily:"Poppins-Regular",
              marginTop:20,
              color:'#1D2327',
              fontSize:14}}>Description</Text>
              <TextInput
                style={{padding:5,borderRadius:4,borderColor:'#ccc', borderWidth: 1, textAlignVertical: 'top' }}
                placeholder="Description"
                onChangeText={setDescription}
                value={description}
                numberOfLines={3} multiline={true}
            />
            { descriptionErr == true ? (
              <Text style={{
                fontSize: 12,
                color:"red",
                marginLeft:0,
              }}>
              * Description is required.
              </Text>
              ) : null  }
          </View>
          <TouchableOpacity onPress={()=>submit()} style={{
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
                {loading?<ActivityIndicator color="#ffffff"/>:(     
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
    </View>
  )
}
export default HelpFacility;