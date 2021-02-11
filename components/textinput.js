import  React,{useEffect,useState,useReducer} from 'react';
import { TextInput } from 'react-native-paper';
import Svg, { Circle, Rect, MarkerUnits } from 'react-native-svg';
import {StyleSheet} from 'react-native';
const useTextInput = props => {
  const [text, setText] = useState('');



  return (
    <TextInput
    style={{...styles.main ,...props.style}}
      value={text}
      underlineColor="white"
      selectionColor="white"
      onChangeText={text => setText(text)}
     placeholder={props.placeholder}
     keyboardType={props.keyboardtype}
      
    />
  );
};
const styles=StyleSheet.create({
  main:{
    borderColor:"#ADEEB4",
    borderWidth:.5,
    backgroundColor:"#FFFFFF"
  }
})

export default useTextInput;