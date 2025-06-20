import {View, Text, Pressable,StyleSheet,TextInput,Keyboard,TouchableWithoutFeedback} from 'react-native';
import MapView, {Region} from 'react-native-maps';
import {useEffect,useState} from 'react';
import {useRouter} from 'expo-router';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../Store/Store';
import * as Loc from 'expo-location';
import { setPlaceObj, setPlace} from '../Store/EntrySlice';
//page for user to get their location
//Uses google maps via react-native maps
export default function Location(){
     const dispatch = useDispatch<AppDispatch>();
    const [location,setLocation] = useState<Loc.LocationObject | null>(null);
    const [region, setRegion] = useState<Region | null>(null);
    
    const router = useRouter();
    useEffect(() => {
        async function getLocation(){
            try{
                let {status} = await Loc.requestForegroundPermissionsAsync();
            if(status  !== 'granted'){
                //signal that the user does not give permissions
                return new Error("Location permissions not granted");
            }
             //get the location
             let location = await Loc.getCurrentPositionAsync();

             //save the location locally
             setLocation(location);
             //set the region to zoom into with required params
             setRegion(
                {
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01
                }
             )
            }catch(e){
                console.log("Location Error: " , e);
            }
            
        }

        //call the location function
        getLocation();
    },[])

    async function next(){
        try{
            if(location){
            let placeMarks = await Loc.reverseGeocodeAsync({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude
             })
             console.log(placeMarks);
             dispatch(setPlaceObj(placeMarks));
             const place  = `${placeMarks[0].streetNumber} ${placeMarks[0].street}, ${placeMarks[0].city}, ${placeMarks[0].country}`
             dispatch(setPlace(place));
            }
            else{
                throw new Error("Location is possibly null")
            }

            
            router.push('/logProcess/Extra');
            
        }catch(err){
            console.log("Error: ",err);
        }
    }
    return(
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className = 'flex-1 w-full h-full relative justify-center'>
             <TextInput className = 'absolute top-24 self-center w-11/12 max-w-[400px] h-14 bg-white text-black rounded-xl px-4 text-lg z-10 shadow' placeholder = {"Enter Location"} placeholderTextColor={'black'}></TextInput>
            {
                region? (
                    <MapView style = {styles.container} 
                    showsUserLocation
                    showsMyLocationButton
                    region = {region}
            />
                ): (

                    //render a list of markers of past logs for easier access
                    <MapView style = {styles.container}
                        showsUserLocation
                    />

                    
                )
            }

        <Pressable onPress = {next} className="absolute bottom-10 self-center w-1/2 h-12 justify-center items-center z-10 bg-black rounded-xl">
  <Text className="text-white text-lg">Next</Text>
</Pressable>

        </View>
        </TouchableWithoutFeedback>
    )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});