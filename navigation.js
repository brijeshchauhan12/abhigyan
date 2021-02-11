import "react-native-gesture-handler";
import * as React from "react";
import AsyncStorage from '@react-native-community/async-storage';
import { View, Image, Text ,TouchableOpacity, Dimensions} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator,DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome,FontAwesome5, AntDesign, MaterialIcons, Entypo } from '@expo/vector-icons';
import {useSelector,useDispatch} from 'react-redux';
import * as  donotallow from "./store/action/auth";
import {
   Confirmation,
   Dashboard,
   Login,
   Home,
   Profile,
   Signup,
   Liveclasses,
   Download,
   More,
   MathScreen,
   PdfRead,
   PlayVideo,
   Forgatepassword,
   Resetpassword,
   Subplan,
   BuyPackage,
   Notifications,
   HelpFacility,
   ShortVideo,
   ShareApp
  } from "./screens";

  import { TeacherHome, TeacherProfile, TeacherReply } from './screens/teacher';

 function ProfileStack(){
   const profilStack=createStackNavigator();
   return(
     <profilStack.Navigator>
       <profilStack.Screen 
         name="Profile"       
         component={Profile}
         options={{
          headerStyle:{
            backgroundColor:"#76E483"
          },
          headerTitle:"PROFILE",
          headerTitleStyle:{
            color:"#2F4858",
            fontFamily:"Rubik-Regular",
            fontSize:18
          },
          headerRight:()=>(
            <Text style={{color:"white",
                    fontFamily:"Rubik-Medium",
                    fontSize:12
          }}>Logout</Text>
          ),
          headerRightContainerStyle:{
            marginRight:25
          }
        }}
        />
        <profilStack.Screen 
         name="Subplan"       
         component={Subplan}
         />
     </profilStack.Navigator>
   )
 } 
 function HomeStack() {
    const childStack = createStackNavigator();
    return (
        <childStack.Navigator>
          <childStack.Screen name="home" component={Home} />
          <childStack.Screen
            name="MathScreen"
            component={MathScreen} 
            options={{
              headerStyle:{
                backgroundColor:"#76E483"
              },
              headerTitle:"MATHEMATICS",
              headerTitleStyle:{
                color:"#2F4858",
                fontFamily:"Rubik-Regular",
                fontSize:18
              },
              headerRight:()=>(
                <Text style={{color:"white",
                        fontFamily:"Rubik-Medium",
                        fontSize:12
              }}>Logout</Text>
              ),
              headerRightContainerStyle:{
                marginRight:25
              }
            }}
            />
          <childStack.Screen name="PlayVideo" component={PlayVideo} />
          <childStack.Screen name="PdfRead" component={PdfRead} />
          <childStack.Screen name="BuyPackage" component={BuyPackage} />
        </childStack.Navigator>
    );
  }

  function LoginStack(){
    const LoginStack=createStackNavigator();
    return(
      <LoginStack.Navigator>
        <LoginStack.Screen 
            name="Login"       
            component={Login} 
            options={{
              headerLeft:null,
              headerShown:null
            }}
          />
          <LoginStack.Screen 
            name="Forgatepassword"       
            component={Forgatepassword}
            options={{
              headerLeft:null,
              headerShown:null
            }}
          />
          <LoginStack.Screen 
            name="Resetpassword"       
            component={Resetpassword} 
            options={{
              headerLeft:null,
              headerShown:null
            }}
          />
          <LoginStack.Screen 
            name="Signup"       
            component={Signup} 
            options={{
              headerLeft:null,
              headerShown:null
            }}
          />
          <LoginStack.Screen 
            name="Confirmation"       
            component={Confirmation} 
            options={{
              headerLeft:null,
              headerShown:null
            }}
          />
      </LoginStack.Navigator>
    )
  }

  function HomePf({navigation}){
    const Tab = createBottomTabNavigator();
    return(
         <Tab.Navigator 
          tabBarOptions={{
            activeTintColor: 'green',
            style:{
              elevation: 5,   // here set your elevation
            }
          }}
           >
            <Tab.Screen name="home" component={HomeStack}
              options={{
                tabBarLabel: 'Home',
                tabBarIcon: ({ color, size,focused }) => (
                  <MaterialIcons name="home" size={30} color={color} focused={focused} /> 
                ),
              }}  
            />
            <Tab.Screen name="video" component={Liveclasses}
              options={{
                tabBarLabel: 'Liveclasses',
                tabBarIcon: ({focused, size ,tintColor,color}) => (
                  <FontAwesome5 name="video" size={24}  color={ color} focused={focused}/>
                )
              }}
            />
            <Tab.Screen name="subscription" component={ProfileStack} 
              options={{
                tabBarLabel: 'Subscription',
                tabBarIcon: ({ color, size ,focused}) => (
                  <MaterialIcons name="assignment-turned-in" size={24} color={color} focused={focused} />
                ),
              }}
            />
            <Tab.Screen name="notifications" component={Notifications}
              options={{
                tabBarLabel:'Notifications',
                tabBarIcon:({color, size, focused}) => (
                  <FontAwesome5 name="bell" size={24} color={color} focused={focused} />
                )
              }}
            />
            {/*<Tab.Screen name="more" component={More}
              options={{
                tabBarLabel: 'More',
                tabBarIcon: ({ color, size }) => (
                  <MaterialIcons name="more-horiz" size={24} color="#2F4858" />
                ),
              }}
            />*/}
          </Tab.Navigator>
    )
  }

  function Teachers({navigation}){
    const childStack = createStackNavigator();
    return (
        <childStack.Navigator>
          <childStack.Screen name="home" component={TeacherHome} />
          <childStack.Screen name="TeacherReply" component={TeacherReply} />
        </childStack.Navigator>
    );
  };

  const AppDrawerNavigator = () =>{
    const dispatch = useDispatch();
    const { height } = Dimensions.get('screen');
    const user = useSelector(state=>state.Auth.userdata)
    const Drawer = createDrawerNavigator();
    const doonotallow=async()=>{
      try{
        await dispatch(donotallow.donotallowuser(null))
      }catch(error){
      }
    }
    return (
      <Drawer.Navigator initialRouteName="Home"
        drawerContentOptions={{
          elevation: 5,
          backgroundColor: '#007E59',
          activeBackgroundColor: '#007E59',
          activeTintColor: '#ffffff',
          itemStyle: {marginVertical: 5}
        }}
        drawerContent={props =>
          <DrawerContentScrollView {...props} >
            <View style={{flex:1}}>
              <View style={{height:100}}>
                <View style={{height:70,alignSelf:'stretch',alignSelf:'center'}}>
                  <Image style={{backgroundColor:"#ffffff", width:70, height:70, borderRadius:50}} source={require('./assets/drawable-hdpi/image5.png')}/>
                </View>
                <View style={{height:30,alignSelf:'stretch',alignSelf:'center'}}><Text style={{color:'#ffffff'}}>{(user != null)?user.st_email:''}</Text></View>
              </View>
              <View style={{flex:1, alignSelf:'stretch', height:height-130, alignItems:'stretch', backgroundColor:'#ffffff'}}>
                <DrawerItemList {...props} />
                <DrawerItem onPress={()=>doonotallow()} label="Logout" icon={props=><AntDesign {...props} name="logout" size={30}></AntDesign>}/>
              </View>
            </View>
          </DrawerContentScrollView>
        }>
        {(user.user_type==1) ? <>
          <Drawer.Screen
            name="Home"
            component={HomePf}
            options={{
              drawerLabel: 'Home',
              drawerIcon: config => <MaterialIcons name="home" size={30} color={config.color}></MaterialIcons>
            }}
          />
          <Drawer.Screen
            name="Profile"
            component={ProfileStack}
            options={{
              drawerLabel: 'Profile',
              drawerIcon: config => <FontAwesome5 name="user-circle" size={30} color={config.color}></FontAwesome5>
            }}
          />
          <Drawer.Screen
            name="HelpFacility"
            component={HelpFacility}
            options={{
              drawerLabel: 'Help Facility',
              drawerIcon: config => <FontAwesome name="question-circle-o" size={30} color={config.color}></FontAwesome>
            }}
          />
          <Drawer.Screen
            name="ShortVideo"
            component={ShortVideo}
            options={{
              drawerLabel: 'Short Video',
              drawerIcon: config => <FontAwesome name="file-video-o" size={30} color={config.color}></FontAwesome>
            }}
          />
          <Drawer.Screen
            name="ShareApp"
            component={ShareApp}
            options={{
              drawerLabel: 'Share App',
              drawerIcon: config => <FontAwesome name="share-alt" size={30} color={config.color}></FontAwesome>
            }}
          />
        </>:<>
          <Drawer.Screen
            name="Home"
            component={Teachers}
            options={{
              drawerLabel: 'Home',
              drawerIcon: config => <MaterialIcons name="home" size={30} color={config.color}></MaterialIcons>
            }}
          />
          <Drawer.Screen
            name="Profile"
            component={TeacherProfile}
            options={{
              drawerLabel: 'Profile',
              drawerIcon: config => <FontAwesome5 name="user-circle" size={30} color={config.color}></FontAwesome5>
            }}
          />
        </>}
      </Drawer.Navigator>
    );
  }

  export default function App() {
    const dispatch=useDispatch()
    React.useEffect(()=>{
        AsyncStorage.getItem('@auth').then((value) => {
            if(value !== null) {
              dispatch({type:'USERDETAILL', data: JSON.parse(value)})
            }
        })
    },[])
    const user = useSelector(state=>state.Auth.userdata);
    const Stack = createStackNavigator();
    return (
      <NavigationContainer>
        <Stack.Navigator>
          {((typeof user != undefined && user != null) && Object.keys(user).length > 0) ?(<>
            <Stack.Screen
              name="Home"
              component={AppDrawerNavigator}
              options={{
                headerShown:null
              }}
            />
          </>):(
          <>
            <Stack.Screen name="LoginStack" component={LoginStack}
              options={{
                headerLeft:null,
                headerShown:null
              }}
            />
          </>
        )}
        </Stack.Navigator>
      </NavigationContainer>
    );
}
