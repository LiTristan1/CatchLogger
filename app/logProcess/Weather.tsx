import {View, Text, Pressable,StyleSheet,TextInput,ScrollView} from 'react-native';
import {useState} from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import {Picker} from '@react-native-picker/picker';
import WeatherPicker from '@/components/weatherPicker';
import { useRouter } from 'expo-router';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../Store/Store';
import { setWaterTemp,setAirTemp,setWindSpeed,
    setBarometric,setCloudCover,setPrecipitation,
    setMoonPhase,setWaterClarity
} from '../Store/EntrySlice';
export default function Weather(){
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    const Item: any = Picker.Item;
    const tempRange = Array.from({ length: 1001 }, (_, i) => parseFloat(((i * 0.1) - 50).toFixed(1)));
    const windRange = Array.from({length: 51}, (_,i) => i)
    const baroRange = Array.from(
  { length: Math.round((1084 - 877) / 0.1) + 1 },
  (_, i) => parseFloat((877 + i * 0.1).toFixed(1))
);
    const precipitationRange = Array.from({length: 51}, (_,i) => i);
const cloudCoverOps = ["Clear/Sunny", "Partly Cloudly", "Mostly Cloudly","Overcast","Foggy/Low Visibility"]
const moonStageOps = ["New Moon", "Waxing Crescent","First Quarter","Waxing Gibbous","Full Moon", "Waning Gibbous", "Third Quarter","Waning Crescent"]
    const[airTempVal,setAirTempVal] = useState<number>(-50);
const waterClarityValOps = ["Crystal Clear (>10ft)","Clear (5-10ft)","Slightly Muddy (3 to 5ft)", "Muddy (<3ft)"]
    const[waterTempVal,setWaterTempVal] = useState<number>(-50);
    const[windSpeedVal,setWindSpeedVal] = useState<number>(0);
    const[barometricVal,setBarometricVal] = useState<number>(0);
    const[cloudCoverVal,setCloudCoverVal] = useState<string>("Clear/Sunny");
    const[precipitationVal,setPrecipitationVal] = useState<number>(0);
    const[moonPhaseVal,setMoonPhaseval] = useState<string>("New Moon");
    const [waterClarityVal,setWaterClarityVal] = useState<string>("Crystal Clear (>10ft)");
    function next(){
        dispatch(setWaterTemp(waterTempVal));
        dispatch(setWaterClarity(waterClarityVal))
        dispatch(setAirTemp(airTempVal));
        dispatch(setWindSpeed(windSpeedVal));
        dispatch(setBarometric(barometricVal));
        dispatch(setCloudCover(cloudCoverVal))
        dispatch(setPrecipitation(precipitationVal))
        dispatch(setMoonPhase(moonPhaseVal));
        router.push('/logProcess/Summary')
    }
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
    {/**Settingg up picker for each numerical parameter in weather */}
        <WeatherPicker
            label = {"Air Temperature"}
            selectedValue = {airTempVal}
            onValueChange = {setAirTempVal}
            options = {tempRange}
            unit = {"\u00B0C"}
        />
            
        <WeatherPicker 
            label = {"Water Temperature"}
            selectedValue = {waterTempVal}
            onValueChange = {setWaterTempVal}
            options = {tempRange}
            unit = {"\u00B0C"}
        />

        <WeatherPicker 
            label = {"Water Clarity"}
            selectedValue = {waterClarityVal}
            onValueChange = {setWaterClarityVal}
            options = {waterClarityValOps}
            unit = {""}
        />
        <WeatherPicker
            label = {"Wind Speed (Km/h)"}
            selectedValue = {windSpeedVal}
            onValueChange = {setWindSpeedVal}
            options = {windRange}
            unit = {""}
        />

        <WeatherPicker
            label = {"Barometric Pressure"}
            selectedValue = {barometricVal}
            onValueChange = {setBarometricVal}
            options = {baroRange}
            unit = {"hPa"}
        />

        <WeatherPicker
            label = {"Cloud Cover"}
            selectedValue  = {cloudCoverVal}
            onValueChange={setCloudCoverVal}
            options = {cloudCoverOps}
            unit = {""}
        />

        <WeatherPicker
            label = {"Precipitation"}
            selectedValue = {precipitationVal}
            onValueChange = {setPrecipitationVal}
            options = {precipitationRange}
            unit = {"mm"}
        />

        <WeatherPicker
            label = {"Moon Phase"}
            selectedValue = {moonPhaseVal}
            onValueChange = {setMoonPhaseval}
            options = {moonStageOps}
            unit = {""}
        />

        
        
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
