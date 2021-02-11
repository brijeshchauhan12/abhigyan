import React from 'react';
import {Text,View,StyleSheet} from 'react-native';
const Download=({navigation})=>{
    return(
        <View style={styles.main}>
            <Text style={{fontSize:20,}}>Download</Text>
        </View>
    )
}
const styles=StyleSheet.create({
        main:{
            justifyContent:'center',
            alignItems:"center",
            backgroundColor:"blue",
            flex:1
        }
});
export default Download;