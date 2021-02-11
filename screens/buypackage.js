import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Picker } from 'react-native';
import { RadioButton, Button } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from "react-native-vector-icons/Ionicons";
import * as  donotallow from "../store/action/auth";
import { useSelector } from 'react-redux';
import TopHeader from '../components/topheader';

const BuyPackage=({route,navigation})=>{
  const {subject}=route.params;
  const user = useSelector(state=>state.Auth.userdata)
  const [rdcheck, setRdCheck] = useState('monthly_price');
  const [pkgtitle, setPkgtitle] = useState('Month')
  const [pkgcount, setPkgcount] = useState('1')
  const [price, setPrice] = useState(0)
  const [error, setError] = useState(null)
  const [loading,setLoading] = useState(false);
  let countarr = ['1','2','3','4','5','6','7','8','9','10','11'];

  const submit = ()=>{
    setError(null)
    setLoading(true)
    let details = {
      student_id: user.st_id,
      subject_id: subject.sub_id,
      type:pkgtitle.toLowerCase()+"ly",
      total_months: (pkgtitle=='Month')?pkgcount:'',
      price: (pkgtitle=='Month'?subject.monthly_price:subject.yearly_price),
      total_price: price
    }
    // console.log(details)
    let formBody = [];
    for (let property in details) {
        let encodedKey = encodeURIComponent(property);
        let encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    fetch('http://ais.omsai.info/api/v1/pay_now', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formBody
      }).then(res => res.json()).then(res => {
        if(res.status != 200){
          setError(JSON.stringify(res.message))
        }else{
          // console.log(res);
          Alert.alert("Subscribed successfully" ,res.message,[
              { text: "OK", onPress: () => navigation.navigate("MathScreen",{
                subject:subject
              }) }
          ])
        }
        setLoading(false)
      }).catch(err=>{
        setError(err.message)
        setLoading(false)
      })
  }

  useEffect(()=>{
    if(rdcheck=='monthly_price'){
      setPkgtitle('Month')
      setPkgcount('1')
      setPrice(subject.monthly_price)
    }

    if(rdcheck=='yearly_price'){
      setPkgtitle('Year')
      setPkgcount('1')
      setPrice(subject.yearly_price)
    }
  },[rdcheck])

  useEffect(()=>{
    if(pkgcount){
      setPrice((pkgtitle=='Month'?subject.monthly_price:subject.yearly_price) * pkgcount)
    }
  },[pkgcount])

  useEffect(() => {
    if (error) {
      Alert.alert('An Error Occurred!', error, [{ text: 'Okay' }]);
    }
  }, [error]);

  return (
    <View style={{flex:1}}>
      <TopHeader title="Profile"/>
      <View style={{flex:1, position:'relative', marginTop:20, padding:10}}>
        <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
          <Text style={{fontSize:20}}>{subject.sub_name}</Text>
        </View>
        <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-around', marginTop:10}}>
          <View style={{flexDirection:'row', alignItems:'center', justifyContent:'flex-start'}}>
            <RadioButton value="monthly_price" status={ rdcheck === 'monthly_price' ? 'checked' : 'unchecked' } onPress={() => setRdCheck('monthly_price')} />
            <Text>Monthly</Text>
          </View>
          <View style={{flexDirection:'row', alignItems:'center', justifyContent:'flex-start'}}>
            <RadioButton value="yearly_price" status={ rdcheck === 'yearly_price' ? 'checked' : 'unchecked' } onPress={() => setRdCheck('yearly_price')}/>
            <Text>Yearly</Text>
          </View>
        </View>
        {rdcheck == 'monthly_price' && 
          <View style={{marginTop:20,flexDirection:'row', alignItems:'center', justifyContent:'flex-start'}}>
            <Text>Select Month:</Text>
            <View style={{marginLeft:10,borderColor:"#2F4858",borderWidth:.5, width:150}}>
              <Picker selectedValue={pkgcount} style={{height:35 }} onValueChange={(v,i)=> setPkgcount(v)}>
                {countarr.map((dat,index)=> <Picker.Item  key={'cnt-'+index} label={dat} value={dat} />)}
              </Picker>
            </View>
          </View>
        }
        
        <View style={{marginTop:20,flexDirection:'row', alignItems:'center', justifyContent:'flex-start'}}>
          <Text>Price: </Text><Text style={{fontFamily:"Rubik-Medium", fontSize:17}}>{price}</Text>
        </View>
        <View style={{marginTop:20,flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
          <Button loading={loading} mode="contained" color="#C53030" onPress={()=>submit()}>
            {'Pay now '+price}
          </Button>
        </View>
      </View>
    </View>
  )
}

const styles=StyleSheet.create({
  user:{
    flexDirection:"row",
    alignItems:"center",
    paddingTop:20,
    height:80,
    justifyContent:"space-around"
  },
  logo:{
    height:30,
    width:30,
    justifyContent:"center",
    alignItems:'center',
    marginLeft:10
  },
  logout:{
    marginLeft:"60%",
    marginRight:"5%"
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
  }
})
export default BuyPackage;