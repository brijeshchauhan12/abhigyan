import React ,{useState,useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Alert
} from 'react-native';
import { useSelector } from 'react-redux';
import TopHeader from '../../components/topheader';

const TeacherHome = ({navigation}) => {
  const user = useSelector(state => state.Auth.userdata);
  const [loading, setLoading] = useState(true);
  const [dataSource, setDataSource] = useState([]);
  const [offset, setOffset] = useState(1);

  useEffect(() => getData(), []);

  const getData = () => {
    setLoading(true);

    let details = {
        teacher_id:user.st_id
    }

    let formBody = [];
    for (let property in details) {
        let encodedKey = encodeURIComponent(property);
        let encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    
    //Service to get the data from the server to render
    fetch('http://ais.omsai.info/api/v1/teacher_questions_list?offset='+ offset, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formBody
        })
      //Sending the currect offset with get request
      .then((response) => response.json())
      .then((responseJson) => {
        //Successful response
        if(responseJson.data.length > 0){
          setOffset(offset + 1);
          //Increasing the offset for the next API call
          setDataSource([...dataSource, ...responseJson.data]);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const time_ago = (time) => {

    switch (typeof time) {
      case 'number':
        break;
      case 'string':
        time = +new Date(time);
        break;
      case 'object':
        if (time.constructor === Date) time = time.getTime();
        break;
      default:
        time = +new Date();
    }
    var time_formats = [
      [60, 'seconds', 1], // 60
      [120, '1 minute ago', '1 minute from now'], // 60*2
      [3600, 'minutes', 60], // 60*60, 60
      [7200, '1 hour ago', '1 hour from now'], // 60*60*2
      [86400, 'hours', 3600], // 60*60*24, 60*60
      [172800, 'Yesterday', 'Tomorrow'], // 60*60*24*2
      [604800, 'days', 86400], // 60*60*24*7, 60*60*24
      [1209600, 'Last week', 'Next week'], // 60*60*24*7*4*2
      [2419200, 'weeks', 604800], // 60*60*24*7*4, 60*60*24*7
      [4838400, 'Last month', 'Next month'], // 60*60*24*7*4*2
      [29030400, 'months', 2419200], // 60*60*24*7*4*12, 60*60*24*7*4
      [58060800, 'Last year', 'Next year'], // 60*60*24*7*4*12*2
      [2903040000, 'years', 29030400], // 60*60*24*7*4*12*100, 60*60*24*7*4*12
      [5806080000, 'Last century', 'Next century'], // 60*60*24*7*4*12*100*2
      [58060800000, 'centuries', 2903040000] // 60*60*24*7*4*12*100*20, 60*60*24*7*4*12*100
    ];
    var seconds = (+new Date() - time) / 1000,
      token = 'ago',
      list_choice = 1;
  
    if (seconds == 0) {
      return 'Just now'
    }
    if (seconds < 0) {
      seconds = Math.abs(seconds);
      token = 'from now';
      list_choice = 2;
    }
    var i = 0,
      format;
    while (format = time_formats[i++])
      if (seconds < format[0]) {
        if (typeof format[2] == 'string')
          return format[list_choice];
        else
          return Math.floor(seconds / format[2]) + ' ' + format[1] + ' ' + token;
      }
    return time;
  };

  const getTime = (date) => {
    return time_ago(new Date(date.replace(' ', 'T')));
  };

  const renderFooter = () => {
    return (
      //Footer View with Load More button
      <View style={styles.footer}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={getData}
          //On Click of button load more data
          style={styles.loadMoreBtn}>
          <Text style={styles.btnText}>Load More</Text>
          {loading ? (
            <ActivityIndicator
              color="white"
              style={{marginLeft: 8}} />
          ) : null}
        </TouchableOpacity>
      </View>
    );
  };

  const ItemView = ({item}) => {
    return (
      // Flat List Item
      <TouchableOpacity onPress={() => getItem(item)}
        style={{
          height: 80,
          elevation: 1,
          borderColor: "#ccc",
          borderRadius: 1,
          flexDirection: "row",
          marginHorizontal: 5,
          marginVertical:5,
          paddingVertical:5
        }}>
        <View style={{flex:1, paddingHorizontal:5}}>
          <Text style={{
            color: "#444",
            fontSize: 17,
            fontWeight: "bold"
          }}>{item.question}</Text>
          <View style={{flex:1, paddingHorizontal:5, flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
            <View>
              <Text style={{fontSize:13,color:'#555', fontWeight:'bold'}}>Subject</Text>
              <Text style={{fontSize:12,color: "#888"}}>{item.sub_name}</Text>
            </View>
            <View>
              <Text style={{fontSize:13,color:'#555', fontWeight:'bold'}}>Time</Text>
              <Text style={{fontSize:12,color: "#888"}}>{getTime(item.created_at)}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
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

  const getItem = (item) => {
    //Function for click on an item
    //Alert.alert("Click", item.id+" - "+item.question, [{ text: 'Okay' }]);
    // console.log(item);
    navigation.navigate("TeacherReply",{question:item});
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <TopHeader title="Home" page='tab'/>
      <View style={styles.container}>
        <FlatList
          data={dataSource}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={null}
          enableEmptySections={true}
          renderItem={ItemView}
          ListFooterComponent={renderFooter}
        />
      </View>
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
    backgroundColor:'#F0F0F0',
  },
  footer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  loadMoreBtn: {
    padding: 10,
    backgroundColor: '#800000',
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: 'white',
    fontSize: 15,
    textAlign: 'center',
  }
});

export default TeacherHome;