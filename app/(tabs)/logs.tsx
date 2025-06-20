import {View,Text,SafeAreaView,Pressable,ScrollView,StyleSheet} from 'react-native';

import {useState,useEffect} from 'react';
import useFetch from '../../hooks/useFetch';
import {useSelector, useDispatch} from 'react-redux';
import {RootState,AppDispatch} from '../Store/Store';
import { Log } from '../Store/LogSlice';
import { setLogs } from '../Store/LogSlice';
import Card from '../../components/card';




export default function Logs(){
    
    const [shown,setShown] = useState<number>(2);
    const dispatch = useDispatch();
    useFetch();
    const data = useSelector((state : RootState) =>state.data.logs);
    useEffect(() => {
        console.log("Changed data: ", data);
    },[data])
    
    
    
    
    function showMore(){
        const nextVal = shown + 3;
        if(nextVal< data.length){
            setShown(nextVal);
        }
        else{
            setShown(data.length);
        }
    }

const logs: Log[] = [
  {
    id: 1,
    date: "May 20, 2025",
    location: {
      place: "Lake Simcoe",
      placeObj: { lat: 44.3, lon: -79.4 },
      system: "Great Lakes Basin"
    },
    catch: {
      name: "Smallmouth Bass",
      weight: 2.5,
      length: 16.3,
      time: "07:45 AM",
      image: "https://example.com/image1.jpg"
    },
    gear: {
      liveOrArtificial: false,
      name: "Plastic Worm"
    },
    weather: {
      airTemp: 18,
      waterTemp: 16.2,
      waterClarity: "Clear",
      windSpeed: 12,
      barometric: 1012.3,
      cloudCover: "Partly Cloudly",
      precipitation: 0,
      moonPhase: "Waxing Gibbous"
    }
  },
  {
    id: 2,
    date: "May 15, 2025",
    location: {
      place: "Ottawa River",
      placeObj: { lat: 45.4, lon: -75.7 },
      system: "Ottawa Watershed"
    },
    catch: {
      name: "Northern Pike",
      weight: 6.8,
      length: 28.7,
      time: "03:15 PM",
      image: "https://example.com/image2.jpg"
    },
    gear: {
      liveOrArtificial: true,
      name: "Minnow"
    },
    weather: {
      airTemp: 21,
      waterTemp: 18.5,
      waterClarity: "Slightly Muddy",
      windSpeed: 20,
      barometric: 1008.6,
      cloudCover: "Overcast",
      precipitation: 2,
      moonPhase: "Full Moon"
    }
  }
];


useEffect(() => {
  dispatch(setLogs(logs));
},[])
const displayedObjects = logs.slice(0,shown);
    return(
        data ? (
        <ScrollView contentContainerStyle = {styles.container}>
            {
                displayedObjects.map((obj,index) => {
                    return(
                     <Card data = {obj} key = {obj.id} ></Card>
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