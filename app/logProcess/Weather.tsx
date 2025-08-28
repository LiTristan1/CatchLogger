import {Text, Pressable,StyleSheet,TextInput,ScrollView} from 'react-native';
import {useState,useEffect} from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import WeatherPicker from '@/components/weatherPicker';
import { useRouter } from 'expo-router';
import { useDispatch,useSelector } from 'react-redux';
import { AppDispatch,RootState } from '../Store/Store';
import { setWaterTemp,setAirTemp,setWindSpeed,
    setBarometric,setCloudCover,setPrecipitation,
    setMoonPhase,setWaterClarity,setWindDirection
} from '../Store/EntrySlice';

import * as SecureStore from 'expo-secure-store'

//url to get weather info from backend (store in .env later)
const URL = 'http:192.168.2.18:3500/weather';
export default function Weather(){
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
   
    //get range for temperataure, wind, barometric pressure, precipitation, and windDirection for picker
    const tempRange = Array.from({ length: 1001 }, (_, i) => parseFloat(((i * 0.1) - 50).toFixed(1)));
    const windRange = Array.from({length: 51}, (_,i) => i)
    const baroRange = Array.from(
  { length: Math.round((1084 - 877) / 0.1) + 1 },
  (_, i) => parseFloat((877 + i * 0.1).toFixed(1))
);
 const precipitationRange = Array.from({length: 51}, (_,i) => i);
const windDirectionRange = Array.from({length: 361}, (_,i) => i)

//give options for cloudcover monstage, waterclarity
   
const cloudCoverOps = ["Clear/Sunny", "Partly Cloudly", "Mostly Cloudly","Overcast","Foggy/Low Visibility"]
const moonStageOps = ["New Moon", "Waxing Crescent","First Quarter","Waxing Gibbous","Full Moon", "Waning Gibbous", "Third Quarter","Waning Crescent"]
    
const waterClarityValOps = ["Crystal Clear (>10ft)","Clear (5-10ft)","Slightly Muddy (3-5ft)", "Muddy (<3ft)"]
    const[airTempVal,setAirTempVal] = useState<number>(-50);
    const[waterTempVal,setWaterTempVal] = useState<number>(-50);
    const[windSpeedVal,setWindSpeedVal] = useState<number>(0);
    const[windDirectionVal,setWindDirectionVal] = useState<number>(0);
    const[barometricVal,setBarometricVal] = useState<number>(0);
    const[cloudCoverVal,setCloudCoverVal] = useState<string>("Clear/Sunny");
    const[precipitationVal,setPrecipitationVal] = useState<number>(0);
    const[moonPhaseVal,setMoonPhaseval] = useState<string>("New Moon");
    const [waterClarityVal,setWaterClarityVal] = useState<string>("Crystal Clear (>10ft)");

    
    //timezone set for calls to backend
    const[timeZone,setTimeZone] = useState<string | null>("America/Toronto");


    //store all inputted data and move on to display summary
    function next(){
        dispatch(setWaterTemp(waterTempVal));
        dispatch(setWaterClarity(waterClarityVal))
        dispatch(setAirTemp(airTempVal));
        dispatch(setWindSpeed(windSpeedVal));
        dispatch(setWindDirection(windDirectionVal));
        dispatch(setBarometric(barometricVal));
        dispatch(setCloudCover(cloudCoverVal))
        dispatch(setPrecipitation(precipitationVal))
        dispatch(setMoonPhase(moonPhaseVal));
        router.push('/logProcess/Summary')
    }

    const latitude = useSelector((state: RootState) => state.entry.location.latitude);
    const longitude = useSelector((state: RootState) => state.entry.location.longitude);
    const time = useSelector((state:RootState) => state.entry.catch.time);
    const date = useSelector((state: RootState) => state.entry.date);

    {/**get current date */}
    useEffect(() => {
        setTimeZone(Intl.DateTimeFormat().resolvedOptions().timeZone);
    },[]);
    useEffect(() => {
        
        //get information from backend
        async function fetchWeather(){
            //get access token from secure store
            const token = await SecureStore.getItemAsync('accessToken');
            //console.log("Inside fetchweather: ", timeZone);
            try{
                //POST response
                const response = await fetch(URL, {
                    method: 'POST',
                    headers: {
                        'authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        latitude: latitude,
                        longitude: longitude,
                        time: time,
                        date: date,
                        timezone: timeZone
                    })
                         
                
                    
                    
                })

                const json = await response.json();
                console.log("JSON",json);

                //round to nearest degree
                setAirTempVal(Math.round(json.temp * 10) / 10);
                //keep one decimal place for pressure
                setBarometricVal(json.pressure.toFixed(1));

                //if precipitation is only rain
                if(json.rain != 0 && json.snow == 0){
                    setPrecipitationVal(json.rain)
                }else if(json.rain == 0 && json.snow !=0){
                    //if precipitation is only snoow
                    setPrecipitationVal(json.snow)
                }else{
                    //if both rain and snow
                    setPrecipitationVal(json.rain + json.snow);
                }

                //set the wind direction
                setWindDirectionVal(Math.round(json.windDirection));
                //set the windspeed 
                setWindSpeedVal(Math.round(json.windSpeedMean))

                
            }catch(e){
                console.log(e);
            }

            
            
    }

    fetchWeather();
    },[timeZone])
    return(
        <ScrollView contentContainerStyle ={{ 
            paddingTop: 50,
            alignItems: 'center',
            gap: 16, // roughly equivalent to Tailwind's `space-y-4`
            paddingBottom: 40, // add some bottom padding so the chart isn't cut off


        }}>
            <Text>Based on Provided Location and Date</Text>
             <LinearGradient
                    // Background Linear Gradient
                    colors={['rgba(0, 180, 255, 0.6)', 'transparent']}
                    style = {styles.background}
                    start={{ x: 0.5, y: 0 }}
                    end={{ x: 0.5, y: 1}}
                                
             />
    {/**picler for air temperature */}
        <WeatherPicker
            label = {"Air Temperature"}
            selectedValue = {airTempVal}
            onValueChange = {setAirTempVal}
            options = {tempRange}
            unit = {"\u00B0C"}
        />
        {/**picker for water Temperature */}
        <WeatherPicker 
            label = {"Water Temperature"}
            selectedValue = {waterTempVal}
            onValueChange = {setWaterTempVal}
            options = {tempRange}
            unit = {"\u00B0C"}
        />

        {/**picker for water clarity */}
        <WeatherPicker 
            label = {"Water Clarity"}
            selectedValue = {waterClarityVal}
            onValueChange = {setWaterClarityVal}
            options = {waterClarityValOps}
            unit = {""}
        />
        {/**picker for wind speed */}
        <WeatherPicker
            label = {"Wind Speed (Km/h)"}
            selectedValue = {windSpeedVal}
            onValueChange = {setWindSpeedVal}
            options = {windRange}
            unit = {""}
        />
        {/**picker for wind direction */}
        <WeatherPicker
            label = {"Wind Direction (Degrees)"}
            selectedValue = {windDirectionVal}
            onValueChange = {setWindDirectionVal}
            options = {windDirectionRange}
            unit = {"°"}
        
        />
        {/**picker for barometric pressure */}
        <WeatherPicker
            label = {"Barometric Pressure"}
            selectedValue = {barometricVal}
            onValueChange = {setBarometricVal}
            options = {baroRange}
            unit = {"hPa"}
        />
    {/**picler for cloud cover */}
        <WeatherPicker
            label = {"Cloud Cover"}
            selectedValue  = {cloudCoverVal}
            onValueChange={setCloudCoverVal}
            options = {cloudCoverOps}
            unit = {""}
        />
    {/**picker for precipitation */}
        <WeatherPicker
            label = {"Precipitation"}
            selectedValue = {precipitationVal}
            onValueChange = {setPrecipitationVal}
            options = {precipitationRange}
            unit = {"mm"}
        />
    {/**picler for moon phase */}
        <WeatherPicker
            label = {"Moon Phase"}
            selectedValue = {moonPhaseVal}
            onValueChange = {setMoonPhaseval}
            options = {moonStageOps}
            unit = {""}
        />

        
        {/**button to let user go to summary */}
        <Pressable className =  'border border-white px-6 py-3 rounded-xl mt-2 active:opacity-80' onPress = {next}><Text>Next</Text></Pressable>

        </ScrollView>
    )
}

const styles = StyleSheet.create({
     background:{
        position: 'absolute',
        flex: 1,
        left: 0,
        right: 0,
        top: 0,
        height: 1000,
        justifyContent: "center",
        paddingHorizontal: 16,
       
    },
    picker: {
        width: 300,
        height: 200,
        position: "relative",
        bottom: 50
    },
    subheader: {
        width: '75%',
        height: 30,
        maxWidth: 400,
        fontSize: 20,
        fontWeight: 600,
        backgroundColor: "white",
        borderRadius:12,
        borderColor: "white",
        textAlign: 'center'
    }
   
})
