import { View, Text, Pressable,StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSelector } from "react-redux";
import { RootState } from "../Store/Store";
import { useEffect } from "react";
import {useRouter} from 'expo-router'
export default function Index() {

  const loggedIn = useSelector((state:RootState) => state.login.loggedIn);
  const router = useRouter();
  
  useEffect(() => {
    const myTimeout = setTimeout(checkLogin,2000);
    function checkLogin(){
       if(!loggedIn){
        router.push('/login/Login')
        clearTimeout(myTimeout)
    }
    }

    
   
  },[])
  const username = useSelector((state: RootState)=> state.login.username)
  
  return (
    <View className="w-full h-full">
       <LinearGradient
                          // Background Linear Gradient
                          colors={['rgba(0, 180, 255, 0.6)', 'transparent']}
                          style = {styles.background}
                          start={{ x: 0.5, y: 0 }}
                          end={{ x: 0.5, y: 1}}
                      />
      {/* Background gradient */}
      <LinearGradient
                          // Background Linear Gradient
                          colors={['rgba(0, 180, 255, 0.6)', 'transparent']}
                          style = {styles.background}
                          start={{ x: 0.5, y: 0 }}
                          end={{ x: 0.5, y: 1}}
                      />
        {/* Center content */}
        <View className="flex-1 items-center justify-center px-6 text-white">
          {/* Big title */}
          <Text style = {styles.textTitle}>
            Welcome 
          </Text>
          <Text style = {styles.textTitle}>
            {username}
          </Text>

          {/* Subtitle */}
          <Text style = {styles.text}>
            Glad to have you here! 
          </Text>

          {/* Call to action */}
         
            
        </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  textTitle: {
    color: 'white',
    fontSize: 48,
    fontWeight: '800',
    letterSpacing: 1,
    textAlign: 'center',
    marginBottom: 6,
    textShadowColor: 'rgba(0, 0, 0, 0.4)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 6,
  },
  text: {
    fontSize: 20,
    color: 'rgba(255,255,255,0.85)',
    textAlign: 'center',
    fontWeight: '400',
    letterSpacing: 0.5,
    marginTop: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },
   background:{
        position: 'absolute',
        flex: 1,
        left: 0,
        right: 0,
        top: 0,
        height: 1000,
        justifyContent: "center",
        paddingHorizontal: 16
    },
  
});
