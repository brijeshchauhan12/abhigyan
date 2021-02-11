import React from 'react';
import {Text,View,StyleSheet} from 'react-native';

const Liveclasses=({navigation})=>{
    return(
        <View style={styles.main}>
           <Text style={{fontSize:20,}}>Coming soon!</Text>
        </View>
    )
}
const styles=StyleSheet.create({
        main:{
            justifyContent:'center',
            alignItems:"center",
            backgroundColor:"gray",
            flex:1
        }
});
export default Liveclasses;