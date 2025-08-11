import {
  View,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable
} from "react-native";

import * as SecureStore from 'expo-secure-store';

import{useState} from 'react';
import { useRouter } from "expo-router";
import { useDispatch } from "react-redux";
import { AppDispatch} from "../Store/Store";
import { setLoggedIn,setUser } from "../Store/LoginSlice";

export default function Login() {
  const URL = "http://192.168.2.18:3500/auth"
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [username,setUsername] = useState<string>("");
  const [password,setPassword] = useState<string>("");
  const [submitted,setSubmitted] = useState<boolean>(false);
  
 
  
   async function post(){
            try{
                const response = await fetch(URL, {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        user: username,
                        pwd: password
                    })

                    
                })

                if(response.ok){
                    const data = await response.json();

                    return data;
                }
                
                
                return false;
                
            }catch(err){
                console.log(err);
                return false;
            }
        }

        
  //function to get access token from backend
  async function login(){
    
    setSubmitted(true);
    
    //submit username and password into auth hook 
    if(username !== "" || password !== ""){
        //do something
        const response = await post();
       
        try{
          if(response.accessToken){
            
            await SecureStore.setItemAsync("accessToken",response.accessToken);
            dispatch(setLoggedIn(true))
            console.log("Username: ", username);
            dispatch(setUser(username))
            console.log("Here");
            router.replace('/(tabs)')
          }
        }
        catch(err){
          console.log(err);
        }
    }
  }
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        className="flex-1 w-full bg-blue-700 items-center justify-center px-6"
        behavior={"padding"}
      >
        <Text className="text-white text-4xl font-bold mb-20">
          Catch Logger
        </Text>
        {
            submitted ? (
                <Text>Username and password are required</Text>
            ) : (
                <></>
            )
        }
        
        <TextInput
          className="w-full max-w-md h-12 bg-white px-4 rounded-md mb-4"
          placeholder="Username"
          placeholderTextColor="#888"
          onChangeText = {text => setUsername(text)}
        />

        <TextInput
          className="w-full max-w-md h-12 bg-white px-4 rounded-md"
          placeholder="Password"
          placeholderTextColor="#888"
          secureTextEntry={true}
          onChangeText = {text => setPassword(text)}
        />
        <Pressable onPress = {login} className = 'mt-10 bg-white justify-center items-center rounded-xl w-24 h-10 border-2 border-white '><Text>Login</Text></Pressable>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}
