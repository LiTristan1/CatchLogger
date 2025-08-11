import {View, Text, Pressable,StyleSheet,TextInput,Keyboard,TouchableWithoutFeedback,ScrollView} from 'react-native';
import MapView, {Region} from 'react-native-maps';
import {useEffect,useState,useRef} from 'react';
import {useRouter} from 'expo-router';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../Store/Store';
import * as Loc from 'expo-location';
import { setPlaceObj, setPlace, setLatitude,setLongitude} from '../Store/EntrySlice';
//page for user to get their location
//Uses google maps via react-native maps
type PlacePrediction = {
  description: string;
  place_id: string;
  latitude? : number,
  longitude?: number
};
//api key for google maps (move to .env file later)
const apiKey = "AIzaSyBu8tOpbqAfJ9GAJ3owM0WG7DcwVMrCgl4"

export default function Location(){
     const dispatch = useDispatch<AppDispatch>();

     //set the location
    const [location,setLocation] = useState<Loc.LocationObject | null>(null);
    //sets the region
    const [region, setRegion] = useState<Region | null>(null);
    
    //get the search suggestions from google maps api
    const[suggestions,setSuggestions] = useState<PlacePrediction[] | null>(null);
    
    
    const router = useRouter();

    const mapRef = useRef<MapView>(null);
    useEffect(() => {
        async function getLocation(){
            //get the user permissions 
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
    async function searchLocation(place: string){
         //api call
         //place is what the user types

         const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(place)}&key=${apiKey}&language=en`;
         try{
            const response = await fetch(url);

            //turn the response into json
            const json = await response.json();
            
            //console.log(json.predictions);
            //set the suggestions
            setSuggestions(json.predictions);
         }catch(err){
            console.log(err);
         }
        console.log(place);
    }
    async function next(){
        //if we have the location
        //we get the physical location name from latitude and longitude
        try{

            if(location){
            let placeMarks = await Loc.reverseGeocodeAsync({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude
             })
            dispatch(setLatitude(location.coords.latitude));
            dispatch(setLongitude(location.coords.longitude));
            //  console.log(placeMarks);
            //store information about the place like streetname, city etc
             dispatch(setPlaceObj(placeMarks));
             const fullPlace = placeMarks[0];
             const addressParts = [
        fullPlace.streetNumber ?? '',
        fullPlace.street ?? '',
        fullPlace.city ?? '',
        fullPlace.country ?? '',
      ];
    const place = addressParts
        .filter((part) => part && part.trim().length > 0)
        .join(', ');
             dispatch(setPlace(place));
            }
            else{
                throw new Error("Location is possibly null")
            }

            //move to next page
            router.push('/logProcess/Extra');
            
        }catch(err){
            console.log("Error: ",err);
        }
    }

    async function handlePlaceSelect(placeId: string){
const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=geometry&key=${apiKey}`;

        const response = await fetch(url);

        //console.log(await response.json())
        const responseJSON = await response.json();
        
       // console.log(responseJSON.result.geometry.location.lat);
        //console.log(responseJSON.result.geometry.location.lng)
        //console.log("Google Place Details Result:", JSON.stringify(responseJSON, null, 2));
        const fakeLocationObj: Loc.LocationObject = {
            coords: {
                latitude: responseJSON.result.geometry.location.lat,
                longitude: responseJSON.result.geometry.location.lng,
                altitude: 0,
                accuracy: 0,
                heading:0,
                speed: 0,
                altitudeAccuracy: null,
            },
            timestamp: Date.now()

        }
        //console.log(fakeLocationObj)
        setLocation(fakeLocationObj);
        const regionObject: Region= {
                    latitude: fakeLocationObj.coords.latitude,
                    longitude: fakeLocationObj.coords.longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01
        }
        setRegion(
                regionObject
             )

            //mapRef?.current?.animateToRegion(regionObject,1000);
    }
    return(
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className = 'flex-1 w-full h-full relative justify-center'>
             <TextInput className = 'absolute top-24 self-center w-11/12 max-w-[400px] h-14 bg-white text-black rounded-xl px-4 text-lg z-10 shadow' onChangeText = {(text) => searchLocation(text)} placeholder = {"Enter Location"} placeholderTextColor={'black'}></TextInput>
             <View className="absolute top-36 w-11/12 max-w-[400px] self-center bg-white rounded-xl z-20 max-h-60 overflow-scroll shadow">
  
                <ScrollView>
  {suggestions && suggestions.map((place, index) => (
    <Pressable
      key={place.place_id}
      className="px-4 py-3 border-b border-gray-200"
      onPress={() =>handlePlaceSelect(place.place_id)}
    >
      <Text className="text-base text-gray-800">{place.description}</Text>
    </Pressable>
    
  ))}
  </ScrollView>
</View>

            
            {
                region? (
                    <MapView style = {styles.container} 
                    ref = {mapRef}
                    showsUserLocation
                    showsMyLocationButton
                    region = {region}
                    onRegionChangeComplete = {(newRegion) => setRegion(newRegion)}
            />
                ): (

                    //render a list of markers of past logs for easier access
                    <MapView style = {styles.container}
                        showsUserLocation
                    />

                    
                )
            }

        <Pressable onPress = {next} className="absolute bottom-10 self-center w-1/2 h-12 justify-center items-center z-10 bg-black rounded-xl">
  {/**button to go to next page  */}
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