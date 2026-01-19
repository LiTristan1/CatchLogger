import {Text,Pressable,ScrollView,StyleSheet} from 'react-native';

import {useState,useEffect} from 'react';
import useFetch from '../../hooks/useFetch';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../Store/Store';
import { setLogs } from '../Store/LogSlice';
import Card from '../../components/card';
import * as SecureStore from 'expo-secure-store';
export default function Logs(){
    const URL = "http://192.168.2.18:3500/log"
    const [shown,setShown] = useState<number>(2);
    const dispatch = useDispatch();
    useFetch();
    const data = useSelector((state : RootState) =>state.data.logs);
    useEffect(() => {
      
      async function fetchLogs(){
        const token = await SecureStore.getItemAsync("accessToken");
        try{
          console.log("Inside fetchLogs");
          const response = await fetch(URL, {
                    method: "GET",
                    headers: {
                      'authorization': `Bearer ${token}`,
                      'Content-Type':'application/json'
                    }
                  })

          if(response.ok){
            console.log("response ok");
            
            dispatch(setLogs(await response.json()))
          }
        }catch(err){
          console.log("Error getting logs")
        }
        
      }


      fetchLogs();
    },[dispatch])
    // useEffect(() => {
    //     console.log("Changed data: ", data);
    // },[data])
    
    function showMore(){
        const nextVal = shown + 3;
        if(nextVal< data.length){
            setShown(nextVal);
        }
        else{
            setShown(data.length);
        }
    }


const displayedObjects = data.slice(0,shown);
    return(
        data ? (
        <ScrollView contentContainerStyle = {styles.container}>
            {
                displayedObjects.map((obj,index) => {
                    return(
                     <Card data = {obj} key = {index} ></Card>
                        )
                    })
            }
            <Pressable className = 'border-2 border-black' onPress = {showMore}><Text>Show More</Text></Pressable>
        </ScrollView>
    ) : (
        <Text>Loading...</Text>
    )
    )
   
}



const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginTop: 24,
        paddingVertical: 24
    }
});