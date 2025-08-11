import {View} from "react-native";
import { useSelector
 } from "react-redux";
 import { RootState } from "../Store/Store";
import Button from '../../components/button';
import { useRouter } from "expo-router";
import { useEffect } from "react";
export default function Index() {
  const router = useRouter();

  const loginState = useSelector((state: RootState) => state.login.loggedIn);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!loginState) {
        router.replace('/login/Login'); // Use absolute route
      }
    }, 0); // Defer to next tick after mount
    return () => clearTimeout(timeout);
  },[loginState])
  
  return (
    
    <View
     className = 'justify-center items-center content-center bg-blue-950 w-full h-full'
    >
      
      <Button text = "Photo Recognition Logging" ></Button>
      <Button text = "Manual Logging"></Button>
      
    </View>
  ) 
  
}
